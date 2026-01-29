import './index.css';
import './palette.css';
import genHome from './ui/home';
import {genAddProject, genNewProject} from './ui/addProject';
import genProjectPage from './ui/projectPage';
import { getProjectById } from './js/user';


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

const loadPage = (route) => {
  const render = routes[route];
  if (!render) throw new Error(`Unknown route: ${route}`);

  if (route !== "projectPage") {page.classList = "content"}
  
  clearContent();
  render();
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

  page.addEventListener("click", (e) => {
    if(e.target.closest(".project-card")) {
      let currentProject = getProjectById(e.target.closest(".project-card").id);
      console.table(currentProject);
      page.classList.add("content-project");
      loadPage("projectPage");
    }
  })

});

