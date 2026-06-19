import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { School, Bell, Trash2, Save, Check, AlertTriangle } from 'lucide-react'

export const Route = createFileRoute('/app/settings/')({
  head: () => ({ meta: [{ title: 'Settings | Schoolyard' }] }),
  component: SchoolSettingsPage,
})

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${enabled ? 'bg-primary' : 'bg-muted'}`}
    >
      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-200 ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  )
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-border/40 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function SchoolSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [notifs, setNotifs] = useState({
    payslipReady: true,
    examReminder: true,
    systemAlerts: true,
    weeklyDigest: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your school profile and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="h-9 rounded-xl bg-muted/60">
          <TabsTrigger value="profile" className="rounded-lg text-xs font-semibold gap-1.5"><School size={13} />School Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg text-xs font-semibold gap-1.5"><Bell size={13} />Notifications</TabsTrigger>
          <TabsTrigger value="danger" className="rounded-lg text-xs font-semibold gap-1.5 text-destructive data-[state=active]:text-destructive"><Trash2 size={13} />Danger Zone</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-5">
          <Card className="border-border/60 bg-card/80 rounded-2xl">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-extrabold">School Profile</CardTitle>
              <CardDescription className="text-xs">Update your school's public information.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">School Name</label>
                  <Input defaultValue="Bright Horizons Academy" className="rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Principal Name</label>
                  <Input defaultValue="Dr. Linda Chen" className="rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Email</label>
                  <Input defaultValue="admin@bright-horizons.edu" type="email" className="rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone</label>
                  <Input defaultValue="+1 212 555 0101" type="tel" className="rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</label>
                  <Input defaultValue="New York" className="rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Address</label>
                  <Input defaultValue="145 Park Ave" className="rounded-xl h-9 text-sm" />
                </div>
              </div>
              <Button onClick={handleSave} className="rounded-xl h-9 text-xs font-bold gap-2">
                {saved ? <><Check size={13} /> Saved</> : <><Save size={13} /> Save Changes</>}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-5">
          <Card className="border-border/60 bg-card/80 rounded-2xl">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-extrabold">Notification Preferences</CardTitle>
              <CardDescription className="text-xs">Control what notifications you receive.</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <SettingRow label="Payslips ready" description="Notify staff when their payslips are available">
                <Toggle enabled={notifs.payslipReady} onToggle={() => setNotifs(n => ({ ...n, payslipReady: !n.payslipReady }))} />
              </SettingRow>
              <SettingRow label="Exam reminders" description="Alert students and teachers 24h before exams">
                <Toggle enabled={notifs.examReminder} onToggle={() => setNotifs(n => ({ ...n, examReminder: !n.examReminder }))} />
              </SettingRow>
              <SettingRow label="System alerts" description="Receive critical platform alerts immediately">
                <Toggle enabled={notifs.systemAlerts} onToggle={() => setNotifs(n => ({ ...n, systemAlerts: !n.systemAlerts }))} />
              </SettingRow>
              <SettingRow label="Weekly digest" description="Summary of school activity every Monday">
                <Toggle enabled={notifs.weeklyDigest} onToggle={() => setNotifs(n => ({ ...n, weeklyDigest: !n.weeklyDigest }))} />
              </SettingRow>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Danger Zone */}
        <TabsContent value="danger" className="mt-5 space-y-4">
          <Card className="border-destructive/30 bg-destructive/5 rounded-2xl">
            <CardHeader className="border-b border-destructive/20 pb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-destructive" />
                <CardTitle className="text-base font-extrabold text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription className="text-xs">These actions are permanent and cannot be undone.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between gap-4 py-4 border-b border-destructive/20">
                <div>
                  <p className="text-sm font-semibold text-foreground">Delete all student records</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Permanently removes all student data from this school.</p>
                </div>
                <Button variant="outline" className="rounded-xl h-9 text-xs font-bold border-destructive/30 text-destructive hover:bg-destructive/10 shrink-0">
                  Delete Records
                </Button>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Delete school account</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Permanently close this school's Schoolyard account and all associated data.</p>
                </div>
                <Button variant="destructive" className="rounded-xl h-9 text-xs font-bold shrink-0">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
