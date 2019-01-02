import React from 'react';

import './app-header.css';

const AppHeader = ({toDo, done}) => { //принимает сверху значения выполненых и оставшихся задач
	return (
		<div className="app-header d-flex">
			<h1>My Todo List</h1>
			<h2>{toDo} more to do, {done} done</h2>
		</div>
	);	
};

export default AppHeader;