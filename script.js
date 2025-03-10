document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Navigation scroll behavior
  const nav = document.getElementById("main-nav")
  const navLinks = document.querySelectorAll(".nav-links a")
  let lastScrollY = window.scrollY

  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = ["home", "about", "portfolio", "contact"]
    let currentSection = ""

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section
        }
      }
    })

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  // Handle scroll events for navigation visibility
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      nav.classList.remove("show")
      nav.classList.add("hide")
    } else {
      nav.classList.remove("hide")
      nav.classList.add("show")
    }

    lastScrollY = currentScrollY
    updateActiveNavLink()

    // Check for elements to animate on scroll
    checkScrollAnimation()
  })

  // Initialize active nav link on page load
  updateActiveNavLink()

  // Animate elements on scroll
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  function checkScrollAnimation() {
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  // Initial check for animations
  checkScrollAnimation()

  // Animate hero elements on load
  setTimeout(() => {
    document.querySelectorAll(".hero-animate").forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate")
      }, index * 200)
    })
  }, 100)

  // Aqui adicionamos as informações do carrocel
  const projects = [
    {
      id: 1,
      title: "Central de Software",
      description:
        "Loja de Programas",
      technologies: ["Phyton", "Chocalatey", "PyQt5", "QtWidgets", "QtCore", "QtGui"],
      image: "public/centralsoftware.PNG",
      detailedDescription:
        "Uma loja para gerenciar os programas homologados pela empresa para que os usuarios possam instalar sem a necessidae de acionar um suporte tecnico.",
    },
    {
      id: 2,
      title: "Implantação Google Workspace",
      description: "Gerenciou a migração do Zimbra para a nova plataforma, com integração ao Active Directory (AD), validou o processo e garantiu a funcionalidade.",
      technologies: ["Liderança", "Comunicação", "Resolução de Problemas"],
      image: "public/zimbra_gmail.png",
      detailedDescription:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    {
      id: 3,
      title: "Implantação Adobe Acrobat ProX",
      description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      technologies: ["xxxxxxxxxxx", "xxxxxxxxxxxx", "xxxxxxxxxxxxxxxxxx"],
      image: "https://placehold.co/600x400",
      detailedDescription:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    {
      id: 4,
      title: "Atualização GLPI v10",
      description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      technologies: ["xxxxxxxxxxx", "xxxxxxxxxxxx", "xxxxxxxxxxxxxxxxxx"],
      image: "https://placehold.co/600x400",
      detailedDescription:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    {
      id: 5,
      title: "Contratação Internet Satelital StarLink",
      description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      technologies: ["xxxxxxxxxxx", "xxxxxxxxxxxx", "xxxxxxxxxxxxxxxxxx"],
      image: "https://placehold.co/600x400",
      detailedDescription:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    {
      id: 6,
      title: "xxxxxxxxxxxxxxxxxxxx",
      description: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      technologies: ["xxxxxxxxxxx", "xxxxxxxxxxxx", "xxxxxxxxxxxxxxxxxx"],
      image: "https://placehold.co/600x400",
      detailedDescription:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },

  ]

  const carousel = document.getElementById("project-carousel")
  const dotsContainer = document.getElementById("carousel-dots")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentIndex = 0

  // Create project cards
  function createProjectCards() {
    carousel.innerHTML = ""
    dotsContainer.innerHTML = ""

    projects.forEach((project, index) => {
      // Create project card
      const card = document.createElement("div")
      card.className = "project-card"

      card.innerHTML = `
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-technologies">
            ${project.technologies.map((tech) => `<span class="tech-badge">${tech}</span>`).join("")}
          </div>
          <button class="btn btn-primary btn-full view-details" data-id="${project.id}">Ver Detalhes</button>
        </div>
      `

      carousel.appendChild(card)

      // Create dot indicator
      const dot = document.createElement("button")
      dot.className = `dot ${index === 0 ? "active" : ""}`
      dot.setAttribute("data-index", index)
      dot.setAttribute("aria-label", `Ir para projeto ${index + 1}`)
      dotsContainer.appendChild(dot)
    })

    // Add event listeners to view details buttons
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", function () {
        const projectId = Number.parseInt(this.getAttribute("data-id"))
        openProjectModal(projectId)
      })
    })

    // Add event listeners to dots
    document.querySelectorAll(".dot").forEach((dot) => {
      dot.addEventListener("click", function () {
        const index = Number.parseInt(this.getAttribute("data-index"))
        goToSlide(index)
      })
    })
  }

  // Initialize carousel
  createProjectCards()

  // Carousel navigation
  function goToSlide(index) {
    currentIndex = index
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`
    updateDots()
  }

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length
    goToSlide(currentIndex)
  })

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % projects.length
    goToSlide(currentIndex)
  })

  // Project modal functionality
  const modal = document.getElementById("project-modal")
  const modalImage = document.getElementById("modal-image")
  const modalTitle = document.getElementById("modal-title")
  const modalTechnologies = document.getElementById("modal-technologies")
  const modalDescription = document.getElementById("modal-description")
  const closeModal = document.querySelector(".close-modal")

  function openProjectModal(projectId) {
    const project = projects.find((p) => p.id === projectId)
    if (!project) return

    modalImage.src = project.image
    modalImage.alt = project.title
    modalTitle.textContent = project.title

    modalTechnologies.innerHTML = ""
    project.technologies.forEach((tech) => {
      const badge = document.createElement("span")
      badge.className = "tech-badge"
      badge.textContent = tech
      modalTechnologies.appendChild(badge)
    })

    modalDescription.textContent = project.detailedDescription

    modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }

  function closeProjectModal() {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"
  }

  closeModal.addEventListener("click", closeProjectModal)

  // Close modal when clicking outside content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal()
    }
  })

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeProjectModal()
    }
  })

  // Contact form submission
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    // For this example, we'll just log it to the console
    console.log("Form submitted:", { name, email, phone, message })

    // Show success message (in a real app, you'd wait for server response)
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")

    // Reset form
    contactForm.reset()
  })
})

