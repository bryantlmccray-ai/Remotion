import React from 'react';
import {colors} from '../utils/colors';

export const GoldDivider: React.FC<{width?: string}> = ({width = '80px'}) => (
	<div
		style={{
			width,
			height: 2,
			background: colors.gradientGold,
			borderRadius: 1,
		}}
	/>
);
