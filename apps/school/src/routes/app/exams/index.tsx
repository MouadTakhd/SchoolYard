import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Clock, Users } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import type { Exam } from '@schoolyard/types'

export const Route = createFileRoute('/app/exams/')({
  head: () => ({ meta: [{ title: 'Exams | Schoolyard' }] }),
  component: ExamsPage,
})

const EXAMS: Exam[] = [
  { id: 'x1', schoolId: '1', name: 'Mid-Term Mathematics', subject: 'Mathematics', className: '10-A Science', teacherName: 'Sarah Jenkins', date: '2026-06-25', duration: 120, status: 'scheduled', totalStudents: 28, maxScore: 100 },
  { id: 'x2', schoolId: '1', name: 'Biology Practical', subject: 'Biology', className: '11-A Sciences', teacherName: 'Fatima Al-Rashid', date: '2026-06-27', duration: 90, status: 'scheduled', totalStudents: 31, maxScore: 50 },
  { id: 'x3', schoolId: '1', name: 'French Literature Essay', subject: 'French Literature', className: '10-B Literature', teacherName: 'Marie Dupont', date: '2026-06-20', duration: 180, status: 'in_progress', totalStudents: 24, maxScore: 100 },
  { id: 'x4', schoolId: '1', name: 'Physics End-of-Term', subject: 'Physics', className: '9-A General', teacherName: 'Ahmed Bouali', date: '2026-06-15', duration: 120, status: 'completed', totalStudents: 26, maxScore: 100 },
  { id: 'x5', schoolId: '1', name: 'Art Portfolio Review', subject: 'Art', className: '11-B Arts', teacherName: 'Yuki Tanaka', date: '2026-06-10', duration: 60, status: 'completed', totalStudents: 18, maxScore: 100 },
  { id: 'x6', schoolId: '1', name: 'History Oral Assessment', subject: 'History', className: '10-A Science', teacherName: 'Carlos Mendez', date: '2026-06-30', duration: 30, status: 'scheduled', totalStudents: 28, maxScore: 25 },
  { id: 'x7', schoolId: '1', name: 'PE Fitness Test', subject: 'Physical Education', className: '9-A General', teacherName: 'Lucas Ferreira', date: '2026-06-05', duration: 60, status: 'cancelled', totalStudents: 26, maxScore: 100 },
]

const STATUS_STYLES: Record<string, string> = {
  scheduled: 'bg-primary/10 text-primary border-primary/20',
  in_progress: 'bg-warning/10 text-warning border-warning/20',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-muted text-muted-foreground border-border',
}

const STATUS_FILTERS = ['All', 'scheduled', 'in_progress', 'completed', 'cancelled']

function ExamsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = EXAMS.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.className.toLowerCase().includes(search.toLowerCase()) ||
      e.teacherName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || e.status === statusFilter
    return matchSearch && matchStatus
  })

  const upcoming = EXAMS.filter(e => e.status === 'scheduled').length
  const ongoing = EXAMS.filter(e => e.status === 'in_progress').length
  const completed = EXAMS.filter(e => e.status === 'completed').length

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Exams</h1>
          <p className="text-sm text-muted-foreground mt-1">{EXAMS.length} exams this term</p>
        </div>
        <Button className="rounded-xl h-9 text-xs font-bold gap-2">
          <Plus size={14} /> Schedule Exam
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Upcoming', value: upcoming, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'In Progress', value: ongoing, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Completed', value: completed, color: 'text-success', bg: 'bg-success/10' },
        ].map(s => (
          <Card key={s.label} className="border-border/60 bg-card/80 rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-4 p-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, subject or class…"
                className="pl-9 h-9 rounded-xl text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {STATUS_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={cn(
                    'px-3 h-9 rounded-xl text-xs font-semibold border transition-colors capitalize',
                    statusFilter === f
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
                {['Exam', 'Class', 'Teacher', 'Date', 'Duration', 'Students', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-foreground">{e.name}</div>
                    <div className="text-[11px] text-muted-foreground">{e.subject}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{e.className}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{e.teacherName}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{formatDate(e.date)}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={11} />{e.duration} min
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users size={11} />{e.totalStudents}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', STATUS_STYLES[e.status])}>
                      {e.status.replace('_', ' ')}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground text-sm">No exams match your search.</div>
          )}
        </div>

        <div className="border-t border-border/40 px-5 py-3 bg-muted/20">
          <span className="text-xs text-muted-foreground">Showing {filtered.length} of {EXAMS.length} exams</span>
        </div>
      </Card>
    </div>
  )
}
