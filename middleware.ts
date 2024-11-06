import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login',
  },
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/api/protected/:path*',
    '/api/auth/:path*',
    '/api/protected/:path*',
    // Add other protected routes here
  ]
}
