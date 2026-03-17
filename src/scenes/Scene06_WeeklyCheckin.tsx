import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';

export const Scene06_WeeklyCheckin: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});
	const score = Math.min(Math.floor(interpolate(frame, [40, 110], [0, 87], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})), 87);

	const dimensions = [
		{label: 'Emotional', value: 92, color: colors.gold, delay: 35},
		{label: 'Communication', value: 78, color: colors.terracotta, delay: 45},
		{label: 'Trust', value: 95, color: colors.green, delay: 55},
		{label: 'Growth', value: 81, color: colors.sage, delay: 65},
		{label: 'Intimacy', value: 73, color: colors.rose, delay: 75},
	];

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="20%" y="50%" size={300} color={colors.gold} />
			<GlowOrb x="80%" y="40%" size={250} color={colors.green} delay={30} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 100px'}}>
				<div style={{flex: 1, opacity: textSlide, transform: `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`}}>
					<div style={{fontFamily: fonts.sans, fontSize: 24, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 16, fontWeight: 'bold'}}>Step 5</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: 72, color: colors.textPrimary, margin: '0 0 16px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Weekly
						<br /><span style={{color: colors.gold}}>Check-In</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: 24}} />
					<p style={{fontFamily: fonts.sans, fontSize: 28, color: colors.textSecondary, lineHeight: 1.6, maxWidth: 480}}>
						Measure what truly matters.
						<br />Track your relationship
						<br />wellness every week.
					</p>
				</div>

				<div style={{flex: 1, display: 'flex', justifyContent: 'center', transform: `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={0.95}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '55px 18px 18px'}}>
							<div style={{textAlign: 'center', marginBottom: 6}}>
								<span style={{fontFamily: fonts.serif, fontSize: 14, color: colors.goldLight, letterSpacing: 3}}>MONARK</span>
							</div>
							<h3 style={{fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, textAlign: 'center', margin: '0 0 12px 0'}}>Weekly Wellness</h3>

							<div style={{display: 'flex', justifyContent: 'center', marginBottom: 16}}>
								<div style={{position: 'relative', width: 100, height: 100}}>
									<svg width={100} height={100} viewBox="0 0 100 100">
										<circle cx={50} cy={50} r={42} fill="none" stroke={colors.border} strokeWidth={6} />
										<circle cx={50} cy={50} r={42} fill="none" stroke={colors.gold} strokeWidth={6}
											strokeDasharray={`${2 * Math.PI * 42}`}
											strokeDashoffset={2 * Math.PI * 42 * (1 - score / 100)}
											strokeLinecap="round" transform="rotate(-90, 50, 50)"
										/>
									</svg>
									<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
										<span style={{fontFamily: fonts.sans, fontSize: 28, fontWeight: 'bold', color: colors.gold}}>{score}</span>
										<span style={{fontFamily: fonts.sans, fontSize: 9, color: colors.textMuted}}>WELLNESS</span>
									</div>
								</div>
							</div>

							{dimensions.map((d) => {
								const dimAnim = spring({frame: Math.max(0, frame - d.delay), fps, config: {damping: 14, stiffness: 140}});
								const barWidth = interpolate(dimAnim, [0, 1], [0, d.value]);
								return (
									<div key={d.label} style={{marginBottom: 8, opacity: dimAnim}}>
										<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 3}}>
											<span style={{fontFamily: fonts.sans, fontSize: 12, color: colors.textSecondary}}>{d.label}</span>
											<span style={{fontFamily: fonts.sans, fontSize: 12, fontWeight: 'bold', color: d.color}}>{Math.round(barWidth)}%</span>
										</div>
										<div style={{width: '100%', height: 6, borderRadius: 3, background: colors.bgGlass}}>
											<div style={{width: `${barWidth}%`, height: '100%', borderRadius: 3, background: d.color}} />
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
