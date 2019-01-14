import React, { Component } from 'react';

import EditInput from '../edit-input';
import ItemLabel from '../item-label';

import './todo-list-item.css';

export default class TodoListItem extends Component {



  render() {
    /*Получаем нужные атрибуты, свойства, функции из свойств родительского элемента.
    За свойства родительского элемента текущего компонента отвечает props*/
    const {label, onDeleted, onToggleImportant, onToggleDone, onEditItem, 
      important, done, isEdit, editRef, onConfirmEdit} = this.props;

    let classNames = 'todo-list-item';

    /*в зависимости от значения параметра (true||false), добавляем/убираем класс*/
    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }


    const labelItem = isEdit ? <EditInput label={label}  
    onConfirmEdit={onConfirmEdit} editRef={editRef} onEditItem={onEditItem} /> : 
    <ItemLabel label={label} onToggleDone={onToggleDone} />

    return (
      <span className={classNames}>

      {labelItem}
       

        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={onToggleImportant}>
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>

        <button type="button"
                className="btn btn-warning btn-sm float-right"
                onClick={onEditItem}>
          <i className="fa fa-pencil fa-fw" />
        </button>
      </span>
    );
  };
}

