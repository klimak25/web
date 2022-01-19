import React from 'react';
import './TableForm.css';
import { useState } from 'react';

export default function TableForm({ filterSubmit, onReset }) {
	const [ name, setName ] = useState('');
	const [ law, setLaw ] = useState('');
	const [ argument, setArgument ] = useState('');

	function handleNameChange(e) {
		setName(e.target.value);
	}
	function handleLawChange(e) {
		setLaw(e.target.value);
	}
	function handleArgumentChange(e) {
		setArgument(e.target.value);
	}

	function onClearFilter() {
		setName('');
		setLaw('');
		setArgument('');
		onReset();
	}

	function handleSubmit(e) {
		e.preventDefault();
		filterSubmit({ name, law, argument });
	}

	return (
		<form className="table-form" onSubmit={handleSubmit}>
			<select name="name" value={name} onChange={handleNameChange} required>
				<option value="">Поле...</option>
				<option value="name">Название</option>
				<option value="points">Количество</option>
				<option value="distance">Расстояние</option>
			</select>
			<select name="law" value={law} onChange={handleLawChange} required>
				<option value="">Условие...</option>
				<option value="equal">Равно</option>
				<option value="contain">Содержит</option>
				<option value="greater">Больше</option>
				<option value="less">Меньше</option>
			</select>
			<input
				name="argument"
				value={argument}
				onChange={handleArgumentChange}
				type="text"
				placeholder="Значение"
				required
			/>
			<button className="table-form__button" type="reset" onClick={onClearFilter}>
				Сброс
			</button>
			<button className="table-form__button" type="submit">
				Фильтр
			</button>
		</form>
	);
}
