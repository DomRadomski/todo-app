const renderer = (() => {

    //===========Content Variables===============//
    

    //===========================================//

    const page = document.querySelector(".content");

    const genElement = (tag, className, text = "", children = []) => {
        const el = document.createElement(tag);

        if (className) {
        // allow string or array of classes
        if (Array.isArray(className)) el.classList.add(...className);
        else el.classList.add(className);
        }

        if (text) el.textContent = text;

        if (children && children.length) {
        children.forEach(child => el.appendChild(child));
        }

        return el;
    };

        //=============Constants=================//

        //   const generateNav = () => {

        //     if (!nav) throw new Error("No <nav> found in the DOM.");

        //     const left = generateElement("div", "nav-left");
        //     const right = generateElement("div", "nav-right");
            
            
        //     left.appendChild(generateElement("h1", "app-title", pageName));
        //     left.appendChild(generateElement("h1", ["fa-solid", "fa-ellipsis"]));
        //     right.appendChild(generateElement("button", ["nav-button", "home-button"], "Home"));
            
        //     nav.appendChild(left);
        //     nav.appendChild(right);
        //   };

    //==============Home=================//

    const genWelcome = () => {
        const welcomeHeading = genElement(
            "h2",
            "welcome",
            "Welcome User"
        );

        const introParagraph = genElement(
            "p",
            "intro",
            "Welcome to TooDo — a simple, focused way to organise your projects and tasks."
        );

        const projectsHeading = genElement(
            "h3",
            "section-title",
            "Projects"
        );

        page.append(
            welcomeHeading,
            introParagraph,
            projectsHeading
        );
    }

//===========Home-Projects============//

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

    const genProjectCard = ({ projectId, title, desc }) => {
        const titleEl = genElement("h4", "project-title", title);
        const descEl = genElement("p", "project-description", desc);

        const card = genElement(
            "article",
            "project-card",
            "",
            [titleEl, descEl]
        );

        card.id = projectId;

        return card;
    };

    const genProjects = (projects) => {
        const projectsContainer = genElement("div", "projects");

        projects.forEach(project => {
            const card = genProjectCard(project);
            projectsContainer.appendChild(card);
        });

        page.appendChild(projectsContainer);
    };

  return { genWelcome, genProjects }

})();

export default renderer;