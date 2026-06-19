import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Globe, Bell, Shield, CreditCard, Save, Check } from 'lucide-react'

export const Route = createFileRoute('/app/settings/')({
  head: () => ({ meta: [{ title: 'Settings | Schoolyard Admin' }] }),
  component: SettingsPage,
})

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${enabled ? 'bg-primary' : 'bg-muted'}`}
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

function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [notifs, setNotifs] = useState({
    newSchool: true,
    billing: true,
    storageAlert: true,
    weeklyReport: false,
    support: true,
  })
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: true,
    auditLog: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage platform configuration, notifications and security.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="h-9 rounded-xl bg-muted/60">
          <TabsTrigger value="general" className="rounded-lg text-xs font-semibold gap-1.5"><Globe size={13} />General</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg text-xs font-semibold gap-1.5"><Bell size={13} />Notifications</TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg text-xs font-semibold gap-1.5"><Shield size={13} />Security</TabsTrigger>
          <TabsTrigger value="billing" className="rounded-lg text-xs font-semibold gap-1.5"><CreditCard size={13} />Billing</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="mt-5">
          <Card className="border-border/60 bg-card/80 rounded-2xl">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-extrabold">Platform Settings</CardTitle>
              <CardDescription className="text-xs">Basic configuration for the Schoolyard admin platform.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Platform Name</label>
                  <Input defaultValue="Schoolyard" className="rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Support Email</label>
                  <Input defaultValue="support@schoolyard.io" className="rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Default Timezone</label>
                  <Input defaultValue="UTC" className="rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Default Currency</label>
                  <Input defaultValue="USD" className="rounded-xl h-9 text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Storage Limit per School (GB)</label>
                <Input defaultValue="20" type="number" className="rounded-xl h-9 text-sm w-40" />
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
              <CardTitle className="text-base font-extrabold">Email Notifications</CardTitle>
              <CardDescription className="text-xs">Choose which events trigger an email alert to admins.</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <SettingRow label="New school registration" description="Alert when a new school signs up">
                <Toggle enabled={notifs.newSchool} onToggle={() => setNotifs(n => ({ ...n, newSchool: !n.newSchool }))} />
              </SettingRow>
              <SettingRow label="Billing events" description="Payment failures, plan upgrades and cancellations">
                <Toggle enabled={notifs.billing} onToggle={() => setNotifs(n => ({ ...n, billing: !n.billing }))} />
              </SettingRow>
              <SettingRow label="Storage alerts" description="When a school reaches 80% of their storage quota">
                <Toggle enabled={notifs.storageAlert} onToggle={() => setNotifs(n => ({ ...n, storageAlert: !n.storageAlert }))} />
              </SettingRow>
              <SettingRow label="Weekly platform report" description="Summarised activity report every Monday morning">
                <Toggle enabled={notifs.weeklyReport} onToggle={() => setNotifs(n => ({ ...n, weeklyReport: !n.weeklyReport }))} />
              </SettingRow>
              <SettingRow label="Support tickets" description="When a school opens a new support request">
                <Toggle enabled={notifs.support} onToggle={() => setNotifs(n => ({ ...n, support: !n.support }))} />
              </SettingRow>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-5">
          <Card className="border-border/60 bg-card/80 rounded-2xl">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-extrabold">Security</CardTitle>
              <CardDescription className="text-xs">Protect platform access and maintain audit trails.</CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <SettingRow label="Two-Factor Authentication" description="Require 2FA for all super-admin accounts">
                <Toggle enabled={security.twoFactor} onToggle={() => setSecurity(s => ({ ...s, twoFactor: !s.twoFactor }))} />
              </SettingRow>
              <SettingRow label="Auto session timeout" description="Automatically sign out after 30 minutes of inactivity">
                <Toggle enabled={security.sessionTimeout} onToggle={() => setSecurity(s => ({ ...s, sessionTimeout: !s.sessionTimeout }))} />
              </SettingRow>
              <SettingRow label="Audit log" description="Log all admin actions for compliance tracking">
                <Toggle enabled={security.auditLog} onToggle={() => setSecurity(s => ({ ...s, auditLog: !s.auditLog }))} />
              </SettingRow>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="mt-5 space-y-4">
          <Card className="border-border/60 bg-card/80 rounded-2xl">
            <CardHeader className="border-b border-border/40 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-extrabold">Current Plan</CardTitle>
                  <CardDescription className="text-xs mt-0.5">Your Schoolyard platform subscription.</CardDescription>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-bold uppercase">Enterprise</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Schools included', value: 'Unlimited' },
                  { label: 'Storage per school', value: '100 GB' },
                  { label: 'Next billing date', value: 'Jul 1, 2026' },
                ].map(m => (
                  <div key={m.label} className="text-center p-3 rounded-xl bg-muted/40 border border-border/40">
                    <div className="text-lg font-black text-foreground">{m.value}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="rounded-xl h-9 text-xs font-bold">Manage Billing</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
