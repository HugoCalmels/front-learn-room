import React from 'react'
import DatePicker from "react-datepicker";
import SubmitButtonComponent from "components/SubmitButtonComponent";

export const TeamForm = ({ handleSubmit, handleChangeName, setStartDate, handleChangeIntensity, startDate, nameEl }) => {
	{/* FORM */ }
	return (
		<>
			<form className="form" id="form-team" onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="name">name</label>
					<input value={nameEl} type="text" id="name" onChange={handleChangeName} />
				</div>
				<div className="input-group">
					<label htmlFor="date">Training start date</label>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						id="date"
					/>
				</div>
				<div className="input-group dFlex">
					<input
						type="radio"
						onChange={handleChangeIntensity}
						id="fullweek"
						name="intensity"
						value="fullweek"
					/>
					<label htmlFor="fullweek">Full week</label>
					<input
						type="radio"
						onChange={handleChangeIntensity}
						id="weekend"
						name="intensity"
						value="weekend"
					/>
					<label htmlFor="weekend">Weekend</label>
				</div>
				<div className="input-group">
					<SubmitButtonComponent type="submit">Submit</SubmitButtonComponent>
				</div>
			</form>
		</>
	)
}
