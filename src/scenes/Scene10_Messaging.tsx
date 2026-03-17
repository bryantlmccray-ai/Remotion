import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';
import {useLayout} from '../utils/useLayout';

export const Scene10_Messaging: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const layout = useLayout();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});

	const messages = [
		{text: 'Hey! I loved your take on growth mindset', sent: false, delay: 30},
		{text: 'Thanks! It\'s something I really value 🌱', sent: true, delay: 50},
		{text: 'Same here. Coffee this weekend?', sent: false, delay: 70},
		{text: 'I\'d love that ☕️', sent: true, delay: 90},
	];

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="20%" y="45%" size={300} color={colors.gold} />
			<GlowOrb x="80%" y="55%" size={250} color={colors.rose} delay={30} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: layout.containerDirection, alignItems: 'center', padding: layout.containerPadding, justifyContent: layout.isVertical ? 'flex-start' : undefined}}>
				<div style={{flex: layout.isVertical ? undefined : 1, opacity: textSlide, transform: layout.isVertical ? `translateY(${interpolate(textSlide, [0, 1], [-40, 0])}px)` : `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`, textAlign: layout.textAlign}}>
					<div style={{fontFamily: fonts.sans, fontSize: layout.stepFontSize, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: layout.isVertical ? 10 : 16, fontWeight: 'bold'}}>Step 9</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: layout.titleFontSize, color: colors.textPrimary, margin: '0 0 12px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Meaningful
						<br /><span style={{color: colors.gold}}>Messaging</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: layout.isVertical ? 12 : 24, marginLeft: layout.isVertical ? 'auto' : undefined, marginRight: layout.isVertical ? 'auto' : undefined}} />
					<p style={{fontFamily: fonts.sans, fontSize: layout.bodyFontSize, color: colors.textSecondary, lineHeight: 1.6, maxWidth: layout.bodyMaxWidth, margin: layout.isVertical ? '0 auto' : undefined}}>
						Conversations that matter.
						<br />Built for depth, not
						<br />small talk.
					</p>
				</div>

				<div style={{flex: layout.isVertical ? undefined : 1, display: 'flex', justifyContent: 'center', marginTop: layout.isVertical ? 30 : undefined, transform: layout.isVertical ? `translateY(${interpolate(phoneSlide, [0, 1], [40, 0])}px)` : `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={layout.phoneScale}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '55px 14px 14px', display: 'flex', flexDirection: 'column'}}>
							{/* Chat header */}
							<div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px 12px', borderBottom: `1px solid ${colors.border}`, marginBottom: 14}}>
								<div style={{width: 36, height: 36, borderRadius: 18, background: `linear-gradient(135deg, ${colors.gold}30, ${colors.rose}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18}}>
									👨‍💼
								</div>
								<div>
									<div style={{fontFamily: fonts.sans, fontSize: 14, color: colors.textPrimary, fontWeight: 'bold'}}>James, 30</div>
									<div style={{fontFamily: fonts.sans, fontSize: 10, color: colors.green}}>Online now</div>
								</div>
								<div style={{marginLeft: 'auto', padding: '4px 8px', borderRadius: 8, background: `${colors.gold}15`, border: `1px solid ${colors.border}`}}>
									<span style={{fontFamily: fonts.sans, fontSize: 10, color: colors.gold}}>94% match</span>
								</div>
							</div>

							{/* Messages */}
							<div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 10}}>
								{messages.map((msg, i) => {
									const msgAnim = spring({frame: Math.max(0, frame - msg.delay), fps, config: {damping: 14, stiffness: 140}});
									return (
										<div key={i} style={{
											display: 'flex',
											justifyContent: msg.sent ? 'flex-end' : 'flex-start',
											opacity: msgAnim,
											transform: `translateY(${interpolate(msgAnim, [0, 1], [20, 0])}px)`,
										}}>
											<div style={{
												maxWidth: '80%',
												padding: '10px 14px',
												borderRadius: msg.sent ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
												background: msg.sent ? colors.gradientGold : colors.bgGlass,
												border: msg.sent ? 'none' : `1px solid ${colors.border}`,
											}}>
												<span style={{
													fontFamily: fonts.sans, fontSize: 13,
													color: msg.sent ? colors.primaryForeground : colors.textPrimary,
													lineHeight: 1.4,
												}}>
													{msg.text}
												</span>
											</div>
										</div>
									);
								})}
							</div>

							{/* Input bar */}
							<div style={{
								display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
								borderRadius: 24, background: colors.bgGlass, border: `1px solid ${colors.border}`,
								marginTop: 12,
								opacity: interpolate(frame, [100, 115], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
							}}>
								<span style={{fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, flex: 1}}>Type a message...</span>
								<div style={{width: 28, height: 28, borderRadius: 14, background: colors.gradientGold, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
									<span style={{fontSize: 12, color: colors.primaryForeground}}>→</span>
								</div>
							</div>
						</div>
					</PhoneMockup>
				</div>
			</div>
		</AbsoluteFill>
	);
};
