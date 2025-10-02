import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'
import { 
  ArrowLeft, ArrowRight, Check, Calendar, User as UserIcon, Scissors, Clock, Mail, Phone, MapPin, 
  UserCheck, ScissorsLineDashed 
} from 'lucide-react'
import type { ChangeEvent, FormEvent } from 'react'

import { type User } from '@supabase/supabase-js'

interface Service {
  id: number
  name: string
  price: number
  duration: number
  icon: React.ComponentType<{ className?: string; size?: number }>
  description: string
}

const services: Service[] = [
  { id: 1, name: 'Haircut', price: 30, duration: 30, icon: Scissors, description: 'Precision cuts tailored to your style' },
  { id: 2, name: 'Beard Trim', price: 20, duration: 20, icon: Scissors, description: 'Sharp and clean beard shaping' },
  { id: 3, name: 'Shave', price: 25, duration: 25, icon: ScissorsLineDashed, description: 'Classic straight razor shave' },
]

import { createBooking } from '../services/supabaseService';
import { useLogin } from '../contexts/LoginContext';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const { user } = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  

  const availableTimes = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']
  const timeSlots = availableTimes.filter(time => !selectedTime || time === selectedTime)

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || !selectedService || !selectedTime) {
      alert('Please log in, select a service, and choose a time to book an appointment.');
      return;
    }

    setIsLoading(true);
    
    // Handle form submission
    const bookingData = {
      service_name: selectedService.name,
      service_price: selectedService.price,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      user_id: user.id,
    }
    
    try {
      const data = await createBooking(bookingData);
      console.log('Booking submitted:', data);
      alert('Booking confirmed! You will receive a confirmation email shortly.');
      
      // Reset form
      setSelectedService(null);
      setSelectedDate(new Date());
      setSelectedTime('');
      setCurrentStep(1);
      
      // Optionally redirect to profile or home
      // window.location.href = '/profile';
      
    } catch (error) {
      console.error('Error creating booking:', error);
      let errorMessage = 'Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      }
      alert(`There was an error creating your booking: ${errorMessage}`);
    } finally {
      console.log('Finally block executed');
      setIsLoading(false);
    }
  }

  const getProgressClass = (step: number) => {
    if (currentStep > step) return 'bg-green-500 border-green-500'
    if (currentStep === step) return 'bg-yellow-600 '

    return 'bg-gray-700 border-gray-600'
  }

  const StepOne = () => (
    <div className="max-w-6xl mx-auto px-4 py-12 pb-20">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Book Your Appointment</h1>
      
      {/* Progress Indicator */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          {[1,2,3].map(step => (
            <React.Fragment key={step}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold  ${getProgressClass(step)}`}>
                {step === 1 ? <Scissors size={20} /> : 
                 step === 2 ? <Clock size={20} /> : <Check size={20} />}
              </div>
              {step < 3 && <div className={`w-16 h-1 ${currentStep > step ? 'bg-gold' : 'bg-gray-700'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <div
            key={service.id}
            className={`dark-glass-card mx-sm flex items-center hover:shadow-xl transition-all duration-300 cursor-pointer ${
              selectedService?.id === service.id ? 'ring-2 ring-yellow-600 ring-opacity-50' : ''
            }`}
            onClick={() => setSelectedService(service)}
          >
            <div className={`w-12 h-12 light-glass-icon rounded-lg flex items-center justify-center mr-2 ${
              selectedService?.id === service.id ? 'bg-yellow-300/20' : ''
            }`}>
              <service.icon className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white whitespace-nowrap">{service.name}</h3>
            <div className="flex flex-col justify-center items-end w-full">
              <span className="text-3xl font-bold text-gold">${service.price}</span>
              <span className="text-gray-400 text-sm">{service.duration} min</span>
            </div>
            {selectedService?.id === service.id && (
              <Check className="w-5 h-5 text-gold ml-auto mt-2" />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-12">
        <button
          onClick={handleNext}
          disabled={!selectedService}
          className="px-6 py-3 bg-gold text-black rounded-full font-semibold hover:bg-yellow-400 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )

  const StepThree = () => (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-20">
      <div className="flex items-center mb-8">
        <button onClick={handleBack} className="text-gold hover:text-yellow-400 mr-4">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold text-white">Pick Date & Time</h2>
      </div>
      {/* Progress Indicator */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          {[1,2,3].map(step => (
            <React.Fragment key={step}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold  ${getProgressClass(step)}`}>
                {step === 1 ? <Scissors size={20} /> : 
                 step === 2 ? <Clock size={20} /> : <Check size={20} />}
              </div>
              {step < 3 && <div className={`w-16 h-1 ${currentStep > step ? 'bg-gold' : 'bg-gray-700'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      

      {/* Date Picker */}
      <div className="dark-glass-card mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Calendar className="w-6 h-6 text-gold" />
          <h3 className="text-lg font-semibold text-white">Select Date</h3>
        </div>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedDate(new Date(e.target.value))}
          className="w-full px-4 py-3 bg-[#51555a]/50 backdrop-blur-sm rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>

      {/* Time Slots */}
      <div className="dark-glass-card">
        <div className="flex items-center space-x-4 mb-6">
          <Clock className="w-6 h-6 text-gold" />
          <h3 className="text-lg font-semibold text-white">Available Times</h3>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {timeSlots.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-3 rounded-lg transition-all duration-200  ${
                selectedTime === time
                  ? 'bg-gold text-black font-semibold shadow-lg transform scale-105'
                  : 'bg-[#51555a]/50 text-white hover:bg-gray-700/50 backdrop-blur-sm'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-gray-700/50 backdrop-blur-sm text-white rounded-full hover:bg-gray-600/50 transition-colors border border-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedTime}
          className="px-6 py-3 bg-gold text-black rounded-full font-semibold hover:bg-yellow-400 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )

const StepFour = () => (
    <form onSubmit={handleSubmit}>
      <div className="max-w-4xl mx-auto px-4 py-12 pb-20">
        <div className="flex items-center mb-8">
          <button onClick={handleBack} className="text-gold hover:text-yellow-400 mr-4">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold text-white">Confirm Your Booking</h2>
        </div>
        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1,2,3].map(step => (
              <React.Fragment key={step}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold  ${getProgressClass(step)}`}>
                  {step === 1 ? <Scissors size={20} /> : 
                   step === 2 ? <Clock size={20} /> : <Check size={20} />}
                </div>
                {step < 3 && <div className={`w-16 h-1 ${currentStep > step ? 'bg-green-500' : 'bg-gray-700'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
        

        {/* Confirmation Card */}
        <div className="dark-glass-card">
          <div className="bg-[#51555a]/50 backdrop-blur-sm p-6 rounded-lg shadow-inner ">
            <h3 className="text-2xl font-semibold text-green-500 mb-6 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-500 mr-3" />
              Booking Summary
            </h3>
            <div className="space-y-4 text-white">
              <div className="flex justify-between text-lg">
                <span className="font-medium">Service:</span>
                <span className="font-semibold">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-medium">Date:</span>
                <span className="font-semibold">{selectedDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-medium">Time:</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
              <div className="flex justify-between border-t border-gray-600 pt-4 mt-4">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-green-500">${selectedService?.price}</span>
              </div>
            </div>
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="glass-btn px-12 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-500 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline"></div>
                    Creating Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <Check className="w-5 h-5 ml-2 inline" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )

  return (
    <div className="min-h-screen bg-[#1A2331]">
      <Navbar />
      {/* Step Content */}
      <div className="pt-16">
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepThree />}
        {currentStep === 3 && <StepFour />}
      </div>
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

export default BookingPage
