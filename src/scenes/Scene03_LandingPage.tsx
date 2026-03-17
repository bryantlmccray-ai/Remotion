import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../utils/colors';
import {ParticleField} from '../components/ParticleField';
import {PhoneMockup} from '../components/PhoneMockup';
import {GlowOrb} from '../components/GlowOrb';

export const Scene03_CreateAccount: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const textSlide = spring({frame: Math.max(0, frame - 5), fps, config: {damping: 14, stiffness: 120}});
	const phoneSlide = spring({frame: Math.max(0, frame - 12), fps, config: {damping: 12, stiffness: 80, mass: 1.1}});

	const field1 = spring({frame: Math.max(0, frame - 30), fps, config: {damping: 14, stiffness: 140}});
	const field2 = spring({frame: Math.max(0, frame - 42), fps, config: {damping: 14, stiffness: 140}});
	const field3 = spring({frame: Math.max(0, frame - 54), fps, config: {damping: 14, stiffness: 140}});
	const field4 = spring({frame: Math.max(0, frame - 66), fps, config: {damping: 14, stiffness: 140}});

	const nameText = 'Jordan M.';
	const nameChars = Math.min(Math.floor(interpolate(frame, [50, 80], [0, nameText.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})), nameText.length);
	const typedName = nameText.substring(0, nameChars);
	const cursorBlink = Math.sin(frame * 0.2) > 0;

	return (
		<AbsoluteFill style={{background: colors.bg}}>
			<div style={{position: 'absolute', inset: 0, background: colors.gradientBg}} />
			<ParticleField />
			<GlowOrb x="25%" y="45%" size={300} color={colors.gold} />

			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 100px'}}>
				<div style={{flex: 1, opacity: textSlide, transform: `translateX(${interpolate(textSlide, [0, 1], [-80, 0])}px)`}}>
					<div style={{fontFamily: fonts.sans, fontSize: 24, color: colors.gold, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 16, fontWeight: 'bold'}}>Step 2</div>
					<h2 style={{fontFamily: fonts.serif, fontSize: 72, color: colors.textPrimary, margin: '0 0 16px 0', lineHeight: 1.1, fontWeight: 'bold'}}>
						Create Your
						<br /><span style={{color: colors.gold}}>Account</span>
					</h2>
					<div style={{width: 120, height: 3, background: colors.gradientGold, marginBottom: 24}} />
					<p style={{fontFamily: fonts.sans, fontSize: 28, color: colors.textSecondary, lineHeight: 1.6, maxWidth: 480}}>
						Quick, secure sign-up.
						<br />Your data stays private,
						<br />always.
					</p>
				</div>

				<div style={{flex: 1, display: 'flex', justifyContent: 'center', transform: `translateX(${interpolate(phoneSlide, [0, 1], [200, 0])}px)`, opacity: phoneSlide}}>
					<PhoneMockup scale={0.95}>
						<div style={{width: '100%', height: '100%', background: colors.bg, padding: '60px 24px 24px'}}>
							<div style={{textAlign: 'center', marginBottom: 28}}>
								<span style={{fontFamily: fonts.serif, fontSize: 18, color: colors.goldLight, letterSpacing: 3}}>MONARK</span>
							</div>
							<h3 style={{fontFamily: fonts.serif, fontSize: 24, color: colors.textPrimary, textAlign: 'center', margin: '0 0 28px 0'}}>Create Account</h3>

							<FormField label="Full Name" value={`${typedName}${cursorBlink && nameChars < nameText.length ? '|' : ''}`} opacity={field1} />
							<FormField label="Email" value="jordan@email.com" opacity={field2} />
							<FormField label="Password" value="••••••••" opacity={field3} />

							<div style={{marginTop: 24, padding: '14px 0', borderRadius: 30, background: colors.gradientGold, textAlign: 'center', opacity: field4, transform: `translateY(${interpolate(field4, [0, 1], [20, 0])}px)`}}>
								<span style={{fontFamily: fonts.sans, fontSize: 15, fontWeight: 'bold', color: colors.bg}}>CREATE ACCOUNT</span>
							</div>

							<div style={{display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', opacity: field4}}>
								<div style={{flex: 1, height: 1, background: colors.border}} />
								<span style={{fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted}}>OR</span>
								<div style={{flex: 1, height: 1, background: colors.border}} />
							</div>

							<div style={{display: 'flex', gap: 12, opacity: field4}}>
								<SocialBtn icon="G" label="Google" />
								<SocialBtn icon="🍎" label="Apple" />
							</div>
						</div>
					</PhoneMockup>
				</div>
			</div>
		</AbsoluteFill>
	);
};

const FormField: React.FC<{label: string; value: string; opacity: number}> = ({label, value, opacity}) => (
	<div style={{marginBottom: 16, opacity, transform: `translateY(${interpolate(opacity, [0, 1], [15, 0])}px)`}}>
		<div style={{fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1}}>{label}</div>
		<div style={{padding: '12px 16px', borderRadius: 12, background: colors.bgGlass, border: `1px solid ${colors.border}`}}>
			<span style={{fontFamily: fonts.sans, fontSize: 15, color: colors.textPrimary}}>{value}</span>
		</div>
	</div>
);

const SocialBtn: React.FC<{icon: string; label: string}> = ({icon, label}) => (
	<div style={{flex: 1, padding: '12px 0', borderRadius: 12, background: colors.bgGlass, border: `1px solid ${colors.border}`, textAlign: 'center'}}>
		<span style={{fontFamily: fonts.sans, fontSize: 14, color: colors.textSecondary}}>{icon} {label}</span>
	</div>
);
