import React from 'react';
import {colors} from '../utils/colors';

interface IconProps {
	size?: number;
	color?: string;
}

const defaultSize = 20;

// --- Values icons ---
export const ShieldIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.gold}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
	</svg>
);

export const SproutIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.sage}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M7 20h10" />
		<path d="M12 20v-8" />
		<path d="M12 12C12 8 8 4 4 4c0 4 4 8 8 8z" />
		<path d="M12 12c0-4 4-8 8-8 0 4-4 8-8 8z" />
	</svg>
);

export const DiamondIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.gold}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
	</svg>
);

export const LinkIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.gold}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
		<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
	</svg>
);

export const TargetIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.terracotta}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<circle cx={12} cy={12} r={10} />
		<circle cx={12} cy={12} r={6} />
		<circle cx={12} cy={12} r={2} />
	</svg>
);

export const MountainIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.terracotta}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="m8 3 4 8 5-5 2 15H2L8 3z" />
	</svg>
);

// --- Profile / UI icons ---
export const UserIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.textSecondary}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
		<circle cx={12} cy={7} r={4} />
	</svg>
);

export const CameraIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.textSecondary}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
		<circle cx={12} cy={13} r={3} />
	</svg>
);

// --- AI / Insight icons ---
export const BrainIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.gold}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1 2 3.46 4 4 0 0 1-.46 7.54H12V2z" />
		<path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0-2 3.46 4 4 0 0 0 .46 7.54H12V2z" />
		<path d="M12 2v15" />
	</svg>
);

export const TrendUpIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.green}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
		<polyline points="16 7 22 7 22 13" />
	</svg>
);

// --- Date / Activity icons ---
export const CoffeeIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.terracotta}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M17 8h1a4 4 0 1 1 0 8h-1" />
		<path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
		<line x1={6} y1={2} x2={6} y2={4} />
		<line x1={10} y1={2} x2={10} y2={4} />
		<line x1={14} y1={2} x2={14} y2={4} />
	</svg>
);

export const PaletteIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.rose}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<circle cx={13.5} cy={6.5} r={0.5} fill={color} />
		<circle cx={17.5} cy={10.5} r={0.5} fill={color} />
		<circle cx={8.5} cy={7.5} r={0.5} fill={color} />
		<circle cx={6.5} cy={12.5} r={0.5} fill={color} />
		<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c0.93 0 1.5-0.65 1.5-1.5 0-0.39-0.14-0.74-0.39-1.02a1.46 1.46 0 0 1 1.09-2.48h1.8C19.14 17 22 14.14 22 10.5 22 5.8 17.5 2 12 2z" />
	</svg>
);

export const LeafIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.sage}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z" />
		<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
	</svg>
);

export const SparkleIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.gold}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
	</svg>
);

// --- Milestone icons ---
export const TrophyIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.gold}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
		<path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
		<path d="M4 22h16" />
		<path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
		<path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
		<path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
	</svg>
);

export const ChatIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.gold}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
	</svg>
);

export const StarIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.gold}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
	</svg>
);

export const HeartIcon: React.FC<IconProps> = ({size = defaultSize, color = colors.rose}) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
		<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
	</svg>
);

// --- Styled initial avatar (replaces person emojis) ---
export const InitialAvatar: React.FC<{letter: string; size?: number; color?: string; bgColor?: string}> = ({
	letter, size = 22, color = colors.textPrimary, bgColor,
}) => (
	<span style={{
		display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
		width: size, height: size, borderRadius: '50%',
		background: bgColor || `linear-gradient(135deg, ${colors.gold}25, ${colors.rose}20)`,
		fontFamily: "'Georgia', serif", fontSize: size * 0.48,
		fontWeight: 'bold', color, letterSpacing: 0,
	}}>
		{letter}
	</span>
);
