import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';

export const Scene08_AICoaching: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});

	const aiMessage = "Your communication improved 12% this week. Keep expressing vulnerability — it builds deeper trust.";
	const charCount = Math.min(Math.floor(interpolate(frame, [35, 120], [0, aiMessage.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})), aiMessage.length);
	const typedMessage = aiMessage.substring(0, charCount);
	const showCursor = charCount < aiMessage.length && Math.sin(frame * 0.2) > 0;

	const insights = [
		{icon: '📈', label: 'Communication', trend: '+12%', color: colors.green, delay: 80},
		{icon: '💛', label: 'Trust Level', trend: 'Strong', color: colors.gold, delay: 95},
		{icon: '🎯', label: 'Next Goal', trend: 'Active Listening', color: colors.blue, delay: 110},
	];

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="20%" y="45%" size={300} color={colors.gold} />
			<GlowOrb x="80%" y="55%" size={250} color={colors.blue} delay={30} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 100px'}}>
				<div style={{flex: 1, opacity: textSlide, transform: `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`}}>
					<div style={{fontFamily: fonts.sans, fontSize: 24, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 16, fontWeight: 'bold'}}>Step 7</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: 72, color: colors.textPrimary, margin: '0 0 16px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						AI
						<br /><span style={{color: colors.gold}}>Coaching</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: 24}} />
					<p style={{fontFamily: fonts.sans, fontSize: 28, color: colors.textSecondary, lineHeight: 1.6, maxWidth: 480}}>
						Personalized insights
						<br />powered by AI. Your
						<br />relationship coach, 24/7.
					</p>
				</div>

				<div style={{flex: 1, display: 'flex', justifyContent: 'center', transform: `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={0.95}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '55px 16px 16px'}}>
							<div style={{textAlign: 'center', marginBottom: 6}}>
								<span style={{fontFamily: fonts.serif, fontSize: 14, color: colors.goldLight, letterSpacing: 3}}>MONARK</span>
							</div>
							<h3 style={{fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, textAlign: 'center', margin: '0 0 14px 0'}}>AI Coach</h3>

							<div style={{display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start'}}>
								<div style={{width: 36, height: 36, borderRadius: 18, background: colors.gradientGold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
									<span style={{fontSize: 16}}>🤖</span>
								</div>
								<div style={{flex: 1, padding: '12px 14px', borderRadius: '4px 16px 16px 16px', background: colors.gradientCard, border: `1px solid ${colors.border}`}}>
									<span style={{fontFamily: fonts.sans, fontSize: 13, color: colors.textPrimary, lineHeight: 1.5}}>
										{typedMessage}{showCursor ? '▎' : ''}
									</span>
								</div>
							</div>

							{insights.map((insight) => {
								const cardAnim = spring({frame: Math.max(0, frame - insight.delay), fps, config: {damping: 14, stiffness: 140}});
								return (
									<div key={insight.label} style={{
										display: 'flex', alignItems: 'center', gap: 10,
										padding: '10px 12px', borderRadius: 12, background: colors.bgGlass,
										border: `1px solid ${colors.border}`, marginBottom: 8,
										opacity: cardAnim, transform: `translateX(${interpolate(cardAnim, [0, 1], [30, 0])}px)`,
									}}>
										<span style={{fontSize: 22}}>{insight.icon}</span>
										<div style={{flex: 1}}>
											<div style={{fontFamily: fonts.sans, fontSize: 13, color: colors.textPrimary, fontWeight: 'bold'}}>{insight.label}</div>
										</div>
										<div style={{fontFamily: fonts.sans, fontSize: 14, fontWeight: 'bold', color: insight.color}}>{insight.trend}</div>
									</div>
								);
							})}

							<div style={{
								marginTop: 12, padding: '10px 0', borderRadius: 20, background: colors.gradientGold, textAlign: 'center',
								opacity: spring({frame: Math.max(0, frame - 130), fps, config: {damping: 14, stiffness: 140}}),
							}}>
								<span style={{fontFamily: fonts.sans, fontSize: 13, fontWeight: 'bold', color: colors.bg}}>VIEW FULL INSIGHTS</span>
							</div>
						</div>
					</PhoneMockup>
				</div>
			</div>
		</AbsoluteFill>
	);
};
