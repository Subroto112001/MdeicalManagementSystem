# Healtho Medical Center

A responsive healthcare clinic website prototype built with Next.js App Router, TypeScript, Tailwind CSS v4, and React. Appointment and contact flows are demos; they do not submit or persist information.

## Setup

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. For a production build, run `npm run build` and then `npm start`. `npm run lint` runs ESLint.

Set `NEXT_PUBLIC_SITE_URL` to the public site origin before deployment. The default `https://healtho.example` is a placeholder used for metadata, sitemap, and robots output.

## Project structure

```text
src/
  app/                  App Router pages, route metadata, sitemap, robots, loading/error UI
    doctors/            Doctor directory and static doctor profile routes
    departments/        Department list and detail routes
    appointment/        Client-side, simulated multi-step booking form
    blog/               Article list and static article detail routes
  components/
    layout/             Shared site header and footer
    sections/           Home page sections and reusable DoctorCard
    ui/                 Buttons, inputs, headings, breadcrumbs, and other primitives
  data/                 Prototype clinic, doctor, department, test, article, and gallery data
  i18n/                 English and Bangla messages and locale provider
  lib/                  Brand/contact constants
```

## Change brand colors

Edit the CSS custom properties at the top of `src/app/globals.css` (`--primary`, `--background`, `--foreground`, `--border`) and their Tailwind mappings in `@theme inline`. The dark clinic blue is also used directly in a few section backgrounds; search for `#10283a` to adjust those.

## Add a doctor

Add a `DoctorProfile` record to `src/data/medical-data.ts` with a unique `slug`, department slug, chamber days and schedule, fee, qualifications, and profile details. The directory filters, static profile generation, department roster, sitemap, and featured doctor cards read from this shared dataset. Add the doctor to the department’s data if that department does not exist yet. Replace sample names, images, BMDC identifiers, fees, hours, and credentials with clinic-approved information before launch.

## Replace mock data with APIs

The current pages read from `src/data/*.ts`. A future API integration can replace these imports with typed repository functions (for example, `getDoctors`, `getDoctorBySlug`, `getTests`, and `getPackages`) while keeping page components and card interfaces stable. Keep API credentials server-only, validate external data at the boundary, and add loading/error states for network-backed routes. The appointment and contact forms currently prevent submission and show only local demo feedback; connect them to an approved server endpoint only when the clinic’s privacy, consent, and data handling requirements are ready.

## Prototype content and deployment notes

Doctor records, clinic contact details, prices, schedules, package contents, careers, legal copy, and some photos are placeholders. Verify them with the clinic. The privacy and terms pages are drafts, not approved policies. Configure the real domain with `NEXT_PUBLIC_SITE_URL`, replace placeholder email/phone/address details, and supply clinic-approved photography before public launch.
