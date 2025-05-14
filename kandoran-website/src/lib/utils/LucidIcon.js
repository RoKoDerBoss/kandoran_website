import React from "react";
import * as LucideIcons from "lucide-react";

export const LucidIcon = ({ name, size = 24, color = "currentColor" }) => {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent size={size} color={color} />;
};