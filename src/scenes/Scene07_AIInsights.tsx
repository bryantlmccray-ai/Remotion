import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';

export const Scene07_RIFDimensions: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});
	const radarProgress = interpolate(frame, [30, 90], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	const dims = [
		{label: 'Respect', value: 0.88, color: colors.gold},
		{label: 'Intimacy', value: 0.75, color: colors.rose},
		{label: 'Friendship', value: 0.92, color: colors.green},
		{label: 'Trust', value: 0.85, color: colors.blue},
		{label: 'Growth', value: 0.79, color: colors.purple},
	];

	const radarSize = 90;
	const centerX = 130;
	const centerY = 110;

	const getPoint = (index: number, value: number) => {
		const angle = (index * 72 - 90) * (Math.PI / 180);
		const r = radarSize * value * radarProgress;
		return {x: centerX + r * Math.cos(angle), y: centerY + r * Math.sin(angle)};
	};

	const outerPoints = dims.map((_, i) => getPoint(i, 1));
	const valuePoints = dims.map((d, i) => getPoint(i, d.value));

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="25%" y="45%" size={350} color={colors.gold} />
			<GlowOrb x="75%" y="55%" size={250} color={colors.purple} delay={30} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 100px'}}>
				<div style={{flex: 1, opacity: textSlide, transform: `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`}}>
					<div style={{fontFamily: fonts.sans, fontSize: 24, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 16, fontWeight: 'bold'}}>Step 6</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: 72, color: colors.textPrimary, margin: '0 0 16px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						RIF
						<br /><span style={{color: colors.gold}}>Dimensions</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: 24}} />
					<p style={{fontFamily: fonts.sans, fontSize: 28, color: colors.textSecondary, lineHeight: 1.6, maxWidth: 480}}>
						Five pillars of relationship
						<br />health. Visualize your
						<br />strengths & growth areas.
					</p>
				</div>

				<div style={{flex: 1, display: 'flex', justifyContent: 'center', transform: `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={0.95}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '55px 10px 14px'}}>
							<div style={{textAlign: 'center', marginBottom: 6}}>
								<span style={{fontFamily: fonts.serif, fontSize: 14, color: colors.goldLight, letterSpacing: 3}}>MONARK</span>
							</div>
							<h3 style={{fontFamily: fonts.serif, fontSize: 18, color: colors.textPrimary, textAlign: 'center', margin: '0 0 8px 0'}}>RIF Dimensions</h3>

							<div style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>
								<svg width={260} height={220} viewBox="0 0 260 220">
									{[0.25, 0.5, 0.75, 1].map((scale) => (
										<polygon key={scale}
											points={dims.map((_, i) => {const p = getPoint(i, scale); return `${p.x},${p.y}`;}).join(' ')}
											fill="none" stroke={colors.border} strokeWidth={0.5}
										/>
									))}
									{outerPoints.map((p, i) => (
										<line key={i} x1={centerX} y1={centerY} x2={p.x} y2={p.y} stroke={colors.border} strokeWidth={0.5} />
									))}
									<polygon
										points={valuePoints.map((p) => `${p.x},${p.y}`).join(' ')}
										fill={`${colors.gold}20`} stroke={colors.gold} strokeWidth={2}
									/>
									{valuePoints.map((p, i) => (
										<circle key={i} cx={p.x} cy={p.y} r={4} fill={dims[i].color} />
									))}
									{dims.map((d, i) => {
										const labelPoint = getPoint(i, 1.25);
										return (
											<text key={d.label} x={labelPoint.x} y={labelPoint.y} textAnchor="middle" dominantBaseline="middle"
												fill={colors.textSecondary} fontSize={11} fontFamily={fonts.sans}>
												{d.label}
											</text>
										);
									})}
								</svg>
							</div>

							<div style={{display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0 6px', justifyContent: 'center'}}>
								{dims.map((d, i) => {
									const cardAnim = spring({frame: Math.max(0, frame - 60 - i * 8), fps, config: {damping: 14, stiffness: 140}});
									return (
										<div key={d.label} style={{padding: '6px 10px', borderRadius: 8, background: colors.bgGlass, border: `1px solid ${colors.border}`, opacity: cardAnim, textAlign: 'center'}}>
											<div style={{fontFamily: fonts.sans, fontSize: 14, fontWeight: 'bold', color: d.color}}>{Math.round(d.value * 100)}</div>
											<div style={{fontFamily: fonts.sans, fontSize: 9, color: colors.textMuted}}>{d.label}</div>
										</div>
									);
								})}
							</div>
						</div>
					</PhoneMockup>
				</div>
			</div>
		</AbsoluteFill>
	);
};
