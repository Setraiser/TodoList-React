import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

	/*Свой State (текущее значение input)*/
	state = {
		term: ''
	}

	onSearchChange = (e) => {
	    const term = e.target.value;
	    this.setState({term})
	    // достаем сверху функцию и вызывем её, передавая term
	    this.props.onSearchChange(term);
  	}

	render() {
		return (
			<input 
				className="form-control search-input"
				placeholder='type to search...'
				value={this.state.term} 
				onChange={this.onSearchChange}
			/>
		);

	}

}


	
