import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';
import {useLayout} from '../utils/useLayout';

export const Scene09_Discovery: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const layout = useLayout();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});

	const profiles = [
		{emoji: '👨‍💼', name: 'James', age: 30, compat: 94, delay: 30},
		{emoji: '👩‍🎨', name: 'Sophie', age: 27, compat: 87, delay: 45},
		{emoji: '👨‍🔬', name: 'Marcus', age: 32, compat: 82, delay: 60},
		{emoji: '👩‍⚕️', name: 'Elena', age: 29, compat: 91, delay: 75},
	];

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="20%" y="45%" size={300} color={colors.gold} />
			<GlowOrb x="75%" y="55%" size={300} color={colors.rose} delay={30} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: layout.containerDirection, alignItems: 'center', padding: layout.containerPadding, justifyContent: layout.isVertical ? 'flex-start' : undefined}}>
				<div style={{flex: layout.isVertical ? undefined : 1, opacity: textSlide, transform: layout.isVertical ? `translateY(${interpolate(textSlide, [0, 1], [-40, 0])}px)` : `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`, textAlign: layout.textAlign}}>
					<div style={{fontFamily: fonts.sans, fontSize: layout.stepFontSize, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: layout.isVertical ? 10 : 16, fontWeight: 'bold'}}>Step 8</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: layout.titleFontSize, color: colors.textPrimary, margin: '0 0 12px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Discover
						<br /><span style={{color: colors.gold}}>Connections</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: layout.isVertical ? 12 : 24, marginLeft: layout.isVertical ? 'auto' : undefined, marginRight: layout.isVertical ? 'auto' : undefined}} />
					<p style={{fontFamily: fonts.sans, fontSize: layout.bodyFontSize, color: colors.textSecondary, lineHeight: 1.6, maxWidth: layout.bodyMaxWidth, margin: layout.isVertical ? '0 auto' : undefined}}>
						Values-first matching.
						<br />Find people who truly
						<br />resonate with you.
					</p>
				</div>

				<div style={{flex: layout.isVertical ? undefined : 1, display: 'flex', justifyContent: 'center', marginTop: layout.isVertical ? 30 : undefined, transform: layout.isVertical ? `translateY(${interpolate(phoneSlide, [0, 1], [40, 0])}px)` : `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={layout.phoneScale}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '55px 16px 16px'}}>
							<div style={{textAlign: 'center', marginBottom: 6}}>
								<span style={{fontFamily: fonts.serif, fontSize: 14, color: colors.goldLight, letterSpacing: 3}}>MONARK</span>
							</div>
							<h3 style={{fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, textAlign: 'center', margin: '0 0 14px 0'}}>Discovery</h3>

							{/* Filter tags */}
							<div style={{display: 'flex', gap: 6, marginBottom: 14, justifyContent: 'center',
								opacity: interpolate(frame, [20, 35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
								{['Values Match', 'Nearby', 'Growth'].map((tag) => (
									<div key={tag} style={{padding: '4px 10px', borderRadius: 20, background: `${colors.gold}15`, border: `1px solid ${colors.border}`, fontSize: 10, color: colors.gold}}>
										{tag}
									</div>
								))}
							</div>

							{/* Profile cards */}
							{profiles.map((p) => {
								const cardAnim = spring({frame: Math.max(0, frame - p.delay), fps, config: {damping: 14, stiffness: 140}});
								return (
									<div key={p.name} style={{
										display: 'flex', alignItems: 'center', gap: 12,
										padding: '12px', borderRadius: 14, background: colors.bgGlass,
										border: `1px solid ${colors.border}`, marginBottom: 8,
										opacity: cardAnim, transform: `translateX(${interpolate(cardAnim, [0, 1], [40, 0])}px)`,
									}}>
										<div style={{width: 44, height: 44, borderRadius: 22, background: `linear-gradient(135deg, ${colors.gold}20, ${colors.rose}15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0}}>
											{p.emoji}
										</div>
										<div style={{flex: 1}}>
											<div style={{fontFamily: fonts.sans, fontSize: 14, color: colors.textPrimary, fontWeight: 'bold'}}>{p.name}, {p.age}</div>
											<div style={{fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted}}>Values aligned</div>
										</div>
										<div style={{padding: '4px 10px', borderRadius: 12, background: `${colors.gold}15`, border: `1px solid ${colors.gold}30`}}>
											<span style={{fontFamily: fonts.sans, fontSize: 13, fontWeight: 'bold', color: colors.gold}}>{p.compat}%</span>
										</div>
									</div>
								);
							})}
						</div>
					</PhoneMockup>
				</div>
			</div>
		</AbsoluteFill>
	);
};
