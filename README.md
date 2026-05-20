# RecipifyCook — Mobile UI Prototype 🥑

RecipifyCook is a high-fidelity mobile application user interface prototype built with **Next.js 14 (App Router)** and **Tailwind CSS**. It showcases an elegant, intuitive recipe exploration app featuring Material Design 3 inspired elements, a simulated fridge camera scan experience, a structured shopping checklist module, and a global system-wide theme context framework.

> ⚠️ **Disclaimer:** This project is a **UI/UX design prototype** meant for interactive presentation and layout demonstrations. It does not contain a live production backend, machine-learning computer vision models, database persistence, or secure authentication systems.

---

## 📱 Core Layout Modules

The application simulates a standalone native smartphone layout complete with an adaptive hardware status bar, navigation gestures, and responsive animation transitions.

### 1. Onboarding & Welcome Screen (`/`)
* **First Impression:** Houses sleek, clean branding layout architecture built directly from high-fidelity design mockups.
* **Theme Entry Point:** Embedded localized mode toggle control allows testing light or dark system styles before jumping into app flows.
* **Faux Security Routing:** Displays primary/secondary design call-to-action buttons targeting the unified Home Feed interface.

### 2. Interactive Home Feed & AR Scanner (`/feed`)
* **Category Carousel:** Horizon-scrolling pill controls with custom configurations for breakfast, lunch, dinner, and desserts.
* **Live Camera Stream (Mock AR UI):** Triggers standard web-peripheral integrations (`navigator.mediaDevices.getUserMedia`) safely tucked inside a fallback loop.
* **Scan Targeting Frame:** Implements overlay targeting view boxes, persistent item recognition banners (Eggs, Milk), and custom viewport scanning light-beam animations via CSS injection.
* **Curated Content Sections:** Dynamically populates custom-tailored layout cards featuring recipe difficulties, prep timings, and star rating distributions.

### 3. Smart Shopping Checklist (`/shopping`)
* **Categorized Inventory Groups:** Segregates missing recipe ingredients into standard grocery rows (Produce, Dairy, Pantry) matching mockup templates.
* **Checklist Actions:** Fully interactive form elements styled with custom focus outlines and matching brand colorways.
* **Total Calculation Widget:** Features an emphasis card previewing total recipe item expenses alongside a clean tertiary addition button.

---

## 🎨 Theme Architecture & Design Framework

The prototype implements a unified context wrapper (`/context/ThemeContext.tsx`) that enforces strict design tokens across light and dark states:

| Feature/Token | Light Mode (`light`) | Dark Mode (`dark`) |
| :--- | :--- | :--- |
| **Shell Background** | Soft Sage Pastel (`#F7FBF4`) | Deep Charcoal Solid (`#121412`) |
| **Border Highlights** | Dark High-Contrast (`#191C19`) | Muted Hardware Gray (`#2E312E`) |
| **Primary Accent** | Deep Forest Green (`#386B3B`) | Soft Emerald Variant (`#B8E6B9`) |
| **Navigation Pills** | Mint Accent Highlight (`#D1E8D1`) | Deep Forest Compound (`#2A3B2C`) |

---

## 🛠️ Tech Stack & Dependencies

* **Framework:** Next.js 14 (React 18 Production App Router)
* **Styling:** Tailwind CSS (Utility-first design architecture)
* **Icons:** Lucide React (Unified stroke weights & configurations)
* **Context:** React Context API (Shared system state metrics)

---

## 🚀 Quick Local Deployment

Ensure you have [Node.js](https://nodejs.org/) installed on your machine, then run:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/recipify-cook.git](https://github.com/your-username/recipify-cook.git)
   cd recipify-cook