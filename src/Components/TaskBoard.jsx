import  { useState } from 'react';
import ToDoList from './ToDoList';
import InProgressList from './InProgressList';
import DoneList from './DoneList';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Do something', category: 'To-Do' },
    { id: 2, title: 'Task 2', description: 'Work on project', category: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Finish task', category: 'Done' },
  ]);

  const handleDrop = (event, category) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('taskId');
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id.toString() === taskId ? { ...task, category } : task
      )
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="task-board">
      <ToDoList tasks={tasks.filter(task => task.category === 'To-Do')} onDragOver={handleDragOver} onDrop={handleDrop} />
      <InProgressList tasks={tasks.filter(task => task.category === 'In Progress')} onDragOver={handleDragOver} onDrop={handleDrop} />
      <DoneList tasks={tasks.filter(task => task.category === 'Done')} onDragOver={handleDragOver} onDrop={handleDrop} />
    </div>
  );
};

export default TaskBoard;
