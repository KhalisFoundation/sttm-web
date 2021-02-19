
import React from 'react';
import { steekMap } from '@/util';

interface ISteekProps {
	type: string
	shabad: object,
	unicode: boolean,
	fontSize: number,
}

const Steek: React.FC<ISteekProps> = ({
	type,
	shabad,
	unicode,
}) => {
	const text = steekMap[type](shabad);
	if (!text)
		return null;

	return (
		<blockquote className={`steek ${type}`}>
			{unicode
				? (text.unicode && <div className="unicode">{text.unicode}</div>)
				: (text.gurmukhi && <div className="gurlipi">{text.gurmukhi}</div>)}
		</blockquote>
	);
}

export default Steek;