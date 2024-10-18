'use client'

export function PulseLoading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        <div className="w-12 h-12 bg-blue-500 rounded-full opacity-75 animate-ping" />
        <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500 rounded-full" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  )
}