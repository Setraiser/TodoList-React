import React, { Component } from 'react'; // Стандартное подключение React, а {Component} нподключается всегда, если текущий компонент будет в виде класса

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

//Подключение css
import './app.css';

/*Если у компонента должен присутствовать state (состояние), то нужно писать его в виде класса, а не функции*/
/*если класс, то сразу же пишется export default перед началом(class ClassName)*/
export default class App extends Component {

  // Так как это приложение без подключения к БД, то нужно задать отсчет номеров id для элементов
  maxId = 100;
  editRef = React.createRef();
  
 
/*Данные нужно хранить на верху иерархии приложения, там можно будет ими манипулировать 
(отправлять на нижнии уровни, или получиать данные снизу)*/
  state = {
    todoData: [ // массив данных
      this.createTodoItem('Learn HTML'),
      this.createTodoItem('Learn CSS'),
      this.createTodoItem('Learn JavaScript'),
      this.createTodoItem('Learn React')
    ],
    term: '', // состояние строки поиска
    filter: 'all' // состояние фильтра
    
  };
/*Функция создания элементов с стандартными свойствами*/
  createTodoItem(label) {
    return {
      /*label можно прописывать в ручную для создания стандартных данных, 
      или в приложении передавать их из inputa для добавления элементов*/
      label, 
      done: false,
      important: false,
      isEdit: false,
      id: this.maxId++
    }
  };


  // Все функции события нужно писать в функциях-стрелках для того, чтобы не потерять this
  deleteItem = (id) => {
    this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

        return {
          todoData: newArray
        };
    })
  };
  /*Функция добавления элементов в список.
  Функция работает путем принятия имени элемента, затем формирования нового массива,
  в котором берутся все предыдущие элементы и добавляется новый элемент, тем самым
  пополняя список элементов, но не изменяя его на прямую!*/
  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArr = [
        ...todoData, newItem
      ];

      return {
        todoData: newArr
      };
    });
  };


  /*Функция переключения свойств.
  Функция примнимает массив данных,
  и при клике на элемент в приложении берет его id,
  затем ищет в массиве данных элемент с таким же id,
  и записываем элемент найденный в массиве данных и записываем его как oldItem.
  Дальше формируем новый элемент, в который помещаем все свойства старого, затем изменяем
  в зависимости от состояния, например если элемент done, то при клике станет !done, и наоборот*/
  toggleProperty(arr, id, propName) {
     
      const idx = arr.findIndex((el) => el.id === id);

      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};

      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];   
  };

  /*Функция редактирования элемента. Получает массив данных, id элемента,
  и его свойство label. Находим индекс первоначального элемента, записываем изначальный(старый)
  элемент с его индексом. Создаем переменную нового значения свойства label, 
  которое принимается из prompt. Если prompt пуст или отменен, то значение
  элемента остается прежним */
  editItem(arr, id, label, isEdit) {

    const idx = arr.findIndex((el) => el.id === id);
  
    const oldItem = arr[idx];
    const editLabel = this.editRef.current.value;
    const newLabel = editLabel;

    const newItem = {...oldItem, [label]: (!newLabel) ? oldItem[label] : newLabel, [isEdit]: !oldItem[isEdit]};
    
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onConfirmEditItem =(id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.editItem(todoData, id, 'label', 'isEdit')    
      }
    });

   
  };


  onEditItem = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'isEdit')
      }
    });
    
  };

  

  

  /*Функция изменения свойства important, которая получает id, из события которое вызывается на кнопке,
  передаем массив для работы в setState (тут идет работа с состоянием компонента). Т.к. изменять состояние нельзя, 
  то просто (копируем все элементы массива в новый массив, находим там нужный элемент по id, и меняем нужное свойство)*/
  onToggleImportant = (id) => {
    this.setState(({todoData}) => {

      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {

      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  /*Функция - событие для поиска (input), получаем term из нижней части (search-panel),
  и возвращаем полученный term в состояние term*/

  onSearchChange = (term) => {
    this.setState({term});
  };


   onFilterChange = (filter) => {
    this.setState({filter});
  };

  /*Локальная функция поиска, которая обрабатывает массив данных с полученным term.
  Если term пустой, то возвращаем все элементы, иначе фильтруем массив items, где находим нужный элемент
   - item, и приводим его и term к нижнему регистру, чтобы поиск был регистро-независисмым*/

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1; //делаем регистро-независимый поиск, преобразую
    });
  };

  // функция фильтра
  filter(items, filter) {
    switch(filter) {
      case 'all': return items; // возвращает все элементы
    
      case 'active': return items.filter((item) => !item.done); // возвращает активные элементы
      
      case 'done': return items.filter((item) => item.done); // возвращает выполненые элементы 
      
      default: return items;
    }
  }


  /*Функция render неоьходимая для отрисовки компонента/ов, если таковой является классом.
  В этой функции можно деструктурировать объекты*/
  render() {

    const {todoData, term, filter} = this.state; //деструктурируем state, получаем оттуда массив данных todoData и term (значение в строке поиска)
    const visibleItems = this.filter(this.search(todoData, term), filter); /*сначало ищем, затем фильтруем, и результат присваиваем значению visibleItem*/
    const doneCount = todoData.filter((el) => el.done).length; // счетчик элементов, которые выполнены (done)
    const todoCount = todoData.length - doneCount; // счетчик элементов, которые не выполнены (!done)

    /*return компонентов лучше всего оборачивать в круглые скобки 
      (если возвращается больше 1 компонента, то круглые скобки обязательны)*/
    /*Атрибуты для компонентов записываются следующим образом. С начало пишется кастомное название атрибута,
    затем ему присваевается событийная функция через this (this.eventFunction) или например свойство из state, или же просто
    результат выполнения локальной функции (функция, которая работает только в текущем объекте)*/

    return (  
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} /> 
        <div className="top-panel d-flex">
          <SearchPanel 
            onSearchChange={this.onSearchChange}
          />
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange} />
          
        </div>

        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onEditItem={this.onEditItem}
          editRef={this.editRef}
          onConfirmEdit={this.onConfirmEditItem}
          
        />
        <ItemAddForm 
          onItemAdded = {this.addItem}
        />
      </div>
      
    );
  }
  
};

