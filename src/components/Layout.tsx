import { ReactNode } from 'react'
import Navigation from '../components/Navigation'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative">
      <Navigation />
      <main className="flex-1 transition-all duration-300 md:ml-64 relative z-10 w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  )
}