import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'elevated' | 'glass' | 'interactive';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'standard',
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(styles.card, styles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};
