import FilterButton from "./components/FilterButtton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }; //`todo-${nanoid()}`和"todo-" + nanoid()作用一样，都是生成一个随机id
    setTasks([newTask, ...tasks]);
  }

  function deleteTask(id) {
  const remainingTasks = tasks.filter((task) => id !== task.id);
  setTasks(remainingTasks);
}


  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        const newTask = { ...task, completed: !task.completed };
        console.log(newTask);
        return newTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const taskList = tasks?.map((task) =>
    <Todo
      key={task.id}
      name={task.name}
      completed={task.completed}
      id={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask} />);

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
