import React from 'react';
import { Cpu, ShieldCheck, Wrench, Zap, Server, Clock } from 'lucide-react';

export const ICON_MAP: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-10 h-10" />,
  ShieldCheck: <ShieldCheck className="w-10 h-10" />,
  Wrench: <Wrench className="w-10 h-10" />,
  Zap: <Zap className="w-10 h-10" />,
  Server: <Server className="w-10 h-10" />,
  Clock: <Clock className="w-10 h-10" />,
};

export const BIG_ICON_MAP: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-40 h-40" />,
  ShieldCheck: <ShieldCheck className="w-40 h-40" />,
  Wrench: <Wrench className="w-40 h-40" />,
  Zap: <Zap className="w-40 h-40" />,
  Server: <Server className="w-40 h-40" />,
  Clock: <Clock className="w-40 h-40" />,
};

export const CARD_STYLES = [
  {
    card: 'bg-gradient-to-br from-primary/18 via-primary/10 to-transparent',
    iconBox: 'bg-primary/12 border border-primary/25',
    iconColor: 'text-primary',
    bigIconColor: 'text-primary/80',
  },
  {
    card: 'bg-gradient-to-br from-accent/18 via-accent/10 to-transparent',
    iconBox: 'bg-accent/12 border border-accent/25',
    iconColor: 'text-accent',
    bigIconColor: 'text-accent/80',
  },
  {
    card: 'bg-gradient-to-br from-primary/18 via-accent/12 to-transparent',
    iconBox: 'bg-white/5 border border-border',
    iconColor: 'text-accent',
    bigIconColor: 'text-primary/80',
  },
];
