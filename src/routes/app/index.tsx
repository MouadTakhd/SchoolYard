import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Calendar,
  FileText,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  FileSpreadsheet
} from 'lucide-react'
import { ENV } from '@/config/env'

export const Route = createFileRoute('/app/')({
  head: () => ({
    meta: [
      { title: 'Administrative Dashboard | EduManage' },
      { name: 'description', content: 'School management dashboard overview for staff rosters, schedules, and document distribution.' },
    ],
  }),
  component: DashboardOverview,
})

function DashboardOverview() {
  // Current structural mock telemetry metrics for real school parameters
  const metrics = [
    {
      title: "Active Employees",
      value: "142",
      description: "128 Teachers, 14 Admin",
      icon: <Users className="h-5 w-5 text-primary" />,
      footer: "+2 onboarding this week",
      trend: "up"
    },
    {
      title: "Today's Schedule",
      value: "48 / 52",
      description: "Active classes currently running",
      icon: <Calendar className="h-5 w-5 text-accent" />,
      footer: "4 remaining empty blocks",
      trend: "neutral"
    },
    {
      title: "Documents Sent",
      value: "312",
      description: "Payslips & contracts distributed",
      icon: <FileText className="h-5 w-5 text-secondary" />,
      footer: "100% delivery rate",
      trend: "up"
    },
    {
      title: "System Alerts",
      value: "1 Conflict",
      description: "Overlapping room assignment",
      icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
      footer: "Requires manual adjustment",
      isAlert: true
    }
  ]

  const recentActivities = [
    { id: 1, type: 'document', message: "Distributed May 2026 Payslips to all Faculty members.", time: "10 minutes ago", status: "success" },
    { id: 2, type: 'timetable', message: "Timetable updated for Class 3-B (Mathematics block shifted).", time: "1 hour ago", status: "info" },
    { id: 3, type: 'employee', message: "New teacher profile created: Prof. Sarah Jenkins (Science Dept).", time: "3 hours ago", status: "success" },
    { id: 4, type: 'timetable', message: "Room conflict warning generated: Lab 2 requested by two groups at 14:00.", time: "4 hours ago", status: "warning" },
  ]

  return (
    <main className="space-y-8 max-w-7xl mx-auto px-2 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* GREETING HEADER SYSTEM */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
        <div className="absolute -inset-x-4 -inset-y-4 bg-gradient-to-r from-primary/10 via-transparent to-transparent blur-2xl -z-10 rounded-[3rem]" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Welcome back, Mouad
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">Operational status of {ENV.APP_NAME} today.</p>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-primary font-mono bg-primary/10 px-4 py-2 border border-primary/20 rounded-2xl shadow-sm backdrop-blur-md">
          <Clock size={16} className="animate-pulse" />
          <span className="font-bold tracking-wide">Term: Autumn '26</span>
        </div>
      </div>

      {/* METRICS ROW */}
      <section aria-label="Quick Analytics Overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric, i) => (
          <div key={i} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <Card className="relative h-full border border-white/10 dark:border-white/5 bg-background/50 backdrop-blur-xl shadow-lg hover:shadow-xl rounded-3xl overflow-hidden transition-all duration-300">
              <CardContent className="p-5 sm:p-6 flex flex-col h-full justify-between gap-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${metric.isAlert ? 'from-destructive/20 to-destructive/5' : 'from-muted/50 to-muted/10'} border border-white/5 shadow-inner`}>
                    {metric.icon}
                  </div>
                  {metric.trend === 'up' && <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px] uppercase font-bold tracking-wider">+12%</Badge>}
                  {metric.isAlert && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span></span>}
                </div>

                <div>
                  <div className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                    {metric.value}
                  </div>
                  <h3 className="text-xs font-bold text-foreground/80 uppercase tracking-widest mt-1 mb-0.5">{metric.title}</h3>
                  <p className="text-[11px] text-muted-foreground font-medium">{metric.description}</p>
                </div>

                <div className="pt-3 border-t border-border/30 flex items-center justify-between text-[11px] mt-auto">
                  <span className={metric.isAlert ? "text-destructive font-semibold" : "text-muted-foreground font-medium"}>
                    {metric.footer}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </section>

      {/* MAIN TWO-COLUMN SPLIT PANEL WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

        {/* LEFT COMPONENT COLUMN: REAL ACTIVITIES & LOGS */}
        <section className="xl:col-span-2 space-y-4" aria-label="System History Logs">
          <Card className="border border-white/10 dark:border-white/5 shadow-xl bg-background/50 backdrop-blur-xl rounded-3xl h-full overflow-hidden">
            <CardHeader className="pb-4 border-b border-white/5 bg-gradient-to-b from-muted/20 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-extrabold tracking-tight">Recent Administrative Events</CardTitle>
                  <CardDescription className="text-xs font-medium mt-1">Realtime validation stream of core modifications within the platform.</CardDescription>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono tracking-widest uppercase bg-primary/10 text-primary border-primary/20 px-3 py-1">Realtime Log</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-5 flex items-start gap-4 text-sm hover:bg-white/5 dark:hover:bg-black/10 transition-colors group">
                    <div className="mt-0.5 p-2 rounded-full bg-background border border-white/10 shadow-sm group-hover:scale-110 transition-transform">
                      {activity.status === "success" && <CheckCircle2 size={16} className="text-success" />}
                      {activity.status === "warning" && <AlertTriangle size={16} className="text-warning" />}
                      {activity.status === "info" && <Clock size={16} className="text-primary" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-foreground font-medium leading-relaxed">{activity.message}</p>
                      <span className="text-xs font-medium text-muted-foreground block">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RIGHT COMPONENT COLUMN: OPERATIONAL SHORTCUT ACTION HUB */}
        <section className="space-y-4" aria-label="Operations Panel">
          <Card className="border border-white/10 dark:border-white/5 shadow-xl bg-background/50 backdrop-blur-xl rounded-3xl h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10" />

            <CardHeader className="pb-4 p-6">
              <CardTitle className="text-lg font-extrabold tracking-tight">Quick Actions</CardTitle>
              <CardDescription className="text-xs font-medium mt-1">Direct action channels bypassing structural page drilling.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">

              <Button disabled variant="outline" className="w-full h-14 justify-between text-sm px-4 border-white/5 bg-white/5 dark:bg-black/20 hover:bg-white/5 rounded-2xl group cursor-not-allowed opacity-60">
                <span className="flex items-center gap-3 font-semibold">
                  <div className="p-1.5 rounded-lg bg-transparent">
                    <Plus size={16} className="text-muted-foreground" />
                  </div>
                  Register Staff Member
                </span>
                <ArrowUpRight size={16} className="text-muted-foreground opacity-40" />
              </Button>

              <Button disabled variant="outline" className="w-full h-14 justify-between text-sm px-4 border-white/5 bg-white/5 dark:bg-black/20 hover:bg-white/5 rounded-2xl group cursor-not-allowed opacity-60">
                <span className="flex items-center gap-3 font-semibold">
                  <div className="p-1.5 rounded-lg bg-transparent">
                    <Calendar size={16} className="text-muted-foreground" />
                  </div>
                  Modify Schedules
                </span>
                <ArrowUpRight size={16} className="text-muted-foreground opacity-40" />
              </Button>

              <Button disabled variant="outline" className="w-full h-14 justify-between text-sm px-4 border-white/5 bg-white/5 dark:bg-black/20 hover:bg-white/5 rounded-2xl group cursor-not-allowed opacity-60">
                <span className="flex items-center gap-3 font-semibold">
                  <div className="p-1.5 rounded-lg bg-transparent">
                    <FileText size={16} className="text-muted-foreground" />
                  </div>
                  Dispatch Payslips
                </span>
                <ArrowUpRight size={16} className="text-muted-foreground opacity-40" />
              </Button>

              <Button disabled variant="outline" className="w-full h-14 justify-between text-sm px-4 border-white/5 bg-white/5 dark:bg-black/20 hover:bg-white/5 rounded-2xl group cursor-not-allowed opacity-60">
                <span className="flex items-center gap-3 font-semibold">
                  <div className="p-1.5 rounded-lg bg-transparent">
                    <FileSpreadsheet size={16} className="text-muted-foreground" />
                  </div>
                  Export Audit Log (.CSV)
                </span>
                <ArrowUpRight size={16} className="text-muted-foreground opacity-40" />
              </Button>

            </CardContent>
          </Card>
        </section>

      </div>
    </main>
  )
}
