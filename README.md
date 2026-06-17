# Frontend Architecture - Visual Diagrams

## 1️⃣ Main System Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         🌐 Browser Layer                        │
│                    (User Interface & Events)                    │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP Requests
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                  📍 TanStack Router (Routing)                   │
│                                                                 │
│  Responsibilities:                                              │
│  • Parse URL path                                              │
│  • Load matching route component                               │
│  • Manage route state                                          │
│  • Handle navigation                                           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  File-Based Route Structure:                           │    │
│  │  __root.tsx ─→ Global Layout & Providers              │    │
│  │  /app/* ─────→ Application Domain Routes              │    │
│  │  /core/* ────→ Core System Routes                     │    │
│  └───────────────────────────────────────────────────────┘    │
└────────────────┬─────────────────────────────────────────────────┘
                 │
     ┌───────────┴────────────┬──────────────────┐
     ▼                        ▼                  ▼
┌──────────────┐     ┌──────────────┐    ┌──────────────┐
│ App Routes   │     │ Core Routes  │    │ Root Layout  │
│ /app/*       │     │ /core/*      │    │ __root.tsx   │
│              │     │              │    │              │
│ • Dashboard  │     │ • Docs       │    │ Providers:   │
│ • Settings   │     │ • Status     │    │ • Auth       │
│ • Profile    │     │ • Health     │    │ • Theme      │
│ • Data       │     │ • Logs       │    │ • Query      │
└──────┬───────┘     └──────┬───────┘    └──────┬───────┘
       │                    │                   │
       └────────────────────┼───────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   🎨 React Component Layer            │
        │                                       │
        │  Page Components                      │
        │  ├─ DashboardPage                    │
        │  ├─ SettingsPage                     │
        │  └─ ProfilePage                      │
        │                                       │
        │  Layout Components                    │
        │  ├─ AppLayout                        │
        │  └─ CoreLayout                       │
        │                                       │
        │  Feature Components                   │
        │  ├─ UserCard                         │
        │  ├─ DataTable                        │
        │  └─ Modal                            │
        └───────────────┬───────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────────┐
        │   🎯 UI Component System              │
        │   (shadcn/ui + TailwindCSS)           │
        │                                       │
        │  Primitives:                          │
        │  • Button   • Input                   │
        │  • Card     • Dialog                  │
        │  • Table    • Dropdown                │
        │  • Form     • Tabs                    │
        │  • Badge    • Skeleton                │
        └───────────────┬───────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────────┐
        │   🔧 Utilities & Hooks                │
        │                                       │
        │  Custom Hooks:                        │
        │  • useAuth()      • useApi()          │
        │  • useTheme()     • useUser()         │
        │                                       │
        │  Helpers:                             │
        │  • formatDate()   • parseError()      │
        │  • cn()           • api clients       │
        └───────────────────┬────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │   🌍 Backend Integration              │
        │                                       │
        │  REST API Calls                       │
        │  Authentication                       │
        │  WebSocket Connections                │
        │  External Services                    │
        └───────────────────────────────────────┘
```

---

## 2️⃣ Feature Domain Isolation Pattern

```
                         📦 Features Layer
                         
        ┌─────────────────────────────────────────────────────┐
        │                                                     │
        │  ┌──────────────────┐   ┌──────────────────┐      │
        │  │   Dashboard      │   │   Authentication │      │
        │  │   Feature        │   │   Feature        │      │
        │  │                  │   │                  │      │
        │  │ /pages           │   │ /pages           │      │
        │  │ /components      │   │ /components      │      │
        │  │ /hooks           │   │ /hooks           │      │
        │  │ /services        │   │ /services        │      │
        │  │ /types           │   │ /types           │      │
        │  │ index.ts ✅      │   │ index.ts ✅      │      │
        │  │                  │   │                  │      │
        │  │ ISOLATED         │   │ ISOLATED         │      │
        │  │ NO IMPORTS FROM  │   │ NO IMPORTS FROM  │      │
        │  │ OTHER FEATURES   │   │ OTHER FEATURES   │      │
        │  └──────────────────┘   └──────────────────┘      │
        │                                                     │
        │  ┌──────────────────┐   ┌──────────────────┐      │
        │  │   Settings       │   │   Profile        │      │
        │  │   Feature        │   │   Feature        │      │
        │  │                  │   │                  │      │
        │  │ /pages           │   │ /pages           │      │
        │  │ /components      │   │ /components      │      │
        │  │ /hooks           │   │ /hooks           │      │
        │  │ /services        │   │ /services        │      │
        │  │ /types           │   │ /types           │      │
        │  │ index.ts ✅      │   │ index.ts ✅      │      │
        │  │                  │   │                  │      │
        │  │ ISOLATED         │   │ ISOLATED         │      │
        │  │ NO IMPORTS FROM  │   │ NO IMPORTS FROM  │      │
        │  │ OTHER FEATURES   │   │ OTHER FEATURES   │      │
        │  └──────────────────┘   └──────────────────┘      │
        │                                                     │
        └─────────────────────────────────────────────────────┘
                            ▲
                            │
                  Can import from:
                  ✅ Shared components
                  ✅ Shared hooks
                  ✅ Shared utils
                  ✅ Shared types
                  ❌ Other features
```

---

## 3️⃣ Component Hierarchy

```
                    <RootLayout>
                    (from __root.tsx)
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    <Header>        <main>          <Footer>
                        │
            ┌───────────┼───────────┐
            │                       │
            ▼                       ▼
      <AppLayout>            <CoreLayout>
            │                     │
      ┌─────┼─────┐          ┌────┴────┐
      │     │     │          │         │
      ▼     ▼     ▼          ▼         ▼
   <Sidebar> <Content> <Docs>    <Status>
      │         │
      │    ┌────┼────┐
      │    │    │    │
      ▼    ▼    ▼    ▼
    NavItems  Cards Tables Forms
      │      │    │     │
      └──────┴────┴─────┘
             │
             ▼
    <shadcn/ui Components>
    • Button
    • Card
    • Dialog
    • Input
    • Table
```

---

## 4️⃣ Data Flow & State Management

```
User Interaction (Click, Type, Submit)
        │
        ▼
Event Handler (onClick, onChange, onSubmit)
        │
        ▼
Component State Update (useState)
        │
        ├─→ Re-render Component
        │       │
        │       ▼
        │   Custom Hook (useAuth, useApi)
        │       │
        │       ▼
        │   Service Layer
        │   (api.ts, auth.ts)
        │       │
        │       ▼
        │   Backend API Call
        │   (REST, GraphQL)
        │       │
        │       ▼
        │   Response received
        │       │
        │       ▼
        │   Update component state
        │       │
        │       ▼
        │   Re-render with new data
        │
        └─→ Context Updates (if needed)
                │
                ▼
        Notify other components
                │
                ▼
        Update their state
```

---

## 5️⃣ Routing Decision Tree

```
                        User visits URL
                               │
                               ▼
                    TanStack Router parses path
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
            Path = /       Path = /app/*  Path = /core/*
                │              │             │
                ▼              ▼             ▼
          HomePage    AppRoutes matched  CoreRoutes matched
                          │                 │
                    ┌─────┼─────┐      ┌────┼────┐
                    ▼     ▼     ▼      ▼    ▼    ▼
              Dashboard Settings Data   Docs Status Logs
                    │     │     │      │    │     │
                    ▼     ▼     ▼      ▼    ▼     ▼
              Load Page Component
                    │
                    ▼
              Wrap with __root Layout
                    │
                    ▼
              Apply Providers (Auth, Theme, Query)
                    │
                    ▼
              Render to Browser
```

---

## 6️⃣ File Structure Decision Making

```
Where to put code?

New Feature?
    │
    ├─→ YES → Create /features/{name}/
    │         ├─ /pages
    │         ├─ /components
    │         ├─ /hooks
    │         ├─ /services
    │         ├─ /types
    │         └─ index.ts
    │
    └─→ NO → Is it shared across features?
            │
            ├─→ YES → Put in:
            │         ├─ /components (UI)
            │         ├─ /lib (utilities)
            │         ├─ /hooks (custom hooks)
            │         └─ /types (type definitions)
            │
            └─→ NO → Put in closest parent
                     directory to usage
```

---

## 7️⃣ Type Safety Flow

```
        TypeScript Source Files
        (.ts, .tsx)
                │
                ▼
    TypeScript Compiler (tsc)
                │
        ┌───────┴───────┐
        ▼               ▼
    ✅ Type Check    ❌ Type Errors
        │               │
        ▼               ▼
    Continue      Fix errors
        │
        ▼
    Vite Bundler
        │
        ▼
    JavaScript Output
        │
        ▼
    Browser Execution
```

---

## 8️⃣ Authentication Flow

```
        User not authenticated
                │
                ▼
        TanStack Router
                │
                ├─→ Tries to access /app/*
                │       │
                │       ▼
                │   Check useAuth hook
                │       │
                │       ├─→ isAuthenticated = false
                │       │       │
                │       │       ▼
                │       │   Redirect to /login
                │       │
                │       └─→ isAuthenticated = true
                │               │
                │               ▼
                │           Load route component
                │
                └─→ Accesses /login
                        │
                        ▼
                    LoginPage renders
                        │
                        ▼
                    User submits credentials
                        │
                        ▼
                    API call to /auth/login
                        │
                        ├─→ Success
                        │   │
                        │   ▼
                        │   Save token (localStorage/context)
                        │   │
                        │   ▼
                        │   Update auth context
                        │   │
                        │   ▼
                        │   Redirect to /app/dashboard
                        │
                        └─→ Error
                            │
                            ▼
                        Show error message
                            │
                            ▼
                        User retries
```

---

## 9️⃣ Component Props & State Strategy

```
Page Component
    │
    ├─→ URL Params (from TanStack Router)
    ├─→ Query Params (?search=value)
    ├─→ Context (Auth, Theme)
    ├─→ State (useState)
    └─→ Custom Hooks (useApi, useUser)
            │
            ▼
        Passes props to:
            │
        ┌───┴───────────────┐
        ▼                   ▼
    Features          UI Components
    Components        (shadcn/ui)
        │
        ├─→ Own state (useState)
        ├─→ Own hooks
        ├─→ Callbacks to parent
        └─→ Composition children
```

---

## 🔟 Development Workflow

```
Start Development
        │
        ▼
npm run dev
        │
        ├─→ Vite dev server starts
        │   http://localhost:5173
        │
        ├─→ File watcher active
        │
        └─→ HMR (Hot Module Reload)
                │
                ├─ Edit component
                │   │
                │   ▼
                │ File changes detected
                │   │
                │   ▼
                │ Re-compile TypeScript
                │   │
                │   ├─→ Type errors? → Show in browser
                │   │
                │   └─→ No errors? → Update browser
                │       │
                │       ▼
                │   Component state preserved
                │       │
                │       ▼
                │   See changes instantly
                │
                └─ Ready to continue coding


Build for Production
        │
        ▼
npm run build
        │
        ├─→ TypeScript checking
        │   │
        │   └─→ Errors? → Stop build
        │
        ├─→ Bundle minification
        │
        ├─→ Code splitting
        │
        ├─→ Asset optimization
        │
        └─→ Output → /dist
```

---

## Summary: Architecture at a Glance

```
┌──────────────────────────────────────────────────────────┐
│                 ROUTING LAYER                            │
│          TanStack Router (File-Based)                    │
└──────────────────────────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│               COMPONENT LAYER                            │
│  Pages → Layouts → Features → UI Components              │
└──────────────────────────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│          UTILITIES & SERVICES LAYER                      │
│  Hooks → API Clients → Type Definitions → Helpers        │
└──────────────────────────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────┐
│          BACKEND INTEGRATION LAYER                       │
│  REST APIs → Authentication → External Services          │
└──────────────────────────────────────────────────────────┘


✅ Scalable  |  ✅ Modular  |  ✅ Predictable  |  ✅ Maintainable
```

---

Generated for: Frontend Starter - Modular React Architecture# MT-STARTER
# SchoolYard
