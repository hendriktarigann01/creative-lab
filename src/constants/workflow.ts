export interface WorkflowStepConstant {
  id: string;
  image: string;
}

export const WORKFLOW_STEPS: WorkflowStepConstant[] = [
  { id: 'discovery', image: '/workflow/flow-1.webp' },
  { id: 'blueprint', image: '/workflow/flow-2.webp' },
  { id: 'build', image: '/workflow/flow-3.webp' },
  { id: 'test', image: '/workflow/flow-4.webp' },
  { id: 'deploy', image: '/workflow/flow-5.webp' },
  { id: 'support', image: '/workflow/flow-6.webp' },
];
