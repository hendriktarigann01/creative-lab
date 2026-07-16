export interface WorkflowStepConstant {
  id: string;
  imageLightDesktop: string;
  imageDarkDesktop: string;
  imageLightMobile: string;
  imageDarkMobile: string;
}

export const WORKFLOW_STEPS: WorkflowStepConstant[] = [
  {
    id: 'discovery',
    imageLightDesktop: '/workflow/desktop/flow-1.webp',
    imageDarkDesktop: '/workflow/desktop/flow-1-dark.webp',
    imageLightMobile: '/workflow/mobile/flow-1.webp',
    imageDarkMobile: '/workflow/mobile/flow-1-dark.webp',
  },
  {
    id: 'blueprint',
    imageLightDesktop: '/workflow/desktop/flow-2.webp',
    imageDarkDesktop: '/workflow/desktop/flow-2-dark.webp',
    imageLightMobile: '/workflow/mobile/flow-2.webp',
    imageDarkMobile: '/workflow/mobile/flow-2-dark.webp',
  },
  {
    id: 'build',
    imageLightDesktop: '/workflow/desktop/flow-3.webp',
    imageDarkDesktop: '/workflow/desktop/flow-3-dark.webp',
    imageLightMobile: '/workflow/mobile/flow-3.webp',
    imageDarkMobile: '/workflow/mobile/flow-3-dark.webp',
  },
  {
    id: 'test',
    imageLightDesktop: '/workflow/desktop/flow-4.webp',
    imageDarkDesktop: '/workflow/desktop/flow-4-dark.webp',
    imageLightMobile: '/workflow/mobile/flow-4.webp',
    imageDarkMobile: '/workflow/mobile/flow-4-dark.webp',
  },
  {
    id: 'deploy',
    imageLightDesktop: '/workflow/desktop/flow-5.webp',
    imageDarkDesktop: '/workflow/desktop/flow-5-dark.webp',
    imageLightMobile: '/workflow/mobile/flow-5.webp',
    imageDarkMobile: '/workflow/mobile/flow-5-dark.webp',
  },
  {
    id: 'support',
    imageLightDesktop: '/workflow/desktop/flow-6.webp',
    imageDarkDesktop: '/workflow/desktop/flow-6-dark.webp',
    imageLightMobile: '/workflow/mobile/flow-6.webp',
    imageDarkMobile: '/workflow/mobile/flow-6-dark.webp',
  },
];
