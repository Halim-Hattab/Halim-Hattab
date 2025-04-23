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

export interface PortfolioItem {
  title: string;
  description: string;
  type: 'image' | 'video';
  url: string;
  tags: string[];
}