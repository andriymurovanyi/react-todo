import React, { Component } from 'react';
import './task.css';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };

        ['title', 'description', 'deadline'].forEach(ref => {
            this[ref] = React.createRef();
        });
    }

    onUpdate = () => {
        this.setState({ isEditing: true });
    }

    onSave = () => {
        const props = ['title', 'description', 'deadline'];
        const newData = Object.assign({}, ...props.map(prop => ({
            [prop]: this[prop].current.value
        })));

        this.props.updateTask(this.props.index, newData);
        this.setState({ isEditing: false });
    }

    onDelete = () => {
        this.props.deleteTask(this.props.index);
    }

    defaultRender() {
        return (
            <div className="task">
                <h1>Task №{ this.props.index + 1 }: { this.props.children }</h1>
                <p className="description">Description: { this.props.description }</p>
                <p className="deadline">Must be finished until: { this.props.deadline }</p>

                <div className="actions">
                    <button onClick={ this.onUpdate } className="btn light"> Edit </button>
                    <button onClick={ this.onDelete } className="btn red"> Remove </button>
                </div>
            </div>
        )
    }

    saveRender() {
        return(
            <div className="task">
                <label>
                    Input a new title:
                    <input ref={ this.title } defaultValue={ this.props.children }/>
                </label><br/>

                <label>
                    Input a new description:
                    <input ref={ this.description } defaultValue={ this.props.description }/>
                </label><br/>

                <label>
                    Choose new date:
                    <input
                        ref={ this.deadline }
                        type="date"
                        name="trip-start"
                        defaultValue={ this.props.deadline }
                    />
                </label><br/>

                <div className="actions">
                    <button onClick={ this.onSave } className="btn success">Save</button>
                </div>
            </div>
        )
    }

    render() {
        const renderFunction = this.state.isEditing ? 'saveRender' : 'defaultRender';
        return this[renderFunction]();
    }
}

export default Task;
