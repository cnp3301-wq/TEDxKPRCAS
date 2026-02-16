import { createClient } from "@supabase/supabase-js";

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file"
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");

// Database types
export type Participant = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  status: "registered" | "attended" | "no-show";
  certSent: boolean;
  certSentDate?: string;
  created_at?: string;
  updated_at?: string;
};

export type Speaker = {
  id?: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  order: number;
  created_at?: string;
  updated_at?: string;
};

export type Certificate = {
  id?: string;
  title: string;
  text: string;
  bgColor: string;
  created_at?: string;
  updated_at?: string;
};

export type ContactInfo = {
  id?: string;
  email: string;
  phone: string;
  address: string;
  formLink: string;
  registrationLink: string;
  created_at?: string;
  updated_at?: string;
};

export type AboutInfo = {
  id?: string;
  title: string;
  description: string;
  content: string;
  created_at?: string;
  updated_at?: string;
};

export type Event = {
  id?: string;
  name: string;
  date: string;
  description?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
};

