import { WorkflowStep } from '../types';

export const workflowHeader = {
  heading: 'Our Workflow',
  gradientWord: 'Workflow',
  subheading: 'Interactive Roadmap. Track our process from concept to delivery!',
};

export const homeWorkflowData: WorkflowStep[] = [
  {
    step: '01',
    title: 'Needs Discovery',
    desc: 'Deep dive into your business challenges.',
    icon: 'Search',
  },
  {
    step: '02',
    title: 'Strategic Blueprint',
    desc: 'Architecture and UI/UX wireframing.',
    icon: 'Map',
  },
  {
    step: '03',
    title: 'Agile Development',
    desc: 'Rapid coding with transparent progress.',
    icon: 'Code',
  },
  {
    step: '04',
    title: 'Stress Testing',
    desc: 'Rigorous QA (Whitebox, Blackbox, Bulk).',
    icon: 'TestTube',
  },
  {
    step: '05',
    title: 'Deployment',
    desc: 'Seamless on-site or cloud launch.',
    icon: 'Rocket',
  },
  {
    step: '06',
    title: 'Sustainable Support',
    desc: 'Maintenance, backups, and updates.',
    icon: 'HeartHandshake',
  },
];

export const servicesWorkflowData: WorkflowStep[] = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We analyze your business logic, audit legacy systems, and define technical requirements.',
    icon: 'Search',
  },
  {
    step: '02',
    title: 'Blueprint',
    desc: 'Our architects design the UI/UX, database schemas, and system workflows.',
    icon: 'Map',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'Agile development sprints with continuous integration and real-time client updates.',
    icon: 'Code',
  },
  {
    step: '04',
    title: 'Test',
    desc: 'Rigorous QA, security penetration testing, and user acceptance testing (UAT).',
    icon: 'TestTube',
  },
  {
    step: '05',
    title: 'Deploy',
    desc: 'Smooth rollout to production servers, app stores, or physical hardware kiosks.',
    icon: 'Rocket',
  },
  {
    step: '06',
    title: 'Support',
    desc: '24/7 SLAs, continuous monitoring, and scalable server maintenance.',
    icon: 'HeartHandshake',
  },
];
