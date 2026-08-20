import React from 'react';
import clsx from 'clsx';
import styles from './Tag.module.css';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'amber' | 'steel' | 'telemetry';
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(styles.tag, styles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
