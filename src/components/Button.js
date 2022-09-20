import React from 'react';

const Button = ({id, innerText, className, isDisabled, onClick}) => {
	return (
		<div>
			<button id={id} className={className} onClick={onClick} 
				disabled={isDisabled}>{innerText}</button>
		</div>
	);	
}

export default Button;