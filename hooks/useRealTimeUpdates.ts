import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

interface TokenPrices {
  [key: string]: number
}

interface Transaction {
  // Define the structure of a transaction
  // For example:
  id: string
  amount: number
  // Add other relevant fields
}

export function useRealTimeUpdates() {
  const [tokenPrices, setTokenPrices] = useState<TokenPrices>({})
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string)

    socket.on('tokenPriceUpdate', (data: TokenPrices) => {
      setTokenPrices(data)
    })

    socket.on('newTransaction', (transaction: Transaction) => {
      setRecentTransactions((prev) => [transaction, ...prev.slice(0, 9)])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return { tokenPrices, recentTransactions }
}
