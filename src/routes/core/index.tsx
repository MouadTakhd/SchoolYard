import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/core/')({
  head: () => ({
    meta: [
      {
        title:
          'Application Architecture | Mouad Engineering Workspace',
      },
      {
        name: 'description',
        content:
          'Explore the architecture of a scalable full-stack application built with React, TanStack Router, TypeScript, TailwindCSS, and modular backend integration patterns.',
      },
      {
        name: 'keywords',
        content:
          'React Architecture, TanStack Router, Full Stack Architecture, TypeScript, TailwindCSS, Frontend Engineering, Backend Integration, System Design',
      },

      {
        property: 'og:title',
        content:
          'Application Architecture Overview',
      },
      {
        property: 'og:description',
        content:
          'Scalable frontend architecture with modular routing, reusable UI systems, and backend-ready integration patterns.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
    ],

    links: [
      {
        rel: 'canonical',
        href: 'https://your-domain.com/app',
      },
    ],
  }),

  component: RouteComponent,
})

const BADGE_STYLES = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  accent: 'bg-accent/10 text-accent border-accent/20',
  success: 'bg-success/10 text-success border-success/20',
}

function RouteComponent() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">

      {/* HERO */}
      <section
        aria-label="Architecture overview"
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-border/60
          bg-card/70
          backdrop-blur-xl
        "
      >

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_35%),radial-gradient(circle_at_bottom_right,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_35%)]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:36px_36px]" />

        <Card className="relative border-0 bg-transparent shadow-none">
          <CardContent className="p-6 sm:p-8 lg:p-10">

            <div className="space-y-6">

              <div className="space-y-4">

                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Architecture System
                </div>

                <h1
                  className="
                    max-w-4xl
                    text-4xl
                    font-black
                    leading-tight
                    tracking-tight
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Application
                    <br />
                    Architecture
                  </span>
                </h1>

                <p
                  className="
                    max-w-3xl
                    text-sm
                    leading-7
                    text-muted-foreground
                    sm:text-base
                  "
                >
                  Modular full-stack architecture designed for
                  scalability, maintainability, reusable systems,
                  and production-grade frontend engineering.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <Badge className={`${BADGE_STYLES.primary} border`}>
                  React + Vite
                </Badge>

                <Badge className={`${BADGE_STYLES.secondary} border`}>
                  TanStack Router
                </Badge>

                <Badge className={`${BADGE_STYLES.accent} border`}>
                  shadcn/ui
                </Badge>

                <Badge className={`${BADGE_STYLES.success} border`}>
                  TypeScript
                </Badge>

              </div>

            </div>

          </CardContent>
        </Card>
      </section>

      <Separator className="opacity-40" />

      {/* ARCHITECTURE GRID */}
      <section
        aria-label="Architecture layers"
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        <SectionCard
          title="Frontend Layer"
          accent="primary"
          items={[
            'React + TypeScript',
            'Vite optimized build',
            'TanStack Router',
            'TailwindCSS system',
            'shadcn UI primitives',
          ]}
        />

        <SectionCard
          title="Application Logic"
          accent="secondary"
          items={[
            'Modular route system',
            'Service abstraction',
            'Reusable hooks',
            'State isolation',
            'Feature-driven structure',
          ]}
        />

        <SectionCard
          title="Backend Integration"
          accent="accent"
          items={[
            'REST API communication',
            'Authentication-ready structure',
            'Environment configuration',
            'Token management layer',
            'Scalable backend contracts',
          ]}
        />

      </section>

      {/* FLOW */}
      <section aria-label="Request flow architecture">

        <Card
          className="
            overflow-hidden
            rounded-3xl
            border-border/60
            bg-card/70
            backdrop-blur-xl
          "
        >

          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold">
              Request Flow
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {[
                'User interaction triggers UI event',
                'Components call service abstraction layer',
                'Backend API processes business logic',
                'Responses are normalized and validated',
                'UI updates reactively through state changes',
              ].map((step, index) => (
                <div
                  key={step}
                  className="
                    group
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-border/50
                    bg-background/40
                    p-4
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-primary/20
                    hover:bg-muted/40
                  "
                >

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-primary
                      via-secondary
                      to-accent
                      text-sm
                      font-bold
                      text-primary-foreground
                    "
                  >
                    {index + 1}
                  </div>

                  <p
                    className="
                      text-sm
                      leading-6
                      text-muted-foreground
                      transition-colors
                      group-hover:text-foreground
                    "
                  >
                    {step}
                  </p>

                </div>
              ))}

            </div>

          </CardContent>

        </Card>

      </section>

      {/* CTA */}
      <section
        aria-label="Explore architecture modules"
        className="
          flex
          flex-col
          items-start
          justify-between
          gap-4
          rounded-3xl
          border
          border-border/60
          bg-card/70
          p-6
          backdrop-blur-xl
          sm:flex-row
          sm:items-center
        "
      >

        <div className="space-y-1">

          <h2 className="text-xl font-bold">
            Explore System Modules
          </h2>

          <p className="text-sm text-muted-foreground">
            Dive deeper into routing, state management,
            UI systems and application architecture.
          </p>

        </div>

        <Link
          to="/core/system-design"
          className="w-full sm:w-auto"
          aria-label="Explore system design modules"
        >

          <Button
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-primary
              via-secondary
              to-accent
              text-primary-foreground
              shadow-lg
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-primary/20
              sm:w-auto
            "
          >
            Explore Modules
          </Button>

        </Link>

      </section>

    </main>
  )
}

/* ---------------------------------------
   SECTION CARD
---------------------------------------- */

function SectionCard({
  title,
  items,
  accent,
}: {
  title: string
  items: string[]
  accent: 'primary' | 'secondary' | 'accent'
}) {

  const accentMap = {
    primary: {
      title: 'text-primary',
      glow: 'from-primary/10 to-transparent',
      border: 'hover:border-primary/20',
      dot: 'bg-primary',
    },
    secondary: {
      title: 'text-secondary',
      glow: 'from-secondary/10 to-transparent',
      border: 'hover:border-secondary/20',
      dot: 'bg-secondary',
    },
    accent: {
      title: 'text-accent',
      glow: 'from-accent/10 to-transparent',
      border: 'hover:border-accent/20',
      dot: 'bg-accent',
    },
  }

  return (
    <article>

      <Card
        className={`
          group
          relative
          h-full
          overflow-hidden
          rounded-3xl
          border-border/60
          bg-card/70
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-1.5
          hover:shadow-2xl
          ${accentMap[accent].border}
        `}
      >

        {/* Glow */}
        <div
          className={`
            absolute
            inset-0
            bg-gradient-to-br
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
            ${accentMap[accent].glow}
          `}
        />

        <CardHeader className="relative">

          <CardTitle
            className={`
              text-xl
              font-bold
              ${accentMap[accent].title}
            `}
          >
            {title}
          </CardTitle>

        </CardHeader>

        <CardContent className="relative">

          <div className="space-y-3">

            {items.map((item, i) => (
              <div
                key={i}
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-border/40
                  bg-background/30
                  px-3
                  py-3
                  text-sm
                  text-muted-foreground
                  transition-all
                  duration-300
                  hover:bg-muted/40
                  hover:text-foreground
                "
              >

                <span
                  className={`
                    mt-1
                    h-2
                    w-2
                    rounded-full
                    ${accentMap[accent].dot}
                  `}
                />

                <span>{item}</span>

              </div>
            ))}

          </div>

        </CardContent>

      </Card>

    </article>
  )
}
