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

    //==============Form-Generators=================//

    const genProjectForm = () => {
        const titleInput = genElement("input");
        titleInput.type = "text";
        titleInput.id = "project-title";
        titleInput.name = "title";
        titleInput.required = true;
        titleInput.placeholder = "e.g. Home Renovation";

        const descTextarea = genElement("textarea");
        descTextarea.id = "project-description";
        descTextarea.name = "description";
        descTextarea.rows = 3;
        descTextarea.placeholder = "Optional description for this project";

        const form = genElement("form", "add-project-form", "", [
            genElement("div", "form-group", "", [
            genElement("label", null, "Project title"),
            titleInput
            ]),
            genElement("div", "form-group", "", [
            genElement("label", null, "Description"),
            descTextarea
            ]),
            genElement("div", "form-actions", "", [
            genElement("button", ["btn", "btn-primary"], "Add Project")
            ])
        ]);

        // Fix up label associations
        form.querySelector('label[for]')?.setAttribute("for", "project-title");
        form.querySelectorAll("label")[1].setAttribute("for", "project-description");
        form.querySelector("button").type = "submit";

        page.appendChild(genElement("section", "add-project", "", [
            genElement("h2", "section-title", "Add Project"),
            form
        ]));
        }



  return { genWelcome, genProjects, genProjectForm }

})();

export default renderer;