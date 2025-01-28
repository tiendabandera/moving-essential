import axios from './axios';
import { createClient } from "@supabase/supabase-js";

const PATH_URL = 'auth';

export const registerRequest = (user) => axios.post(`/${PATH_URL}/register`, user);
export const loginRequest = (user) => axios.post(`/${PATH_URL}/login`, user);
export const logoutRequest = () => axios.post(`/${PATH_URL}/logout`);
export const profileRequest = () => axios.get(`/${PATH_URL}/profile`);

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );



  