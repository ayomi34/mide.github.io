export type ThemeColor = 'indigo' | 'emerald' | 'amber' | 'rose' | 'cyan';

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  timezone: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  twitter: string;
  statusText: string;
  avatarUrl: string;
  yearsExperience: number;
  completedProjects: number;
  satisfiedClients: number;
  openSourceContributions: number;
  hourlyRate: string;
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'devops' | 'tools';
  proficiency: number; // 0 - 100
  years: number;
  iconName: string;
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: 'ai' | 'saas' | 'mobile' | 'opensource' | 'web';
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  architecture: string[];
  clientQuote?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  relationship: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  serviceType: string;
  budget: string;
  message: string;
  timestamp: string;
}
