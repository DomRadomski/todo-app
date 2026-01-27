import renderer from "./renderer";
import { getProjects, projectsToJson } from "../js/user";

let projectJson = projectsToJson(getProjects());

const genHome = () => {
    projectJson = projectsToJson(getProjects());
    renderer.genWelcome();
    renderer.genProjects(projectJson);
}

export default genHome;