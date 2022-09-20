import React from 'react';

const FlashCardCount = ({ count }) => {
	return (
		<div>
			<p id="card-count">{`Flash Cards: ${count}`}</p>
		</div>
	);
}

export default FlashCardCount;