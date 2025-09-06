'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  User,
  Settings,
  Mail,
  FileText,
  ShoppingBag,
  Store,
  Bell,
  Search,
  Menu,
  X,
  Phone,
  AlertCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'

interface LayoutProps {
  children: React.ReactNode
}

interface NavItem {
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  customClick?: () => void
  badge?: number
}

// Navigation config with dynamic "Stores" redirect
const navigationItems: NavItem[] = [
  { name: 'Home', href: '/user/home', icon: Home },
  { name: 'Orders', href: '/user/order', icon: ShoppingBag, },
  // {
  //   name: 'Stores',
  //   icon: Store,
  //   customClick: () => {
  //     // Custom store navigation logic
  //   }
  // },
  { name: 'Profile', href: '/user/profile', icon: User },
]

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { accessToken, user } = useAuth();

  // Check if user needs to update phone number on component mount
  useEffect(() => {
    // console.log(user?.phone)
    // You can add your logic here to check if the user needs to update their phone
    // For example, check localStorage, user context, or make an API call
    // For now, we'll show the modal immediately for demonstration
    const hasPhoneNumber = user?.phone
    if (!hasPhoneNumber) {
      setIsPhoneModalOpen(true)
    }
  }, [])

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber.trim()) {
      setError('Please enter your phone number')
      return
    }

    // Basic phone number validation
    const phoneRegex = /^[0-9]{10,15}$/
    if (!phoneRegex.test(phoneNumber.replace(/\D/g, ''))) {
      setError('Please enter a valid phone number')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await axios.post('/api/users/update_phone', { phone: phoneNumber }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })

      if (response.status === 200) {
        // Store flag to prevent modal from showing again
        localStorage.setItem('userHasPhone', 'true')
        setIsPhoneModalOpen(false)
        setPhoneNumber('')
      }
    } catch (err: any) {
      setError('Failed to update phone number. Please try again.')
      console.error('Error updating phone:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = pathname === item.href
    const Icon = item.icon

    const baseClasses = `
      group relative transition-all duration-300 ease-in-out
      ${isMobile
        ? 'flex flex-col items-center justify-center py-3 px-2 text-xs min-h-[60px] rounded-md'
        : 'flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-1 my-2'
      }
    `

    const activeClasses = isActive
      ? isMobile
        ? 'text-white bg-[#F9CA44] scale-105'
        : 'bg-[#e8bc43] text-white scale-105'
      : isMobile
        ? 'text-gray-600 hover:text-[#F9CA44] hover:bg-[#F9CA44]/10'
        : 'text-gray-700 hover:text-[#F9CA44] hover:bg-[#F9CA44]/10'

    const classes = `${baseClasses} ${activeClasses}`

    // If customClick is defined, render as a button
    if (item.customClick) {
      return (
        <button
          key={item.name}
          onClick={item.customClick}
          className={`${classes} lg:w-full`}
        >
          <div className="relative">
            <Icon className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-5 w-5 mr-3'} transition-transform duration-300 group-hover:scale-110`} />
            {item.badge && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                {item.badge}
              </span>
            )}
          </div>
          <span className={`${isMobile ? 'text-xs font-medium' : 'font-medium'} transition-all duration-300`}>
            {item.name}
          </span>
        </button>
      )
    }

    // Otherwise render as a Link
    return (
      <Link
        key={item.name}
        href={item.href!}
        className={classes}
      >
        <div className="relative">
          <Icon className={`${isMobile ? 'h-5 w-5 mb-1' : 'h-5 w-5 mr-3'} transition-transform duration-300 group-hover:scale-110`} />
          {item.badge && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
              {item.badge}
            </span>
          )}
        </div>
        <span className={`${isMobile ? 'text-xs font-medium' : 'font-medium'} transition-all duration-300`}>
          {item.name}
        </span>
      </Link>
    )
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 z-10">
      {/* Phone Number Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-[#F9CA44] to-[#f7b731] p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Update Phone Number</h2>
                  <p className="text-white/90 text-sm">Required to continue</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Important Notice</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Please enter a phone number that you can be reached on. This will be used for order updates and delivery notifications.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9CA44] focus:border-transparent outline-none transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !phoneNumber.trim()}
                  className="w-full bg-gradient-to-r from-[#F9CA44] to-[#f7b731] text-white py-3 px-4 rounded-lg font-medium hover:from-[#f7b731] hover:to-[#F9CA44] focus:outline-none focus:ring-2 focus:ring-[#F9CA44] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    'Update Phone Number'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-60 lg:flex-col">
        <div className="flex flex-col flex-grow pt-8 pb-6 overflow-y-auto bg-white/80 backdrop-blur-xl shadow-lg border-r border-gray-200/50">
          {/* Logo/Brand */}
          <div className="flex items-center flex-shrink-0 px-6 mb-12">
            <div className="flex items-center justify-center">

            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <div className="space-y-2">
              {navigationItems.map((item) => renderNavItem(item))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#F9CA44] to-[#f7b731] bg-clip-text text-transparent">
                Parcel
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4">
              {navigationItems.map((item) => renderNavItem(item))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#F9CA44] to-[#f7b731] bg-clip-text text-transparent">
              Parcel
            </h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto focus:outline-none pb-20 lg:pb-0">
          <div className="py-6 px-4 lg:px-0 lg:py-0 lg:pl-2">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl shadow-2xl px-4 py-2 border-t border-gray-200/50">
          <nav className="flex justify-around items-center">
            {navigationItems.map((item) => renderNavItem(item, true))}
          </nav>
        </div>
      </div>
    </div>
  )
}