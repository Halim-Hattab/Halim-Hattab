export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  tools: string[];
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Language {
  name: string;
  level: string;
  proficiency: number; // 0-100
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
}

export type MediaItem = {
  type: 'image' | 'video';
  src: string | { desktop: string; mobile: string }; // Can be a single URL or responsive URLs
};

export interface PortfolioItem {
  title: string;
  description: string;
  media: MediaItem[]; // Array to hold multiple media items
  tags: string[];
  externalLink?: { // Optional external link
    url: string;
    text: string;
  };
}
