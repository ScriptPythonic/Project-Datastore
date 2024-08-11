// src/supabaseClient.jsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://worqtwleckzyhzisqzgy.supabase.co'; // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcnF0d2xlY2t6eWh6aXNxemd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4NTMwMjQsImV4cCI6MjAzNjQyOTAyNH0.Mfn36To2n09-H4Kt2BMNvMfl_Cums8YqV4-U49uY4ys'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
