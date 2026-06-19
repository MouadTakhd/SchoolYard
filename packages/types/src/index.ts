export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise'
export type SchoolStatus = 'active' | 'inactive' | 'suspended' | 'trial'
export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'staff'
export type UserStatus = 'active' | 'inactive' | 'pending'
export type DocumentType = 'payslip' | 'contract' | 'timetable' | 'report' | 'invoice' | 'other'
export type DocumentStatus = 'processing' | 'ready' | 'error'

export interface School {
  id: string
  name: string
  slug: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  principalName: string
  plan: SubscriptionPlan
  status: SchoolStatus
  studentCount: number
  staffCount: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  schoolId: string
  schoolName: string
  fullName: string
  email: string
  phone?: string
  role: UserRole
  status: UserStatus
  createdAt: string
  lastLogin?: string
}

export interface Document {
  id: string
  schoolId: string
  schoolName: string
  uploadedBy: string
  name: string
  type: DocumentType
  sizeKB: number
  status: DocumentStatus
  createdAt: string
}

export interface AdminStats {
  totalSchools: number
  activeSchools: number
  totalUsers: number
  totalDocuments: number
  storageUsedGB: number
  trialSchools: number
}

export type EmployeeRole = 'teacher' | 'admin' | 'staff'
export type EmployeeStatus = 'active' | 'inactive' | 'on_leave'
export type StudentStatus = 'active' | 'inactive' | 'suspended'
export type ExamStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled'

export interface Employee {
  id: string
  schoolId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject?: string
  department?: string
  role: EmployeeRole
  status: EmployeeStatus
  joinedAt: string
}

export interface Student {
  id: string
  schoolId: string
  firstName: string
  lastName: string
  email?: string
  classId: string
  className: string
  status: StudentStatus
  enrolledAt: string
}

export interface ClassSession {
  id: string
  schoolId: string
  name: string
  grade: string
  teacherId: string
  teacherName: string
  subject: string
  studentCount: number
  room: string
  schedule: string
}

export interface Exam {
  id: string
  schoolId: string
  name: string
  subject: string
  className: string
  teacherName: string
  date: string
  duration: number
  status: ExamStatus
  totalStudents: number
  maxScore: number
}

export interface Invoice {
  id: string
  amount: number
  currency: string
  status: InvoiceStatus
  plan: SubscriptionPlan
  period: string
  dueDate: string
  paidAt?: string
}

export interface SchoolStats {
  totalStudents: number
  totalStaff: number
  totalClasses: number
  totalDocuments: number
  upcomingExams: number
  activeAlerts: number
}
