import './index.css';
import './palette.css';
import genHome from './ui/home';
import {genAddProject, genNewProject} from './ui/addProject';
import genProjectPage from './ui/projectPage';
import { getProjectById, getToDoById, getTaskById } from './js/user';
import renderer from './ui/renderer';


const page = document.querySelector(".content");

const routes = {
  home: genHome,
  addProject: genAddProject,
  projectPage: genProjectPage
};

const clearContent = () => {
  if (!page) throw new Error('Missing ".content" container');
  page.innerHTML = "";
};

const loadPage = (route, ...args) => {
  const render = routes[route];
  if (!render) throw new Error(`Unknown route: ${route}`);

  if (route !== "projectPage") {page.classList = "content"}

  clearContent();
  render(...args);
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  loadPage("home"); // initial route
  
  header.addEventListener("click", (e) => {
    if (e.target.closest(".add-project-button")) {
      loadPage("addProject");
    } else if (e.target.closest(".home-button")) {
      loadPage("home");
    }
  });

  document.addEventListener("submit", (e) => {
    // Can add validation in future
    let proTitle = document.querySelector("#project-title").value;
    let proDesc = document.querySelector("#project-description").value;   

    genNewProject(e, proTitle, proDesc);

    loadPage("home")
    
  })

  let currentProject;

  page.addEventListener("click", (e) => {
    
    // Move into project
    
    if(e.target.closest(".project-card")) {
      currentProject = getProjectById(e.target.closest(".project-card").id);
      console.table(currentProject);
      page.classList.add("content-project");
      loadPage("projectPage", currentProject);
    }

    // Generate Tasks

    if(e.target.closest(".list-toggle")) {
      const listGroup = e.target.closest(".list-group");
      const taskList = listGroup.querySelector(".task-list");
      
      // Toggle display
      if (taskList.style.display === "none") {
        taskList.style.display = "";
      } else {
        taskList.style.display = "none";
      }
    }

    //============================================

    if(e.target.closest(".task-link")) {
      let taskPane = document.querySelector(".task-pane");
      // don't like this can maybe fix later by regening task pane everytime and just add this to a task pane list of sorts

      let taskId = e.target.closest(".task-item").id;
      let listId = e.target.closest(".list-group").id;
      let list = getToDoById(listId, currentProject);
      let task = getTaskById(taskId, list);
      
      taskPane.appendChild(renderer.genTaskCard(task.title, task.priority, task.dueDate, task.isComplete, task.notes));
    }
    
  })

});

