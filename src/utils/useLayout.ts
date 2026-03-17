import {useVideoConfig} from 'remotion';
import React from 'react';

export const useLayout = () => {
	const {width, height} = useVideoConfig();
	const isVertical = height > width;

	return {
		isVertical,
		containerDirection: (isVertical ? 'column' : 'row') as React.CSSProperties['flexDirection'],
		containerPadding: isVertical ? '60px 50px 0' : '0 100px',
		textAlign: (isVertical ? 'center' : 'left') as React.CSSProperties['textAlign'],
		stepFontSize: isVertical ? 20 : 24,
		titleFontSize: isVertical ? 52 : 72,
		bodyFontSize: isVertical ? 22 : 28,
		bodyMaxWidth: isVertical ? 800 : 480,
		phoneScale: isVertical ? 0.82 : 0.95,
		textSlideX: isVertical ? 0 : -80,
		phoneSlideX: isVertical ? 0 : 200,
		textSlideY: isVertical ? -40 : 0,
		phoneSlideY: isVertical ? 40 : 0,
	};
};
