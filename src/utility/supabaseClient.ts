import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://uwwffbfxsktbzzkgdjyq.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3d2ZmYmZ4c2t0Ynp6a2dkanlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0MDI1NDcsImV4cCI6MjAwNDk3ODU0N30.E7Nt1-yllbEGuK_eHntTtHXpAvkUl5ZvXFK9-ALc-TM";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
