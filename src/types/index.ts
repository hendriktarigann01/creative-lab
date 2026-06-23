export interface NavItem {
  name: string;
  path: string;
}

export interface SocialLink {
  name: string;
  path: string;
  icon: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavItem[];
}

export interface ServiceFeature {
  title: string;
  desc?: string;
  items?: string[];
}

export interface Service {
  title: string;
  desc: string;
  icon: string;
  color: string;
  slug: string;
  features: string[];
  link: string;
}

export interface Advantage {
  title: string;
  desc: string;
  icon: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
  icon: string;
  duration?: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  desc: string;
  link: string;
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'location';
  label: string;
  value: string;
  icon: string;
  link: string;
}

export interface ServiceDetail {
  slug: string;
  tagline: string;
  desc: string;
  highlights: string[];
  stat: string;
}

export interface TimelinePhase {
  phase: string;
  title: string;
  desc: string;
  position: 'left' | 'right';
}
