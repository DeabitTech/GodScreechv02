import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supaUrl = "";
const supaKey = "";


export const supabase = createClient(supaUrl, supaKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true, 
      persistSession: true,
      detectSessionInUrl: false,
    },
  })