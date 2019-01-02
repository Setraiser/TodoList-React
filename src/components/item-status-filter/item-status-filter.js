import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

	/*Чтобы простить создание кнопок, и вешание событий на них, лучше создать массив для удобства работы с ними, 
	т.к. код будет повторяться, а различий мало */
	buttons = [
		{name: 'all', label: 'All'},
		{name: 'active', label: 'Active'},
		{name: 'done', label: 'Done'}
	];

	render() {

		const {filter, onFilterChange} = this.props;/*Забираем состояние filter, и функцию сверху*/

		/*проходим по массиву кнопок, которые сразу деструктурируем и забираем оттуда name и label*/
		const buttons = this.buttons.map(({name, label}) => { 
			/*Присваиваем переменной isActive значение true в случае совпадения значений filter и name*/
			const isActive = filter === name;
			/*Если true, то кнопка активна, если нет, то неактивна*/
			const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
			return (
				<button 
					type="button" 
					className={`btn ${clazz}`}
					key={name}
					onClick={() => onFilterChange(name)} //При клике вызываем функцию изменения фильтра, где передаем name кликнутой кнопки
				>

					{label}</button>
			);				
		});

		return (
			<div className="btn-group">
				{buttons}
			</div>
		);
	}
}
