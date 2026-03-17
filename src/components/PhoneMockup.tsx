import React from 'react';
import {colors} from '../utils/colors';

interface PhoneMockupProps {
	children: React.ReactNode;
	scale?: number;
	style?: React.CSSProperties;
	glowColor?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
	children,
	scale = 1,
	style,
	glowColor = colors.gold,
}) => {
	const phoneW = 320 * scale;
	const phoneH = 680 * scale;
	const borderR = 44 * scale;
	const border = 3 * scale;

	return (
		<div
			style={{
				width: phoneW,
				height: phoneH,
				borderRadius: borderR,
				border: `${border}px solid`,
				borderColor: colors.borderBright,
				background: colors.bgCard,
				position: 'relative',
				overflow: 'hidden',
				boxShadow: `
					0 0 0 ${border}px ${colors.bgCard},
					0 40px 120px rgba(0,0,0,0.8),
					0 0 80px ${glowColor}25,
					inset 0 1px 0 rgba(255,255,255,0.1)
				`,
				...style,
			}}
		>
			{/* Dynamic Island */}
			<div
				style={{
					position: 'absolute',
					top: 12 * scale,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 90 * scale,
					height: 26 * scale,
					borderRadius: 13 * scale,
					background: '#000',
					zIndex: 100,
				}}
			/>
			{/* Screen glow */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `linear-gradient(180deg, ${glowColor}08 0%, transparent 30%)`,
					pointerEvents: 'none',
					zIndex: 50,
				}}
			/>
			{/* Content */}
			<div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
				{children}
			</div>
		</div>
	);
};
