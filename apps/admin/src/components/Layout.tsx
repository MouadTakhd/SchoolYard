import { ReactNode } from 'react'
import Navigation from './Navigation'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Navigation />
      <main className="flex-1 md:ml-64 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
