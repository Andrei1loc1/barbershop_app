-- Create clients table for storing user profiles
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  address TEXT DEFAULT '',
  preferences TEXT DEFAULT '',
  total_bookings INTEGER DEFAULT 0,
  total_spent NUMERIC DEFAULT 0,
  preferred_service TEXT DEFAULT 'Tuns clasic',
  last_visit TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.clients
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.clients
  FOR UPDATE USING (auth.uid() = id);

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile" ON public.clients
  FOR SELECT USING (auth.uid() = id);

-- Allow users to delete their own profile
CREATE POLICY "Users can delete their own profile" ON public.clients
  FOR DELETE USING (auth.uid() = id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_clients_email ON public.clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_phone ON public.clients(phone);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clients_updated_at 
  BEFORE UPDATE ON public.clients 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
