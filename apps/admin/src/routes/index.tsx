import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react'
import { ENV } from '@/config/env'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Sign In | Schoolyard Admin' }] }),
  component: AdminLogin,
})

function AdminLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => navigate({ to: '/app' }), 400)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.46_0.19_248_/_0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,oklch(0.62_0.15_175_/_0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{ENV.APP_NAME}</h1>
            <p className="text-sm text-muted-foreground mt-1">Restricted access — authorized personnel only</p>
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-2xl p-8 shadow-xl shadow-black/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="admin@schoolyard.io" required className="pl-10 h-11 rounded-xl" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                <a href="#" className="text-[11px] text-primary hover:underline font-semibold">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" required className="pl-10 h-11 rounded-xl" />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl font-bold flex items-center gap-2 group" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Schoolyard — All rights reserved.
        </p>
      </div>
    </div>
  )
}
