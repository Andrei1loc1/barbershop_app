-- Enable Row Level Security on the bookings table
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Drop the policy if it exists, then create it
DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
CREATE POLICY "Users can create their own bookings"
ON public.bookings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Drop the policy if it exists, then create it
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings"
ON public.bookings
FOR SELECT
USING (auth.uid() = user_id);