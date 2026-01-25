// userStore.js
import Project from "./project.js";

const USER_NAME = "User";

let projects = []; // Array<Project>


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

