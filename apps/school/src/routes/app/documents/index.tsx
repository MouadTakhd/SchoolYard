import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CreditCard, CheckCircle2, Download, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Invoice } from '@schoolyard/types'

export const Route = createFileRoute('/app/documents/')({
  head: () => ({ meta: [{ title: 'Billing | Schoolyard' }] }),
  component: BillingPage,
})

const INVOICES: Invoice[] = [
  { id: 'inv1', amount: 199, currency: 'USD', status: 'paid', plan: 'professional', period: 'Jun 2026', dueDate: '2026-06-01', paidAt: '2026-06-01' },
  { id: 'inv2', amount: 199, currency: 'USD', status: 'paid', plan: 'professional', period: 'May 2026', dueDate: '2026-05-01', paidAt: '2026-05-01' },
  { id: 'inv3', amount: 199, currency: 'USD', status: 'paid', plan: 'professional', period: 'Apr 2026', dueDate: '2026-04-01', paidAt: '2026-04-01' },
  { id: 'inv4', amount: 49, currency: 'USD', status: 'paid', plan: 'starter', period: 'Mar 2026', dueDate: '2026-03-01', paidAt: '2026-03-01' },
  { id: 'inv5', amount: 49, currency: 'USD', status: 'paid', plan: 'starter', period: 'Feb 2026', dueDate: '2026-02-01', paidAt: '2026-02-01' },
]

const STATUS_STYLES: Record<string, string> = {
  paid: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  overdue: 'bg-destructive/10 text-destructive border-destructive/20',
  cancelled: 'bg-muted text-muted-foreground border-border',
}

const PLANS = [
  { name: 'Starter', price: 49, features: ['Up to 50 staff', '5 GB storage', 'Basic payslips', 'Email support'] },
  { name: 'Professional', price: 199, features: ['Up to 200 staff', '20 GB storage', 'Advanced reports', 'Exam management', 'Priority support'], current: true },
  { name: 'Enterprise', price: 499, features: ['Unlimited staff', '100 GB storage', 'Custom integrations', 'Dedicated manager', 'SLA guarantee'] },
]

function BillingPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your subscription plan and view payment history.</p>
      </div>

      {/* Current plan */}
      <Card className="border-primary/30 bg-primary/5 rounded-2xl">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-foreground">Professional Plan</span>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold uppercase">Current</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">$199/month · Next billing: Jul 1, 2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl h-9 text-xs font-bold">Change Plan</Button>
            <Button variant="outline" className="rounded-xl h-9 text-xs font-bold text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan comparison */}
      <div>
        <h2 className="text-base font-extrabold text-foreground mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLANS.map(plan => (
            <Card key={plan.name} className={cn('border-border/60 bg-card/80 rounded-2xl relative overflow-hidden', plan.current && 'border-primary/40 ring-1 ring-primary/20')}>
              {plan.current && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold uppercase">Active</Badge>
                </div>
              )}
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-sm font-extrabold">{plan.name}</CardTitle>
                <div className="text-2xl font-black text-foreground mt-1">${plan.price}<span className="text-sm font-medium text-muted-foreground">/mo</span></div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <ul className="space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 size={12} className="text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.current ? 'outline' : 'default'}
                  className="w-full rounded-xl h-8 text-xs font-bold mt-2"
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : <><Zap size={12} /> Upgrade</>}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Invoice history */}
      <div>
        <h2 className="text-base font-extrabold text-foreground mb-4">Payment History</h2>
        <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-muted/30">
                  {['Period', 'Plan', 'Amount', 'Status', 'Paid On', ''].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {INVOICES.map(inv => (
                  <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-foreground">{inv.period}</td>
                    <td className="px-5 py-3.5 text-xs text-muted-foreground capitalize">{inv.plan}</td>
                    <td className="px-5 py-3.5 font-bold text-foreground">${inv.amount}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', STATUS_STYLES[inv.status])}>
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-muted-foreground">
                      {inv.paidAt ? new Date(inv.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px] font-bold gap-1">
                        <Download size={11} /> PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border/40 px-5 py-3 bg-muted/20">
            <span className="text-xs text-muted-foreground">{INVOICES.length} invoices total</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
