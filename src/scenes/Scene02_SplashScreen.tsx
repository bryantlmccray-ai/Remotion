import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';
import {useLayout} from '../utils/useLayout';

export const Scene02_AppDownload: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const layout = useLayout();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 15), fps, config: {damping: 12, stiffness: 80, mass: 1.2}});
	const phoneX = layout.isVertical ? 0 : interpolate(phoneSlide, [0, 1], [300, 0]);
	const phoneY = layout.isVertical ? interpolate(phoneSlide, [0, 1], [60, 0]) : interpolate(phoneSlide, [0, 0.5, 1], [40, -20, 0]);
	const screenGlow = interpolate(frame, [40, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const downloads = Math.min(Math.floor(interpolate(frame, [60, 140], [0, 50], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})), 50);

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="20%" y="50%" size={350} color={colors.gold} />
			<GlowOrb x="80%" y="40%" size={250} color={colors.rose} delay={30} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: layout.containerDirection, alignItems: 'center', padding: layout.containerPadding, justifyContent: layout.isVertical ? 'flex-start' : undefined}}>
				<div style={{flex: layout.isVertical ? undefined : 1, transform: layout.isVertical ? `translateY(${interpolate(textSlide, [0, 1], [-40, 0])}px)` : `translateX(${interpolate(textSlide, [0, 1], [-100, 0])}px)`, opacity: textSlide, textAlign: layout.textAlign}}>
					<div style={{fontFamily: fonts.sans, fontSize: layout.stepFontSize, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: layout.isVertical ? 10 : 16, fontWeight: 'bold'}}>Step 1</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: layout.isVertical ? 56 : 76, color: colors.textPrimary, margin: '0 0 12px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Download
						<br /><span style={{color: colors.gold}}>MonArk</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: layout.isVertical ? 12 : 24, marginLeft: layout.isVertical ? 'auto' : undefined, marginRight: layout.isVertical ? 'auto' : undefined}} />
					<p style={{fontFamily: fonts.sans, fontSize: layout.bodyFontSize, color: colors.textSecondary, lineHeight: 1.6, maxWidth: layout.bodyMaxWidth, margin: layout.isVertical ? '0 auto' : undefined}}>
						Available on iOS & Android.
						<br />Your journey to meaningful
						<br />connection starts here.
					</p>
					<div style={{display: 'flex', gap: 24, marginTop: layout.isVertical ? 16 : 32, justifyContent: layout.isVertical ? 'center' : undefined, opacity: interpolate(frame, [80, 100], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
						<StatPill label="Downloads" value={`${downloads}K+`} />
						<StatPill label="Rating" value="4.9★" />
					</div>
				</div>

				<div style={{flex: layout.isVertical ? undefined : 1, display: 'flex', justifyContent: 'center', marginTop: layout.isVertical ? 30 : undefined, transform: `translateX(${phoneX}px) translateY(${phoneY}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={layout.phoneScale}>
						<div style={{width: '100%', height: '100%', background: `linear-gradient(180deg, ${colors.bgCard} 0%, ${colors.bg} 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: screenGlow}}>
							<div style={{width: 80, height: 80, borderRadius: 20, background: colors.gradientGold, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: `0 8px 30px ${colors.gold}40`}}>
								<span style={{fontFamily: fonts.serif, fontSize: 32, fontWeight: 'bold', color: colors.bg}}>MA</span>
							</div>
							<span style={{fontFamily: fonts.serif, fontSize: 22, color: colors.goldLight, letterSpacing: 4}}>MONARK</span>
							<span style={{fontFamily: fonts.serif, fontSize: 13, color: colors.textMuted, fontStyle: 'italic', marginTop: 6}}>Date well.</span>
							<div style={{marginTop: 40, padding: '14px 48px', borderRadius: 30, background: colors.gradientGold, opacity: interpolate(frame, [70, 85], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
								<span style={{fontFamily: fonts.sans, fontSize: 16, fontWeight: 'bold', color: colors.bg}}>GET STARTED</span>
							</div>
						</div>
					</PhoneMockup>
				</div>
			</div>
		</AbsoluteFill>
	);
};

const StatPill: React.FC<{label: string; value: string}> = ({label, value}) => (
	<div style={{padding: '12px 24px', borderRadius: 16, background: colors.gradientCard, border: `1px solid ${colors.border}`}}>
		<div style={{fontFamily: fonts.sans, fontSize: 30, fontWeight: 'bold', color: colors.gold}}>{value}</div>
		<div style={{fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted}}>{label}</div>
	</div>
);
