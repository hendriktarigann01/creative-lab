import { NavItem, SocialLink, FooterLinkGroup } from '../types';

export const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/our-services' },
  { name: 'Portfolio', path: '/#portfolio' },
  { name: 'Contact', path: '/#contact' },
];

export const ctaItem = {
  name: 'Get Started',
  path: '/#contact',
};

export const socialLinks: SocialLink[] = [
  { name: 'Phone', path: 'tel:+6281234567890', icon: 'Phone' },
  { name: 'Mail', path: 'mailto:hello@creative-lab.co.id', icon: 'Mail' },
  { name: 'Globe', path: '#', icon: 'Globe' },
];

export const companyLinks: FooterLinkGroup = {
  title: 'Company',
  links: [
    { name: 'About Us', path: '/#about' },
    { name: 'Services', path: '/our-services' },
    { name: 'Portfolio', path: '/#portfolio' },
    { name: 'Careers', path: '#careers' }, // note: careers in existing footer links
  ],
};

export const legalLinks: FooterLinkGroup = {
  title: 'Legal',
  links: [
    { name: 'Privacy Policy', path: '#privacy' },
    { name: 'Terms of Service', path: '#terms' },
    { name: 'Cookie Policy', path: '#cookies' },
  ],
};
