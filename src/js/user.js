const USER_NAME = "User";
// userStore.js
import Task from './task.js';
import Priority from './priority.js';
import Project from './project.js';
import TaskList from './tasklist.js';

let projects = []; // Array<Project>
let openedTasks = [] // Array<Task>

export {projects, openedTasks}

addProject(
    "Personal",
    "Everyday tasks, reminders, and personal goals."
);

addProject(
    "Work",
    "Tasks and deadlines related to your current role and projects."
);

addProject(
    "Learning",
    "Courses, reading, and skill development goals."
);

addProject(
    "Fitness",
    "Workouts, habits, and health-related tasks."
);

addProject(
    "Side Projects",
    "Ideas and experiments you work on outside of your main commitments."
);

// ========= Personal Project (projects[0]) =========

const listOne = new TaskList("One");
listOne.addTask(new Task("Buy groceries", new Date(2026, 1, 10), Priority.NORMAL, "Milk, eggs, bread"));
listOne.addTask(new Task("Call dentist", new Date(2026, 1, 8), Priority.HIGH, "Schedule checkup"));
listOne.addTask(new Task("Pay electricity bill", new Date(2026, 1, 15), Priority.HIGH));
projects[0].addToDo(listOne);

const listTwo = new TaskList("Two");
listTwo.addTask(new Task("Clean garage", new Date(2026, 1, 20), Priority.LOW, "Organize tools"));
listTwo.addTask(new Task("Plan birthday party", new Date(2026, 1, 18), Priority.NORMAL, "Guest list and venue"));
projects[0].addToDo(listTwo);

const listThree = new TaskList("Three");
listThree.addTask(new Task("Update resume", new Date(2026, 1, 12), Priority.NORMAL));
listThree.addTask(new Task("Research vacation spots", new Date(2026, 2, 1), Priority.LOW, "Summer trip ideas"));
listThree.addTask(new Task("Fix leaky faucet", new Date(2026, 1, 9), Priority.HIGH));
projects[0].addToDo(listThree);

const listFour = new TaskList("Four");
listFour.addTask(new Task("Organize photos", new Date(2026, 1, 25), Priority.LOW));
listFour.addTask(new Task("Renew car insurance", new Date(2026, 1, 14), Priority.HIGH, "Comparison shop first"));
projects[0].addToDo(listFour);

// ========= Work Project (projects[1]) =========

const workListOne = new TaskList("Sprint Tasks");
workListOne.addTask(new Task("Finish Q1 report", new Date(2026, 1, 7), Priority.HIGH, "Need charts and analysis"));
workListOne.addTask(new Task("Review team PRs", new Date(2026, 1, 6), Priority.NORMAL));
workListOne.addTask(new Task("Update documentation", new Date(2026, 1, 11), Priority.NORMAL, "API endpoints"));
projects[1].addToDo(workListOne);

const workListTwo = new TaskList("Meetings");
workListTwo.addTask(new Task("Prepare standup notes", new Date(2026, 1, 6), Priority.NORMAL));
workListTwo.addTask(new Task("Client presentation", new Date(2026, 1, 13), Priority.HIGH, "Demo new features"));
projects[1].addToDo(workListTwo);

const workListThree = new TaskList("Admin");
workListThree.addTask(new Task("Submit timesheet", new Date(2026, 1, 7), Priority.HIGH));
workListThree.addTask(new Task("Book conference ticket", new Date(2026, 1, 10), Priority.NORMAL, "DevCon 2026"));
workListThree.addTask(new Task("Order new laptop", new Date(2026, 1, 16), Priority.LOW));
projects[1].addToDo(workListThree);

// ========= Learning Project (projects[2]) =========

const learningListOne = new TaskList("Current Courses");
learningListOne.addTask(new Task("Complete React module", new Date(2026, 1, 12), Priority.NORMAL, "Hooks and context"));
learningListOne.addTask(new Task("Watch TypeScript tutorial", new Date(2026, 1, 9), Priority.NORMAL));
learningListOne.addTask(new Task("Practice algorithms", new Date(2026, 1, 8), Priority.LOW, "LeetCode daily"));
projects[2].addToDo(learningListOne);

const learningListTwo = new TaskList("Reading");
learningListTwo.addTask(new Task("Finish 'Clean Code'", new Date(2026, 1, 20), Priority.LOW, "Chapter 7-12"));
learningListTwo.addTask(new Task("Read design patterns article", new Date(2026, 1, 10), Priority.NORMAL));
projects[2].addToDo(learningListTwo);

export function getUserName() {
  return USER_NAME;
}

export function getProjects() {
  // defensive copy
  return [...projects];
}

export function getProjectById(id) {
  return projects.find(project => project.projectId === id) ?? null;
}

export function getToDoById(id, project) {
  return project.todolists.find(todo => todo.listId === id) ?? null;
}

export function getTaskById(id, list) {
  return list.tasks.find(task => task.taskId === id) ?? null;
}

export function addProject(title, description = "") {
  const project = new Project(title, description);
  projects.push(project);
  return project;
}

export function removeProjectById(id) {
  const index = projects.findIndex(
    project => project.projectId === id
  );

  if (index === -1) return false;

  projects.splice(index, 1);
  return true;
}

export function addList(project, title) {
  const list = new TaskList(title);
  project.addToDo(list);
  return list
}

export function removeListById(project, id) {
  project.removeToDoById(id);
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


export function addTask(list, title, dueDate, priority, notes) {
  if (!list) {
    throw new Error('addTask requires a list to add the task to');
  }

  const task = new Task(title, dueDate, priority, notes);

  // Adjust this depending on how your list is implemented
  // Common patterns shown below

  // If list is a class with an addTask method
  if (typeof list.addTask === 'function') {
    list.addTask(task);
  }
  // If list is just an array (early-stage / temporary)
  else if (Array.isArray(list)) {
    list.push(task);
  }
  else {
    throw new Error('Provided list cannot accept tasks');
  }

  return task;
}

export function projectsToJson(projects) {
  if (!Array.isArray(projects)) {
    throw new Error("projectsToJson expects an array of Project instances");
  }

  return projects.map((project) => ({
    projectId: project.projectId,
    title: project.title,
    desc: project.description,
  }));
}



