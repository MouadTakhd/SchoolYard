import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { cn, formatDate, formatBytes } from '@/lib/utils'
import type { Document } from '@schoolyard/types'

export const Route = createFileRoute('/app/documents/')({
  head: () => ({ meta: [{ title: 'Documents | Schoolyard Admin' }] }),
  component: DocumentsPage,
})

const DOCUMENTS: Document[] = [
  { id: 'd1', schoolId: '1', schoolName: 'Bright Horizons Academy', uploadedBy: 'Dr. Linda Chen', name: 'May 2026 Payslips — All Faculty', type: 'payslip', sizeKB: 2340, status: 'ready', createdAt: '2026-05-31' },
  { id: 'd2', schoolId: '3', schoolName: 'Al Noor International School', uploadedBy: 'Ms. Sara Al-Mansouri', name: 'Bulk Payslips — May 2026 (89 staff)', type: 'payslip', sizeKB: 8900, status: 'ready', createdAt: '2026-05-30' },
  { id: 'd3', schoolId: '1', schoolName: 'Bright Horizons Academy', uploadedBy: 'Dr. Linda Chen', name: 'Employment Contract — M. Williams', type: 'contract', sizeKB: 485, status: 'ready', createdAt: '2023-09-01' },
  { id: 'd4', schoolId: '2', schoolName: 'Maple Grove School', uploadedBy: 'James Okafor', name: 'Autumn 2026 School Timetable', type: 'timetable', sizeKB: 312, status: 'ready', createdAt: '2026-06-01' },
  { id: 'd5', schoolId: '7', schoolName: 'Sakura International Academy', uploadedBy: 'Dr. Kenji Tanaka', name: 'Q1 2026 Academic Performance Report', type: 'report', sizeKB: 5400, status: 'ready', createdAt: '2026-04-15' },
  { id: 'd6', schoolId: '4', schoolName: 'École du Progrès', uploadedBy: 'M. François Dubois', name: 'Facture Services Numériques — Q2', type: 'invoice', sizeKB: 240, status: 'ready', createdAt: '2026-06-05' },
  { id: 'd7', schoolId: '8', schoolName: 'Sunrise Public School', uploadedBy: 'Mrs. Priya Sharma', name: 'Staff Employment Contracts — Batch 2024', type: 'contract', sizeKB: 3100, status: 'processing', createdAt: '2026-06-12' },
  { id: 'd8', schoolId: '3', schoolName: 'Al Noor International School', uploadedBy: 'Ahmed Hassan', name: 'Grade 10 Exam Schedule — Term 3', type: 'timetable', sizeKB: 185, status: 'ready', createdAt: '2026-06-08' },
  { id: 'd9', schoolId: '1', schoolName: 'Bright Horizons Academy', uploadedBy: 'Dr. Linda Chen', name: 'Q1 2026 Academic Report', type: 'report', sizeKB: 3200, status: 'processing', createdAt: '2026-06-10' },
  { id: 'd10', schoolId: '2', schoolName: 'Maple Grove School', uploadedBy: 'James Okafor', name: 'April 2026 Payslips', type: 'payslip', sizeKB: 1860, status: 'ready', createdAt: '2026-04-30' },
]

const TYPE_STYLES: Record<string, string> = {
  payslip: 'bg-success/10 text-success border-success/20',
  contract: 'bg-primary/10 text-primary border-primary/20',
  timetable: 'bg-secondary/10 text-secondary border-secondary/20',
  report: 'bg-accent/10 text-accent border-accent/20',
  invoice: 'bg-warning/10 text-warning border-warning/20',
  other: 'bg-muted text-muted-foreground border-border',
}

const TYPE_FILTERS = ['All', 'payslip', 'contract', 'timetable', 'report', 'invoice']

function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const filtered = DOCUMENTS.filter(d => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      d.uploadedBy.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'All' || d.type === typeFilter
    return matchSearch && matchType
  })

  const totalSize = DOCUMENTS.reduce((sum, d) => sum + d.sizeKB, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {DOCUMENTS.length} documents · {formatBytes(totalSize)} total
          </p>
        </div>
      </div>

      <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-4 p-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, school or uploader…"
                className="pl-9 h-9 rounded-xl text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {TYPE_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setTypeFilter(f)}
                  className={cn(
                    'px-3 h-9 rounded-xl text-xs font-semibold border transition-colors capitalize',
                    typeFilter === f
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                {['Document', 'School', 'Type', 'Size', 'Uploaded By', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground max-w-[220px] truncate">{d.name}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[140px] truncate">{d.schoolName}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', TYPE_STYLES[d.type])}>
                      {d.type}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground">{formatBytes(d.sizeKB)}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[140px] truncate">{d.uploadedBy}</td>
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

          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground text-sm">No documents match your search.</div>
          )}
        </div>

        <div className="border-t border-border/40 px-5 py-3 bg-muted/20">
          <span className="text-xs text-muted-foreground">Showing {filtered.length} of {DOCUMENTS.length} documents</span>
        </div>
      </Card>
    </div>
  )
}
