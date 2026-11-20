export type Lang = 'es' | 'en';

export interface Dict {
  hero: {
    title: string;
    subtitle: string;
  };
  whatIs: {
    title: string;
    description: string;
    pillars: { title: string; desc: string }[];
  };
  problem: {
    title: string;
    before: { title?: string; text: string }[];
    after: { title?: string; text: string }[];
  };
  privacy: {
    title: string;
    description: string;
    points: { title: string; desc: string }[];
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
  };
  roadmap: {
    title: string;
    loading: string;
    empty: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  donate: {
    message: string;
    button: string;
  };
  clipboard: {
    copy: string;
    copied: string;
  };
  footer: {
    tagline: string;
    nav: string;
    connect: string;
    navLinks: {
      features: string;
      architecture: string;
      faq: string;
      privacy: string;
    };
    connectLinks: {
      github: string;
      docs: string;
      reportBug: string;
      license: string;
    };
  };
  header: {
    nav: { id: string; label: string }[];
    docs: string;
  };
}
