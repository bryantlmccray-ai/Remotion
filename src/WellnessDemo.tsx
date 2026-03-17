import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {Scene01_BrandReveal} from './scenes/Scene01_BrandReveal';
import {Scene02_AppDownload} from './scenes/Scene02_SplashScreen';
import {Scene03_CreateAccount} from './scenes/Scene03_LandingPage';
import {Scene04_ValuesAssessment} from './scenes/Scene04_Onboarding';
import {Scene05_ProfileBuild} from './scenes/Scene05_ProfileCreation';
import {Scene06_WeeklyCheckin} from './scenes/Scene06_WeeklyCheckin';
import {Scene07_RIFDimensions} from './scenes/Scene07_AIInsights';
import {Scene08_AICoaching} from './scenes/Scene08_Discovery';
import {Scene09_Discovery} from './scenes/Scene09_CTA';
import {Scene10_Messaging} from './scenes/Scene10_Messaging';
import {Scene11_DatePlanning} from './scenes/Scene11_DatePlanning';
import {Scene12_RelationshipDashboard} from './scenes/Scene12_Success';
import {Scene13_CTA} from './scenes/Scene13_CTA';
import {FadeTransition} from './components/SceneTransition';

// All scenes at 6 seconds (180 frames at 30fps)
const SCENE_DURATION = 180;

const SCENES = [
	{component: Scene01_BrandReveal, label: 'Brand Reveal'},
	{component: Scene02_AppDownload, label: 'Download App'},
	{component: Scene03_CreateAccount, label: 'Create Account'},
	{component: Scene04_ValuesAssessment, label: 'Values Assessment'},
	{component: Scene05_ProfileBuild, label: 'Build Profile'},
	{component: Scene06_WeeklyCheckin, label: 'Weekly Check-In'},
	{component: Scene07_RIFDimensions, label: 'RIF Dimensions'},
	{component: Scene08_AICoaching, label: 'AI Coaching'},
	{component: Scene09_Discovery, label: 'Discovery'},
	{component: Scene10_Messaging, label: 'Messaging'},
	{component: Scene11_DatePlanning, label: 'Date Planning'},
	{component: Scene12_RelationshipDashboard, label: 'Success Dashboard'},
	{component: Scene13_CTA, label: 'Call to Action'},
];

export const TOTAL_DURATION = SCENES.length * SCENE_DURATION;
// 13 scenes × 180 frames = 2340 frames = 78 seconds

const SceneWithTransition: React.FC<{Scene: React.FC; duration: number}> = ({
	Scene,
	duration,
}) => (
	<AbsoluteFill>
		<Scene />
		<FadeTransition durationIn={12} durationOut={12} totalFrames={duration} />
	</AbsoluteFill>
);

export const WellnessDemo: React.FC = () => {
	return (
		<AbsoluteFill>
			<Series>
				{SCENES.map(({component: SceneComp, label}) => (
					<Series.Sequence key={label} durationInFrames={SCENE_DURATION}>
						<SceneWithTransition Scene={SceneComp} duration={SCENE_DURATION} />
					</Series.Sequence>
				))}
			</Series>
		</AbsoluteFill>
	);
};
