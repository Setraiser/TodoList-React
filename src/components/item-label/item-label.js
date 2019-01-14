import React, {Component} from 'react';

import './item-label.css';

export default class ItemLabel extends Component {



	render() {
		
    	const {label, onToggleDone} = this.props;


		return (
			<span
	          className="todo-list-item-label"
	          onClick={onToggleDone} 
	        >
	          {label}
	        </span>
		)
	}
}