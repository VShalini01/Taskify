import React from 'react';
import axios from "axios";
import '../App.css';

class TaskList extends React.Component {
    state = {
        task: "",
        taskList: []
    }

    componentDidMount() {
        this.getTaskList();
    }

    getTaskList = () => {
        axios.get('http://localhost:4000/tasks')
            .then(response => {
                this.setState({ taskList: response.data });
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    onDeleteClick = (taskid) => {
        axios.delete(`http://localhost:4000/deleteTask/${taskid}`)
            .then(() => {
                this.getTaskList(); // Refresh task list after deletion
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    onSubmitClick = () => {
        // Check if task input is empty
        if (this.state.task.trim() === "") {
            alert("Please enter a task before submitting.");
            return;
        }

        axios.post('http://localhost:4000/addTask', {
            task: this.state.task
        })
            .then(() => {
                this.setState({ task: "" }); // Clear input field after submission
                this.getTaskList(); // Refresh task list after addition
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    };

    render() {
        return (
            <div>
                <h3 className="header">Todo List</h3>
                <div className='ui input'>
                    <input
                        className="task-input"
                        value={this.state.task}
                        onChange={e => this.setState({ task: e.target.value })}
                        placeholder='Add a new task...'
                    />
                    <button
                        className='submit-button'
                        onClick={() => this.onSubmitClick()}
                    >
                        Submit
                    </button>
                </div>
                <div className="task-list">
                    {this.state.taskList.map((task) => (
                        <div
                            className="task-item"
                            key={task.taskid}
                        >
                            <div className="task-text">{task.task}</div> {/* Display task.task instead of task.tasks */}
                            <div className="task-buttons">
                                <div
                                    className="delete-button"
                                    onClick={() => this.onDeleteClick(task.taskid)}
                                >
                                    Delete
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default TaskList;
