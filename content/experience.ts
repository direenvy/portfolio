/* Experience and certifications, taken from the owner's LinkedIn profile on
   14 September 2026. The profile carries no role descriptions, so none are
   invented here — add a `summary` line to an entry when there is one to add. */

export type Experience = {
  period: string;
  role: string;
  org: string;
  type: string;
  location: string;
  /** Small employer mark shown at the end of the row, in public/. */
  logo?: string;
  summary?: string;
};

export const experience: Experience[] = [
  {
    period: "Sep 2025 – Jan 2026",
    role: "Digital Transformation Intern",
    org: "Allianz Technology",
    type: "Internship",
    location: "Kuala Lumpur",
    logo: "/logos/allianz.svg",
  },
  {
    period: "May – Jul 2024",
    role: "Software Developer",
    org: "Centric Soft Tech Sdn Bhd",
    type: "Internship",
    location: "Malaysia",
  },
];

export const certifications = [
  { period: "2026", name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
  { period: "2025", name: "AWS Academy Graduate — Generative AI Foundations", issuer: "Amazon Web Services" },
  { period: "2025", name: "AWS Academy Graduate — Machine Learning Foundations", issuer: "Amazon Web Services" },
];
