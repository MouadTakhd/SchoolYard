import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { ENV } from '@/config/env'
import type { SidebarItem } from '@/types/navigation'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CreditCard,
  Settings,
  ClipboardList,
  Layers,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  ChevronRight,
  BookOpen
} from 'lucide-react'
import { useState } from 'react'
import { useTheme } from './ui/theme-provider'

const NAV_ITEMS: SidebarItem[] = [
  { to: '/app', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, exact: true },
  { to: '/app/employees', label: 'Teachers', icon: <Users className="h-4 w-4" /> },
  { to: '/app/timetable', label: 'Students & Classes', icon: <GraduationCap className="h-4 w-4" /> },
  { to: '/app/documents', label: 'Billing', icon: <CreditCard className="h-4 w-4" /> },
  { to: '/app/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  { to: '/app/exams', label: 'Exams', icon: <ClipboardList className="h-4 w-4" /> },
  { to: '/app/features', label: 'Features', icon: <Layers className="h-4 w-4" />, badge: "NEW" },
]

export default function Navigation() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Master Sidebar Viewport Content
  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between p-4 bg-card">
      <div className="space-y-7">
        
        {/* Brand header */}
        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-2 focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-sm">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-foreground leading-none">
                {ENV.APP_NAME}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono font-semibold tracking-wider uppercase mt-1 leading-none">
                School Management
              </span>
            </div>
          </div>
        </Link>

        {/* Flat Streaming Navigation Rows */}
        <nav className="space-y-1.5" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden",
                "text-muted-foreground hover:text-foreground hover:bg-white/5 dark:hover:bg-black/10",
                "data-[status=active]:bg-gradient-to-r data-[status=active]:from-primary/10 data-[status=active]:to-transparent data-[status=active]:text-primary data-[status=active]:font-semibold"
              )}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary rounded-r-full transition-all duration-300 group-data-[status=active]:h-1/2 opacity-0 group-data-[status=active]:opacity-100" />
              <div className="flex items-center gap-3 min-w-0 z-10">
                <span className="transition-transform duration-300 group-hover:scale-110 group-data-[status=active]:scale-110 shrink-0 group-data-[status=active]:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]">
                  {item.icon}
                </span>
                <span className="truncate tracking-wide">{item.label}</span>
              </div>

              {/* Dynamic render conditional for caret indicators or operational badges */}
              {item.badge ? (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent text-accent-foreground group-data-[status=active]:bg-primary group-data-[status=active]:text-primary-foreground shadow-sm transition-colors shrink-0 z-10">
                  {item.badge}
                </span>
              ) : (
                <ChevronRight size={14} className="opacity-0 group-data-[status=active]:opacity-100 group-hover:opacity-50 shrink-0 transition-all duration-300 group-hover:translate-x-1 group-data-[status=active]:translate-x-0 z-10" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer System & Profile Configuration Row */}
      <div className="space-y-3 pt-4 border-t border-border/40">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0 font-bold text-xs">
              U
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground leading-tight truncate">Mouad</span>
              <span className="text-[10px] text-muted-foreground leading-none truncate">System Admin</span>
            </div>
          </div>

          {/* Theme Switch Controller */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-transparent hover:border-border/40 transition-all shadow-none shrink-0"
            aria-label="Toggle light/dark theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        <Link to="/">
          <button className="w-full h-9 flex items-center justify-center gap-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-all duration-200">
            <LogOut size={14} />
            Log out
          </button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* MOBILE HEADER CONTEXT ROW (Hidden on Desktop layouts) */}
      <header className="md:hidden sticky top-0 z-40 w-full h-14 border-b border-border/40 bg-background/80 backdrop-blur-md px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <BookOpen className="h-3.5 w-3.5" />
          </div>
          <span className="font-bold text-xs tracking-tight text-foreground">{ENV.APP_NAME}</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground bg-muted/40 border border-border/30 transition-all"
          aria-label="Toggle navigation view menu drawer"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      {/* MOBILE RESPONSIVE SLIDEOUT MATRIX DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative w-64 h-full bg-card border-r border-border/40 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* PERMANENT DESKTOP VIEW SIDEBAR PANEL (Hidden on Mobile) */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/40 select-none z-30">
        <SidebarContent />
      </aside>
    </>
  )
}