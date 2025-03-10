"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, Send, Github, Linkedin, Instagram, Facebook, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import ProjectCarousel from "@/components/project-carousel"
import ProjectModal from "@/components/project-modal"
import type { Project } from "@/types/project"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder.svg?height=400&width=600",
      detailedDescription:
        "This e-commerce platform was built to provide a seamless shopping experience. It includes features like product filtering, user authentication, shopping cart, wishlist, and secure payment processing with Stripe. The admin dashboard allows for easy product and order management.",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team features.",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      image: "/placeholder.svg?height=400&width=600",
      detailedDescription:
        "This task management app helps teams organize their work efficiently. It features drag-and-drop task organization, real-time updates, team collaboration tools, file attachments, and deadline notifications. The app uses Firebase for real-time database and authentication.",
    },
    {
      id: 3,
      title: "Fitness Tracking Platform",
      description:
        "A comprehensive fitness tracking platform with workout plans, progress tracking, and social features.",
      technologies: ["React Native", "Express", "PostgreSQL", "GraphQL"],
      image: "/placeholder.svg?height=400&width=600",
      detailedDescription:
        "This fitness tracking platform helps users achieve their health goals. It includes features like custom workout creation, progress tracking with charts, nutrition logging, social sharing, and integration with fitness wearables. The mobile app was built with React Native for cross-platform compatibility.",
    },
  ]

  // Handle scroll events for navigation visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }

      setLastScrollY(currentScrollY)

      // Update active section based on scroll position
      const sections = ["home", "about", "portfolio", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-transform duration-300 bg-gray-900/80 backdrop-blur-md ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-purple-400">YourName</div>
          <ul className="hidden md:flex space-x-8">
            {["home", "about", "portfolio", "contact"].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`capitalize ${
                    activeSection === section ? "text-purple-400 font-medium" : "text-gray-300 hover:text-purple-300"
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
          <div className="md:hidden">{/* Mobile menu button would go here */}</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-950"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="relative w-48 h-48 mx-auto md:mx-0 mb-6 overflow-hidden rounded-full border-4 border-purple-500">
                  <Image src="/placeholder.svg?height=200&width=200" alt="Profile" fill className="object-cover" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-left">
                  Transformando ideias em realidade digital
                </h1>
                <p className="text-xl text-gray-300 mb-8 text-center md:text-left">
                  Desenvolvedor Full-Stack apaixonado por criar soluções inovadoras
                </p>
                <div className="flex justify-center md:justify-start">
                  <Button
                    onClick={() => scrollToSection("portfolio")}
                    className="bg-purple-600 hover:bg-purple-700 text-white mr-4"
                  >
                    Ver Portfólio
                  </Button>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    Entrar em Contato
                  </Button>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-80 md:h-96"
              >
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Digital Illustration"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button onClick={() => scrollToSection("about")} aria-label="Scroll down">
              <ChevronDown className="text-purple-400 w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Sobre Mim
              </span>
            </h2>
            <div className="text-lg text-gray-300 space-y-6">
              <p>
                Sou um desenvolvedor Full-Stack com mais de 5 anos de experiência na criação de aplicações web e mobile
                inovadoras. Minha paixão está em transformar ideias complexas em soluções digitais elegantes e
                funcionais.
              </p>
              <p>
                Especializado em React, Node.js e arquiteturas cloud, tenho trabalhado com empresas de diversos setores
                para desenvolver produtos que impactam positivamente seus usuários e negócios.
              </p>
              <p>
                Acredito que o melhor código é aquele que resolve problemas reais de forma eficiente, mantendo-se limpo
                e escalável. Estou sempre aprendendo novas tecnologias e metodologias para entregar soluções de alta
                qualidade.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-16">
              <h3 className="text-2xl font-semibold mb-6 text-center">Trajetória Profissional</h3>
              <div className="relative border-l-2 border-purple-500 pl-8 space-y-10 ml-4">
                <TimelineItem
                  year="2023 - Presente"
                  title="Senior Developer"
                  company="Tech Innovations Inc."
                  description="Liderando o desenvolvimento de aplicações web de alta performance utilizando as mais recentes tecnologias."
                />
                <TimelineItem
                  year="2020 - 2023"
                  title="Full-Stack Developer"
                  company="Digital Solutions"
                  description="Desenvolvimento de soluções end-to-end para clientes de diversos setores, com foco em experiência do usuário."
                />
                <TimelineItem
                  year="2018 - 2020"
                  title="Front-end Developer"
                  company="Creative Web Agency"
                  description="Criação de interfaces responsivas e acessíveis para websites e aplicações web."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Portfólio
              </span>
            </h2>
            <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12">
              Conheça alguns dos projetos que desenvolvi. Cada um representa desafios únicos e soluções personalizadas.
            </p>

            <ProjectCarousel projects={projects} onProjectSelect={(project) => setSelectedProject(project)} />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Contato
              </span>
            </h2>
            <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto">
              <div className="md:w-2/5">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-purple-400 mr-3" />
                        <a href="mailto:seu-email@exemplo.com" className="text-gray-300 hover:text-purple-400">
                          seu-email@exemplo.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-purple-400 mr-3" />
                        <a href="tel:+5500000000000" className="text-gray-300 hover:text-purple-400">
                          +55 (00) 00000-0000
                        </a>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Redes Sociais</h3>
                    <div className="flex space-x-4">
                      <SocialLink href="https://github.com/" icon={<Github />} label="GitHub" />
                      <SocialLink href="https://linkedin.com/" icon={<Linkedin />} label="LinkedIn" />
                      <SocialLink href="https://instagram.com/" icon={<Instagram />} label="Instagram" />
                      <SocialLink href="https://facebook.com/" icon={<Facebook />} label="Facebook" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-3/5">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Envie uma Mensagem</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Nome Completo
                        </label>
                        <Input
                          id="name"
                          placeholder="Seu nome completo"
                          className="bg-gray-700 border-gray-600 text-gray-100"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          E-mail
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu-email@exemplo.com"
                          className="bg-gray-700 border-gray-600 text-gray-100"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                          Telefone/WhatsApp
                        </label>
                        <Input
                          id="phone"
                          placeholder="(00) 00000-0000"
                          className="bg-gray-700 border-gray-600 text-gray-100"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Mensagem
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Escreva sua mensagem aqui..."
                          className="bg-gray-700 border-gray-600 text-gray-100"
                          rows={5}
                        />
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Seu Nome. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  )
}

// Timeline Item Component
function TimelineItem({
  year,
  title,
  company,
  description,
}: {
  year: string
  title: string
  company: string
  description: string
}) {
  return (
    <div className="relative">
      <div className="absolute -left-12 mt-1.5 h-4 w-4 rounded-full bg-purple-500"></div>
      <div>
        <span className="text-sm font-semibold text-purple-400">{year}</span>
        <h4 className="text-xl font-medium mt-1">{title}</h4>
        <p className="text-gray-400">{company}</p>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </div>
  )
}

// Social Link Component
function SocialLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white p-3 rounded-full transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  )
}

