"use client";

import { useState } from "react";
import { Check, ListTodo, Trash } from "lucide-react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTask = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const filters: Filter[] = ["all", "active", "completed"];

  return (
    <main className="min-h-screen bg-[#EAF0EB] flex justify-center p-10">
      <div className="w-full max-w-xl h-fit rounded-3xl bg-white p-8 shadow">
        <header className="flex items-center gap-3 mb-6">
          <ListTodo className="text-green-700" />
          <h1 className="text-2xl font-semibold">My tasks.</h1>
        </header>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to get done?"
            className="flex-1 rounded-xl border border-gray-200 p-3 outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-green-700 px-5 text-[#473e3e] font-semibold"
          >
            Add task
          </button>
        </form>

        <div className="flex justify-between border-b border-gray-200 mb-4">
          <div className="flex gap-6">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`pb-3 capitalize font-semibold ${
                  filter === f
                    ? "border-b-2 border-green-700 text-green-700"
                    : "text-gray-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500">{visibleTasks.length}</span>
        </div>

        {visibleTasks.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Your list starts here. Add your first task above.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {visibleTasks.map((task) => (
              <li key={task.id} className="flex items-center gap-3 p-2">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    task.completed ? "bg-green-700 border-green-700" : "border-gray-300"
                  }`}
                >
                  {task.completed && <Check size={14} className="text-white" />}
                </button>

                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>

                <button onClick={() => deleteTask(task.id)}>
                  <Trash size={16} className="text-gray-400" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Home;