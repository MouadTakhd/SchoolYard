import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, Users, FileText, HardDrive, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import type { AdminStats } from '@schoolyard/types'

export const Route = createFileRoute('/app/')({
  head: () => ({ meta: [{ title: 'Overview | Schoolyard Admin' }] }),
  component: Dashboard,
})

const STATS: AdminStats = {
  totalSchools: 24,
  activeSchools: 19,
  totalUsers: 3847,
  totalDocuments: 12340,
  storageUsedGB: 48.6,
  trialSchools: 3,
}

const ACTIVITY = [
  { id: 1, msg: 'New school registered: Al Nour International Academy (Dubai)', time: '12 min ago', type: 'school', status: 'success' },
  { id: 2, msg: 'Bulk payslips uploaded by Maple Grove School — 142 documents', time: '1 hr ago', type: 'document', status: 'success' },
  { id: 3, msg: 'School account suspended: Westfield Secondary (billing overdue)', time: '3 hr ago', type: 'school', status: 'warning' },
  { id: 4, msg: '38 new teacher accounts created across 4 schools', time: '5 hr ago', type: 'user', status: 'success' },
  { id: 5, msg: 'Storage alert: Green Valley Elementary at 92% quota', time: '8 hr ago', type: 'system', status: 'warning' },
]

const PLAN_DIST = [
  { plan: 'Enterprise', count: 4, color: 'bg-primary' },
  { plan: 'Professional', count: 9, color: 'bg-secondary' },
  { plan: 'Starter', count: 8, color: 'bg-accent' },
  { plan: 'Free / Trial', count: 3, color: 'bg-muted-foreground/40' },
]

export default function Dashboard() {
  const metrics = [
    { label: 'Total Schools', value: STATS.totalSchools, sub: `${STATS.activeSchools} active`, icon: Building2, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Users', value: STATS.totalUsers.toLocaleString(), sub: 'across all schools', icon: Users, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Documents', value: STATS.totalDocuments.toLocaleString(), sub: 'payslips, contracts & more', icon: FileText, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Storage Used', value: `${STATS.storageUsedGB} GB`, sub: 'of 500 GB allocated', icon: HardDrive, color: 'text-warning', bg: 'bg-warning/10' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Platform Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time status of all schools, users, and documents.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <Card key={m.label} className="border-border/60 bg-card/80 rounded-2xl hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${m.bg}`}>
                    <Icon className={`h-5 w-5 ${m.color}`} />
                  </div>
                  <TrendingUp className="h-4 w-4 text-success opacity-60" />
                </div>
                <div>
                  <div className="text-3xl font-black tracking-tight text-foreground">{m.value}</div>
                  <div className="text-xs font-bold text-foreground/70 uppercase tracking-widest mt-0.5">{m.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{m.sub}</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity feed */}
        <Card className="xl:col-span-2 border-border/60 bg-card/80 rounded-2xl">
          <CardHeader className="border-b border-border/40 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-extrabold">Recent Activity</CardTitle>
                <CardDescription className="text-xs mt-0.5">Latest events across all school accounts.</CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border-primary/20">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {ACTIVITY.map((a) => (
                <div key={a.id} className="p-4 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                  <div className="mt-0.5 shrink-0">
                    {a.status === 'success' && <CheckCircle2 className="h-4 w-4 text-success" />}
                    {a.status === 'warning' && <AlertCircle className="h-4 w-4 text-warning" />}
                    {a.status === 'info' && <Clock className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{a.msg}</p>
                    <span className="text-[11px] text-muted-foreground">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan distribution */}
        <Card className="border-border/60 bg-card/80 rounded-2xl">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-base font-extrabold">Schools by Plan</CardTitle>
            <CardDescription className="text-xs mt-0.5">Subscription tier distribution.</CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            {PLAN_DIST.map((p) => (
              <div key={p.plan} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{p.plan}</span>
                  <span className="font-bold text-muted-foreground">{p.count} schools</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${p.color} transition-all duration-700`}
                    style={{ width: `${(p.count / STATS.totalSchools) * 100}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-3 border-t border-border/40">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Trial / expiring soon</span>
                <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20">{STATS.trialSchools} schools</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
