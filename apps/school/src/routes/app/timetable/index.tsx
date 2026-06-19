import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Plus, GraduationCap, Users, BookOpen } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import type { Student, ClassSession } from '@schoolyard/types'

export const Route = createFileRoute('/app/timetable/')({
  head: () => ({ meta: [{ title: 'Students & Classes | Schoolyard' }] }),
  component: TimetablePage,
})

const STUDENTS: Student[] = [
  { id: 's1', schoolId: '1', firstName: 'Amir', lastName: 'Benali', email: 'amir@student.edu', classId: 'c1', className: '10-A Science', status: 'active', enrolledAt: '2023-09-01' },
  { id: 's2', schoolId: '1', firstName: 'Sofia', lastName: 'Reyes', email: 'sofia@student.edu', classId: 'c1', className: '10-A Science', status: 'active', enrolledAt: '2023-09-01' },
  { id: 's3', schoolId: '1', firstName: 'Leo', lastName: 'Müller', email: 'leo@student.edu', classId: 'c2', className: '10-B Literature', status: 'active', enrolledAt: '2023-09-01' },
  { id: 's4', schoolId: '1', firstName: 'Nadia', lastName: 'Okonkwo', email: 'nadia@student.edu', classId: 'c2', className: '10-B Literature', status: 'suspended', enrolledAt: '2023-09-01' },
  { id: 's5', schoolId: '1', firstName: 'Kai', lastName: 'Nakamura', email: 'kai@student.edu', classId: 'c3', className: '11-A Sciences', status: 'active', enrolledAt: '2022-09-01' },
  { id: 's6', schoolId: '1', firstName: 'Emma', lastName: 'Rousseau', email: 'emma@student.edu', classId: 'c3', className: '11-A Sciences', status: 'active', enrolledAt: '2022-09-01' },
  { id: 's7', schoolId: '1', firstName: 'Hassan', lastName: 'Al-Farsi', email: 'hassan@student.edu', classId: 'c4', className: '9-A General', status: 'active', enrolledAt: '2024-09-01' },
  { id: 's8', schoolId: '1', firstName: 'Ingrid', lastName: 'Lindqvist', email: 'ingrid@student.edu', classId: 'c4', className: '9-A General', status: 'inactive', enrolledAt: '2024-09-01' },
]

const CLASSES: ClassSession[] = [
  { id: 'c1', schoolId: '1', name: '10-A Science', grade: 'Grade 10', teacherId: 'e1', teacherName: 'Sarah Jenkins', subject: 'Mathematics', studentCount: 28, room: 'Room 201', schedule: 'Mon/Wed/Fri 08:00–09:30' },
  { id: 'c2', schoolId: '1', name: '10-B Literature', grade: 'Grade 10', teacherId: 'e3', teacherName: 'Marie Dupont', subject: 'French Literature', studentCount: 24, room: 'Room 105', schedule: 'Tue/Thu 09:00–10:30' },
  { id: 'c3', schoolId: '1', name: '11-A Sciences', grade: 'Grade 11', teacherId: 'e5', teacherName: 'Fatima Al-Rashid', subject: 'Biology', studentCount: 31, room: 'Lab 3', schedule: 'Mon/Wed 10:00–11:30' },
  { id: 'c4', schoolId: '1', name: '9-A General', grade: 'Grade 9', teacherId: 'e2', teacherName: 'Ahmed Bouali', subject: 'Physics', studentCount: 26, room: 'Room 302', schedule: 'Tue/Thu/Fri 11:00–12:30' },
  { id: 'c5', schoolId: '1', name: '11-B Arts', grade: 'Grade 11', teacherId: 'e7', teacherName: 'Yuki Tanaka', subject: 'Art', studentCount: 18, room: 'Art Studio', schedule: 'Mon/Thu 13:00–15:00' },
]

const STUDENT_STATUS_STYLES: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-border',
  suspended: 'bg-destructive/10 text-destructive border-destructive/20',
}

function TimetablePage() {
  const [search, setSearch] = useState('')

  const filteredStudents = STUDENTS.filter(s => {
    const name = `${s.firstName} ${s.lastName}`
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase()) ||
      (s.email ?? '').toLowerCase().includes(search.toLowerCase())
    )
  })

  const filteredClasses = CLASSES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.teacherName.toLowerCase().includes(search.toLowerCase()) ||
    c.subject.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Students & Classes</h1>
          <p className="text-sm text-muted-foreground mt-1">{STUDENTS.length} students · {CLASSES.length} classes</p>
        </div>
        <Button className="rounded-xl h-9 text-xs font-bold gap-2">
          <Plus size={14} /> Add Student
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: STUDENTS.length, icon: GraduationCap, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Active', value: STUDENTS.filter(s => s.status === 'active').length, icon: Users, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Total Classes', value: CLASSES.length, icon: BookOpen, color: 'text-secondary', bg: 'bg-secondary/10' },
          { label: 'Avg Class Size', value: Math.round(CLASSES.reduce((sum, c) => sum + c.studentCount, 0) / CLASSES.length), icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
        ].map(m => {
          const Icon = m.icon
          return (
            <Card key={m.label} className="border-border/60 bg-card/80 rounded-2xl">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-xl ${m.bg}`}><Icon className={`h-4 w-4 ${m.color}`} /></div>
                <div>
                  <div className="text-xl font-black text-foreground">{m.value}</div>
                  <div className="text-[11px] text-muted-foreground">{m.label}</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="students">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <TabsList className="h-9 rounded-xl bg-muted/60">
            <TabsTrigger value="students" className="rounded-lg text-xs font-semibold">Students</TabsTrigger>
            <TabsTrigger value="classes" className="rounded-lg text-xs font-semibold">Classes</TabsTrigger>
          </TabsList>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search…"
              className="pl-9 h-9 rounded-xl text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Students table */}
        <TabsContent value="students" className="mt-4">
          <Card className="border-border/60 bg-card/80 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/30">
                    {['Student', 'Email', 'Class', 'Status', 'Enrolled'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filteredStudents.map(s => (
                    <tr key={s.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-7 w-7 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary text-[10px] font-bold shrink-0">
                            {s.firstName[0]}{s.lastName[0]}
                          </div>
                          <span className="font-semibold text-foreground">{s.firstName} {s.lastName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{s.email ?? '—'}</td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{s.className}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant="outline" className={cn('text-[10px] font-bold capitalize', STUDENT_STATUS_STYLES[s.status])}>
                          {s.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{formatDate(s.enrolledAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredStudents.length === 0 && (
                <div className="p-12 text-center text-muted-foreground text-sm">No students found.</div>
              )}
            </div>
            <div className="border-t border-border/40 px-5 py-3 bg-muted/20">
              <span className="text-xs text-muted-foreground">Showing {filteredStudents.length} of {STUDENTS.length} students</span>
            </div>
          </Card>
        </TabsContent>

        {/* Classes grid */}
        <TabsContent value="classes" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map(c => (
              <Card key={c.id} className="border-border/60 bg-card/80 rounded-2xl hover:shadow-md transition-shadow">
                <CardHeader className="pb-3 border-b border-border/40">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-extrabold">{c.name}</CardTitle>
                    <Badge variant="outline" className="text-[10px] font-bold bg-accent/10 text-accent border-accent/20">{c.grade}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Subject</span>
                    <span className="font-semibold text-foreground">{c.subject}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Teacher</span>
                    <span className="font-semibold text-foreground">{c.teacherName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Room</span>
                    <span className="font-semibold text-foreground">{c.room}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Schedule</span>
                    <span className="font-semibold text-foreground text-right max-w-[140px]">{c.schedule}</span>
                  </div>
                  <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Users size={12} className="text-muted-foreground" />
                      <span className="text-xs font-bold text-foreground">{c.studentCount} students</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 rounded-lg text-[10px] font-bold">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredClasses.length === 0 && (
              <div className="col-span-3 p-12 text-center text-muted-foreground text-sm">No classes found.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
