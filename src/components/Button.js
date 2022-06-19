import React from 'react';

const Button = ({id, innerText, className, isDisabled, onClick}) => {
	if (isDisabled) {
		return (
		<div>
				<button id={id} className={className} onClick={onClick} disabled>{innerText}</button>
			</div>
		);
	} else {
		return (
			<div>
				<button id={id} className={className} onClick={onClick}>{innerText}</button>
			</div>
		);
	}
	
}

export default Button;