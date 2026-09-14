/* Experience and certifications, taken from the owner's LinkedIn profile on
   14 September 2026. The profile carries no role descriptions, so none are
   invented here — add a `summary` line to an entry when there is one to add. */

export type Experience = {
  role: string;
  org: string;
  type: string;
  start: string;
  end: string;
  location: string;
  /** SVG/PNG in public/. When absent, `monogram` is drawn instead. */
  logo?: string;
  monogram?: string;
  summary?: string;
  skills?: string[];
};

export const experience: Experience[] = [
  {
    role: "Digital Transformation Intern",
    org: "Allianz Technology",
    type: "Internship",
    start: "Sep 2025",
    end: "Jan 2026",
    location: "Kuala Lumpur · on-site",
    logo: "/logos/allianz.svg",
  },
  {
    role: "Software Developer",
    org: "Centric Soft Tech Sdn Bhd",
    type: "Internship",
    start: "May 2024",
    end: "Jul 2024",
    location: "Malaysia · on-site",
    monogram: "CS",
    skills: ["Software development", "Web development"],
  },
];

export const certifications = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2026" },
  { name: "AWS Academy Graduate — Generative AI Foundations", issuer: "Amazon Web Services", year: "2025" },
  { name: "AWS Academy Graduate — Machine Learning Foundations", issuer: "Amazon Web Services", year: "2025" },
];
