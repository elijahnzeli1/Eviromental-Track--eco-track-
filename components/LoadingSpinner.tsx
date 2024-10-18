import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      <span className="ml-2 text-green-600 animate-pulse">Loading...</span>
    </div>
  );
}

