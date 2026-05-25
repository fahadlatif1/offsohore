export type ProductCategory = "cv-career" | "lists" | "flagship" | "career-guides";

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  blurb: string;
  longBlurb: string;
  includes: string[];
  format: string;
  /** Private, not rendered. Where you keep the actual download link to email after payment. */
  downloadUrl?: string;
};

export const CATEGORIES: Record<ProductCategory, { label: string; eyebrow: string; intro: string }> = {
  "cv-career": {
    label: "CV & Career",
    eyebrow: ",  Documents",
    intro: "Templates and guides used by offshore professionals to land rotations and switch sectors.",
  },
  "career-guides": {
    label: "Offshore Position Career Guides",
    eyebrow: ",  Role Playbooks",
    intro: "Role by role guides covering certifications, day rates, hiring routes and what each offshore position actually looks like day to day. £10 each.",
  },
  lists: {
    label: "Company & Recruiter Lists",
    eyebrow: ",  Directories",
    intro: "Skip the gatekeepers. Curated contact databases for operators, contractors and recruiters.",
  },
  flagship: {
    label: "Flagship Playbook",
    eyebrow: ",  The Roadmap",
    intro: "The complete step by step guide. Everything in one place.",
  },
};

export const products: Product[] = [
  {
    slug: "offshore-cv-template",
    name: "Offshore CV Template",
    price: 35,
    category: "cv-career",
    blurb: "ATS-ready Word template engineered for offshore recruiters.",
    longBlurb:
      "An ATS-ready Microsoft Word template structured the way offshore recruiters and operators actually read CVs. Includes layout guidance, sample wording for technical roles, and a dedicated certification block.",
    includes: [
      "Editable Word (.docx) template",
      "PDF reference version",
      "Sample wording for 12 offshore roles",
      "Certification & ticket layout",
      "ATS keyword guidance",
    ],
    format: "DOCX + PDF",
  },
  {
    slug: "offshore-cover-letter-pack",
    name: "Offshore Cover Letter Pack",
    price: 10,
    category: "cv-career",
    blurb: "Five proven cover letter templates for offshore applications.",
    longBlurb:
      "Five cover letter templates that work for first time entrants, experienced rotators, career-changers, contractors and executive-level offshore roles. Each comes with annotated guidance on what to keep, swap and personalise.",
    includes: ["5 editable templates (Word)", "PDF reference copies", "Annotated guidance per template"],
    format: "DOCX + PDF",
  },
  {
    slug: "offshore-interview-questions",
    name: "Offshore Interview Questions & Answers",
    price: 15,
    category: "cv-career",
    blurb: "70+ real offshore interview questions with model answers.",
    longBlurb:
      "Seventy plus questions taken from real offshore interviews, safety, technical and behavioural rounds, each with a model answer you can adapt. Covers oil & gas, wind, subsea and marine roles.",
    includes: ["70+ questions with model answers", "Safety / Technical / Behavioural sections", "PDF + EPUB"],
    format: "PDF + EPUB",
  },
  {
    slug: "offshore-job-application-pack",
    name: "Offshore Job Application Pack",
    price: 20,
    category: "cv-career",
    blurb: "The full bundle: CV template, cover letter pack and application tracker.",
    longBlurb:
      "Everything you need to run a serious offshore job campaign in one bundle, CV template, full cover letter pack and an Excel application tracker so you never lose sight of where you've applied.",
    includes: ["Offshore CV Template", "Cover Letter Pack (5)", "Application tracker spreadsheet"],
    format: "DOCX + PDF + XLSX",
  },
  {
    slug: "offshore-linkedin-optimisation",
    name: "Offshore LinkedIn Optimisation Guide",
    price: 15,
    category: "cv-career",
    blurb: "Step by step playbook to surface in recruiter searches.",
    longBlurb:
      "A step by step LinkedIn rebuild for offshore, subsea and renewables professionals, headline formulas, keyword targeting, About section structure, and the post cadence that gets recruiters to message you first.",
    includes: ["48-page PDF", "Headline & keyword worksheets", "Profile section examples"],
    format: "PDF",
  },
  {
    slug: "offshore-career-starter",
    name: "Offshore Career Starter Guide",
    price: 35,
    category: "cv-career",
    blurb: "120 page PDF for newcomers breaking into the offshore industry.",
    longBlurb:
      "The complete newbie's playbook, how the industry actually hires, mandatory certifications decoded, day rate maths, recruiter outreach scripts, and what to expect on your first mobilisation. 120 pages, written by people who've worked the rigs.",
    includes: ["120 page PDF guide", "4 editable CV templates", "Recruiter contact directory", "Certification cost matrix"],
    format: "PDF + DOCX",
  },
  {
    slug: "offshore-career-change",
    name: "Offshore Career Change Guide",
    price: 25,
    category: "cv-career",
    blurb: "For onshore professionals making the move offshore.",
    longBlurb:
      "If you're already established onshore, engineering, trades, military, project management, this guide shows how to translate your existing experience into an offshore ready story and target the right entry roles for your background.",
    includes: ["80 page PDF", "Transferable skills mapping worksheets", "Sector entry path comparison"],
    format: "PDF",
  },
  {
    slug: "uk-offshore-companies",
    name: "UK Offshore Companies List",
    price: 10,
    category: "lists",
    blurb: "UK offshore operators, contractors and service companies with hiring contacts.",
    longBlurb:
      "A curated, regularly updated list of UK offshore operators, drilling contractors and service companies, with hiring department contact details where publicly available.",
    includes: ["Excel + PDF directory", "HR / recruitment contacts", "Quarterly updates for 12 months"],
    format: "XLSX + PDF",
  },
  {
    slug: "norway-offshore-companies",
    name: "Norway Offshore Companies List",
    price: 10,
    category: "lists",
    blurb: "Norwegian operators and tier 1 contractors across the NCS.",
    longBlurb:
      "Equinor, Aker, DNV and the wider Norwegian Continental Shelf ecosystem, operators, contractors and key service companies with hiring contacts.",
    includes: ["Excel + PDF directory", "NCS operator + contractor coverage", "Quarterly updates for 12 months"],
    format: "XLSX + PDF",
  },
  {
    slug: "wind-farm-companies",
    name: "Wind Farm Companies List",
    price: 10,
    category: "lists",
    blurb: "Offshore wind developers, OEMs and O&M contractors.",
    longBlurb:
      "Developers, OEMs and operations & maintenance contractors across UK, EU and US East Coast offshore wind, for technicians, GWO-trained crew and renewable energy professionals.",
    includes: ["Excel + PDF directory", "UK / EU / US East Coast coverage", "Quarterly updates for 12 months"],
    format: "XLSX + PDF",
  },
  {
    slug: "offshore-recruiter-emails",
    name: "Offshore Recruiter Email List",
    price: 15,
    category: "lists",
    blurb: "Direct emails for specialist offshore recruiters.",
    longBlurb:
      "Direct email addresses for specialist offshore recruiters covering energy, marine, subsea and renewables, the people who actually staff rigs and vessels, not generic job boards.",
    includes: ["Excel directory", "Sector tagged contacts", "Outreach email templates"],
    format: "XLSX + PDF",
  },
  {
    slug: "marine-shipping-companies",
    name: "Marine & Shipping Companies List",
    price: 10,
    category: "lists",
    blurb: "Operators, ship managers and crewing agencies.",
    longBlurb:
      "Operators, ship managers and crewing agencies for deck, engine and ETO roles across commercial shipping and offshore support vessels.",
    includes: ["Excel + PDF directory", "Deck / Engine / ETO coverage", "Quarterly updates for 12 months"],
    format: "XLSX + PDF",
  },
  {
    slug: "oil-gas-employer-database",
    name: "Oil & Gas Employer Database",
    price: 15,
    category: "lists",
    blurb: "Global oil & gas employers with HR / recruitment contacts.",
    longBlurb:
      "Global database of oil & gas employers, operators, drilling contractors and major service companies, with HR and talent acquisition contact information where publicly available.",
    includes: ["Excel directory", "Global coverage", "HR / TA contacts", "Quarterly updates for 12 months"],
    format: "XLSX + PDF",
  },
  {
    slug: "offshore-hr-contacts",
    name: "Offshore HR Contact List",
    price: 20,
    category: "lists",
    blurb: "Direct HR and talent acquisition contacts inside major operators.",
    longBlurb:
      "Named HR and talent acquisition contacts inside major operators and contractors, for serious candidates who want to bypass third party recruiters and go direct.",
    includes: ["Excel directory", "Named TA / HR contacts", "Operator + contractor coverage"],
    format: "XLSX + PDF",
  },
  {
    slug: "offshore-agencies-worldwide",
    name: "Offshore Agencies Worldwide",
    price: 20,
    category: "lists",
    blurb: "International manning and recruitment agencies.",
    longBlurb:
      "International offshore manning and recruitment agencies covering UK, Europe, Middle East, Asia Pacific and the Americas, for rotation contractors targeting work outside their home region.",
    includes: ["Excel directory", "Region tagged agencies", "Specialism tags (drilling, wind, marine, subsea)"],
    format: "XLSX + PDF",
  },
  {
    slug: "how-to-get-offshore",
    name: 'Step-by-Step "How To Get Offshore" Guide',
    price: 35,
    category: "flagship",
    blurb: "The complete roadmap from shore to rig.",
    longBlurb:
      "The complete roadmap, certifications, medicals, CV, recruiters, applications, interviews and your first mobilisation. Everything in one place, in the order you actually need it.",
    includes: ["150 page PDF playbook", "Certification & medical checklists", "Recruiter outreach scripts", "First mobilisation survival guide"],
    format: "PDF",
  },

  // Position specific career guides, £10 each
  {
    slug: "offshore-beginners-career-guide",
    name: "Offshore Beginners Career Guide",
    price: 10,
    category: "career-guides",
    blurb: "The starter PDF for anyone with zero offshore experience.",
    longBlurb:
      "A condensed, no fluff PDF for newcomers. What offshore work actually is, the certifications you need first, how rotations and day rates work, and the cleanest route in for someone starting from scratch.",
    includes: ["60 page PDF", "Certification pathway diagram", "Glossary of offshore terms", "First application checklist"],
    format: "PDF",
  },
  {
    slug: "rov-pilot-career-guide",
    name: "ROV Pilot Career Guide",
    price: 10,
    category: "career-guides",
    blurb: "Route into ROV piloting, from trainee to supervisor.",
    longBlurb:
      "How to break into ROV piloting, accredited schools, trainee programmes with the main contractors, typical progression to senior pilot and supervisor, and realistic day rates by region.",
    includes: ["PDF guide", "Training school shortlist", "Progression & day rate matrix"],
    format: "PDF",
  },
  {
    slug: "subsea-engineer-career-guide",
    name: "Subsea Engineer Career Guide",
    price: 10,
    category: "career-guides",
    blurb: "Subsea engineering routes for graduates and switchers.",
    longBlurb:
      "Subsea engineering pathways for graduates and onshore engineers switching across, the disciplines that hire most, the projects to target and the contractors that train juniors properly.",
    includes: ["PDF guide", "Discipline breakdown", "Contractor hiring map"],
    format: "PDF",
  },
  {
    slug: "wind-turbine-technician-career-guide",
    name: "Wind Turbine Technician Career Guide",
    price: 10,
    category: "career-guides",
    blurb: "GWO route into offshore wind technician roles.",
    longBlurb:
      "The GWO certification stack, how to land a first offshore wind technician role, the developers and OEMs actively recruiting, and what the rotation and pay actually look like.",
    includes: ["PDF guide", "GWO module checklist", "Developer & OEM list"],
    format: "PDF",
  },
  {
    slug: "drilling-crew-career-guide",
    name: "Drilling Crew Career Guide",
    price: 10,
    category: "career-guides",
    blurb: "Roustabout to driller, the offshore drilling ladder.",
    longBlurb:
      "Roustabout, roughneck, derrickman, assistant driller, driller. What each role does, what it pays and what it takes to move up on a drilling rig.",
    includes: ["PDF guide", "Drill floor role map", "Progression timeline"],
    format: "PDF",
  },
  {
    slug: "offshore-medic-career-guide",
    name: "Offshore Medic Career Guide",
    price: 10,
    category: "career-guides",
    blurb: "Convert nursing or paramedic experience to offshore medic.",
    longBlurb:
      "How qualified nurses and paramedics convert into offshore medic roles, the HSE and OPITO requirements, the recruiters that place medics and the typical rotation patterns.",
    includes: ["PDF guide", "Conversion checklist", "Medic recruiter shortlist"],
    format: "PDF",
  },
  {
    slug: "marine-crew-career-guide",
    name: "Marine Crew Career Guide",
    price: 10,
    category: "career-guides",
    blurb: "Deck, engine and ETO routes on offshore vessels.",
    longBlurb:
      "STCW pathways for deck, engine and ETO crew on offshore support vessels, the operators worth targeting and the progression from rating to officer.",
    includes: ["PDF guide", "STCW pathway map", "Operator shortlist"],
    format: "PDF",
  },
  {
    slug: "crane-operator-career-guide",
    name: "Offshore Crane Operator Career Guide",
    price: 10,
    category: "career-guides",
    blurb: "Banksman to certified offshore crane operator.",
    longBlurb:
      "OPITO Stage 3 / Stage 4 certification route, who hires crane operators, typical day rates and how to move up from banksman or roustabout into the cab.",
    includes: ["PDF guide", "OPITO stage checklist", "Hiring contractor list"],
    format: "PDF",
  },
  {
    slug: "hse-officer-career-guide",
    name: "Offshore HSE Officer Career Guide",
    price: 10,
    category: "career-guides",
    blurb: "NEBOSH route into offshore HSE roles.",
    longBlurb:
      "NEBOSH and IOSH pathway into offshore HSE advisor and safety officer roles, the operators that hire juniors and the certifications that actually move the needle.",
    includes: ["PDF guide", "Certification stack", "Hiring operator list"],
    format: "PDF",
  },

  // Standalone additions
  {
    slug: "linkedin-account-setup-guide",
    name: "LinkedIn Account Set Up Guide",
    price: 15,
    category: "cv-career",
    blurb: "Build a recruiter ready LinkedIn profile from scratch.",
    longBlurb:
      "A from zero walkthrough for setting up a LinkedIn account that actually attracts offshore recruiters, photo, banner, headline, About section, experience formatting and the privacy settings most people get wrong.",
    includes: ["PDF guide", "Profile section templates", "Recruiter visibility checklist"],
    format: "PDF",
  },
  {
    slug: "offshore-companies-master-list",
    name: "Offshore Companies Master List",
    price: 20,
    category: "lists",
    blurb: "The full global directory: operators, contractors, wind, marine.",
    longBlurb:
      "One consolidated master directory combining UK, Norway, global oil & gas, offshore wind, marine and shipping companies, with hiring contacts where publicly available. The single list to keep if you only buy one.",
    includes: ["Excel + PDF master directory", "Global coverage across sectors", "HR / recruitment contacts", "Quarterly updates for 12 months"],
    format: "XLSX + PDF",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, n = 3): Product[] {
  const me = getProduct(slug);
  if (!me) return [];
  return products.filter((p) => p.slug !== slug && p.category === me.category).slice(0, n);
}
