import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface RSVP {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  institution_organization: string;
  job_title: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  rsvp_id: string;
  ticket_number: string;
  qr_code: string;
  status: string;
  created_at: string;
}
