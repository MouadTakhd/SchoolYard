import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { ThemeToggle } from '@/components/ui/toggle-theme'
import { cn } from '@/lib/utils'

type DocsRoute = '/core' | '/core/about' | '/core/router-guide' | '/core/system-design' | '/core/ui-playground'

const DOCS_NAV: Array<{ to: DocsRoute; label: string; exact?: boolean }> = [
  { to: '/core', label: 'Overview', exact: true },
  { to: '/core/about', label: 'About' },
  { to: '/core/router-guide', label: 'Router Guide' },
  { to: '/core/system-design', label: 'System Design' },
  { to: '/core/ui-playground', label: 'UI Playground' },
]

export const Route = createFileRoute('/core')({
  component: CoreLayout,
})

function CoreLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Architecture docs navigation">
            {DOCS_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  "data-[status=active]:bg-primary/10 data-[status=active]:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/app" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Back to App
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
