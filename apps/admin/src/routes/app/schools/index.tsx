import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, ArrowUpRight } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import type { School } from '@schoolyard/types'

export const Route = createFileRoute('/app/schools/')({
  head: () => ({ meta: [{ title: 'Schools | Schoolyard Admin' }] }),
  component: SchoolsPage,
})

const SCHOOLS: School[] = [
  { id: '1', name: 'Bright Horizons Academy', slug: 'bright-horizons', address: '145 Park Ave', city: 'New York', country: 'US', phone: '+1 212 555 0101', email: 'admin@bright-horizons.edu', principalName: 'Dr. Linda Chen', plan: 'professional', status: 'active', studentCount: 450, staffCount: 42, createdAt: '2023-08-15', updatedAt: '2026-06-01' },
  { id: '2', name: 'Maple Grove School', slug: 'maple-grove', address: '88 Maple Street', city: 'Toronto', country: 'CA', phone: '+1 416 555 0202', email: 'info@maplegrove.ca', principalName: 'James Okafor', plan: 'starter', status: 'active', studentCount: 312, staffCount: 28, createdAt: '2023-11-03', updatedAt: '2026-05-20' },
  { id: '3', name: 'Al Noor International School', slug: 'al-noor', address: 'Al Barsha District', city: 'Dubai', country: 'AE', phone: '+971 4 555 0303', email: 'admin@alnoor.ae', principalName: 'Ms. Sara Al-Mansouri', plan: 'enterprise', status: 'active', studentCount: 1200, staffCount: 89, createdAt: '2022-09-01', updatedAt: '2026-06-10' },
  { id: '4', name: 'École du Progrès', slug: 'ecole-progres', address: '12 Rue des Écoles', city: 'Paris', country: 'FR', phone: '+33 1 55 00 04 04', email: 'direction@progres.fr', principalName: 'M. François Dubois', plan: 'starter', status: 'active', studentCount: 280, staffCount: 24, createdAt: '2024-01-15', updatedAt: '2026-04-30' },
  { id: '5', name: 'Westfield Secondary School', slug: 'westfield', address: '300 Westfield Rd', city: 'London', country: 'GB', phone: '+44 20 555 0505', email: 'office@westfield.co.uk', principalName: 'Mr. David Harrington', plan: 'professional', status: 'suspended', studentCount: 560, staffCount: 48, createdAt: '2023-03-22', updatedAt: '2026-06-05' },
  { id: '6', name: 'Green Valley Elementary', slug: 'green-valley', address: '7 Green Valley Blvd', city: 'Sydney', country: 'AU', phone: '+61 2 555 0606', email: 'principal@greenvalley.edu.au', principalName: 'Ms. Rachel Kim', plan: 'free', status: 'trial', studentCount: 195, staffCount: 18, createdAt: '2026-05-01', updatedAt: '2026-06-12' },
  { id: '7', name: 'Sakura International Academy', slug: 'sakura', address: 'Shibuya-ku 2-3-4', city: 'Tokyo', country: 'JP', phone: '+81 3 555 0707', email: 'admin@sakura-int.jp', principalName: 'Dr. Kenji Tanaka', plan: 'enterprise', status: 'active', studentCount: 890, staffCount: 72, createdAt: '2022-04-10', updatedAt: '2026-06-08' },
  { id: '8', name: 'Sunrise Public School', slug: 'sunrise', address: 'Sector 14, Gurugram', city: 'New Delhi', country: 'IN', phone: '+91 11 555 0808', email: 'contact@sunrise.edu.in', principalName: 'Mrs. Priya Sharma', plan: 'starter', status: 'active', studentCount: 740, staffCount: 55, createdAt: '2024-06-01', updatedAt: '2026-05-28' },
]

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-border',
  suspended: 'bg-destructive/10 text-destructive border-destructive/20',
  trial: 'bg-warning/10 text-warning border-warning/20',
}

const PLAN_STYLES: Record<string, string> = {
  free: 'bg-muted text-muted-foreground border-border',
  starter: 'bg-primary/10 text-primary border-primary/20',
  professional: 'bg-secondary/10 text-secondary border-secondary/20',
  enterprise: 'bg-accent/10 text-accent border-accent/20',
}

const FILTERS = ['All', 'Active', 'Suspended', 'Trial']

function SchoolsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = SCHOOLS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || s.status === filter.toLowerCase()
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Schools</h1>
          <p className="text-sm text-muted-foreground mt-1">{SCHOOLS.length} registered accounts</p>
        </div>
        <Button className="rounded-xl h-9 text-xs font-bold gap-2">
          <Plus size={14} /> Add School
        </Button>
      </div>

      <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-4 p-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or city…"
                className="pl-9 h-9 rounded-xl text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'px-3 h-9 rounded-xl text-xs font-semibold border transition-colors',
                    filter === f
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">School</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Plan</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Staff / Students</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hidden xl:table-cell">Joined</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map(school => (
                <tr key={school.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-4">
                    <div>
                      <div className="font-semibold text-foreground">{school.name}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{school.city}, {school.country}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', PLAN_STYLES[school.plan])}>
                      {school.plan}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', STATUS_STYLES[school.status])}>
                      {school.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell text-xs text-muted-foreground">
                    {school.staffCount} staff · {school.studentCount} students
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell text-xs text-muted-foreground">
                    {formatDate(school.createdAt)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link to="/app/schools/$schoolId" params={{ schoolId: school.id }}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={14} />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground text-sm">
              No schools match your search.
            </div>
          )}
        </div>

        <div className="border-t border-border/40 px-5 py-3 bg-muted/20 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Showing {filtered.length} of {SCHOOLS.length} schools</span>
        </div>
      </Card>
    </div>
  )
}
