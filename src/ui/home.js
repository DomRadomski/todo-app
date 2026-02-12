import renderer from "./renderer";
import { getProjects } from "../js/user";
import { projects } from "../js/user";


const genHome = () => {
    const projectsContainer = renderer.genWelcome();

    projects.forEach(project => {
            const card = renderer.genProjectCard(project.projectId, project.title, project.description);
            projectsContainer.appendChild(card);
        });
}

export default genHome;

