import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  preferences?: string;
}

export interface Client {
  id: string
  email: string
  name?: string
  phone?: string
  address?: string
  preferences?: string
}

// Send SMS OTP to phone for signup
export const sendPhoneOtp = async (phone: string) => {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone
    })

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Send OTP error:', error)
    throw error
  }
}

// Verify SMS OTP and complete signup

export const verifyPhoneOtp = async (phone: string, token: string) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    })

    if (error) {
      throw error
    }

    return { user: data.user, session: data.session }
  } catch (error) {
    console.error('OTP verification error:', error)
    throw error
  }
}

// Sign in with phone and password
export const signInWithPhonePassword = async (phone: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password
    });

    if (error) {
      throw error;
    }

    if (data.user && data.session) {
      // Fetch profile data from clients table
      const { data: profile } = await supabase
        .from('clients')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      return { user: { ...data.user, ...profile }, session: data.session };
    }

    throw new Error('Login failed');
  } catch (error) {
    console.error('Phone password login error:', error);
    throw error;
  }
}

// Send SMS OTP for login
export const sendPhoneLoginOtp = async (phone: string) => {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone
    })

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Send login OTP error:', error)
    throw error
  }
}

export const verifyPhoneLoginOtp = async (phone: string, token: string) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    })

    if (error) {
      throw error
    }

    if (data.user && data.session) {
      // Fetch profile data from clients table
      const { data: profile } = await supabase
        .from('clients')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      return { user: { ...data.user, ...profile }, session: data.session }
    }

    throw new Error('Login failed')
  } catch (error) {
    console.error('Phone login error:', error)
    throw error
  }
}

export const createUserProfile = async (userId: string, name: string, phone: string, password?: string) => {
  try {
    console.log('Creating profile for user:', userId, 'with name:', name, 'phone:', phone);

    // Prepare the update payload for the user
    const updateUserPayload: any = {
      data: {
        full_name: name,
        phone
      }
    };

    // If a password is provided, add it to the payload
    if (password) {
      updateUserPayload.password = password;
    }

    // Update user metadata and set password
    const { data: userData, error: userUpdateError } = await supabase.auth.updateUser(updateUserPayload);

    if (userUpdateError) {
      console.error('Failed to update user (metadata/password):', userUpdateError);
      throw userUpdateError;
    } else {
      console.log('User metadata and password updated successfully.');
    }

    // Create or update profile in the 'clients' table
    const profileData = {
      id: userId,
      email: '', // No email needed for phone auth
      name: name,
      phone,
      address: '',
      preferences: ''
    };

    const { data: upsertData, error: profileError } = await supabase
      .from('clients')
      .upsert(profileData, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('Failed to create client profile:', profileError);
      throw profileError;
    } else {
      console.log('Client profile created/updated:', upsertData);
    }

    return true;
  } catch (error) {
    console.error('Create profile error:', error);
    throw error;
  }
}

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      console.log('Auth user metadata:', user.user_metadata);
      
      // Fetch additional profile data from clients table
      const { data: profile } = await supabase
        .from('clients')
        .select('*')
        .eq('id', user.id)
        .single()
      
      console.log('Clients table profile:', profile);
      
      // Prioritize user_metadata name (full_name or name), fallback to clients table name
      const displayName = user.user_metadata?.full_name || 
                         user.user_metadata?.name || 
                         profile?.name || 
                         'vizitator';
      
      console.log('Final display name:', displayName);
      
      return { 
        ...user, 
        ...profile, 
        name: displayName 
      }
    }
    return null
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    return true
  } catch (error) {
    console.error('Signout error:', error)
    throw error
  }
}

// Update user profile
export const updateProfile = async (userId: string, name?: string, phone?: string, address?: string, preferences?: string) => {
  try {
    // Update auth user metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: { 
        ...(name && { name }),
        ...(phone && { phone })
      }
    })

    if (authError) {
      console.error('Auth update error:', authError)
    }

    // Update clients table
    const updates: any = {}
    if (name !== undefined) updates.name = name
    if (phone !== undefined) updates.phone = phone
    if (address !== undefined) updates.address = address
    if (preferences !== undefined) updates.preferences = preferences

    const { error: profileError } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', userId)

    if (profileError) {
      console.error('Profile update error:', profileError)
      throw profileError
    }

    return true
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

// Create a new booking
export const createBooking = async (bookingData: {
  service_name: string;
  service_price: number;
  date: string;
  time: string;
  user_id: string;
}) => {
  try {
    // Check for existing booking at the same date and time
    const { data: existingBooking, error: existingBookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('date', bookingData.date)
      .eq('time', bookingData.time)
      .single();

    if (existingBookingError && existingBookingError.code !== 'PGRST116') { // PGRST116: 'No rows found'
      throw existingBookingError;
    }

    if (existingBooking) {
      throw new Error('This time slot is already booked.');
    }

    const { data, error } = await supabase.from('bookings').insert([bookingData]);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Create booking error:', error);
    throw error;
  }
};

// Get all bookings for a user
export const getBookings = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Get bookings error:', error);
    throw error;
  }
};

// Get user statistics (total bookings and total spent)
export const getUserStats = async (userId: string) => {
  try {
    const bookings = await getBookings(userId);
    if (bookings) {
      const totalBookings = bookings.length;
      const totalSpent = bookings.reduce((acc, booking) => acc + booking.service_price, 0);
      return { totalBookings, totalSpent };
    }
    return { totalBookings: 0, totalSpent: 0 };
  } catch (error) {
    console.error('Get user stats error:', error);
    throw error;
  }
};
