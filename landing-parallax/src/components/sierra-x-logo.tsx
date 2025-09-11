"use client";

import React from 'react';
import Image from 'next/image';

interface SierraXLogoProps {
  className?: string;
  isScrolled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function SierraXLogo({ className = "", isScrolled = false, size = 'medium' }: SierraXLogoProps) {
  const sizes = {
    small: { container: "h-16 w-48", width: 500, height: 200 },
    medium: { container: "h-20 w-60", width: 600, height: 240 },
    large: { container: "h-24 w-72", width: 700, height: 280 }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Image */}
      <div className={`${currentSize.container} overflow-hidden rounded-lg`}>
        <Image
          src="/logo-sierrax.jpg"
          alt="SierraX Logo"
          width={currentSize.width}
          height={currentSize.height}
          className="h-full w-full object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
