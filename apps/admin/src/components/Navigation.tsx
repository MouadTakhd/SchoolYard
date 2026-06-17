import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { ENV } from '@/config/env'
import {
  LayoutDashboard, Building2, Users, FileText, Settings,
  Sun, Moon, Menu, X, LogOut, ChevronRight, ShieldCheck
} from 'lucide-react'
import { useState } from 'react'
import { useTheme } from './ui/theme-provider'

const NAV_ITEMS = [
  { to: '/app', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" />, exact: true },
  { to: '/app/schools', label: 'Schools', icon: <Building2 className="h-4 w-4" /> },
  { to: '/app/users', label: 'Users', icon: <Users className="h-4 w-4" /> },
  { to: '/app/documents', label: 'Documents', icon: <FileText className="h-4 w-4" /> },
  { to: '/app/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
]

export default function Navigation() {
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between p-4 bg-card">
      <div className="space-y-6">
        <Link to="/" onClick={() => setMobileOpen(false)} className="block px-2 focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-sm">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-foreground leading-none">
                {ENV.APP_NAME}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono font-semibold tracking-wider uppercase mt-1 leading-none">
                Super Admin
              </span>
            </div>
          </div>
        </Link>

        <nav className="space-y-1" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                'data-[status=active]:bg-primary/10 data-[status=active]:text-primary data-[status=active]:font-semibold'
              )}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-primary rounded-r-full transition-all duration-200 group-data-[status=active]:h-5" />
              <div className="flex items-center gap-3 z-10">
                <span className="shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <ChevronRight size={13} className="opacity-0 group-data-[status=active]:opacity-60 group-hover:opacity-30 transition-opacity z-10" />
            </Link>
          ))}
        </nav>
      </div>

      <div className="space-y-3 pt-4 border-t border-border/40">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 font-bold text-xs">
              SA
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground leading-tight truncate">Super Admin</span>
              <span className="text-[10px] text-muted-foreground leading-none truncate">admin@schoolyard.io</span>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-transparent hover:border-border/40 transition-all shrink-0"
            aria-label="Toggle light/dark theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        <Link to="/">
          <button className="w-full h-9 flex items-center justify-center gap-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all duration-200">
            <LogOut size={14} />
            Sign out
          </button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 w-full h-14 border-b border-border/40 bg-background/80 backdrop-blur-md px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
          <span className="font-bold text-xs tracking-tight">{ENV.APP_NAME}</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground bg-muted/40 border border-border/30 transition-all"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-card border-r border-border/40 shadow-2xl animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </aside>
        </div>
      )}

      <aside className="hidden md:block fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/40 select-none z-30">
        <SidebarContent />
      </aside>
    </>
  )
}
