import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {GlowOrb} from '../components/GlowOrb';
import {useLayout} from '../utils/useLayout';

export const Scene13_CTA: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const {isVertical} = useLayout();

	const titleScale = spring({frame, fps, config: {damping: 14, stiffness: 80, mass: 1}});
	const tagProgress = spring({frame: Math.max(0, frame - 25), fps, config: {damping: 14, stiffness: 100}});
	const statsProgress = spring({frame: Math.max(0, frame - 45), fps, config: {damping: 14, stiffness: 100}});
	const btnProgress = spring({frame: Math.max(0, frame - 70), fps, config: {damping: 14, stiffness: 100}});

	const btnPulse = 1 + 0.04 * Math.sin(frame * 0.12);
	const btnGlow = 0.3 + 0.2 * Math.sin(frame * 0.08);
	const shimmerX = interpolate(frame, [50, 110], [-200, 500], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// Orbiting hearts
	const orbitR = isVertical ? 200 : 300;
	const h1Angle = frame * 1.2 * (Math.PI / 180);
	const h2Angle = h1Angle + Math.PI;

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="50%" y="50%" size={800} color={colors.gold} pulse />
			<GlowOrb x="20%" y="20%" size={400} color={colors.rose} delay={30} />
			<GlowOrb x="80%" y="80%" size={350} color={colors.clay} delay={60} />

			{/* Orbiting hearts */}
			<div style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(${orbitR * Math.cos(h1Angle)}px, ${orbitR * 0.5 * Math.sin(h1Angle)}px)`, fontSize: 28, opacity: 0.4, filter: 'blur(1px)'}}>💛</div>
			<div style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(${orbitR * Math.cos(h2Angle)}px, ${orbitR * 0.5 * Math.sin(h2Angle)}px)`, fontSize: 24, opacity: 0.3, filter: 'blur(1px)'}}>🌹</div>

			<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
				{/* Compass logo small */}
				<div style={{opacity: titleScale, transform: `scale(${titleScale})`, marginBottom: 24}}>
					<svg width={100} height={100} viewBox="0 0 240 240">
						<circle cx={120} cy={120} r={108} fill="none" stroke={colors.gold} strokeWidth={2} opacity={0.5} />
						<circle cx={120} cy={120} r={65} fill="none" stroke={colors.gold} strokeWidth={1.5} opacity={0.3} />
						<text x={120} y={132} textAnchor="middle" fill={colors.goldLight} fontFamily="Georgia, serif" fontSize={56} fontWeight="bold" letterSpacing={6}>MA</text>
					</svg>
				</div>

				{/* MONARK */}
				<div style={{opacity: titleScale, position: 'relative', overflow: 'hidden', marginBottom: 16}}>
					<h1 style={{fontFamily: fonts.serif, fontSize: isVertical ? 72 : 96, fontWeight: 'bold', color: colors.goldLight, letterSpacing: isVertical ? 16 : 24, margin: 0}}>MONARK</h1>
					<div style={{position: 'absolute', top: 0, left: `${shimmerX}px`, width: 100, height: '100%', background: `linear-gradient(90deg, transparent, ${colors.goldShimmer}40, transparent)`, transform: 'skewX(-20deg)'}} />
				</div>

				{/* Tagline */}
				<p style={{fontFamily: fonts.serif, fontSize: isVertical ? 28 : 36, color: colors.textPrimary, margin: '0 0 8px 0', opacity: tagProgress, transform: `translateY(${interpolate(tagProgress, [0, 1], [30, 0])}px)`, textAlign: 'center', padding: isVertical ? '0 40px' : undefined}}>
					Your dating journey deserves
					<br /><span style={{color: colors.gold}}>extraordinary care</span>
				</p>
				<p style={{fontFamily: fonts.sans, fontSize: 20, color: colors.textSecondary, letterSpacing: 2, margin: '0 0 40px 0', opacity: tagProgress}}>
					Join 50,000+ people building meaningful connections
				</p>

				{/* Stats */}
				<div style={{display: 'flex', gap: isVertical ? 16 : 28, marginBottom: isVertical ? 36 : 50, opacity: statsProgress, flexWrap: isVertical ? 'wrap' : undefined, justifyContent: 'center'}}>
					{[{num: '50K+', label: 'Active Users'}, {num: '4.9★', label: 'App Rating'}, {num: '95%', label: 'Satisfaction'}].map(({num, label}, i) => {
						const pillAnim = spring({frame: Math.max(0, frame - 50 - i * 8), fps, config: {damping: 14, stiffness: 140}});
						return (
							<div key={label} style={{padding: isVertical ? '16px 28px' : '20px 36px', borderRadius: 20, background: `${colors.gold}08`, border: `1px solid ${colors.borderBright}`, textAlign: 'center', opacity: pillAnim, transform: `scale(${pillAnim})`}}>
								<div style={{fontFamily: fonts.serif, fontSize: isVertical ? 32 : 42, fontWeight: 'bold', color: colors.gold, lineHeight: 1, marginBottom: 6}}>{num}</div>
								<div style={{fontFamily: fonts.sans, fontSize: 14, color: colors.textSecondary, letterSpacing: 1}}>{label}</div>
							</div>
						);
					})}
				</div>

				{/* CTA Button */}
				<div style={{transform: `scale(${btnPulse})`, opacity: btnProgress, position: 'relative'}}>
					<div style={{position: 'absolute', inset: -10, borderRadius: 50, background: colors.gradientGold, opacity: btnGlow * 0.3, filter: 'blur(20px)'}} />
					<div style={{position: 'relative', background: colors.gradientGold, borderRadius: 50, padding: '22px 64px', boxShadow: `0 8px 40px ${colors.gold}${Math.round(btnGlow * 255).toString(16).padStart(2, '0')}`}}>
						<span style={{fontFamily: fonts.sans, fontSize: 20, fontWeight: 'bold', color: colors.bg, letterSpacing: 3, textTransform: 'uppercase'}}>Begin Your Journey</span>
					</div>
				</div>

				{/* Bottom */}
				<div style={{position: 'absolute', bottom: 40, fontFamily: fonts.sans, fontSize: 14, letterSpacing: 4, color: colors.textMuted, textTransform: 'uppercase',
					opacity: interpolate(frame, [90, 110], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
					monark.app · Date well.
				</div>
			</div>
		</AbsoluteFill>
	);
};
