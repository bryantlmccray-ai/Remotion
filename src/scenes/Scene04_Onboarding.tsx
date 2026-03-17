import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';

export const Scene04_ValuesAssessment: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});

	const values = [
		{emoji: '💛', label: 'Trust', delay: 25},
		{emoji: '🌱', label: 'Growth', delay: 35},
		{emoji: '✨', label: 'Honesty', delay: 45},
		{emoji: '🤝', label: 'Loyalty', delay: 55},
		{emoji: '🎯', label: 'Purpose', delay: 65},
		{emoji: '💪', label: 'Resilience', delay: 75},
	];
	const selectedIndices = [0, 2, 4];
	const selectFrame = 90;

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="20%" y="50%" size={300} color={colors.gold} />
			<GlowOrb x="75%" y="35%" size={250} color={colors.lavender} delay={40} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 100px'}}>
				<div style={{flex: 1, opacity: textSlide, transform: `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`}}>
					<div style={{fontFamily: fonts.sans, fontSize: 24, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 16, fontWeight: 'bold'}}>Step 3</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: 72, color: colors.textPrimary, margin: '0 0 16px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Define Your
						<br /><span style={{color: colors.gold}}>Values</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: 24}} />
					<p style={{fontFamily: fonts.sans, fontSize: 28, color: colors.textSecondary, lineHeight: 1.6, maxWidth: 480}}>
						What matters most to
						<br />you in a relationship?
						<br />We listen. We learn.
					</p>
				</div>

				<div style={{flex: 1, display: 'flex', justifyContent: 'center', transform: `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={0.95}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '60px 20px 24px'}}>
							<div style={{textAlign: 'center', marginBottom: 6}}>
								<span style={{fontFamily: fonts.serif, fontSize: 14, color: colors.goldLight, letterSpacing: 3}}>MONARK</span>
							</div>
							<h3 style={{fontFamily: fonts.serif, fontSize: 22, color: colors.textPrimary, textAlign: 'center', margin: '0 0 8px 0'}}>Your Core Values</h3>
							<p style={{fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, textAlign: 'center', margin: '0 0 20px 0'}}>Select what resonates with you</p>

							<div style={{display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
								{values.map((v, i) => {
									const appear = spring({frame: Math.max(0, frame - v.delay), fps, config: {damping: 14, stiffness: 140}});
									const isSelected = selectedIndices.includes(i);
									const selectAnim = isSelected ? spring({frame: Math.max(0, frame - selectFrame - i * 5), fps, config: {damping: 14, stiffness: 160}}) : 0;

									return (
										<div key={v.label} style={{
											width: 120, padding: '14px 8px', borderRadius: 16,
											background: isSelected && selectAnim > 0.5 ? `linear-gradient(135deg, ${colors.gold}20, ${colors.gold}10)` : colors.bgGlass,
											border: `1.5px solid ${isSelected && selectAnim > 0.5 ? colors.gold : colors.border}`,
											textAlign: 'center', opacity: appear,
											transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px) scale(${isSelected ? 1 + selectAnim * 0.05 : 1})`,
										}}>
											<div style={{fontSize: 28, marginBottom: 4}}>{v.emoji}</div>
											<div style={{fontFamily: fonts.sans, fontSize: 13, color: isSelected && selectAnim > 0.5 ? colors.gold : colors.textSecondary, fontWeight: isSelected ? 'bold' : 'normal'}}>{v.label}</div>
											{isSelected && selectAnim > 0.5 && <div style={{fontSize: 14, color: colors.gold, marginTop: 2, opacity: selectAnim}}>✓</div>}
										</div>
									);
								})}
							</div>

							<div style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24}}>
								<div style={{width: 8, height: 8, borderRadius: 4, background: colors.gold}} />
								<div style={{width: 8, height: 8, borderRadius: 4, background: colors.gold}} />
								<div style={{width: 24, height: 8, borderRadius: 4, background: colors.gold}} />
								<div style={{width: 8, height: 8, borderRadius: 4, background: colors.border}} />
							</div>
						</div>
					</PhoneMockup>
				</div>
			</div>
		</AbsoluteFill>
	);
};
