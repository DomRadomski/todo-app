// userStore.js
const USER_NAME = "User";

import Task from "./task.js";
import Project from "./project.js";
import TaskList from "./tasklist.js";
import Storage from "./storage.js";

const STORAGE = new Storage();

let projects = loadProjectsFromJSON(STORAGE.jsonFromStorage()); // Array<Project>
let openedTasks = []; // Array<Task>

export { projects, openedTasks, STORAGE };

// -----------------------------
// Getters
// -----------------------------
export function getUserName() {
  return USER_NAME;
}

export function getProjects() {
  return projects;
}

export function getProjectById(id) {
  return projects.find((project) => project.projectId === id) ?? null;
}

export function getToDoById(id, project) {
  return project.todolists.find((todo) => todo.listId === id) ?? null;
}

export function getTaskById(id, list) {
  return list.tasks.find((task) => task.taskId === id) ?? null;
}

// -----------------------------
// Projects
// -----------------------------
export function addProject(title, description = "") {
  const project = new Project(title, description);
  projects.push(project);
  return project;
}

export function removeProjectById(id) {
  const index = projects.findIndex((project) => project.projectId === id);
  if (index === -1) return false;

  projects.splice(index, 1);
  return true;
}

// -----------------------------
// Lists
// -----------------------------
export function addList(project, title) {
  const list = new TaskList(title);
  project.addToDo(list);
  return list;
}

export function removeListById(project, id) {
  project.removeToDoById(id);
}

// -----------------------------
// Tasks
// -----------------------------
export function addTask(list, title, dueDate, priority, notes) {
  if (!list) {
    throw new Error("addTask requires a list to add the task to");
  }

  const task = new Task(title, dueDate, priority, notes);

  if (typeof list.addTask === "function") {
    list.addTask(task);
  } else if (Array.isArray(list)) {
    list.push(task);
  } else {
    throw new Error("Provided list cannot accept tasks");
  }

  return task;
}

export function removeTaskById(currentProject, id) {
  for (const list of currentProject.todolists) {
    try {
      list.removeTaskById(id);
      return true; // task removed
    } catch (err) {
      // task not in this list, keep looking
    }
  }
  return false; // task not found in any list
}

export function findTaskInProject(currentProject, taskId) {
  for (const list of currentProject.todolists) {
    const task = list.getTaskById(taskId);
    if (task) return { list, task };
  }
  return null;
}

export function withTask(currentProject, taskId, fn) {
  const found = findTaskInProject(currentProject, taskId);
  if (!found) return false;

  fn(found); // { list, task }
  return true;
}

// -----------------------------
// Hydration
// -----------------------------
export function loadProjectsFromJSON(raw = []) {
  return Array.isArray(raw) ? raw.map(Project.fromJSON) : [];
}
