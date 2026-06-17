import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, Mail, Phone, MapPin, Users, FileText, Calendar } from 'lucide-react'
import { cn, formatDate, formatBytes } from '@/lib/utils'
import type { User, Document } from '@schoolyard/types'

export const Route = createFileRoute('/app/schools/$schoolId')({
  head: () => ({ meta: [{ title: 'School Detail | Schoolyard Admin' }] }),
  component: SchoolDetail,
})

const MOCK_USERS: User[] = [
  { id: 'u1', schoolId: '1', schoolName: 'Bright Horizons Academy', fullName: 'Dr. Linda Chen', email: 'lchen@bright-horizons.edu', role: 'school_admin', status: 'active', createdAt: '2023-08-15', lastLogin: '2026-06-16' },
  { id: 'u2', schoolId: '1', schoolName: 'Bright Horizons Academy', fullName: 'Marcus Williams', email: 'mwilliams@bright-horizons.edu', role: 'teacher', status: 'active', createdAt: '2023-09-01', lastLogin: '2026-06-15' },
  { id: 'u3', schoolId: '1', schoolName: 'Bright Horizons Academy', fullName: 'Sarah Park', email: 'spark@bright-horizons.edu', role: 'teacher', status: 'active', createdAt: '2024-01-10', lastLogin: '2026-06-14' },
  { id: 'u4', schoolId: '1', schoolName: 'Bright Horizons Academy', fullName: 'Tom Reeves', email: 'treeves@bright-horizons.edu', role: 'staff', status: 'inactive', createdAt: '2023-10-05', lastLogin: '2026-03-20' },
]

const MOCK_DOCS: Document[] = [
  { id: 'd1', schoolId: '1', schoolName: 'Bright Horizons Academy', uploadedBy: 'Dr. Linda Chen', name: 'May 2026 Payslips — All Faculty', type: 'payslip', sizeKB: 2340, status: 'ready', createdAt: '2026-05-31' },
  { id: 'd2', schoolId: '1', schoolName: 'Bright Horizons Academy', uploadedBy: 'Dr. Linda Chen', name: 'Employment Contract — M. Williams', type: 'contract', sizeKB: 485, status: 'ready', createdAt: '2023-09-01' },
  { id: 'd3', schoolId: '1', schoolName: 'Bright Horizons Academy', uploadedBy: 'Sarah Park', name: 'Autumn 2026 Class Timetable', type: 'timetable', sizeKB: 128, status: 'ready', createdAt: '2026-06-01' },
  { id: 'd4', schoolId: '1', schoolName: 'Bright Horizons Academy', uploadedBy: 'Dr. Linda Chen', name: 'Q1 2026 Academic Report', type: 'report', sizeKB: 3200, status: 'processing', createdAt: '2026-06-10' },
]

const ROLE_STYLES: Record<string, string> = {
  school_admin: 'bg-primary/10 text-primary border-primary/20',
  teacher: 'bg-secondary/10 text-secondary border-secondary/20',
  staff: 'bg-muted text-muted-foreground border-border',
  student: 'bg-accent/10 text-accent border-accent/20',
}

const DOC_TYPE_STYLES: Record<string, string> = {
  payslip: 'bg-success/10 text-success border-success/20',
  contract: 'bg-primary/10 text-primary border-primary/20',
  timetable: 'bg-secondary/10 text-secondary border-secondary/20',
  report: 'bg-accent/10 text-accent border-accent/20',
  invoice: 'bg-warning/10 text-warning border-warning/20',
  other: 'bg-muted text-muted-foreground border-border',
}

function SchoolDetail() {
  const { schoolId } = Route.useParams()

  const SCHOOL_META = {
    name: 'Bright Horizons Academy',
    city: 'New York',
    country: 'US',
    email: 'admin@bright-horizons.edu',
    phone: '+1 212 555 0101',
    address: '145 Park Ave, New York, NY',
    plan: 'professional' as const,
    status: 'active' as const,
    principalName: 'Dr. Linda Chen',
    createdAt: '2023-08-15',
    staffCount: 42,
    studentCount: 450,
  }

  void schoolId

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <Link to="/app/schools">
          <Button variant="ghost" size="sm" className="h-8 px-2 rounded-lg gap-1.5 text-muted-foreground hover:text-foreground">
            <ChevronLeft size={14} /> Schools
          </Button>
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-sm font-semibold text-foreground">{SCHOOL_META.name}</span>
      </div>

      {/* School header */}
      <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.46_0.19_248_/_0.06),transparent_40%)] pointer-events-none rounded-2xl" />
        <CardContent className="p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-extrabold tracking-tight text-foreground">{SCHOOL_META.name}</h1>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px] font-bold capitalize">{SCHOOL_META.status}</Badge>
                <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20 text-[10px] font-bold capitalize">{SCHOOL_META.plan}</Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin size={12} />{SCHOOL_META.address}</span>
                <span className="flex items-center gap-1.5"><Mail size={12} />{SCHOOL_META.email}</span>
                <span className="flex items-center gap-1.5"><Phone size={12} />{SCHOOL_META.phone}</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} />Joined {formatDate(SCHOOL_META.createdAt)}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" className="h-8 rounded-xl text-xs font-semibold">Edit</Button>
              <Button variant="outline" size="sm" className="h-8 rounded-xl text-xs font-semibold text-destructive hover:bg-destructive/10 border-destructive/20">Suspend</Button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Staff', value: SCHOOL_META.staffCount, icon: Users },
              { label: 'Students', value: SCHOOL_META.studentCount, icon: Users },
              { label: 'Documents', value: MOCK_DOCS.length, icon: FileText },
              { label: 'Principal', value: SCHOOL_META.principalName, icon: Users },
            ].map(stat => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-muted/40 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    <Icon size={10} /> {stat.label}
                  </div>
                  <div className="text-sm font-bold text-foreground">{stat.value}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="users">
        <TabsList className="bg-muted/60 rounded-xl p-1 h-auto gap-1">
          <TabsTrigger value="users" className="rounded-lg text-xs font-semibold px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Users ({MOCK_USERS.length})
          </TabsTrigger>
          <TabsTrigger value="documents" className="rounded-lg text-xs font-semibold px-4 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
            Documents ({MOCK_DOCS.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/30">
                    {['Name', 'Email', 'Role', 'Status', 'Last Login'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground first:pl-5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {MOCK_USERS.map(u => (
                    <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-foreground">{u.fullName}</td>
                      <td className="px-5 py-3.5 text-muted-foreground text-xs">{u.email}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', ROLE_STYLES[u.role])}>
                          {u.role.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', u.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-muted text-muted-foreground')}>
                          {u.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{u.lastLogin ? formatDate(u.lastLogin) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/30">
                    {['Document Name', 'Type', 'Size', 'Uploaded By', 'Date', 'Status'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {MOCK_DOCS.map(d => (
                    <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-foreground max-w-xs truncate">{d.name}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', DOC_TYPE_STYLES[d.type])}>
                          {d.type}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{formatBytes(d.sizeKB)}</td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{d.uploadedBy}</td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{formatDate(d.createdAt)}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', d.status === 'ready' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20')}>
                          {d.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
