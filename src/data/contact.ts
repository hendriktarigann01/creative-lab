import { ContactInfo } from '../types';

export const contactHeader = {
  heading: 'Your Vision, Our Code.',
  gradientWord: 'Our Code.',
  subheading:
    "Stop looking for separate vendors for hardware and software. Get the synergistic solution you deserve. Let's Innovate Together.",
};

export const contactInfoData: ContactInfo[] = [
  {
    type: 'email',
    label: 'Email',
    value: 'hello.creativelab@mjsolution.co.id',
    icon: 'Mail',
    link: 'mailto:hello.creativelab@mjsolution.co.id',
  },
  {
    type: 'phone',
    label: 'Phone',
    value: '+62 812 3456 7890',
    icon: 'Phone',
    link: 'tel:+6281234567890',
  },
];
