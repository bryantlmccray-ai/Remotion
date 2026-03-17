import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const useFadeIn = (startFrame = 0, duration = 12) => {
	const frame = useCurrentFrame();
	return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
};

export const useSlideUp = (startFrame = 0, distance = 80) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		frame: Math.max(0, frame - startFrame),
		fps,
		config: {damping: 14, stiffness: 140, mass: 0.7},
	});
	return `translateY(${(1 - progress) * distance}px)`;
};

export const useSlideIn = (
	startFrame = 0,
	distance = 100,
	direction: 'left' | 'right' = 'left'
) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		frame: Math.max(0, frame - startFrame),
		fps,
		config: {damping: 14, stiffness: 120, mass: 0.8},
	});
	const sign = direction === 'left' ? -1 : 1;
	return `translateX(${sign * (1 - progress) * distance}px)`;
};

export const useScale = (startFrame = 0, fromScale = 0.7, toScale = 1) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		frame: Math.max(0, frame - startFrame),
		fps,
		config: {damping: 12, stiffness: 120, mass: 0.6},
	});
	return interpolate(progress, [0, 1], [fromScale, toScale]);
};

export const springAnim = (
	frame: number,
	startFrame: number,
	fps: number,
	config = {}
) => {
	return spring({
		frame: Math.max(0, frame - startFrame),
		fps,
		config: {damping: 14, stiffness: 140, mass: 0.7, ...config},
	});
};
