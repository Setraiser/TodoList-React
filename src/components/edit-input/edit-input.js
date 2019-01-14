import React, {Component} from 'react';

import './edit-input.css';

export default class EditInput extends Component {

	enterEdit = (e, isEdit) => {


		switch (e.key) {
			case "Enter":
				this.props.onConfirmEdit();
			break;
			case "Escape":
				 this.props.onEditItem();
			break;
			default:
				return false;

		}
		
		
			
		
			
		
	}

	render() {
		const {label, editRef, onConfirmEdit} = this.props;
		return (
			<span className="edit-input" >
				<input 
					type="text"
					ref={editRef}
					defaultValue={label}
					onKeyDown={this.enterEdit} />
				<button type="button"
	                className="btn btn-info"
	                onClick={onConfirmEdit} >
                
          			<span className="fa fa-check"></span>
        		</button>
			</span>
		)
	}
}