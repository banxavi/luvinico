# PROJECT CONTEXT & INSTRUCTIONS FOR CURSOR AI

## 1. Project Overview
- **Project Type:** Single-page Landing Page for Premium Imported Beer products (phi thương mại/personal project).
- **Design Style Inspiration:** Elite, luxury, and premium dark mode. Strongly inspired by 'ruouvangcaominh.vn' (Premium dark background, gold accent colors, white text, serif/elegant headings).
- **Key Metric:** Optimize heavily for Mobile view (responsive layout, thumb-friendly CTAs, fast loading images).

## 2. Tech Stack & Environment
- **Framework:** Next.js 16 (App Router) with React 19.
- **Styling:** Tailwind CSS v4 (Using `@import "tailwindcss";` in `src/app/globals.css` and `@tailwindcss/postcss` in `postcss.config.js`).
- **Database:** NONE. The app uses static/mock data for displaying products to ensure fast performance and no external dependencies.
- **Deployment Platform:** Vercel (Free tier). Set `NEXT_PUBLIC_SITE_URL` for SEO metadata.

## 3. Mock Data Structure (`src/mockData.js`)
Products are rendered dynamically using `.map()` from an array of objects. Each product object must include:
- `id`, `name`, `image`, `price`, `origin`, `abv`, `description`.

## 4. Coding & Architecture Guidelines
- **Framework over Plugins:** Prioritize React's core capabilities, clean state management, and semantic HTML/Tailwind over unnecessary external npm packages to maintain speed and stability.
- **Clean Component Breakdown:** Divide sections into reusable components (e.g., Header, Footer, HeroBanner, ProductGrid, ProductModal, InquiryForm).
- **No Database Submissions:** The 'Inquiry Form' should handle data on the client-side (e.g., pre-filling a Zalo/Messenger chat link, opening a mailto link, or using an external lightweight service like Formspree).
- **Legal Compliance:** Always include an age-verification mechanism (Age Gate modal) or a strict footer warning label: "Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai".

## 5. Developer's Preference
- Maintain highly readable code, use meaningful naming conventions, and avoid heavy UI overhead or "flaky" dynamic layouts. 
- Write production-ready Tailwind utility classes utilizing the custom colors defined in configuration: `bg-premium-black`, `text-premium-gold`, `bg-premium-dark`.
