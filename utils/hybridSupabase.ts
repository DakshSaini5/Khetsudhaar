import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// --- REAL SUPABASE CLIENT ---
export const realSupabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// --- LOCAL USER STATE ---
const LOCAL_DB: Record<string, any[]> = {
  profiles: [],
  user_lessons: [],
  user_quests: [],
};

const loadLocalDB = async () => {
  try {
    const saved = await AsyncStorage.getItem('local_user_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      LOCAL_DB.profiles = parsed.profiles || [];
      LOCAL_DB.user_lessons = parsed.user_lessons || [];
      LOCAL_DB.user_quests = parsed.user_quests || [];
    }
  } catch (e) {
    console.error("Failed to load local DB", e);
  }
};
loadLocalDB();

const saveLocalDB = async () => {
  try {
    await AsyncStorage.setItem('local_user_data', JSON.stringify(LOCAL_DB));
  } catch (e) {
    console.error("Failed to save local DB", e);
  }
};

// --- MOCK QUERY BUILDER FOR USER TABLES ---
class LocalQueryBuilder {
  table: string;
  data: any[];
  
  constructor(table: string) {
    this.table = table;
    this.data = [...(LOCAL_DB[table] || [])];
  }

  select() { return this; }

  eq(key: string, val: any) {
    this.data = this.data.filter(d => d[key] === val);
    return this;
  }
  
  neq(key: string, val: any) {
    this.data = this.data.filter(d => d[key] !== val);
    return this;
  }

  single() {
    return Promise.resolve({ data: this.data[0] || null, error: null });
  }

  async upsert(obj: any) {
    const tableData = LOCAL_DB[this.table];
    if (!Array.isArray(obj)) {
      const idKey = obj.id ? 'id' : (obj.user_id ? 'user_id' : (obj.quest_id ? 'quest_id' : null));
      let replaced = false;
      if (idKey) {
        const index = tableData.findIndex(d => d[idKey] === obj[idKey]);
        if (index > -1) {
          tableData[index] = { ...tableData[index], ...obj };
          replaced = true;
        }
      }
      if (!replaced) tableData.push(obj);
    }
    await saveLocalDB();
    return { data: obj, error: null };
  }
  
  async insert(obj: any) { return this.upsert(obj); }

  async then(resolve: (value: any) => void) {
    resolve({ data: this.data, error: null });
  }
}

// --- MOCK AUTH ---
let currentSession: any = null;
const authListeners: any[] = [];

const loadAuth = async () => {
    try {
        const stored = await AsyncStorage.getItem('local_session');
        if (stored) currentSession = JSON.parse(stored);
    } catch(e) {}
};
loadAuth();

const saveAuth = async (session: any) => {
    currentSession = session;
    try {
        if (session) await AsyncStorage.setItem('local_session', JSON.stringify(session));
        else await AsyncStorage.removeItem('local_session');
    } catch(e) {}
    authListeners.forEach(l => l(session ? 'SIGNED_IN' : 'SIGNED_OUT', session));
};

// --- HYBRID EXPORT ---
export const hybridSupabase = {
  auth: {
    async signUp({ email, password }: any) {
      // Simulate successful signup without email confirmation
      const user = { id: 'local-user-' + Date.now(), email };
      const session = { user, access_token: 'local-token' };
      await saveAuth(session);
      return { data: { user, session }, error: null };
    },
    async signInWithPassword({ email, password }: any) {
      // Allow any password for local MVP auth
      const user = { id: 'local-user-' + Date.now(), email };
      const session = { user, access_token: 'local-token' };
      await saveAuth(session);
      return { data: { user, session }, error: null };
    },
    async getSession() {
      if (!currentSession) await loadAuth();
      return { data: { session: currentSession }, error: null };
    },
    async signOut() {
      await saveAuth(null);
      return { error: null };
    },
    onAuthStateChange(callback: any) {
      authListeners.push(callback);
      callback('INITIAL_SESSION', currentSession);
      return { data: { subscription: { unsubscribe: () => {
          const idx = authListeners.indexOf(callback);
          if (idx > -1) authListeners.splice(idx, 1);
      } } } };
    }
  },
  from(table: string) {
    // Intercept user-specific mutable tables to use local storage
    if (['profiles', 'user_lessons', 'user_quests'].includes(table)) {
      return new LocalQueryBuilder(table);
    }
    
    // Pass everything else to the REAL database!
    const realQuery = realSupabase.from(table);
    
    // If fetching leaderboard, append our local user dynamically so they see themselves
    if (table === 'leaderboard_view') {
        const originalSelect = realQuery.select.bind(realQuery);
        realQuery.select = function(...args: any[]) {
            const req = originalSelect(...args);
            const originalThen = req.then.bind(req);
            
            req.then = function(resolve: any, reject: any) {
                return originalThen((res: any) => {
                    if (res.data && currentSession) {
                        const localProfile = LOCAL_DB.profiles.find(p => p.id === currentSession.user.id);
                        if (localProfile) {
                            res.data.push({
                                user_id: localProfile.id,
                                full_name: localProfile.full_name || 'You',
                                xp: localProfile.xp || 100,
                                rank: 999
                            });
                            res.data.sort((a: any, b: any) => b.xp - a.xp);
                            res.data.forEach((d: any, i: number) => d.rank = i + 1);
                        }
                    }
                    resolve(res);
                }, reject);
            };
            return req;
        };
    }
    
    return realQuery;
  }
};
