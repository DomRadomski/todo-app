import './index.css';
import './palette.css';
import genHome from './ui/home';


const routes = {
  home: genHome
};

const clearContent = () => {
  const page = document.querySelector(".content");
  if (!content) throw new Error('Missing ".content" container');
  content.innerHTML = "";
};

const loadPage = (route) => {
  const render = routes[route];
  if (!render) throw new Error(`Unknown route: ${route}`);

  clearContent();
  render();
};

document.addEventListener("DOMContentLoaded", () => {
  loadPage("home"); // initial route
});