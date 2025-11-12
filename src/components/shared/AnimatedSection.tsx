'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
  [key: string]: any;
};

export const AnimatedSection = React.forwardRef<HTMLElement, AnimatedSectionProps>(
    ({ children, className, delay = 0, ...props }, ref) => {
        return (
            <motion.section
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay }}
                className={cn(className)}
                {...props}
            >
                {children}
            </motion.section>
        );
    }
);

AnimatedSection.displayName = 'AnimatedSection';
