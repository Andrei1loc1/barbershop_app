import React from 'react'
import { X } from 'lucide-react'

interface Booking {
  id: number
  service: string
  date: string
  barber: string
  status: string
  price: string
}

interface ReservationCardProps {
  booking: Booking
  type: 'current' | 'past'
  onCancel?: (id: number) => void
  getStatusClass?: (status: string) => string
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  booking, 
  type, 
  onCancel,
  getStatusClass 
}) => {
  const statusClass = getStatusClass ? getStatusClass(booking.status) : 'bg-gray-100 text-gray-700'

  return (
    <div className="bg-[#51555a]/50 rounded-2xl p-4 shadow-xl transition-all duration-300">
      {type === 'current' ? (
        // Current booking layout with cancel button
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h4 className="font-semibold text-gray-100 text-lg">{booking.service}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ml-2 ${statusClass}`}>
                {booking.status}
              </span>
            </div>
            <p className="text-gray-300 mb-1">{booking.date}</p>
            <p className="text-sm text-gray-400 mb-2">Barbier: {booking.barber}</p>
            <p className="text-sm font-semibold text-yellow-400">Preț: {booking.price}</p>
          </div>
          <button
            onClick={() => onCancel && onCancel(booking.id)}
            className="ml-1 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-colors flex items-center"
          >
            <X className="w-14 h-3" />
          </button>
        </div>
      ) : (
        // Past booking layout with status on right
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-100 text-lg">{booking.service}</h4>
            <p className="text-gray-300 mt-1">{booking.date}</p>
            <p className="text-sm text-gray-400 mt-0.5">Barbier: {booking.barber}</p>
            <p className="text-sm font-semibold text-yellow-400 mt-1">Preț: {booking.price}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${statusClass}`}>
            {booking.status}
          </span>
        </div>
      )}
    </div>
  )
}

export default ReservationCard
