import './index.css';

import './palette.css';
import genHome from './ui/home';
import genAddProject from './ui/addProject';



const routes = {
  home: genHome,
  addProject: genAddProject
};

const clearContent = () => {
  const page = document.querySelector(".content");
  if (!page) throw new Error('Missing ".content" container');
  page.innerHTML = "";
};

const loadPage = (route) => {
  const render = routes[route];
  if (!render) throw new Error(`Unknown route: ${route}`);

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

});

