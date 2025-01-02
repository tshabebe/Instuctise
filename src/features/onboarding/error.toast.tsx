'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/primitives/icon';

export function Toaster({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute inset-0 z-50 mx-auto mt-2 flex size-fit items-center gap-2 rounded-lg border border-red-elevation-1-border bg-red-elevation-1 px-4 py-1.5 text-xs font-medium text-red-text-primary"
    >
      <Icon name="CircleX" />
      <span>{message}</span>
    </motion.div>
  );
}
