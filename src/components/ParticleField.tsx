import React from 'react';
import {useCurrentFrame} from 'remotion';
import {colors} from '../utils/colors';

// Pentagon particles — the RIF dimension shape from the app
interface Particle {
	x: number;
	y: number;
	size: number;
	speed: number;
	opacity: number;
	rotation: number;
	isGold: boolean;
}

const PARTICLES: Particle[] = Array.from({length: 20}, (_, i) => ({
	x: (i * 137.508) % 100,
	y: (i * 73.21) % 120 - 10,
	size: 3 + (i % 4) * 2,
	speed: 0.006 + (i % 5) * 0.003,
	opacity: 0.12 + (i % 4) * 0.08,
	rotation: (i * 47) % 360,
	isGold: i % 3 !== 0,
}));

const Pentagon: React.FC<{size: number; color: string; opacity: number; rotation: number}> = ({
	size,
	color,
	opacity,
	rotation,
}) => {
	// Pentagon path
	const points = Array.from({length: 5}, (_, i) => {
		const angle = (i * 72 - 90) * (Math.PI / 180);
		return `${50 + 50 * Math.cos(angle)},${50 + 50 * Math.sin(angle)}`;
	}).join(' ');

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 100 100"
			style={{
				opacity,
				transform: `rotate(${rotation}deg)`,
				filter: `blur(${Math.min(size * 0.1, 1)}px)`,
			}}
		>
			<polygon points={points} fill={color} />
		</svg>
	);
};

export const ParticleField: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				overflow: 'hidden',
				pointerEvents: 'none',
			}}
		>
			{PARTICLES.map((p, i) => {
				const y = ((p.y + frame * p.speed * 80) % 120) - 10;
				const drift = Math.sin(frame * 0.012 + i) * 2;
				const rot = p.rotation + frame * 0.3;
				const pulse = 0.5 + 0.5 * Math.sin(frame * 0.04 + i * 0.7);
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${p.x + drift}%`,
							top: `${y}%`,
						}}
					>
						<Pentagon
							size={p.size}
							color={p.isGold ? colors.gold : colors.rose}
							opacity={p.opacity * pulse}
							rotation={rot}
						/>
					</div>
				);
			})}
		</div>
	);
};
