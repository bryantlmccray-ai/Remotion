import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';
import {useLayout} from '../utils/useLayout';
import {ShieldIcon, SproutIcon, DiamondIcon, LinkIcon, TargetIcon, MountainIcon} from '../components/Icons';

export const Scene04_ValuesAssessment: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const layout = useLayout();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});

	const values = [
		{icon: <ShieldIcon size={24} />, label: 'Trust', delay: 25},
		{icon: <SproutIcon size={24} />, label: 'Growth', delay: 35},
		{icon: <DiamondIcon size={24} />, label: 'Honesty', delay: 45},
		{icon: <LinkIcon size={24} />, label: 'Loyalty', delay: 55},
		{icon: <TargetIcon size={24} />, label: 'Purpose', delay: 65},
		{icon: <MountainIcon size={24} />, label: 'Resilience', delay: 75},
	];
	const selectedIndices = [0, 2, 4];
	const selectFrame = 90;

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="20%" y="50%" size={300} color={colors.gold} />
			<GlowOrb x="75%" y="35%" size={250} color={colors.sage} delay={40} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: layout.containerDirection, alignItems: 'center', padding: layout.containerPadding, justifyContent: layout.isVertical ? 'flex-start' : undefined}}>
				<div style={{flex: layout.isVertical ? undefined : 1, opacity: textSlide, transform: layout.isVertical ? `translateY(${interpolate(textSlide, [0, 1], [-40, 0])}px)` : `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`, textAlign: layout.textAlign}}>
					<div style={{fontFamily: fonts.sans, fontSize: layout.stepFontSize, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: layout.isVertical ? 10 : 16, fontWeight: 'bold'}}>Step 3</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: layout.titleFontSize, color: colors.textPrimary, margin: '0 0 12px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Define Your
						<br /><span style={{color: colors.gold}}>Values</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: layout.isVertical ? 12 : 24, marginLeft: layout.isVertical ? 'auto' : undefined, marginRight: layout.isVertical ? 'auto' : undefined}} />
					<p style={{fontFamily: fonts.sans, fontSize: layout.bodyFontSize, color: colors.textSecondary, lineHeight: 1.6, maxWidth: layout.bodyMaxWidth, margin: layout.isVertical ? '0 auto' : undefined}}>
						What matters most to
						<br />you in a relationship?
						<br />We listen. We learn.
					</p>
				</div>

				<div style={{flex: layout.isVertical ? undefined : 1, display: 'flex', justifyContent: 'center', marginTop: layout.isVertical ? 30 : undefined, transform: layout.isVertical ? `translateY(${interpolate(phoneSlide, [0, 1], [40, 0])}px)` : `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={layout.phoneScale}>
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
											<div style={{marginBottom: 4, display: 'flex', justifyContent: 'center'}}>{v.icon}</div>
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
