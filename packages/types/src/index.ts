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
