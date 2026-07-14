import React from 'react';
import { Briefcase, Users, Boxes, MonitorSmartphone, CalendarCheck2, Gamepad2 } from 'lucide-react';

export interface CategoryConstant {
  key: string;
  categoryName: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const PRODUCT_CATEGORIES: CategoryConstant[] = [
  {
    key: 'business-operations',
    categoryName: 'Business Operations',
    icon: Briefcase,
  },
  {
    key: 'workforce',
    categoryName: 'Workforce & Human Capital',
    icon: Users,
  },
  {
    key: 'industry',
    categoryName: 'Industry Solutions',
    icon: Boxes,
  },
  {
    key: 'smart-cms',
    categoryName: 'Smart CMS',
    icon: MonitorSmartphone,
  },
  {
    key: 'event-registration',
    categoryName: 'Event & Registration',
    icon: CalendarCheck2,
  },
  {
    key: 'play-lab',
    categoryName: 'Play Lab',
    icon: Gamepad2,
  },
];
