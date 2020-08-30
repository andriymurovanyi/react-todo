import React, { Component } from 'react';
import './wrapper.css';
import Task from '../Task';
import { formatDate } from '../../utils/helpers';

class Wrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        const tasks = localStorage.getItem('tasks');

        if (!tasks) {
            localStorage.setItem('tasks', JSON.stringify([]));
        }

        this.setState({ tasks: JSON.parse(tasks) });
    }

    addTask = () => {
        const tasks = this.state.tasks;
        tasks.push({
            title: 'Placeholder title',
            description: 'Placeholder description',
            deadline: formatDate(new Date())
        });

        this.setTasks(tasks);
    }

    updateTask = (taskId, data) => {
        const { tasks } = this.state;
        const activeItem = tasks[taskId];

        if (!activeItem) {
            return;
        }

        Object.assign(activeItem, { ...data });
        tasks.splice(taskId, 1, activeItem);

        this.setTasks(tasks);
    }

    deleteTask = (taskId) => {
        const { tasks } = this.state;
        tasks.splice(taskId, 1);

        this.setTasks(tasks);
    }

    setTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.setState({ tasks });
    }

    render() {
        const tasks = this.state.tasks.map((item, index) => (
            <Task
                description={ item.description }
                deadline={ item.deadline }
                key={ index }
                index={ index }
                updateTask={ this.updateTask }
                deleteTask={ this.deleteTask }
            >
                { item.title }
            </Task>
        ));

        return (
            <div className="tasks">
                <div className="add-new">
                    <button onClick={ this.addTask } className="btn new">Create</button>
                </div>
                { tasks }
            </div>
        );
    }
}

export default Wrapper;
