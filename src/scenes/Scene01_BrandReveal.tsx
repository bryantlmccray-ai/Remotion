import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {GlowOrb} from '../components/GlowOrb';
import {useLayout} from '../utils/useLayout';

export const Scene01_BrandReveal: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {isVertical} = useLayout();

	const logoScale = spring({frame, fps, config: {damping: 16, stiffness: 80, mass: 1}});
	const logoRotation = interpolate(logoScale, [0, 1], [90, 0]);
	const logoOpacity = interpolate(frame, [0, 15], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
	const ringRotate = frame * 0.5;
	const titleProgress = spring({frame: Math.max(0, frame - 25), fps, config: {damping: 14, stiffness: 120}});
	const taglineProgress = spring({frame: Math.max(0, frame - 50), fps, config: {damping: 14, stiffness: 100}});
	const taglineY = interpolate(taglineProgress, [0, 1], [40, 0]);
	const shimmerX = interpolate(frame, [35, 100], [-100, 200], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="30%" y="40%" size={500} color={colors.gold} delay={0} />
			<GlowOrb x="70%" y="60%" size={400} color={colors.rose} delay={50} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
				{/* Compass Rose Logo */}
				<div style={{opacity: logoOpacity, transform: `scale(${logoScale}) rotate(${logoRotation}deg)`, marginBottom: 40}}>
					<svg width={240} height={240} viewBox="0 0 240 240">
						<circle cx={120} cy={120} r={108} fill="none" stroke={colors.gold} strokeWidth={2} opacity={0.5} />
						<g transform={`rotate(${ringRotate}, 120, 120)`}>
							{[0, 90, 180, 270].map((angle) => (
								<React.Fragment key={angle}>
									<line
										x1={120} y1={18} x2={120} y2={42}
										transform={`rotate(${angle}, 120, 120)`}
										stroke={colors.gold} strokeWidth={2.5} opacity={0.7}
									/>
									<polygon
										points="120,42 126,62 120,80 114,62"
										transform={`rotate(${angle}, 120, 120)`}
										fill={colors.gold} opacity={0.4}
									/>
								</React.Fragment>
							))}
						</g>
						<circle cx={120} cy={120} r={65} fill="none" stroke={colors.gold} strokeWidth={1.5} opacity={0.3} />
						<text
							x={120} y={132}
							textAnchor="middle"
							fill={colors.goldLight}
							fontFamily="Georgia, serif"
							fontSize={56}
							fontWeight="bold"
							letterSpacing={6}
						>
							MA
						</text>
					</svg>
				</div>

				{/* MONARK Title */}
				<div style={{opacity: titleProgress, transform: `scale(${interpolate(titleProgress, [0, 1], [0.8, 1])})`, position: 'relative', overflow: 'hidden'}}>
					<h1 style={{
						fontFamily: fonts.serif,
						fontSize: isVertical ? 80 : 100,
						fontWeight: 'bold',
						color: colors.goldLight,
						letterSpacing: 24,
						margin: 0,
					}}>
						MONARK
					</h1>
					<div style={{
						position: 'absolute', top: 0, left: `${shimmerX}%`,
						width: 80, height: '100%',
						background: `linear-gradient(90deg, transparent, ${colors.goldShimmer}40, transparent)`,
						transform: 'skewX(-20deg)',
					}} />
				</div>

				{/* Gold divider */}
				<div style={{
					width: interpolate(titleProgress, [0, 1], [0, 180]),
					height: 2, background: colors.gradientGold,
					marginTop: 28, marginBottom: 28,
				}} />

				{/* Tagline */}
				<p style={{
					fontFamily: fonts.serif,
					fontSize: isVertical ? 32 : 40,
					fontStyle: 'italic',
					color: colors.textSecondary,
					letterSpacing: 8,
					margin: 0,
					opacity: taglineProgress,
					transform: `translateY(${taglineY}px)`,
				}}>
					Date well.
				</p>
			</div>
		</AbsoluteFill>
	);
};
