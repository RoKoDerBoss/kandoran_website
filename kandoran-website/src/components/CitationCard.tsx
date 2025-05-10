import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface CitationCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const CitationCard: React.FC<CitationCardProps> = ({ children, className, title }) => {
  return (
    <Card className={className}>
      {title && <CardHeader>{title}</CardHeader>}
      <CardContent>{children}</CardContent>
    </Card>
  );
}; 