import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import type { User } from '@schoolyard/types'

export const Route = createFileRoute('/app/users/')({
  head: () => ({ meta: [{ title: 'Users | Schoolyard Admin' }] }),
  component: UsersPage,
})

const USERS: User[] = [
  { id: 'u1', schoolId: '1', schoolName: 'Bright Horizons Academy', fullName: 'Dr. Linda Chen', email: 'lchen@bright-horizons.edu', role: 'school_admin', status: 'active', createdAt: '2023-08-15', lastLogin: '2026-06-16' },
  { id: 'u2', schoolId: '1', schoolName: 'Bright Horizons Academy', fullName: 'Marcus Williams', email: 'mwilliams@bright-horizons.edu', role: 'teacher', status: 'active', createdAt: '2023-09-01', lastLogin: '2026-06-15' },
  { id: 'u3', schoolId: '3', schoolName: 'Al Noor International School', fullName: 'Ms. Sara Al-Mansouri', email: 'sara@alnoor.ae', role: 'school_admin', status: 'active', createdAt: '2022-09-01', lastLogin: '2026-06-16' },
  { id: 'u4', schoolId: '3', schoolName: 'Al Noor International School', fullName: 'Ahmed Hassan', email: 'ahassan@alnoor.ae', role: 'teacher', status: 'active', createdAt: '2023-01-15', lastLogin: '2026-06-13' },
  { id: 'u5', schoolId: '2', schoolName: 'Maple Grove School', fullName: 'James Okafor', email: 'james@maplegrove.ca', role: 'school_admin', status: 'active', createdAt: '2023-11-03', lastLogin: '2026-06-12' },
  { id: 'u6', schoolId: '5', schoolName: 'Westfield Secondary School', fullName: 'David Harrington', email: 'dharrington@westfield.co.uk', role: 'school_admin', status: 'inactive', createdAt: '2023-03-22', lastLogin: '2026-05-01' },
  { id: 'u7', schoolId: '4', schoolName: 'École du Progrès', fullName: 'M. François Dubois', email: 'fdubois@progres.fr', role: 'school_admin', status: 'active', createdAt: '2024-01-15', lastLogin: '2026-06-10' },
  { id: 'u8', schoolId: '7', schoolName: 'Sakura International Academy', fullName: 'Dr. Kenji Tanaka', email: 'ktanaka@sakura-int.jp', role: 'school_admin', status: 'active', createdAt: '2022-04-10', lastLogin: '2026-06-16' },
  { id: 'u9', schoolId: '1', schoolName: 'Bright Horizons Academy', fullName: 'Sarah Park', email: 'spark@bright-horizons.edu', role: 'teacher', status: 'active', createdAt: '2024-01-10', lastLogin: '2026-06-14' },
  { id: 'u10', schoolId: '8', schoolName: 'Sunrise Public School', fullName: 'Mrs. Priya Sharma', email: 'psharma@sunrise.edu.in', role: 'school_admin', status: 'active', createdAt: '2024-06-01', lastLogin: '2026-06-11' },
]

const ROLE_STYLES: Record<string, string> = {
  super_admin: 'bg-destructive/10 text-destructive border-destructive/20',
  school_admin: 'bg-primary/10 text-primary border-primary/20',
  teacher: 'bg-secondary/10 text-secondary border-secondary/20',
  staff: 'bg-muted text-muted-foreground border-border',
  student: 'bg-accent/10 text-accent border-accent/20',
}

function UsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const ROLE_FILTERS = ['All', 'school_admin', 'teacher', 'staff', 'student']

  const filtered = USERS.filter(u => {
    const matchSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.schoolName.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'All' || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">{USERS.length} users across all schools</p>
        </div>
        <Button className="rounded-xl h-9 text-xs font-bold gap-2">
          <Plus size={14} /> Invite User
        </Button>
      </div>

      <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-4 p-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email or school…"
                className="pl-9 h-9 rounded-xl text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {ROLE_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setRoleFilter(f)}
                  className={cn(
                    'px-3 h-9 rounded-xl text-xs font-semibold border transition-colors',
                    roleFilter === f
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  {f === 'All' ? 'All' : f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                {['Name', 'Email', 'School', 'Role', 'Status', 'Last Login'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">{u.fullName}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{u.email}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[160px] truncate">{u.schoolName}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', ROLE_STYLES[u.role])}>
                      {u.role.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className={cn('text-[10px] font-bold', u.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-muted text-muted-foreground')}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{u.lastLogin ? formatDate(u.lastLogin) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground text-sm">No users match your search.</div>
          )}
        </div>

        <div className="border-t border-border/40 px-5 py-3 bg-muted/20">
          <span className="text-xs text-muted-foreground">Showing {filtered.length} of {USERS.length} users</span>
        </div>
      </Card>
    </div>
  )
}
