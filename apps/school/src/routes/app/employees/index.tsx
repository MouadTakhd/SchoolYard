import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Mail, Phone } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import type { Employee } from '@schoolyard/types'

export const Route = createFileRoute('/app/employees/')({
  head: () => ({ meta: [{ title: 'Teachers & Staff | Schoolyard' }] }),
  component: EmployeesPage,
})

const EMPLOYEES: Employee[] = [
  { id: 'e1', schoolId: '1', firstName: 'Sarah', lastName: 'Jenkins', email: 'sjenkins@school.edu', phone: '+1 555 0101', subject: 'Mathematics', department: 'Sciences', role: 'teacher', status: 'active', joinedAt: '2022-09-01' },
  { id: 'e2', schoolId: '1', firstName: 'Ahmed', lastName: 'Bouali', email: 'abouali@school.edu', phone: '+1 555 0102', subject: 'Physics', department: 'Sciences', role: 'teacher', status: 'active', joinedAt: '2023-01-15' },
  { id: 'e3', schoolId: '1', firstName: 'Marie', lastName: 'Dupont', email: 'mdupont@school.edu', phone: '+1 555 0103', subject: 'French Literature', department: 'Languages', role: 'teacher', status: 'active', joinedAt: '2021-09-01' },
  { id: 'e4', schoolId: '1', firstName: 'Carlos', lastName: 'Mendez', email: 'cmendez@school.edu', phone: '+1 555 0104', subject: 'History', department: 'Humanities', role: 'teacher', status: 'on_leave', joinedAt: '2020-09-01' },
  { id: 'e5', schoolId: '1', firstName: 'Fatima', lastName: 'Al-Rashid', email: 'falrashid@school.edu', phone: '+1 555 0105', subject: 'Biology', department: 'Sciences', role: 'teacher', status: 'active', joinedAt: '2023-09-01' },
  { id: 'e6', schoolId: '1', firstName: 'John', lastName: 'Carter', email: 'jcarter@school.edu', phone: '+1 555 0106', department: 'Administration', role: 'admin', status: 'active', joinedAt: '2019-09-01' },
  { id: 'e7', schoolId: '1', firstName: 'Yuki', lastName: 'Tanaka', email: 'ytanaka@school.edu', phone: '+1 555 0107', subject: 'Art', department: 'Arts', role: 'teacher', status: 'active', joinedAt: '2024-01-10' },
  { id: 'e8', schoolId: '1', firstName: 'Omar', lastName: 'Hassan', email: 'ohassan@school.edu', phone: '+1 555 0108', department: 'Maintenance', role: 'staff', status: 'active', joinedAt: '2022-03-01' },
  { id: 'e9', schoolId: '1', firstName: 'Priya', lastName: 'Sharma', email: 'psharma@school.edu', phone: '+1 555 0109', subject: 'Chemistry', department: 'Sciences', role: 'teacher', status: 'inactive', joinedAt: '2021-02-15' },
  { id: 'e10', schoolId: '1', firstName: 'Lucas', lastName: 'Ferreira', email: 'lferreira@school.edu', phone: '+1 555 0110', subject: 'Physical Education', department: 'Sports', role: 'teacher', status: 'active', joinedAt: '2023-09-01' },
]

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-border',
  on_leave: 'bg-warning/10 text-warning border-warning/20',
}

const ROLE_STYLES: Record<string, string> = {
  teacher: 'bg-primary/10 text-primary border-primary/20',
  admin: 'bg-secondary/10 text-secondary border-secondary/20',
  staff: 'bg-muted text-muted-foreground border-border',
}

const ROLE_FILTERS = ['All', 'teacher', 'admin', 'staff']

function EmployeesPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const filtered = EMPLOYEES.filter(e => {
    const fullName = `${e.firstName} ${e.lastName}`
    const matchSearch =
      fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      (e.subject ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (e.department ?? '').toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'All' || e.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Teachers & Staff</h1>
          <p className="text-sm text-muted-foreground mt-1">{EMPLOYEES.length} members · {EMPLOYEES.filter(e => e.status === 'active').length} active</p>
        </div>
        <Button className="rounded-xl h-9 text-xs font-bold gap-2">
          <Plus size={14} /> Add Member
        </Button>
      </div>

      <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-4 p-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email or subject…"
                className="pl-9 h-9 rounded-xl text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5">
              {ROLE_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setRoleFilter(f)}
                  className={cn(
                    'px-3 h-9 rounded-xl text-xs font-semibold border transition-colors capitalize',
                    roleFilter === f
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  {f === 'All' ? 'All' : f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                {['Name', 'Contact', 'Department', 'Role', 'Status', 'Joined'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                        {e.firstName[0]}{e.lastName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{e.firstName} {e.lastName}</div>
                        {e.subject && <div className="text-[11px] text-muted-foreground">{e.subject}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Mail size={10} />{e.email}</span>
                      {e.phone && <span className="text-xs text-muted-foreground flex items-center gap-1"><Phone size={10} />{e.phone}</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{e.department ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', ROLE_STYLES[e.role])}>
                      {e.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', STATUS_STYLES[e.status])}>
                      {e.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{formatDate(e.joinedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground text-sm">No members match your search.</div>
          )}
        </div>

        <div className="border-t border-border/40 px-5 py-3 bg-muted/20">
          <span className="text-xs text-muted-foreground">Showing {filtered.length} of {EMPLOYEES.length} members</span>
        </div>
      </Card>
    </div>
  )
}
