import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';
import {useLayout} from '../utils/useLayout';

export const Scene05_ProfileBuild: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const layout = useLayout();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});
	const ringRotation = frame * 1.2;
	const avatarScale = spring({frame: Math.max(0, frame - 25), fps, config: {damping: 12, stiffness: 100}});

	const fields = [
		{label: 'Bio', value: 'Exploring life with intention ✨', delay: 35},
		{label: 'Location', value: 'Brooklyn, NY', delay: 45},
		{label: 'Age', value: '28', delay: 55},
		{label: 'Looking For', value: 'Meaningful Connection', delay: 65},
	];

	const photoSlots = [0, 1, 2].map((i) =>
		spring({frame: Math.max(0, frame - 80 - i * 8), fps, config: {damping: 14, stiffness: 140}})
	);

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="25%" y="45%" size={300} color={colors.gold} />
			<GlowOrb x="70%" y="55%" size={250} color={colors.rose} delay={30} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: layout.containerDirection, alignItems: 'center', padding: layout.containerPadding, justifyContent: layout.isVertical ? 'flex-start' : undefined}}>
				<div style={{flex: layout.isVertical ? undefined : 1, opacity: textSlide, transform: layout.isVertical ? `translateY(${interpolate(textSlide, [0, 1], [-40, 0])}px)` : `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`, textAlign: layout.textAlign}}>
					<div style={{fontFamily: fonts.sans, fontSize: layout.stepFontSize, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: layout.isVertical ? 10 : 16, fontWeight: 'bold'}}>Step 4</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: layout.titleFontSize, color: colors.textPrimary, margin: '0 0 12px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Build Your
						<br /><span style={{color: colors.gold}}>Profile</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: layout.isVertical ? 12 : 24, marginLeft: layout.isVertical ? 'auto' : undefined, marginRight: layout.isVertical ? 'auto' : undefined}} />
					<p style={{fontFamily: fonts.sans, fontSize: layout.bodyFontSize, color: colors.textSecondary, lineHeight: 1.6, maxWidth: layout.bodyMaxWidth, margin: layout.isVertical ? '0 auto' : undefined}}>
						Show the world who you
						<br />truly are. Authentic profiles
						<br />create real connections.
					</p>
				</div>

				<div style={{flex: layout.isVertical ? undefined : 1, display: 'flex', justifyContent: 'center', marginTop: layout.isVertical ? 30 : undefined, transform: layout.isVertical ? `translateY(${interpolate(phoneSlide, [0, 1], [40, 0])}px)` : `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={layout.phoneScale}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '55px 20px 20px'}}>
							<div style={{textAlign: 'center', marginBottom: 4}}>
								<span style={{fontFamily: fonts.serif, fontSize: 14, color: colors.goldLight, letterSpacing: 3}}>MONARK</span>
							</div>

							<div style={{display: 'flex', justifyContent: 'center', marginBottom: 12}}>
								<div style={{position: 'relative', width: 80, height: 80, transform: `scale(${avatarScale})`}}>
									<svg width={80} height={80} viewBox="0 0 80 80" style={{position: 'absolute', transform: `rotate(${ringRotation}deg)`}}>
										<defs>
											<linearGradient id="avGrad" x1="0%" y1="0%" x2="100%" y2="100%">
												<stop offset="0%" stopColor={colors.gold} />
												<stop offset="50%" stopColor={colors.rose} />
												<stop offset="100%" stopColor={colors.gold} />
											</linearGradient>
										</defs>
										<circle cx={40} cy={40} r={38} fill="none" stroke="url(#avGrad)" strokeWidth={2.5} strokeDasharray="8 4" />
									</svg>
									<div style={{position: 'absolute', inset: 6, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.gold}30, ${colors.rose}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
										<span style={{fontSize: 28}}>👤</span>
									</div>
								</div>
							</div>

							<h3 style={{fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, textAlign: 'center', margin: '0 0 14px 0'}}>Your Profile</h3>

							<div style={{display: 'flex', gap: 8, marginBottom: 14, justifyContent: 'center'}}>
								{photoSlots.map((p, i) => (
									<div key={i} style={{
										width: 75, height: 75, borderRadius: 12,
										background: i === 0 ? `linear-gradient(135deg, ${colors.gold}20, ${colors.rose}15)` : colors.bgGlass,
										border: `1px solid ${i === 0 ? colors.gold : colors.border}`,
										display: 'flex', alignItems: 'center', justifyContent: 'center',
										opacity: p, transform: `scale(${p})`,
									}}>
										<span style={{fontSize: i === 0 ? 24 : 18, opacity: i === 0 ? 1 : 0.4}}>{i === 0 ? '📸' : '+'}</span>
									</div>
								))}
							</div>

							{fields.map((f) => {
								const fieldAnim = spring({frame: Math.max(0, frame - f.delay), fps, config: {damping: 14, stiffness: 140}});
								return (
									<div key={f.label} style={{marginBottom: 8, opacity: fieldAnim, transform: `translateX(${interpolate(fieldAnim, [0, 1], [30, 0])}px)`}}>
										<div style={{padding: '10px 14px', borderRadius: 10, background: colors.bgGlass, border: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
											<span style={{fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1}}>{f.label}</span>
											<span style={{fontFamily: fonts.sans, fontSize: 13, color: colors.textPrimary}}>{f.value}</span>
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
