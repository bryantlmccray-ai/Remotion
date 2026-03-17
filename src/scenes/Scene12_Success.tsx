import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';
import {useLayout} from '../utils/useLayout';

export const Scene12_RelationshipDashboard: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const layout = useLayout();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});

	// Animated counter
	const daysCount = Math.min(Math.floor(interpolate(frame, [40, 100], [0, 127], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})), 127);
	const streakCount = Math.min(Math.floor(interpolate(frame, [50, 100], [0, 14], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})), 14);

	const milestones = [
		{icon: '🏆', label: 'First Check-in', done: true, delay: 45},
		{icon: '💬', label: '100 Messages', done: true, delay: 55},
		{icon: '🌟', label: 'Values Aligned', done: true, delay: 65},
		{icon: '❤️', label: 'Perfect Week', done: true, delay: 75},
		{icon: '🎯', label: 'Growth Master', done: false, delay: 85},
	];

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="25%" y="45%" size={350} color={colors.gold} />
			<GlowOrb x="75%" y="55%" size={300} color={colors.green} delay={30} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: layout.containerDirection, alignItems: 'center', padding: layout.containerPadding, justifyContent: layout.isVertical ? 'flex-start' : undefined}}>
				<div style={{flex: layout.isVertical ? undefined : 1, opacity: textSlide, transform: layout.isVertical ? `translateY(${interpolate(textSlide, [0, 1], [-40, 0])}px)` : `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`, textAlign: layout.textAlign}}>
					<div style={{fontFamily: fonts.sans, fontSize: layout.stepFontSize, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: layout.isVertical ? 10 : 16, fontWeight: 'bold'}}>Step 11</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: layout.titleFontSize, color: colors.textPrimary, margin: '0 0 12px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Track Your
						<br /><span style={{color: colors.gold}}>Success</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: layout.isVertical ? 12 : 24, marginLeft: layout.isVertical ? 'auto' : undefined, marginRight: layout.isVertical ? 'auto' : undefined}} />
					<p style={{fontFamily: fonts.sans, fontSize: layout.bodyFontSize, color: colors.textSecondary, lineHeight: 1.6, maxWidth: layout.bodyMaxWidth, margin: layout.isVertical ? '0 auto' : undefined}}>
						Celebrate milestones.
						<br />Watch your relationship
						<br />flourish over time.
					</p>
				</div>

				<div style={{flex: layout.isVertical ? undefined : 1, display: 'flex', justifyContent: 'center', marginTop: layout.isVertical ? 30 : undefined, transform: layout.isVertical ? `translateY(${interpolate(phoneSlide, [0, 1], [40, 0])}px)` : `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={layout.phoneScale}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '55px 16px 16px'}}>
							<div style={{textAlign: 'center', marginBottom: 6}}>
								<span style={{fontFamily: fonts.serif, fontSize: 14, color: colors.goldLight, letterSpacing: 3}}>MONARK</span>
							</div>
							<h3 style={{fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, textAlign: 'center', margin: '0 0 12px 0'}}>Your Journey</h3>

							{/* Stats row */}
							<div style={{display: 'flex', gap: 8, marginBottom: 14}}>
								<StatBox label="Days Active" value={`${daysCount}`} color={colors.gold} />
								<StatBox label="Week Streak" value={`${streakCount}`} color={colors.green} />
								<StatBox label="Wellness" value="87" color={colors.terracotta} />
							</div>

							{/* Growth chart (simplified) */}
							<div style={{
								padding: '12px', borderRadius: 14,
								background: colors.bgGlass, border: `1px solid ${colors.border}`,
								marginBottom: 12,
								opacity: interpolate(frame, [35, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
							}}>
								<div style={{fontFamily: fonts.sans, fontSize: 10, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8}}>Growth Over Time</div>
								<svg width="100%" height={50} viewBox="0 0 260 50">
									{/* Growth line */}
									<polyline
										points={(() => {
											const chartProgress = interpolate(frame, [45, 110], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
											const pts = [0,35, 30,30, 60,28, 90,20, 120,22, 150,15, 180,12, 210,8, 240,5, 260,3];
											const visibleCount = Math.floor(chartProgress * (pts.length / 2)) * 2;
											return pts.slice(0, Math.max(2, visibleCount)).reduce((acc, val, i) => {
												if (i % 2 === 0) return acc + `${val},`;
												return acc + `${val} `;
											}, '');
										})()}
										fill="none" stroke={colors.gold} strokeWidth={2} strokeLinecap="round"
									/>
								</svg>
							</div>

							{/* Milestones */}
							<div style={{fontFamily: fonts.sans, fontSize: 10, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8}}>Milestones</div>
							{milestones.map((m) => {
								const mAnim = spring({frame: Math.max(0, frame - m.delay), fps, config: {damping: 14, stiffness: 140}});
								return (
									<div key={m.label} style={{
										display: 'flex', alignItems: 'center', gap: 8,
										padding: '8px 10px', borderRadius: 10,
										background: m.done ? `${colors.gold}08` : colors.bgGlass,
										border: `1px solid ${m.done ? colors.gold + '30' : colors.border}`,
										marginBottom: 6, opacity: mAnim,
										transform: `translateX(${interpolate(mAnim, [0, 1], [20, 0])}px)`,
									}}>
										<span style={{fontSize: 16}}>{m.icon}</span>
										<span style={{fontFamily: fonts.sans, fontSize: 12, color: m.done ? colors.textPrimary : colors.textMuted, flex: 1}}>{m.label}</span>
										{m.done && <span style={{fontSize: 12, color: colors.gold}}>✓</span>}
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

const StatBox: React.FC<{label: string; value: string; color: string}> = ({label, value, color}) => (
	<div style={{flex: 1, padding: '10px 8px', borderRadius: 12, background: colors.bgGlass, border: `1px solid ${colors.border}`, textAlign: 'center'}}>
		<div style={{fontFamily: fonts.sans, fontSize: 22, fontWeight: 'bold', color}}>{value}</div>
		<div style={{fontFamily: fonts.sans, fontSize: 9, color: colors.textMuted}}>{label}</div>
	</div>
);
