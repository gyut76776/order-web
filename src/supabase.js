
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wwwawsgvrlaqdakbtmdb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3d2F3c2d2cmxhcWRha2J0bWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzA4NTIsImV4cCI6MjA4MDI0Njg1Mn0.y-h-KhCZZ1s_eVvcdhU7n3neJhHZTKyCNfztUIN9eWc";

export const supabase = createClient(supabaseUrl, supabaseKey);
