"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types/project"

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close modal on escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-lg shadow-xl"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 text-gray-300 hover:text-white hover:bg-gray-700/50"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="relative h-64 md:h-80">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-purple-500/20 text-purple-300">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="text-gray-300 space-y-4">
              <p>{project.detailedDescription}</p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Visitar Projeto</Button>
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                Ver Código Fonte
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

