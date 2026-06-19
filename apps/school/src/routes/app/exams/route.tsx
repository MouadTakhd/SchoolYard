import { createFileRoute, Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/app/exams')({ component: () => <Outlet /> })
