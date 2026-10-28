import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  showTagline?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ showTagline = false, className = "", size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? 28 : size === "lg" ? 44 : 36;
  const textSize = size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl";
  const taglineSize = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Brand Icon */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1677FF" />
              <stop offset="100%" stopColor="#0B57D0" />
            </linearGradient>
          </defs>
          {/* Speed streaks */}
          <rect x="18" y="28" width="16" height="5" rx="2.5" fill="#1677FF" />
          <rect x="22" y="37" width="14" height="5" rx="2.5" fill="#1677FF" />
          <rect x="26" y="46" width="13" height="5" rx="2.5" fill="#1677FF" />
          {/* Cart handle & frame */}
          <path
            d="M24 19 H34 L45 56 H77 L85 24 H38"
            stroke="#0B1739"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Basket fill */}
          <path
            d="M40 28 H82 L75 52 H46 Z"
            fill="url(#blueGrad)"
          />
          {/* Shopping bag inside basket */}
          <path
            d="M56 34 H66 L68 47 H54 Z"
            fill="#FFFFFF"
          />
          <path
            d="M58 34 C58 31 64 31 64 34"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Wheels */}
          <circle cx="49" cy="67" r="6" fill="#0B1739" />
          <circle cx="73" cy="67" r="6" fill="#0B1739" />
        </svg>
      </div>

      {/* Brand Name & Optional Tagline */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight ${textSize} leading-none flex items-center`}>
          <span className="text-[#0B1739]">Shop</span>
          <span className="text-[#1677FF]">Ease</span>
        </div>
        {showTagline && (
          <span className={`${taglineSize} text-slate-500 font-medium tracking-wide mt-0.5`}>
            Shop More • Live Better
          </span>
        )}
      </div>
    </Link>
  );
}
