import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Clock, Zap, Star, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/app/features/')({
  head: () => ({ meta: [{ title: "What's New | Schoolyard" }] }),
  component: FeaturesPage,
})

type FeatureStatus = 'available' | 'beta' | 'coming_soon'

interface Feature {
  title: string
  description: string
  status: FeatureStatus
  category: string
  isNew?: boolean
}

const FEATURES: Feature[] = [
  { title: 'AI-Powered Timetable Generator', description: 'Automatically resolve room conflicts and generate optimal weekly schedules with one click.', status: 'beta', category: 'Scheduling', isNew: true },
  { title: 'Bulk Payslip Distribution', description: 'Upload and send payslips to all staff members simultaneously via email.', status: 'available', category: 'Documents' },
  { title: 'Parent Portal Access', description: 'Give parents a dedicated portal to view their child\'s grades, attendance, and schedule.', status: 'coming_soon', category: 'Communication', isNew: true },
  { title: 'Digital Exam Builder', description: 'Create and conduct online exams with automatic grading and result analytics.', status: 'coming_soon', category: 'Exams' },
  { title: 'Staff Leave Management', description: 'Track and approve staff leave requests with automatic substitute assignment.', status: 'available', category: 'HR' },
  { title: 'Attendance Tracking', description: 'Real-time student attendance with automated absence notifications to parents.', status: 'beta', category: 'Monitoring', isNew: true },
  { title: 'Financial Reports', description: 'Generate detailed financial reports including payroll summaries and budget tracking.', status: 'available', category: 'Finance' },
  { title: 'Multi-language Support', description: 'Full platform support for English, French, and Arabic with RTL layouts.', status: 'available', category: 'Accessibility' },
  { title: 'Mobile App (iOS & Android)', description: 'Native mobile app for teachers and students to access their workspace on the go.', status: 'coming_soon', category: 'Mobile', isNew: true },
  { title: 'Grade Book & Transcripts', description: 'Digital grade book with end-of-term transcript generation in PDF format.', status: 'beta', category: 'Academics' },
  { title: 'API & Integrations', description: 'Connect Schoolyard to your existing HR, finance, or ERP systems via REST API.', status: 'coming_soon', category: 'Developer' },
  { title: 'Custom Document Templates', description: 'Create and save custom templates for contracts, letters, and official school documents.', status: 'available', category: 'Documents' },
]

const STATUS_CONFIG = {
  available: { label: 'Available', style: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 },
  beta: { label: 'Beta', style: 'bg-warning/10 text-warning border-warning/20', icon: Zap },
  coming_soon: { label: 'Coming Soon', style: 'bg-muted text-muted-foreground border-border', icon: Clock },
}

const CATEGORIES = ['All', 'Documents', 'Scheduling', 'Exams', 'HR', 'Communication', 'Finance', 'Academics', 'Mobile', 'Developer', 'Monitoring', 'Accessibility']

function FeaturesPage() {
  const available = FEATURES.filter(f => f.status === 'available').length
  const beta = FEATURES.filter(f => f.status === 'beta').length
  const coming = FEATURES.filter(f => f.status === 'coming_soon').length

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-bold uppercase gap-1">
              <Star size={10} /> What's New
            </Badge>
            <Badge className="bg-accent/10 text-accent border-accent/20 text-[10px] font-bold uppercase">Summer 2026</Badge>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Platform Features</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-lg">
            Explore everything Schoolyard has to offer — from document management to AI-powered scheduling. New features drop every sprint.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-xs font-semibold text-muted-foreground"><span className="text-success font-black">{available}</span> available</span>
            <span className="text-xs font-semibold text-muted-foreground"><span className="text-warning font-black">{beta}</span> in beta</span>
            <span className="text-xs font-semibold text-muted-foreground"><span className="text-foreground font-black">{coming}</span> coming soon</span>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map(feature => {
          const config = STATUS_CONFIG[feature.status]
          const Icon = config.icon
          return (
            <Card
              key={feature.title}
              className={cn(
                'border-border/60 bg-card/80 rounded-2xl hover:shadow-md transition-all duration-200 group relative overflow-hidden',
                feature.status === 'available' && 'hover:border-success/30',
                feature.status === 'beta' && 'hover:border-warning/30',
              )}
            >
              {feature.isNew && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase">NEW</Badge>
                </div>
              )}
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-start gap-3">
                  <div className={cn('p-2 rounded-xl border', config.style.replace('text-', 'text-').replace('bg-', 'bg-').replace('border-', 'border-'))}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <CardTitle className="text-sm font-extrabold leading-snug">{feature.title}</CardTitle>
                    <Badge variant="outline" className="text-[10px] font-semibold mt-1 text-muted-foreground border-border">
                      {feature.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-4 space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', config.style)}>
                    {config.label}
                  </Badge>
                  {feature.status === 'available' && (
                    <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px] font-bold gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Open <ArrowUpRight size={10} />
                    </Button>
                  )}
                  {feature.status === 'coming_soon' && (
                    <Button variant="outline" size="sm" className="h-7 rounded-lg text-[10px] font-bold gap-1">
                      Notify me
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
