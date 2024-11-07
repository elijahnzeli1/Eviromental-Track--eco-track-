import NextAuth, { DefaultSession, NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from '@/src/lib/mongodb'
import { User } from '@/src/models'
import { JWT } from 'next-auth/jwt'

// Define custom user interface
interface UserDocument {
  _id: string
  name: string
  email: string
  password: string
}

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    name: string
    email: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        try {
          await connectDB()

          const user = await User.findOne({ 
            email: credentials.email.toLowerCase() 
          })
          
          if (!user) {
            throw new Error('No user found with this email')
          }

          const isValid = await user.comparePassword(credentials.password)
          
          if (!isValid) {
            throw new Error('Incorrect password')
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error('Authentication failed')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
        expires: session.expires
      }
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }