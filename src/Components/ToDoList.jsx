
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    fetch("http://localhost:5000/toDo")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add a new task without refresh
  const addTask = async () => {
    if (!newTask.title) return alert("Title is required");

    const tempTask = { ...newTask, _id: Date.now().toString(), timestamp: new Date().toISOString() };
    setTasks([...tasks, tempTask]); // Optimistic UI update

    try {
      const response = await fetch("http://localhost:5000/toDo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempTask),
      });
      const data = await response.json();
      setTasks((prevTasks) => prevTasks.map((t) => (t._id === tempTask._id ? data : t)));
    } catch (error) {
      console.error("Error adding task:", error);
    }

    setNewTask({ title: "", description: "", category: "To-Do" });
  };

  // Update task without refresh
  const updateTaskInDB = async (task) => {
    setTasks((prevTasks) => prevTasks.map((t) => (t._id === task._id ? task : t))); // Optimistic update

    try {
      await fetch(`http://localhost:5000/toDo/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task without refresh
  const deleteTask = async (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Optimistic update

    try {
      await fetch(`http://localhost:5000/toDo/${taskId}`, { method: "DELETE" });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle task edit
  const handleEdit = (task) => setEditingTask(task);

  // Handle task update after editing
  const updateEditedTask = async () => {
    if (editingTask) {
      await updateTaskInDB(editingTask);
      setEditingTask(null);
    }
  };

  // Handle drag and drop
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    movedTask.category = result.destination.droppableId;
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(reorderedTasks);

    await updateTaskInDB(movedTask);
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
        Task Management
      </h1>

      {/* Add Task Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border rounded-lg p-2 w-full mb-3"
        />
        <textarea
          placeholder="Enter task description (optional)"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border rounded-lg p-2 w-full mb-3"
        />
        <select
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          className="border rounded-lg p-2 w-full mb-3"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <div key={category} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 text-center mb-3">{category}</h2>
              <Droppable droppableId={category}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                    {tasks
                      .filter((task) => task.category === category)
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition"
                            >
                              <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                              <div className="flex justify-between">
                                <button
                                  onClick={() => handleEdit(task)}
                                  className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteTask(task._id)}
                                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              className="border rounded-lg p-2 w-full mb-3"
            />
            <textarea
              value={editingTask.description}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              className="border rounded-lg p-2 w-full mb-3"
            />
            <div className="flex justify-between">
              <button onClick={updateEditedTask} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                Save
              </button>
              <button onClick={() => setEditingTask(null)} className="bg-gray-500 text-white py-2 px-4 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
