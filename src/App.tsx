import React, { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Code, 
  BarChart2, 
  Brain, 
  Github, 
  Cloud, 
  Bot, 
  MessageSquare, 
  Image as ImageIcon, 
  Calendar, 
  ExternalLink, 
  Globe2,
  FileText,
  Sparkles,
  Megaphone,
  Table2,
  Sun,
  Moon,
  Phone, 
  Mail, 
  Menu, 
  X
} from 'lucide-react';
import sunshinePreview from './assets/sunshine-preview.png';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Press+Start+2P&display=swap');

  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 10%;
    --muted: 220 9% 46%;
    --secondary: 220 14% 96%;
    --border: 220 13% 91%;
    --accent: 187 85% 43%;
  }

  :root[data-theme='dark'] {
    --background: 222 24% 7%;
    --foreground: 210 20% 96%;
    --muted: 215 14% 68%;
    --secondary: 220 17% 13%;
    --border: 216 14% 22%;
    --accent: 187 88% 50%;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 200ms ease, color 200ms ease;
  }

  .font-display {
    font-family: 'Press Start 2P', cursive;
  }

  .bg-background { background-color: hsl(var(--background)); }
  .bg-secondary { background-color: hsl(var(--secondary)); }
  .text-foreground { color: hsl(var(--foreground)); }
  .text-muted-foreground { color: hsl(var(--muted)); }
  .border-border { border-color: hsl(var(--border)); }
  .ring-border { --tw-ring-color: hsl(var(--border)); }
  
  .bg-background\\/80 { background-color: hsla(var(--background), 0.8); }
  .bg-accent\\/20 { background-color: hsla(var(--accent), 0.2); }
  .text-accent { color: hsl(var(--accent)); }
  .border-b-border { border-bottom-color: hsl(var(--border)); }

  .bg-background,
  .bg-secondary,
  .text-foreground,
  .text-muted-foreground,
  .border-border,
  .border-b-border,
  .ring-border {
    transition-property: background-color, border-color, color, box-shadow;
    transition-duration: 450ms;
    transition-timing-function: ease;
  }

  .hero-gif-frame {
    box-shadow:
      0 0 28px rgba(249, 115, 22, 0.24),
      0 18px 55px rgba(15, 23, 42, 0.18);
  }

  .hero-gif-frame::before {
    content: '';
    position: absolute;
    inset: -58%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      transparent 230deg,
      rgba(249, 115, 22, 0.96) 270deg,
      rgba(255, 215, 105, 0.98) 292deg,
      transparent 330deg,
      transparent 360deg
    );
    animation: hero-border-glow 4.2s linear infinite;
    filter: blur(0.5px);
    z-index: 0;
  }

  .hero-gif-frame::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: inherit;
    box-shadow: inset 0 0 16px rgba(251, 146, 60, 0.24);
    pointer-events: none;
    z-index: 2;
  }

  @keyframes hero-border-glow {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Typewriter = ({ words, interval = 3000 }: { words: string[], interval?: number }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const typingSpeed = isDeleting ? 40 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), interval);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, text === currentWord && !isDeleting ? interval : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words, interval]);

  return (
    <div className="font-display text-xs sm:text-sm text-muted-foreground tracking-tight h-6 flex items-center">
      <span>{'> '}</span>
      <span className="ml-2 text-foreground">{text}</span>
      <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-foreground"></span>
    </div>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 mx-auto w-full text-center">
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">{children}</h2>
    {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
  </div>
);

const Section = ({ id, children, className = "" }: { id: string, children: React.ReactNode, className?: string }) => (
  <section id={id} className={`py-20 sm:py-32 ${className}`}>
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 sm:px-8"
    >
      {children}
    </motion.div>
  </section>
);

const Card = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bg-background border border-border rounded-xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-semibold text-foreground tracking-wide uppercase">
    {children}
  </span>
);

const HighlightText = ({ children }: { children: React.ReactNode }) => (
  <motion.strong
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 1.1 }}
    transition={{ type: 'spring', stiffness: 420, damping: 18 }}
    className="inline-block origin-bottom cursor-default font-semibold text-foreground hover:text-accent"
  >
    {children}
  </motion.strong>
);

type SkillItem = {
  name: string;
  desc: string;
  icon?: LucideIcon;
};

type SkillCategory = {
  title: string;
  items: SkillItem[];
};

type Theme = 'light' | 'dark';
type ThemeTransition = {
  id: number;
  from: Theme;
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem('theme');

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const ThemeToggle = ({ theme, onToggleTheme }: { theme: Theme, onToggleTheme: () => void }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      className="relative inline-flex h-10 w-[72px] items-center rounded-full border border-border bg-background p-1 shadow-sm hover:bg-secondary transition-colors"
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo noturno'}
      title={isDark ? 'Modo claro' : 'Modo noturno'}
    >
      <Sun className="absolute left-3 text-muted-foreground" size={15} />
      <Moon className="absolute right-3 text-muted-foreground" size={15} />
      <motion.span
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
        className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--foreground))] text-[hsl(var(--background))] shadow-md"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: isDark ? -90 : 90, scale: 0.65 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: isDark ? 90 : -90, scale: 0.65 }}
            transition={{ duration: 0.22 }}
            className="inline-flex"
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
};

const themeFadeBackgrounds: Record<Theme, string> = {
  light: 'hsl(0 0% 100%)',
  dark: 'hsl(222 24% 7%)'
};

const ThemeFade = ({ transition }: { transition: ThemeTransition | null }) => (
  <AnimatePresence>
    {transition && (
      <motion.div
        key={transition.id}
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="pointer-events-none fixed inset-0 z-[80]"
        style={{ backgroundColor: themeFadeBackgrounds[transition.from] }}
      />
    )}
  </AnimatePresence>
);

const Header = ({ theme, onToggleTheme }: { theme: Theme, onToggleTheme: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Contato', href: '#contato' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-b-border shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        <a href="#home" className="select-none">
          <img src="https://i.ibb.co/B2W5Vbcj/nycortex.png" alt="NYcortex Logo" className="h-24 w-24 sm:h-32 sm:w-32 object-contain hover:opacity-80 transition-opacity" />
        </a>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {item.name}
              </a>
            ))}
          </nav>

          <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

          <button className="text-foreground p-2 -mr-2" onClick={() => setMobileMenuOpen(true)} aria-label="Abrir menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-background z-50 flex flex-col md:hidden overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-border">
              <img src="https://i.ibb.co/B2W5Vbcj/nycortex.png" alt="NYcortex Logo" className="h-24 w-24 object-contain" />
              <div className="flex items-center gap-2">
                <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

                <button onClick={() => setMobileMenuOpen(false)} className="text-foreground p-2 -mr-2" aria-label="Fechar menu">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="flex flex-col p-6 sm:p-8 gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-semibold text-foreground border-b border-border pb-4"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 sm:pt-48 sm:pb-32 min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-6 order-2 lg:order-1"
        >
          <Badge>DEV</Badge>
          
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              NYCOLLAS CINTRA
            </h1>
            <Typewriter 
              words={["nycortex", "vibe coder", "analista de dados", "especialista em IA"]} 
              interval={3000} 
            />
          </div>
          
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            Estudante apaixonado por tecnologia, desenvolvimento e inovação digital.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projetos" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[hsl(var(--foreground))] text-[hsl(var(--background))] font-medium hover:opacity-90 transition-opacity">
              Ver Projetos
            </a>
            <a href="#contato" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors">
              Contato
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-75 -z-10"></div>
          
          <div className="hero-gif-frame relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl overflow-hidden p-1">
            <div className="relative z-10 h-full w-full overflow-hidden rounded-[0.875rem] bg-background ring-1 ring-border">
              <img 
                src="https://i.ibb.co/jPTYLN5J/giff.webp" 
                alt="Nycollas Cintra - Perfil Animado" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

const About = () => {
  return (
    <Section id="sobre" className="bg-secondary/30">
      <SectionHeading subtitle="Quem está por trás do código.">Sobre Mim</SectionHeading>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
        <div className="relative w-full aspect-[4/5] max-w-sm mx-auto lg:mx-0">
          <img 
            src="https://i.ibb.co/HLfkd71g/perfil.png" 
            alt="Nycollas Cintra - Foto de Perfil" 
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>
        
        <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
          <p>
            Sou Nycollas — <HighlightText>desenvolvedor web</HighlightText>, <HighlightText>analista de dados</HighlightText> e alguém que não consegue olhar para um sistema sem querer entender como ele funciona por dentro.
          </p>
          <p>
            Aos 13 anos, peguei o notebook da minha mãe e comecei a estudar <HighlightText>JavaScript</HighlightText> sem saber exatamente onde aquilo me levaria. O que me fisgou não foi só a linguagem ou as linhas de código, mas a sensação de <HighlightText>poder criar algo meu</HighlightText> dentro de um espaço tão grande quanto a internet. Era parecida com a sensação de construir o maior castelo de areia da roda só para poder chamar de meu. Essa vontade nunca foi embora — só mudou de areia para tela.
          </p>
          <p>
            Desde então, fui explorando hardware, software, APIs, design gráfico, <HighlightText>inteligência artificial</HighlightText> e <HighlightText>análise de dados</HighlightText>. Não porque segui um roteiro pronto, mas porque cada coisa que aprendi abriu espaço para a próxima. Não sou fanático por linguagens ou frameworks. Sou fanático pela tecnologia em si — pelo que ela permite construir.
          </p>
          <p>
            Hoje desenvolvo projetos que unem <HighlightText>front-end, dados e IA aplicada</HighlightText>. Para mim, código bom é código que comunica: com a máquina, com quem lê depois, com quem mantém e com quem vai dar continuidade. <HighlightText>Organização e autonomia</HighlightText> não são palavras bonitas no currículo; são a forma como eu realmente trabalho.
          </p>
          <p>
            Atualmente, estou explorando IA de forma prática: <HighlightText>automações</HighlightText>, <HighlightText>análise de padrões</HighlightText> e criação de conteúdo útil. Não porque é tendência, mas porque funciona — e eu gosto de coisas que funcionam.
          </p>

          <Card className="mt-8 !p-5 flex items-center gap-4 bg-background">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <GraduationCap className="text-foreground" size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Escola Lions Antônio Moreno</h4>
              <p className="text-sm text-muted-foreground mt-1">3° Ano do Ensino Médio (completo)</p>
              <span className="text-xs font-medium text-foreground bg-secondary px-2 py-0.5 rounded mt-2 inline-block">2025</span>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};

const Skills = () => {
  const categories: SkillCategory[] = [
    {
      title: "Tech (Hard Skills)",
      items: [
        { name: "Desenvolvimento Web", desc: "HTML, CSS, JavaScript, PHP", icon: Code },
        { name: "Análise de Dados", desc: "Coleta, tratamento e visualização", icon: BarChart2 },
        { name: "Prompt Engineering", desc: "IA Aplicada e automações", icon: Brain },
      ]
    },
    {
      title: "Ferramentas",
      items: [
        { name: "GitHub", desc: "Versionamento de código", icon: Github },
        { name: "Vercel", desc: "Deploy e hospedagem", icon: Cloud },
        { name: "ChatGPT / Codex", desc: "Assistência de código", icon: Bot },
        { name: "Claude (Anthropic)", desc: "Análise complexa", icon: MessageSquare },
        { name: "DALL-E", desc: "Geração de imagens", icon: ImageIcon },
      ]
    },
    {
      title: "Soft Skills",
      items: [
        { name: "Comunicação", desc: "Expressar ideias de forma clara e efetiva" },
        { name: "Autonomia", desc: "Trabalhar de forma independente e proativa" },
        { name: "Organização", desc: "Gestão eficiente de tarefas e prioridades" },
        { name: "Digitalização", desc: "Domínio de ferramentas e processos digitais" },
      ]
    }
  ];

  return (
    <Section id="habilidades">
      <SectionHeading subtitle="Tecnologias, ferramentas e competências.">Habilidades</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <div key={cat.title} className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">{cat.title}</h3>
            <div className="space-y-4">
              {cat.items.map((item, j) => {
                const Icon = item.icon;

                return (
                  <Card key={item.name} delay={i * 0.1 + j * 0.1} className="!p-4 flex items-start gap-4">
                    {Icon && (
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <Icon className="text-foreground" size={20} />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.desc}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Site completo com domínio ativo",
      desc: "Site do zero ao ar, com domínio configurado, hospedagem e tudo funcionando.",
      icon: Globe2
    },
    {
      title: "Copy profissional que vende",
      desc: "Texto pensado pra converter, sem jargão de IA e sem parecer forçado.",
      icon: FileText
    },
    {
      title: "Imagens criadas do zero com IA",
      desc: "Com ou sem referência visual, em alta qualidade e sem aspecto artificial.",
      icon: Sparkles
    },
    {
      title: "Marketing digital integrado",
      desc: "Estratégia de divulgação, criativos pra redes sociais e presença online estruturada.",
      icon: Megaphone
    },
    {
      title: "Planilhas e dashboards Excel",
      desc: "Controle de clientes, consultas, gráficos e relatórios feitos sob medida.",
      icon: Table2
    }
  ];

  return (
    <Section id="servicos" className="bg-secondary/30">
      <SectionHeading subtitle="Soluções práticas para presença digital, vendas e organização.">Serviços</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;

          return (
            <Card key={service.title} delay={i * 0.08} className="!p-5 flex min-h-48 flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 ring-1 ring-border">
                  <Icon className="text-foreground" size={24} />
                </div>
                <span className="font-display text-[10px] leading-none text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground leading-snug">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

const LanguagesAndCourses = () => {
  return (
    <Section id="formacao" className="bg-secondary/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <div>
          <SectionHeading subtitle="Comunicação e fluência.">Idiomas</SectionHeading>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-foreground">Português</span>
                <span className="text-xs text-muted-foreground font-medium">Nativo</span>
              </div>
              <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-foreground rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-medium text-foreground">Inglês</span>
                <span className="text-xs text-muted-foreground font-medium">Médio avançado</span>
              </div>
              <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '75%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full bg-foreground rounded-full opacity-60"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading subtitle="Educação complementar.">Cursos</SectionHeading>
          <div className="space-y-4">
            {[
              { title: "Desenvolvimento Web Front-End", year: "2024" },
              { title: "Design Responsivo com Tailwind CSS", year: "2024" },
              { title: "Git e GitHub para Iniciantes", year: "2023" },
            ].map((course, i) => (
              <Card key={i} delay={i * 0.1} className="!p-4 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 group-hover:bg-background transition-colors">
                    <Calendar className="text-muted-foreground" size={16} />
                  </div>
                  <span className="font-medium text-foreground text-sm">{course.title}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{course.year}</span>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
};

const Projects = () => {
  const projects = [
    {
      name: "Sunshine da Amazônia",
      repo: "sunshinedaamazonia.com.br",
      desc: "Site institucional e comercial com apresentação da marca, chamada para representantes e contato direto pelo WhatsApp.",
      tags: ["Site publicado", "Responsivo", "WhatsApp"],
      link: "https://sunshinedaamazonia.com.br/",
      cta: "Ver site",
      preview: sunshinePreview
    },
    {
      name: "projecto",
      repo: "nyckdapixel/projecto",
      desc: "Desenvolvimento web com foco em design moderno e responsivo.",
      tags: ["PHP", "CSS"],
      link: "https://github.com/nyckdapixel/projecto",
      cta: "Ver no GitHub"
    },
    {
      name: "sunshinecatalogo",
      repo: "nycollasalbert/sunshinecatalogo",
      desc: "Catálogo digital interativo com sistema de gerenciamento de produtos.",
      tags: ["JavaScript", "CSS", "HTML"],
      link: "https://github.com/nycollasalbert/sunshinecatalogo",
      cta: "Ver no GitHub"
    }
  ];

  return (
    <Section id="projetos">
      <SectionHeading subtitle="O que eu construo provando o que afirmo.">Projetos em Destaque</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, i) => (
          <Card key={proj.name} delay={i * 0.2} className="flex flex-col h-full group">
            {proj.preview && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block -mx-6 -mt-6 mb-6 aspect-[16/10] overflow-hidden rounded-t-xl border-b border-border bg-secondary"
                aria-label={`Abrir ${proj.name}`}
              >
                <img
                  src={proj.preview}
                  alt={`Prévia do projeto ${proj.name}`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-[hsl(var(--accent))] transition-colors">
                  {proj.name}
                </h3>
                <p className="text-xs font-mono text-muted-foreground">{proj.repo}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                {proj.preview ? (
                  <Globe2 className="text-foreground" size={20} />
                ) : (
                  <Github className="text-foreground" size={20} />
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
              {proj.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-6 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {proj.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <a 
                href={proj.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-70 transition-opacity"
              >
                {proj.cta} <ExternalLink size={16} />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const Contact = () => {
  return (
    <Section id="contato" className="bg-secondary/30">
      <SectionHeading subtitle="Vamos construir algo juntos.">Contato</SectionHeading>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <Card delay={0.1} className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6 shadow-sm ring-1 ring-border">
            <Phone className="text-foreground" size={28} />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">WhatsApp</h3>
          <p className="text-muted-foreground mb-6 font-mono">(97) 98117-2431</p>
          <a 
            href="https://wa.me/5597981172431" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-[hsl(var(--foreground))] text-[hsl(var(--background))] font-medium hover:opacity-90 transition-opacity mt-auto"
          >
            Falar no WhatsApp
          </a>
        </Card>

        <Card delay={0.2} className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6 shadow-sm ring-1 ring-border">
            <Mail className="text-foreground" size={28} />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">E-mail</h3>
          <p className="text-muted-foreground mb-6 text-sm break-all">contatonycortex@gmail.com</p>
          <a 
            href="mailto:nycollascintra2305@gmail.com" 
            className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-secondary transition-colors mt-auto"
          >
            Enviar E-mail
          </a>
        </Card>
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
    >
      <span className="font-display text-xs tracking-tighter">NYcortex</span>
      <p>© 2026 — Nycollas Cintra. Todos os direitos reservados.</p>
    </motion.div>
  </footer>
);

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [themeTransition, setThemeTransition] = useState<ThemeTransition | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.title = "Nycollas Cintra | Portfolio";
    
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Portfólio de Nycollas Cintra — desenvolvedor web, analista de dados e especialista em IA aplicada.");

    const applyFavicon = (url: string) => {
      const relTypes = ["icon", "shortcut icon", "apple-touch-icon"];
      relTypes.forEach(rel => {
        let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', rel);
          document.head.appendChild(link);
        }
        link.setAttribute("href", url);
      });
    };

    applyFavicon("https://i.ibb.co/B2W5Vbcj/nycortex.png");
  }, []);

  const toggleTheme = () => {
    setThemeTransition({ id: window.performance.now(), from: theme });
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <ThemeFade transition={themeTransition} />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-muted selection:text-foreground">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Services />
          <LanguagesAndCourses />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
