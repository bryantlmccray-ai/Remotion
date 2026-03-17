import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';
import {useLayout} from '../utils/useLayout';

export const Scene11_DatePlanning: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const layout = useLayout();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});

	const dateIdeas = [
		{icon: '☕️', title: 'Coffee & Walk', location: 'Blue Bottle, DUMBO', time: 'Sat 10am', delay: 35},
		{icon: '🎨', title: 'Art Gallery Night', location: 'MoMA PS1', time: 'Fri 7pm', delay: 50},
		{icon: '🌿', title: 'Botanical Garden', location: 'Brooklyn Botanic', time: 'Sun 2pm', delay: 65},
	];

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="25%" y="45%" size={300} color={colors.gold} />
			<GlowOrb x="75%" y="55%" size={250} color={colors.rose} delay={30} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: layout.containerDirection, alignItems: 'center', padding: layout.containerPadding, justifyContent: layout.isVertical ? 'flex-start' : undefined}}>
				<div style={{flex: layout.isVertical ? undefined : 1, opacity: textSlide, transform: layout.isVertical ? `translateY(${interpolate(textSlide, [0, 1], [-40, 0])}px)` : `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`, textAlign: layout.textAlign}}>
					<div style={{fontFamily: fonts.sans, fontSize: layout.stepFontSize, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: layout.isVertical ? 10 : 16, fontWeight: 'bold'}}>Step 10</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: layout.titleFontSize, color: colors.textPrimary, margin: '0 0 12px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Plan the
						<br /><span style={{color: colors.gold}}>Perfect Date</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: layout.isVertical ? 12 : 24, marginLeft: layout.isVertical ? 'auto' : undefined, marginRight: layout.isVertical ? 'auto' : undefined}} />
					<p style={{fontFamily: fonts.sans, fontSize: layout.bodyFontSize, color: colors.textSecondary, lineHeight: 1.6, maxWidth: layout.bodyMaxWidth, margin: layout.isVertical ? '0 auto' : undefined}}>
						AI-curated date ideas
						<br />tailored to your shared
						<br />interests and values.
					</p>
				</div>

				<div style={{flex: layout.isVertical ? undefined : 1, display: 'flex', justifyContent: 'center', marginTop: layout.isVertical ? 30 : undefined, transform: layout.isVertical ? `translateY(${interpolate(phoneSlide, [0, 1], [40, 0])}px)` : `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={layout.phoneScale}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '55px 16px 16px'}}>
							<div style={{textAlign: 'center', marginBottom: 6}}>
								<span style={{fontFamily: fonts.serif, fontSize: 14, color: colors.goldLight, letterSpacing: 3}}>MONARK</span>
							</div>
							<h3 style={{fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, textAlign: 'center', margin: '0 0 6px 0'}}>Date Planner</h3>
							<p style={{fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, textAlign: 'center', margin: '0 0 16px 0'}}>Curated for you & James</p>

							{/* AI suggestion */}
							<div style={{
								padding: '12px 14px', borderRadius: 14,
								background: colors.gradientCard, border: `1px solid ${colors.border}`,
								marginBottom: 14,
								opacity: interpolate(frame, [25, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
							}}>
								<div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6}}>
									<span style={{fontSize: 14}}>✨</span>
									<span style={{fontFamily: fonts.sans, fontSize: 10, color: colors.gold, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1}}>AI Pick</span>
								</div>
								<div style={{fontFamily: fonts.sans, fontSize: 12, color: colors.textPrimary, lineHeight: 1.4}}>
									Based on your shared love of art, try an evening gallery walk!
								</div>
							</div>

							{/* Date idea cards */}
							{dateIdeas.map((d) => {
								const cardAnim = spring({frame: Math.max(0, frame - d.delay), fps, config: {damping: 14, stiffness: 140}});
								return (
									<div key={d.title} style={{
										display: 'flex', alignItems: 'center', gap: 12,
										padding: '12px', borderRadius: 14, background: colors.bgGlass,
										border: `1px solid ${colors.border}`, marginBottom: 8,
										opacity: cardAnim, transform: `translateY(${interpolate(cardAnim, [0, 1], [20, 0])}px)`,
									}}>
										<div style={{width: 44, height: 44, borderRadius: 12, background: `${colors.gold}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0}}>
											{d.icon}
										</div>
										<div style={{flex: 1}}>
											<div style={{fontFamily: fonts.sans, fontSize: 14, color: colors.textPrimary, fontWeight: 'bold'}}>{d.title}</div>
											<div style={{fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted}}>{d.location}</div>
										</div>
										<div style={{fontFamily: fonts.sans, fontSize: 11, color: colors.gold, fontWeight: 'bold'}}>{d.time}</div>
									</div>
								);
							})}

							{/* Plan button */}
							<div style={{
								marginTop: 12, padding: '12px 0', borderRadius: 24, background: colors.gradientGold, textAlign: 'center',
								opacity: spring({frame: Math.max(0, frame - 90), fps, config: {damping: 14, stiffness: 140}}),
							}}>
								<span style={{fontFamily: fonts.sans, fontSize: 14, fontWeight: 'bold', color: colors.bg}}>PLAN THIS DATE</span>
							</div>
						</div>
					</PhoneMockup>
				</div>
			</div>
		</AbsoluteFill>
	);
};
