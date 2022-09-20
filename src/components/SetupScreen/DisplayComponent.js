import React from 'react';
import Button from '../Button';

const DisplayComponent = (props) => {

	const { index, 
			questionText, 
			answerText,
			onClickEdit,
			onClickDelete,
			isFirstCard,
			isLastCard,
			onClickArrowUp,
			onClickArrowDown } = props;

	function edit() {
		onClickEdit(index)
	}

	function _delete() {
		onClickDelete(index)
	}

	function up() {
		onClickArrowUp(index)
	}

	function down() {
		onClickArrowDown(index)
	}

	return (
		<div>
			<div id="cards-container" className="center">

				<div id="outer-card-div">
					<div id="card-div">
						<p id="num">{index + 1}</p>
						<textarea className="textarea" value={questionText.join("")} readOnly></textarea>
						<textarea className="textarea" value={answerText.join("")} readOnly></textarea>
						<Button 
							id={""} 
							className={""} 
							innerText={"Edit"} 
							isDisabled={false} 
							onClick={edit} />
						<Button 
							id={""} 
							className={""} 
							innerText={"Delete"} 
							isDisabled={false} 
							onClick={_delete} />
						<div>
							<Button 
								id={""} 
								className={"arrow-btn"} 
								innerText={"▲"} 
								isDisabled={isFirstCard} 
								onClick={up} />
							<Button 
								id={""} 
								className={"arrow-btn"} 
								innerText={"▼"} 
								isDisabled={isLastCard} 
								onClick={down} />
						</div>
					</div>
				</div>


			</div>
		</div>
	);
}

export default DisplayComponent;