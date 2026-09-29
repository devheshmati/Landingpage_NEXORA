# NEXORA — AI Automation Landing Page

[![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82?style=for-the-badge\&logo=nuxt.js\&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?style=for-the-badge\&logo=vue.js\&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.x-88CE02?style=for-the-badge\&logo=greensock\&logoColor=black)](https://gsap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> A production-oriented, responsive landing page concept for an AI automation studio, built with Nuxt, Vue, Tailwind CSS, TypeScript, and GSAP.

**Live Demo:** https://nexora-8w7.pages.dev/

**Repository:** https://github.com/devheshmati/Landingpage_NEXORA

---

## 📸 Preview

<div align="center">

[![NEXORA Project Presentation](showcase/Nexora%20first%20project%20thumbnail.jpg)](https://youtu.be/Y9YQOWXS68Q)

**[▶ Watch the project presentation](https://youtu.be/Y9YQOWXS68Q)**

</div>

---

## Overview

NEXORA is a modern AI automation studio landing page designed as a portfolio project to demonstrate how a visually complex marketing website can be developed as a real, functional web application rather than only a static UI concept.

The project combines:

* A structured design system
* Wireframe-first planning
* Reusable Vue components
* Responsive layouts
* Interactive UI states
* GSAP-powered animations
* A functional contact form
* Server-side form validation
* Server-side handling of external API credentials
* Cloudflare Pages deployment

The goal was to create a landing page that feels like a real product website while maintaining a clean and maintainable frontend architecture.

---

## 🎯 Project Goals

The project was built around several practical goals:

1. Create a premium AI/SaaS-style visual experience.
2. Establish the visual system before writing the UI.
3. Build the interface using reusable and composable Vue components.
4. Add meaningful interaction and motion without making the page unnecessarily heavy.
5. Make the contact form functional instead of treating it as a visual placeholder.
6. Keep external service credentials outside the client bundle.
7. Build a responsive experience across desktop, tablet, and mobile.
8. Deploy the finished application to a publicly accessible production environment.

---

# 🎨 Design Process

One of the main differences between this project and a typical landing-page implementation is that the UI was not designed directly inside the codebase.

Before implementation, I created a dedicated design specification covering the major visual and interaction decisions.

### Design System

The design system defines:

* Color palette
* Typography scale
* Spacing scale
* Container widths
* Grid structure
* Border radius
* Card styles
* Button styles
* Background effects
* Animation principles
* Responsive behavior

### Wireframe

The page structure was defined before implementation, including the major sections and their relationships.

The planned structure included:

```text
Navbar
Hero
Trust Bar
Problem
Services
Workflow
Features
Results
Process
Testimonials
FAQ
Final CTA
Footer
```

### Design Tokens

The project uses predefined values for things such as:

* Colors
* Typography
* Spacing
* Container widths
* Radius
* UI surfaces
* Animation timings

This helped keep the implementation visually consistent instead of relying on arbitrary values throughout the codebase.

The original planning document is included in the repository:

`NEXORA_Design_System_Wireframe.txt`

---

# 🧩 Architecture & UI Approach

The application is structured around reusable Vue/Nuxt components rather than treating the landing page as one large component.

The implementation separates:

* Layout components
* Page sections
* Reusable UI elements
* UI state
* Server-side functionality

### UI State Management

A dedicated `useUI.ts` composable is used to centralize UI-level state.

For example, it manages states such as:

* Contact modal
* Mobile navigation menu
* Other global UI interactions

This keeps UI state out of individual components where possible and provides a single place to control shared interface behavior.

---

# ✉️ Functional Contact Form

The contact form was implemented as an actual functional flow rather than a frontend-only form.

The request follows this path:

```text
Client
   │
   ▼
Nuxt Server API
   │
   │  Validate form data
   ▼
Validated Request
   │
   ▼
Web3Forms
   │
   ▼
Email Delivery
```

### Why a server-side API?

Instead of sending the Web3Forms request directly from the browser, the form submission first reaches an internal Nuxt server API.

The server endpoint is responsible for:

1. Receiving the submitted form data.
2. Validating the incoming data.
3. Rejecting invalid requests.
4. Forwarding valid requests to Web3Forms.

This creates a clear boundary between the client-side interface and the external form service.

### API Key Protection

The Web3Forms access key is stored as a server-side environment variable.

It is **not exposed to the client-side application**.

Conceptually:

```text
Browser
   │
   │ form data
   ▼
Nuxt Server API
   │
   │ server-side access key
   ▼
Web3Forms
```

This prevents the Web3Forms access key from being embedded directly into the client-side JavaScript.

> Environment variables must be configured in the deployment environment and should never be committed to the repository.

---

# ✨ Features

### Interactive Landing Page

* Responsive navigation
* Mobile navigation menu
* Animated hero section
* Interactive workflow visualization
* Animated statistics
* Contact modal
* Multiple CTA interactions
* Scroll-based animations
* Responsive layout system

### Animation

GSAP and ScrollTrigger are used for larger motion sequences and scroll-driven interactions.

Animations are primarily used for:

* Section reveals
* Staggered content entrances
* Workflow visualization
* Counter animations
* Scroll-triggered interactions
* Visual feedback

CSS transitions are used for smaller UI interactions where GSAP would be unnecessary.

The goal is to use motion to support the visual hierarchy and storytelling of the page rather than adding animation purely for decoration.

---

# 📱 Responsive Design

The interface was built with responsive behavior as a core requirement rather than as a final adjustment.

The layout adapts across:

* Desktop
* Tablet
* Mobile

Responsive considerations include:

* Typography scaling
* Navigation behavior
* Grid layouts
* Card stacking
* Section spacing
* CTA placement
* Animation complexity
* Interactive elements

The design specification defines separate layout strategies for desktop, tablet, and mobile.

---

# ⚡ Performance Considerations

The project was implemented with performance in mind while maintaining a visually rich interface.

Key considerations include:

* Reusable components
* Lightweight UI primitives
* Transform/opacity-based animations where appropriate
* Avoiding unnecessary JavaScript for simple interactions
* Responsive animation behavior
* Controlled use of decorative effects
* Optimized asset usage
* Reduced animation complexity on smaller screens

The objective was not simply to maximize visual effects, but to balance **visual quality, interaction, responsiveness, and runtime performance**.

---

# 🛠️ Tech Stack

| Technology             | Role                                                      |
| ---------------------- | --------------------------------------------------------- |
| **Nuxt 4**             | Application framework, routing, server-side functionality |
| **Vue 3**              | Component-based UI development                            |
| **TypeScript**         | Type-safe application development                         |
| **Tailwind CSS 4**     | Styling and responsive UI implementation                  |
| **GSAP**               | Advanced animations and motion                            |
| **GSAP ScrollTrigger** | Scroll-based animation control                            |
| **Web3Forms**          | Contact form delivery                                     |
| **Cloudflare Pages**   | Production deployment                                     |

---

# 📦 Project Structure

The project keeps the application inside the `frontend` directory.

```text
Landingpage_NEXORA/
│
├── frontend/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   │   └── useUI.ts
│   ├── pages/
│   ├── server/
│   │   └── api/
│   ├── public/
│   ├── app.vue
│   ├── nuxt.config.ts
│   ├── package.json
│   └── ...
│
├── showcase/
│   └── Nexora first project thumbnail.jpg
│
├── NEXORA_Design_System_Wireframe.txt
│
├── LICENSE
└── README.md
```

> The exact structure may evolve as the project is maintained.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

* Node.js
* npm

installed on your machine.

## Clone the repository

```bash
git clone https://github.com/devheshmati/Landingpage_NEXORA.git
cd Landingpage_NEXORA/frontend
```

## Install dependencies

```bash
npm install
```

## Environment variables

Create a `.env` file inside the `frontend` directory.

Example:

```env
WEB3FORMS_ACCESS_KEY=your_access_key_here

! this part not worked in local server, but worked in real server
```

Do not commit `.env` or expose the access key in client-side code.

## Start development server

```bash
npm run dev
```

The development server will be available at:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

# ☁️ Deployment

The production version of NEXORA is deployed using **Cloudflare Pages**.

Live application:

**https://nexora-8w7.pages.dev/**

The deployment provides a publicly accessible production version of the project.

Cloudflare Pages supports Nuxt deployments and can build Nuxt applications using the standard `npm run build` workflow.

---

# 🔐 Security Notes

This project is a portfolio landing page and does not implement user authentication, database storage, or a full application security model.

However, the contact form follows some basic security-oriented practices:

* Form data is validated server-side.
* The Web3Forms access key is stored as a server-side environment variable.
* The access key is not intentionally exposed to the client.
* Secrets are excluded from version control.

These measures reduce unnecessary exposure of the external service credential, but they should not be interpreted as a complete security architecture for a production application.

---

# 📊 Project Status

**Status: Completed / Live**

The project has been deployed and is publicly accessible.

* ✅ Design system defined
* ✅ Wireframe defined
* ✅ Responsive UI implemented
* ✅ Interactive components implemented
* ✅ GSAP animations implemented
* ✅ UI state composable implemented
* ✅ Contact form implemented
* ✅ Server-side validation implemented
* ✅ Web3Forms integration implemented
* ✅ Server-side API credential handling implemented
* ✅ Cloudflare Pages deployment
* ✅ Public live demo

---

# 🎥 Project Presentation

A visual walkthrough of the project is available on YouTube:

**https://youtu.be/Y9YQOWXS68Q**

The presentation demonstrates the interface, responsive behavior, animations, and overall implementation.

---

# 📄 License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

## Author

**DevHeshmati**

Frontend Developer focused on building modern, responsive, and interactive web experiences using:

`Nuxt` · `Vue` · `TypeScript` · `Tailwind CSS` · `GSAP`

---

<p align="center">
  Built with Nuxt, Vue, Tailwind CSS & GSAP.
</p>

## Development Note

### Local Contact API

The contact form works correctly in the deployed production environment.

However, when running the project locally, the server-side request from the Nuxt API route to Web3Forms may return a `403` response.

This issue is limited to the local development environment and does not affect the deployed application. The current implementation has therefore been kept unchanged, as the contact form works as expected in production.

> **Note:** The exact cause of the local-only `403` response has not been conclusively identified. It may be related to differences between the local Nitro development environment and the production Cloudflare Pages runtime.

If you are developing locally and encounter this issue, verify the contact form functionality on the deployed environment before making changes to the production implementation.
