import events from "../../js/events";

const projects = [
  {
    "projectId": "personal",
    "title": "Personal",
    "desc": "Everyday tasks, reminders, and personal goals."
  },
  {
    "projectId": "work",
    "title": "Work",
    "desc": "Tasks and deadlines related to your current role and projects."
  },
  {
    "projectId": "learning",
    "title": "Learning",
    "desc": "Courses, reading, and skill development goals."
  },
  {
    "projectId": "fitness",
    "title": "Fitness",
    "desc": "Workouts, habits, and health-related tasks."
  },
  {
    "projectId": "side-projects",
    "title": "Side Projects",
    "desc": "Ideas and experiments you work on outside of your main commitments."
  }
];

const generateProjectCard = ({ projectId, title, desc }) => {
  const titleEl = generateElement("h4", "project-title", title);
  const descEl = generateElement("p", "project-description", desc);

  const card = generateElement(
    "article",
    "project-card",
    "",
    [titleEl, descEl]
  );

  card.id = projectId;

  return card;
};

const generateProjects = (projects) => {
  const projectsContainer = generateElement("div", "projects");

  projects.forEach(project => {
    const card = generateProjectCard(project);
    projectsContainer.appendChild(card);
  });

  return projectsContainer;
};








