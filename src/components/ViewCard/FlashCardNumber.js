import React from 'react';

const FlashCardNumber = ({ index, count }) => {

	let num = index + 1;

	return (
		<div>
			<p id="card-number">{`${num} / ${count}`}</p>
		</div>
	);
}

export default FlashCardNumber;