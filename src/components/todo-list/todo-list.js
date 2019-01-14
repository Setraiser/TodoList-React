import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

/*Получение свойств и кастомных событий в виде атрибутов, которые были указаны в App*/
const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone, onEditItem, editRef, onConfirmEdit }) => {
  /*Делаем деструктуризацию элементов(item) массива данных todos, достаем оттуда id
  и остальные свойства отдельно, чтобы id записать в атрибут key li элемента, а другие свойства в компонент
  TodoListItem (содержимое элемента, атрибуты)*/
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem 
          {...itemProps }
          onDeleted={() => onDeleted(id)} 
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          onEditItem={() => onEditItem(id)}
          onConfirmEdit={() => onConfirmEdit(id)}
          editRef={editRef}
          
        />
      </li>
    );
  });

  return (
    <ul 
      className="list-group todo-list"
    >
      { elements }
    </ul>
  );
};

export default TodoList;