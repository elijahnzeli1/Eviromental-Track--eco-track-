'use client'

export function CircularLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              animation: `spin 1.5s linear infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div
              className="absolute top-0 left-1/2 -ml-1.5 w-3 h-3 bg-[#6366F1] rounded-full"
              style={{
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}