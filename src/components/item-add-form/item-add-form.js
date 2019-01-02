import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

	/*Стандартное состояние input для добавления элемента*/
	state = {
		label: ''
	}

	/*Функция, которая устанавливает состояние label на имеющуиися текст в поле input*/
	onLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
	};

	
	//Функция добавления элемента из инпута
	onSubmit = (e) => {
		/*т.к. при срабатывании события submit форма автоматически отправляет данные на сервер 
		и затем обновляет страницу, то во избежания этого, останавливается стандартное событие (отправка данных на 
		сервер и перезагрузка страницы)*/
		e.preventDefault();
		/*вызываем сверху функцию добавления элементов и передаем ей label со значение с поля формы*/
		this.props.onItemAdded(this.state.label);
		/*т.к. после выполнения функции состояние элемента остается со значением прежде добавленного элемента, 
		то нужно сбросить значение после выполнения функции добавления*/
		this.setState({
			label: '' 
		});
	};

	render() {
		return (
			<form className="item-add-form d-flex"
				  onSubmit={this.onSubmit}
			>

				<input 
					type="text" 
					className="form-control"
					onChange={this.onLabelChange}
					placeholder="What needs to be done"
					value={this.state.label}
				/>
				<button 
					className="btn btn-outline-secondary"
				>
					Add Item
				</button>
			</form>
		)
	}
}