"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types/project"

interface ProjectCarouselProps {
  projects: Project[]
  onProjectSelect: (project: Project) => void
}

export default function ProjectCarousel({ projects, onProjectSelect }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {projects.map((project) => (
            <div key={project.id} className="min-w-full px-4">
              <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-purple-500/20 text-purple-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    onClick={() => onProjectSelect(project)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700 z-10"
        onClick={prevProject}
        aria-label="Projeto anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700 z-10"
        onClick={nextProject}
        aria-label="Próximo projeto"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-purple-500" : "bg-gray-600"
            }`}
            aria-label={`Ir para projeto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

