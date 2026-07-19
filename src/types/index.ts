export type Lang = 'es' | 'en';

export interface Dict {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  whatIs: {
    title: string;
    description: string;
    pillars: { title: string; desc: string }[];
  };
  problem: {
    title: string;
    tagline: string;
    before: string[];
    after: string[];
  };
  privacy: {
    title: string;
    description: string;
    points: { title: string; desc: string }[];
  };
  howItWorks: {
    title: string;
    steps: { label: string; desc: string }[];
  };
  features: {
    title: string;
    items: { title: string; desc: string; highlight?: string }[];
  };
  techStack: {
    title: string;
  };
  architecture: {
    title: string;
  };
  audience: {
    title: string;
    items: { title: string; desc: string }[];
    message: string;
  };
  roadmap: {
    title: string;
    items: { hash: string; message: string }[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  donate: {
    title: string;
    sponsors: string;
    paypal: string;
    btc: string;
  };
  cta: {
    title: string;
    docker: string;
    github: string;
    docs: string;
    discord: string;
    copy: string;
    copied: string;
  };
  footer: {
    version: string;
    license: string;
    craft: string;
    nav: string;
    connect: string;
    links: {
      github: string;
      docs: string;
      issues: string;
      discussions: string;
      license: string;
    };
  };
  header: {
    nav: string[];
    docs: string;
  };
}
