

# 🚀 ALX Project Nexus – Frontend Engineering Journey


<div align="center">

![Project Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Program](https://img.shields.io/badge/Program-ALX_ProDev-orange?style=for-the-badge)
![Focus](https://img.shields.io/badge/Focus-Frontend_Engineering-blue?style=for-the-badge)

</div>

---

## 🧭 Overview

**Project Nexus** is a comprehensive documentation of my growth throughout the **ALX ProDev Frontend Engineering Program**. It captures everything I learned—from core frontend concepts to building production-ready systems, solving real engineering problems, debugging under pressure, and collaborating with backend peers.

This repository serves two purposes:
1.  **A Personal Archive** of my development journey.
2.  **A Learning Resource** for future ALX learners who want a clear picture of how real-world engineering is taught in the program.

---

## 🎯 Project Objectives

* ✅ **Document** the tools, frameworks, and technologies mastered.
* ✅ **Record** the challenges I faced and the specific solutions I implemented.
* ✅ **Highlight** achievements, breakthroughs, and practical skills.
* ✅ **Demonstrate** cross-team collaboration between frontend & backend.
* ✅ **Show** how ALX training translates into engineering excellence.

---

## 🧠 Core Learnings & Tech Stack

### 🧩 Frontend & Full-Stack Technologies

#### **Next.js**
* Built apps using **SSR, SSG, ISR**, and the **App Router**.
* Connected APIs using **Server Actions** and Middleware.
* Deployed multiple projects on **Vercel** with clean environment configurations.

#### **TailwindCSS**
* Designed responsive UIs using **utility-first styling**.
* Customized themes, dark mode, and complex animations.
* Combined Tailwind with **ShadCN** and **Lucide** for professional UI patterns.

#### **TypeScript**
* Improved debugging with **static type safety**.
* Created robust interfaces for API responses, props, and data models.
* Used TypeScript with **Next.js + Prisma** for type-safe full-stack applications.

#### **GraphQL**
* Used **Apollo Client** for queries, caching, and state management.
* Wrote schemas, mutations, and fragments.
* Optimized data fetching to avoid over-fetching.

### ⚙️ System & Architecture

* **API Integration:** Connected REST + GraphQL APIs, implemented JWT authentication, and used Axios interceptors.
* **System Design:** Applied modular folder structures and component-driven architectures.
* **DevOps:** Implemented CI/CD pipelines, microservices basics, and deployment strategies.

---

## 🧱 Major Projects (Hands-On Applications)

### 🎓 Educativ – School Management Platform
**Stack:** MERN + Next.js | Redux Toolkit | Zod
* Implemented authentication, class management, and role-based dashboards.
* Built secure endpoints for Class CRUD operations and attendance management.

### 🩺 Telemedicine & Remote Care Platform
**Stack:** React | REST API
* Built a patient-doctor dashboard with a fully responsive UI.
* Implemented scheduling logic and health metrics tracking.
* Integrated REST APIs for managing appointments and patient data.

### 🛍️ Profragrance eCommerce Store
**Stack:** Next.js + WooCommerce | Stripe | Twilio | SendGrid
* Implemented payment gateways (Stripe) and notification systems (Twilio/SendGrid).
* Built complex shopping cart logic, checkout flows, and product pages.
* **Key Fix:** Debugged Vercel DNS issues for custom domain configuration.

### 🏢 Jepho-Okeson Inventory Management System
**Stack:** Prisma | PostgreSQL | Prisma Accelerate
* Built a full CRUD inventory system.
* Used **Prisma Accelerate** for optimized query performance.
* Resolved complex schema, permission, and migration conflicts.

---

## 🧩 Debugging Struggles & Lessons Learned

> *"Every bug fixed was a step toward mastery. Every build was proof of growth."*

| Challenge | Solution |
| :--- | :--- |
| **⚠️ Dynamic Server Usage Errors** | Solved by marking routes as `dynamic = "force-dynamic"` and understanding server boundaries. |
| **⚠️ Prisma Accelerate HTTP Methods** | Rerouted requests through **Server Actions** to match Prisma Client expectations. |
| **⚠️ Schema Validation Failures** | Created `prisma.config.ts` and strictly aligned schema before running migrations. |
| **⚠️ CORS Failures** | Implemented CORS middleware and validated all endpoints with **Postman**. |
| **⚠️ Vercel DNS & SendGrid Conflicts** | Fixed auto-generated DNS records and validated **DKIM/SPF**. |
| **⚠️ React Native className Errors** | Switched to proper React Native styling conventions instead of web utilities. |
| **⚠️ Async Data Crashes** | Wrapped all requests in `try/catch` blocks and added **loading/error states**. |
| **⚠️ Null State Issues** | Used **type-safe guards** for cart, user, and API data. |

---

## 🏆 Achievements

### 🧭 Technical Achievements
* 🚀 Built **4+ production-ready apps** with Next.js, Prisma, MongoDB, and Tailwind.
* ☁️ Achieved stable deployments on **Vercel, Firebase, and VPS**.
* 🔒 Mastered environment management & secure configurations.
* 🛠️ Strengthened skills in API consumption, authentication, and data modeling.

### 👨‍💻 Personal Milestones
* Grew from a frontend enthusiast into a **full-stack capable developer**.
* Collaborated with backend peers through the **ALX Discord**.
* Helped fix deployment, CORS, and Prisma issues for other learners.
* Created UI systems inspired by **ShadCN** and real design systems.

---

## 🧠 Best Practices Gained

### 💻 Coding Standards
* Keep components **reusable and predictable**.
* Prefer **TypeScript** for long-term maintainability.
* Maintain clean, modular folder structures.

### 🔌 API & Data
* **Centralize** API calls to avoid duplication.
* Use caching strategies (**Apollo/React Query**).
* Gracefully handle errors to prevent app crashes.

### 🎨 UI/UX
* Optimize for **performance and accessibility**.
* Build **mobile-first** responsive layouts.

### 🌲 Version Control
* Write meaningful, semantic commit messages.
* Keep Pull Requests (PRs) **small and clean**.
* Stick to structured git workflows.

---

## ⚙️ Local Development Guide

### 1. Clone the Repository

```bash
git clone [https://github.com/BouglaceMarouane/alx-project-nexus.git](https://github.com/BouglaceMarouane/alx-project-nexus.git)
cd alx-project-nexus
npm install
```
### 2. Environment Variables
Create a .env file in the root directory:

```bash
EXPO_PUBLIC_RAPIDAPI_BASE_URL=[https://example-api.com](https://example-api.com)
EXPO_PUBLIC_RAPIDAPI_KEY=your_key_here
EXPO_PUBLIC_RAPIDAPI_HOST=example-api.com
```
### 3. Start Development Server

```bash
npx expo start
Note: Ensure you are using Node LTS for best compatibility.
```

### 4. Useful Scripts

```bash
npm run lint   # Check for code style issues
npm run test   # Run test suite
```
### 5. Troubleshooting
If you encounter caching issues:

```bash
npx expo start --clear
```

---

## 🤝 Collaboration
I am open to collaboration with:

- Frontend peers (Code reviews, pair programming).

- Backend learners (Schema alignment, API integration testing).

Discord Channel: #ProDevProjectNexus

---

## 🏁 Conclusion
Project Nexus reflects my entire evolution as a developer: from overcoming frustrating bugs to building complete real-world applications.

- Every deployment showed progress.

- Every debugging session built confidence.

- Every project shaped me into a better engineer.

---

## ⭐ Support

If you like this project, don't forget to leave a ⭐ on GitHub. Thank you and happy coding! 🚀

---

## 📬 Stay in Touch

<div align="center">

### 👨‍💻 **Marouane Bouglace** - *Project Creator*

[![Email](https://img.shields.io/badge/Email-bouglacemarouane@gmail.com-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:bouglacemarouane@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-bouglacemarouane-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bouglacemarouane)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Marouane%20Bouglace-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/marouane-bouglace)

</div>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=70&section=footer"/>
</p>
