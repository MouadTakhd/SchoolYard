import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Mail, Lock, User, ArrowRight, ArrowLeft, BookOpen, Sparkles, Globe, ChevronDown } from 'lucide-react'
import { ENV } from '@/config/env'

const COUNTRIES = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
]

const ROLES = {
  en: ["Teacher", "Student", "Administrator", "Staff", "Other"],
  fr: ["Enseignant", "Étudiant", "Administrateur", "Personnel", "Autre"],
  ar: ["معلم", "طالب", "مدير", "موظف", "آخر"]
}

const TRANSLATIONS = {
  en: {
    heroTitle: "Manage your school, beautifully.",
    heroDesc: "A comprehensive, modern dashboard to handle staff, students, documents, and scheduling all in one unified, intelligent workspace.",
    welcomeBack: "Welcome back",
    createAccount: "Create an account",
    signInDesc: "Enter your details to sign in to your workspace.",
    signUpDesc: "Enter your details to register for a new workspace.",
    fullName: "Full Name",
    phone: "Phone Number",
    role: "Role / Title",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPass: "Forgot password?",
    signInBtn: "Sign In Securely",
    signUpBtn: "Create Account",
    noAccount: "Don't have an account? ",
    hasAccount: "Already have an account? ",
    signInLink: "Sign up",
    signUpLink: "Sign in",
    rights: "All rights reserved.",
    nextGen: "Next-Generation School Management"
  },
  fr: {
    heroTitle: "Gérez votre école, magnifiquement.",
    heroDesc: "Un tableau de bord moderne et complet pour gérer le personnel, les étudiants, les documents et les horaires dans un espace de travail unifié.",
    welcomeBack: "Ravi de vous revoir",
    createAccount: "Créer un compte",
    signInDesc: "Entrez vos coordonnées pour vous connecter à votre espace de travail.",
    signUpDesc: "Entrez vos coordonnées pour enregistrer un nouvel espace de travail.",
    fullName: "Nom complet",
    phone: "Numéro de téléphone",
    role: "Rôle / Titre",
    email: "Adresse e-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    forgotPass: "Mot de passe oublié ?",
    signInBtn: "Se connecter en toute sécurité",
    signUpBtn: "Créer un compte",
    noAccount: "Vous n'avez pas de compte ? ",
    hasAccount: "Vous avez déjà un compte ? ",
    signInLink: "S'inscrire",
    signUpLink: "Se connecter",
    rights: "Tous droits réservés.",
    nextGen: "Gestion scolaire nouvelle génération"
  },
  ar: {
    heroTitle: "أدر مدرستك ببراعة.",
    heroDesc: "لوحة تحكم حديثة وشاملة لإدارة الموظفين والطلاب والمستندات والجداول في مساحة عمل واحدة ذكية وموحدة.",
    welcomeBack: "مرحباً بعودتك",
    createAccount: "إنشاء حساب",
    signInDesc: "أدخل بياناتك لتسجيل الدخول إلى مساحة العمل الخاصة بك.",
    signUpDesc: "أدخل بياناتك لتسجيل مساحة عمل جديدة.",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    role: "الدور / المنصب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    forgotPass: "هل نسيت كلمة المرور؟",
    signInBtn: "تسجيل الدخول بأمان",
    signUpBtn: "إنشاء حساب",
    noAccount: "ليس لديك حساب؟ ",
    hasAccount: "لديك حساب بالفعل؟ ",
    signInLink: "إنشاء حساب",
    signUpLink: "تسجيل الدخول",
    rights: "جميع الحقوق محفوظة.",
    nextGen: "إدارة مدرسية من الجيل القادم"
  }
}

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Schoolyard | Login' },
      { name: 'description', content: 'Secure access to the Schoolyard platform.' },
    ],
  }),
  component: InstitutionalPortalIndex,
})

function InstitutionalPortalIndex() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+1')
  const [role, setRole] = useState('')
  const [lang, setLang] = useState<'en' | 'fr' | 'ar'>('en')
  const navigate = useNavigate()

  const t = TRANSLATIONS[lang]
  const rolesList = ROLES[lang]
  const isRtl = lang === 'ar'

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '')
    if (countryCode === '+1') {
      if (input.length > 10) input = input.slice(0, 10)
      let formatted = input
      if (input.length > 6) {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`
      } else if (input.length > 3) {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`
      } else if (input.length > 0) {
        formatted = `(${input}`
      }
      setPhone(formatted)
    } else {
      if (input.length > 15) input = input.slice(0, 15)
      let formatted = input.replace(/(\d{3})(?=\d)/g, '$1 ')
      setPhone(formatted.trim())
    }
  }

  const handleCountryChange = (code: string) => {
    setCountryCode(code)
    setPhone('')
  }

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({ to: '/app' })
  }

  const appName = ENV.APP_NAME

  return (
    <div className="min-h-screen h-screen w-full flex flex-col md:flex-row bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Language Switcher */}
      <div className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} z-50`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 hover:bg-muted border border-border/50 text-xs font-bold transition-colors backdrop-blur-xl shadow-sm">
              <Globe size={14} className="text-primary" />
              <span>{lang.toUpperCase()}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRtl ? "start" : "end"} className="z-[200]">
            <DropdownMenuItem onClick={() => setLang('en')} className="font-medium cursor-pointer">English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('fr')} className="font-medium cursor-pointer">Français</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang('ar')} className="font-medium cursor-pointer">العربية</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Left Panel */}
      <div className="hidden md:flex flex-1 relative bg-zinc-950 dark:bg-black flex-col justify-between p-12 overflow-hidden border-white/10 shadow-[inset_-20px_0_50px_rgba(0,0,0,0.5)]" style={{ borderRightWidth: isRtl ? 0 : '1px', borderLeftWidth: isRtl ? '1px' : 0 }}>
        
        {/* Abstract Backgrounds */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_${isRtl ? 'right' : 'left'},_var(--tw-gradient-stops))] from-primary/30 via-zinc-950 to-zinc-950 opacity-80`} />
        <div className={`absolute top-[-20%] ${isRtl ? 'right-[-20%]' : 'left-[-20%]'} w-[80%] h-[80%] rounded-full bg-primary/20 blur-[120px] animate-pulse duration-[8000ms] mix-blend-screen`} />
        <div className={`absolute bottom-[-10%] ${isRtl ? 'left-[-10%]' : 'right-[-10%]'} w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px] animate-pulse duration-[12000ms] delay-700 mix-blend-screen`} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />

        <div className="z-10 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-[0_0_30px_rgba(var(--primary),0.5)]">
            <BookOpen size={24} className="drop-shadow-md" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-sm">{appName}</span>
        </div>
        
        <div className="z-10 max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-white/80">
            <Sparkles size={12} className="text-accent" />
            <span>{t.nextGen}</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40">
            {t.heroTitle}
          </h1>
          <p className="text-white/60 text-base leading-relaxed font-medium">
            {t.heroDesc}
          </p>
        </div>
        
        <div className="z-10 text-xs font-mono text-white/40 animate-in fade-in duration-1000 delay-300">
          © {new Date().getFullYear()} {appName} {t.rights}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative bg-background/50 backdrop-blur-xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-lg bg-primary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="flex md:hidden items-center justify-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-lg">
              <BookOpen size={20} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-foreground">{appName}</span>
          </div>

          <div className={`space-y-3 ${isRtl ? 'text-right md:text-right' : 'text-center md:text-left'}`}>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              {isSignIn ? t.welcomeBack : t.createAccount}
            </h2>
            <p className="text-sm text-muted-foreground/80 font-medium">
              {isSignIn ? t.signInDesc : t.signUpDesc}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isSignIn ? 'max-h-0 opacity-0' : 'max-h-[300px] opacity-100'}`}>
              {!isSignIn && (
                <div className="space-y-4 pb-1">
                  
                  <div className="relative mt-2">
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder=" "
                      className={`peer h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all rounded-xl shadow-sm ${isRtl ? 'pr-10' : 'pl-10'}`}
                    />
                    <User className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground peer-focus:text-primary transition-colors pointer-events-none`} />
                    <Label 
                      htmlFor="name" 
                      className={`absolute ${isRtl ? 'right-10' : 'left-10'} transition-all duration-200 pointer-events-none
                        -top-2.5 translate-y-0 text-xs px-1 font-bold tracking-wider uppercase text-muted-foreground backdrop-blur-md bg-background/80 rounded
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:bg-transparent
                        peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-primary peer-focus:backdrop-blur-md peer-focus:bg-background/80 rounded`}
                    >
                      {t.fullName}
                    </Label>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="relative">
                      <div className={`relative flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button type="button" className={`absolute ${isRtl ? 'right-0 rounded-r-xl border-l' : 'left-0 rounded-l-xl border-r'} top-0 h-12 w-[85px] bg-transparent border-border/50 text-xs font-semibold text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 hover:bg-muted/30 flex items-center justify-center gap-1 z-10 transition-colors`}>
                              <span className="text-sm">{COUNTRIES.find(c => c.code === countryCode)?.flag || '🌍'}</span>
                              <span className="tracking-tighter" dir="ltr">{countryCode}</span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[220px] max-h-[300px] overflow-y-auto z-[100]" align={isRtl ? 'end' : 'start'}>
                            {COUNTRIES.map((c, i) => (
                              <DropdownMenuItem key={`${c.code}-${i}`} onClick={() => handleCountryChange(c.code)} className="flex items-center gap-2 cursor-pointer py-2" dir="ltr">
                                <span className="text-base">{c.flag}</span>
                                <span className="font-medium">{c.name}</span>
                                <span className="text-muted-foreground ml-auto font-mono text-xs">{c.code}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <Input 
                          id="phone" 
                          type="tel" 
                          dir="ltr"
                          placeholder=" "
                          value={phone}
                          onChange={handlePhoneChange}
                          className={`peer h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all rounded-xl shadow-sm ${isRtl ? 'pr-[92px]' : 'pl-[92px]'}`}
                        />
                        <Label 
                          htmlFor="phone" 
                          className={`absolute ${isRtl ? 'right-[92px]' : 'left-[92px]'} transition-all duration-200 pointer-events-none z-10
                            -top-2.5 translate-y-0 text-xs px-1 font-bold tracking-wider uppercase text-muted-foreground backdrop-blur-md bg-background/80 rounded
                            ${!phone ? 'top-1/2 -translate-y-1/2 text-sm font-medium tracking-normal normal-case bg-transparent' : ''}
                            peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-primary peer-focus:backdrop-blur-md peer-focus:bg-background/80 rounded`}
                        >
                          {t.phone}
                        </Label>
                      </div>
                    </div>

                    <div className="relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button type="button" className={`w-full h-12 bg-background/50 border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 hover:bg-muted/30 rounded-xl flex items-center justify-between px-10 transition-all shadow-sm border ${!role && 'text-transparent'}`}>
                            <span>{role || "."}</span>
                            <ChevronDown size={14} className="opacity-50 text-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] z-[100]" align={isRtl ? 'end' : 'start'}>
                          {rolesList.map(r => (
                            <DropdownMenuItem key={r} onClick={() => setRole(r)} className="cursor-pointer font-medium">{r}</DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <svg className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      <Label 
                        className={`absolute ${isRtl ? 'right-10' : 'left-10'} transition-all duration-200 pointer-events-none z-10
                          ${role ? '-top-2.5 translate-y-0 text-xs px-1 font-bold tracking-wider uppercase text-muted-foreground backdrop-blur-md bg-background/80 rounded' : 'top-1/2 -translate-y-1/2 text-sm font-medium tracking-normal normal-case text-muted-foreground bg-transparent'}`}
                      >
                        {t.role}
                      </Label>
                    </div>
                  </div>

                </div>
              )}
            </div>

            <div className="relative mt-2">
              <Input 
                id="email" 
                type="email" 
                placeholder=" "
                required
                className={`peer h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all rounded-xl shadow-sm ${isRtl ? 'pr-10 text-right' : 'pl-10'}`}
              />
              <Mail className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground peer-focus:text-primary transition-colors pointer-events-none`} />
              <Label 
                htmlFor="email" 
                className={`absolute ${isRtl ? 'right-10' : 'left-10'} transition-all duration-200 pointer-events-none
                  -top-2.5 translate-y-0 text-xs px-1 font-bold tracking-wider uppercase text-muted-foreground backdrop-blur-md bg-background/80 rounded
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-primary peer-focus:backdrop-blur-md peer-focus:bg-background/80 rounded`}
              >
                {t.email}
              </Label>
            </div>

            <div className="relative mt-2">
              <Input 
                id="password" 
                type="password" 
                placeholder=" "
                required
                className={`peer h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all rounded-xl shadow-sm ${isRtl ? 'pr-10 text-right' : 'pl-10'}`}
              />
              <Lock className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground peer-focus:text-primary transition-colors pointer-events-none`} />
              <Label 
                htmlFor="password" 
                className={`absolute ${isRtl ? 'right-10' : 'left-10'} transition-all duration-200 pointer-events-none
                  -top-2.5 translate-y-0 text-xs px-1 font-bold tracking-wider uppercase text-muted-foreground backdrop-blur-md bg-background/80 rounded
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-primary peer-focus:backdrop-blur-md peer-focus:bg-background/80 rounded`}
              >
                {t.password}
              </Label>
              {isSignIn && (
                <a href="#" className={`absolute ${isRtl ? 'left-0' : 'right-0'} -top-5 text-[10px] text-primary hover:underline font-bold uppercase tracking-wider transition-colors`}>
                  {t.forgotPass}
                </a>
              )}
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isSignIn ? 'max-h-0 opacity-0' : 'max-h-[100px] opacity-100'}`}>
              {!isSignIn && (
                <div className="relative mt-2 pb-1">
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder=" "
                    required={!isSignIn}
                    className={`peer h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all rounded-xl shadow-sm ${isRtl ? 'pr-10 text-right' : 'pl-10'}`}
                  />
                  <Lock className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground peer-focus:text-primary transition-colors pointer-events-none`} />
                  <Label 
                    htmlFor="confirmPassword" 
                    className={`absolute ${isRtl ? 'right-10' : 'left-10'} transition-all duration-200 pointer-events-none
                      -top-2.5 translate-y-0 text-xs px-1 font-bold tracking-wider uppercase text-muted-foreground backdrop-blur-md bg-background/80 rounded
                      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:bg-transparent
                      peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-primary peer-focus:backdrop-blur-md peer-focus:bg-background/80 rounded`}
                  >
                    {t.confirmPassword}
                  </Label>
                </div>
              )}
            </div>

            <Button type="submit" className={`w-full h-12 font-bold rounded-xl shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 group flex items-center justify-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span>{isSignIn ? t.signInBtn : t.signUpBtn}</span>
              {isRtl ? (
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </form>

          <div className={`pt-4 text-sm ${isRtl ? 'text-right md:text-right' : 'text-center md:text-left'}`}>
            <span className="text-muted-foreground font-medium">
              {isSignIn ? t.noAccount : t.hasAccount}
            </span>
            <button 
              onClick={() => setIsSignIn(!isSignIn)} 
              className="text-foreground hover:text-primary hover:underline font-bold transition-colors"
            >
              {isSignIn ? t.signInLink : t.signUpLink}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}