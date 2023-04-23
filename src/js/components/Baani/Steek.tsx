
import React from 'react';
import { steekMap } from '@/util';

interface ISteekProps {
	type: string
	shabad: object,
	unicode: boolean,
	fontSize: number,
	isReadingMode?: boolean,
}

const Steek: React.FC<ISteekProps> = ({
	type,
	shabad,
	unicode,
	fontSize: _fontSize,
	isReadingMode = false
}) => {
	const defaultFontSize = '18px';
	const text = steekMap[type](shabad);
	const fontSize = _fontSize ? _fontSize + 'em' : defaultFontSize;
	const steekClass = isReadingMode ? 'reading-mode-steek' : 'steek';
	if (!text)
		return null;

	return (
		<blockquote style={{ fontSize }} className={`${steekClass} ${type}`}>
			{unicode
				? (text.unicode && <div className={`${steekClass} unicode`}>{text.unicode}</div>)
				: (text.gurmukhi && <div className={`${steekClass} gurlipi`}>{text.gurmukhi}</div>)}
		</blockquote>
	);
}

export default Steek;
