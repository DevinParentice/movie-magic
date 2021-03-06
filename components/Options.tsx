import { useState } from "react";
import styles from "../styles/modules/Home.module.scss";

export default function Options() {
	const [selects, setSelects] = useState(["select0"]);
	const [inputs, setInputs] = useState([]);
	const [chosenOptions, setChosenOptions] = useState({});

	const [options] = useState([
		{
			name: "worked on by",
			value: "directed-by",
		},
		{
			name: "starring",
			value: "starring-in",
		},
		{
			name: "with the genre",
			value: "genres",
		},
		{
			name: "released in the year",
			value: "release-year",
		},
		{
			name: "released before the year",
			value: "release-year-before",
		},
		{
			name: "released after the year",
			value: "release-year-after",
		},
		{
			name: "with a rating greater than",
			value: "rating-higher",
		},
		{
			name: "with a rating less than",
			value: "rating-lower",
		},
		{
			name: "with more ratings than",
			value: "rating-count-higher",
		},
		{
			name: "with less ratings than",
			value: "rating-count-lower",
		},
	]);

	const getInput = (index: number) => {
		if (inputs[index] === "directed-by") {
			return (
				<>
					<input
						type="text"
						name={`input${index}`}
						required={index === 0}
						placeholder="Enter full name"
						className={styles.form_input}
					/>
				</>
			);
		} else if (inputs[index] === "starring-in") {
			return (
				<>
					<input
						type="text"
						name={`input${index}`}
						required={index === 0}
						placeholder="Comma separated names"
						className={styles.form_input}
					/>
				</>
			);
		} else if (inputs[index] === "genres") {
			return (
				<>
					<select
						name={`input${index}`}
						placeholder="Select Genres"
						className={styles.form_input}
					>
						<option value="action">Action</option>
						<option value="adventure">Adventue</option>
						<option value="comedy">Comedy</option>
						<option value="crime">Crime</option>
						<option value="documentary">Documentary</option>
						<option value="drama">Drama</option>
						<option value="family">Family</option>
						<option value="fantasy">Fantasy</option>
						<option value="history">History</option>
						<option value="horror">Horror</option>
						<option value="music">Music</option>
						<option value="mystery">Mystery</option>
						<option value="romance">Romance</option>
						<option value="science fiction">Science Fiction</option>
						<option value="tv movie">TV Movie</option>
						<option value="thriller">Thriller</option>
						<option value="war">War</option>
						<option value="western">Western</option>
					</select>
				</>
			);
		} else if (
			inputs[index] === "release-year" ||
			inputs[index] === "release-year-before" ||
			inputs[index] === "release-year-after"
		) {
			return (
				<>
					<input
						type="text"
						name={`input${index}`}
						required={index === 0}
						placeholder="Enter year"
						className={styles.form_input}
					/>
				</>
			);
		} else if (
			inputs[index] === "rating-higher" ||
			inputs[index] === "rating-lower"
		) {
			return (
				<>
					<input
						type="text"
						name={`input${index}`}
						required={index === 0}
						placeholder="0.0 - 10.0"
						className={styles.form_input}
					/>
				</>
			);
		} else if (
			inputs[index] === "rating-count-higher" ||
			inputs[index] === "rating-count-lower"
		) {
			return (
				<>
					<input
						type="text"
						name={`input${index}`}
						required={index === 0}
						placeholder="Enter amount of ratings"
						className={styles.form_input}
					/>
				</>
			);
		}
	};

	const handleChange = (e) => {
		if (e.target.value !== "genres") {
			setChosenOptions({ ...chosenOptions, [e.target.name]: e.target.value });
		}
		if (!selects[parseInt(e.target.name.slice(-1)) + 1]) {
			setSelects(selects.concat(`select${selects.length}`));
		}
		let arr = [...inputs];
		arr[parseInt(e.target.name.slice(-1))] = e.target.value;
		setInputs(arr);
	};

	const isChosenByOther = (optionValue, selectName) => {
		for (let key in chosenOptions) {
			if (key !== selectName) {
				if (chosenOptions[key] === optionValue) {
					return true;
				}
			}
		}
		return false;
	};

	return (
		<div>
			{selects.map((select, index) => {
				return (
					<div key={index} className={styles.select_container}>
						<select
							name={select}
							id={`select-${index}`}
							onChange={handleChange}
							required={index === 0}
						>
							<option value="" disabled={chosenOptions[select]}>
								Choose an option...
							</option>
							{options
								.filter(({ value }) => !isChosenByOther(value, select))
								.map(({ name, value }, oIndex) => (
									<option value={value} key={oIndex}>
										{name}
									</option>
								))}
						</select>
						{getInput(index)}
					</div>
				);
			})}
		</div>
	);
}
