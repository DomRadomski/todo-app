import Priority from "../js/priority";

const renderer = (() => {

    //===========Content Variables===============//
    

    //===========================================//

    const priorityClassMap = {
        [Priority.LOW.label]: 'priority-low',
        [Priority.NORMAL.label]: 'priority-medium',
        [Priority.HIGH.label]: 'priority-high'
    };

    const priorityTextMap = {
        [Priority.LOW.label]: 'Low priority',
        [Priority.NORMAL.label]: 'Medium priority',
        [Priority.HIGH.label]: 'High priority'
    };

    const page = document.querySelector(".content");

    const genElement = (tag, className, text = "", children = []) => {
        
        const el = document.createElement(tag);

        if (className) {
            if (Array.isArray(className)) el.classList.add(...className);
            else el.classList.add(className);
        }

        if (text !== "" && text !== null && text !== undefined) {
            el.textContent = text;
        }

        if (children && children.length) {
            children.forEach(child => el.appendChild(child));
        }
        return el;
    };

    const switchPage = (genFns = []) => {
        page.innerHTML = "";
        genFns.forEach(fn => fn());
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

        const projectsContainer = genElement("div", "projects");

        page.append(
            welcomeHeading,
            introParagraph,
            projectsHeading,
            projectsContainer
        );

        return projectsContainer;
    }

//===========Home-Projects============//

    // const oldgenProjectCard = ({ projectId, title, desc }) => {
    //     const titleEl = genElement("h4", "project-title", title);
    //     const descEl = genElement("p", "project-description", desc);

    //     const card = genElement(
    //         "article",
    //         "project-card",
    //         "",
    //         [titleEl, descEl]
    //     );

    //     card.id = projectId;

    //     return card;
    // };

    const genProjectCard = (projectId, title, desc) => {
        const deleteBtn = genElement(
            'button',
            'project-card-delete',
            '',
            [genElement('i', ['fa-solid', 'fa-xmark'])]
        );

        deleteBtn.id = 'delete-project';
        deleteBtn.type = 'button';
        deleteBtn.setAttribute('aria-label', 'Delete project');

        const titleEl = genElement('h4', 'project-title', title);
        const descEl = genElement('p', 'project-description', desc);

        const card = genElement(
            'article',
            'project-card',
            '',
            [deleteBtn, titleEl, descEl]
        );

        card.id = projectId;

        return card;
    };


    // const genProjects = (projects) => {
    //     const projectsContainer = genElement("div", "projects");

    //     projects.forEach(project => {
    //         const card = genProjectCard(project);
    //         projectsContainer.appendChild(card);
    //     });

    //     page.appendChild(projectsContainer);
    // };

    //============Load-individual-project=============//

    //genTaskPane

    const genTaskPane = () => {
        const heading = genElement("h3", null, "Select a task");

        const paragraph = genElement(
            "p",
            null,
            "Choose a task from the explorer to view details here."
        );

        const emptyPane = genElement(
            "div",
            "pane-empty",
            "",
            [heading, paragraph]
        );

        emptyPane.style.display = "none";

        const taskPane = genElement(
            "section",
            "task-pane",
            "",
            [emptyPane]
        );

        taskPane.setAttribute("aria-label", "Task Details Pane");
        page.appendChild(taskPane)

        return taskPane;
    };

    //genTaskCard

    const oldgenTaskCard = (id, title, priority, dueDate, isComplete, notes) => {
        
        const priorityClass = priorityClassMap[priority.label];
        const priorityText = priorityTextMap[priority.label];
        
        // Format completion status
        const statusText = isComplete ? 'Complete' : 'Incomplete';
        //const statusBadgeText = isComplete ? 'Closed' : 'Open';
        
        // Format date (you might want to use date-fns for this)
        const formattedDate = dueDate.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        // Create priority badge
        const priorityBadge = genElement('span', ['task-badge', 'badge-priority', priorityClass], '', [
            genElement('span', 'badge-dot'),
            document.createTextNode(priorityText)
        ]);
        
        // Close task button
        const closeTask = genElement('button', 'close-task', '', [
            genElement('i', ['fa-solid', 'fa-xmark'])
        ]);
        closeTask.type = 'button';
        closeTask.setAttribute('aria-label', 'Close task');
        
        // Create badges container
        const badges = genElement('div', 'task-badges', '', [
            priorityBadge,
            closeTask
        ]);
        
        // Create header
        const header = genElement('header', 'task-card-header', '', [
            genElement('h3', 'task-card-title', title),
            badges
        ]);
        
        // Create due date field
        const dueDateField = genElement('div', 'task-field', '', [
            genElement('span', 'task-label', 'Due date'),
            genElement('span', 'task-value', formattedDate)
        ]);
        
        const statusClass = isComplete ? 'complete' : 'incomplete';

        // Create status field
        const statusField = genElement(
            'div',
            ['task-field', 'task-card-status', statusClass],
            '',
            [
                genElement('span', 'task-label', 'Status'),
                genElement('span', 'task-value', statusText)
            ]
        );

        
        // Create notes field
        const notesField = genElement('div', ['task-field', 'task-notes'], '', [
            genElement('span', 'task-label', 'Notes'),
            genElement('p', 'task-notes-text', notes)
        ]);
        
        // Create grid
        const grid = genElement('div', 'task-card-grid', '', [
            dueDateField,
            statusField,
            notesField
        ]);
        
        // Create article
        const article = genElement('article', 'task-card', '', [
            header,
            grid
        ]);

        article.setAttribute('aria-label', 'Task details');
        article.id = id;

        return article;
    };

    const genTaskCard = (id, title, priority, dueDate, isComplete, notes) => {
        const priorityClass = priorityClassMap[priority.label];
        const priorityText = priorityTextMap[priority.label];

        const statusText = isComplete ? 'Complete' : 'Incomplete';

        const formattedDate = dueDate.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        const priorityBadge = genElement('span', ['task-badge', 'badge-priority', priorityClass], '', [
            genElement('span', 'badge-dot'),
            document.createTextNode(priorityText)
        ]);

        // Close task (header X) - leave as-is
        const closeTask = genElement('button', 'close-task', '', [
            genElement('i', ['fa-solid', 'fa-xmark'])
        ]);
        closeTask.type = 'button';
        closeTask.setAttribute('aria-label', 'Close task');

        const badges = genElement('div', 'task-badges', '', [
            priorityBadge,
            closeTask
        ]);

        const header = genElement('header', 'task-card-header', '', [
            genElement('h3', 'task-card-title', title),
            badges
        ]);

        const dueDateField = genElement('div', 'task-field', '', [
            genElement('span', 'task-label', 'Due date'),
            genElement('span', 'task-value', formattedDate)
        ]);

        const statusClass = isComplete ? 'complete' : 'incomplete';

        const statusField = genElement(
            'div',
            ['task-field', 'task-card-status', statusClass],
            '',
            [
            genElement('span', 'task-label', 'Status'),
            genElement('span', 'task-value', statusText)
            ]
        );

        const notesField = genElement('div', ['task-field', 'task-notes'], '', [
            genElement('span', 'task-label', 'Notes'),
            genElement('p', 'task-notes-text', notes)
        ]);

        const grid = genElement('div', 'task-card-grid', '', [
            dueDateField,
            statusField,
            notesField
        ]);

        // ---- NEW: footer actions ----
        const markCompleteBtn = genElement('button', 'mark-complete', '', [
            genElement('i', ['fa-solid', 'fa-check']),
            document.createTextNode(isComplete ? 'Mark Incomplete' : 'Mark Complete')
        ]);
        markCompleteBtn.type = 'button';
        markCompleteBtn.id = 'mark-complete';
        markCompleteBtn.setAttribute('aria-label', 'Mark complete');

        const deleteTaskBtn = genElement('button', 'delete-task', '', [
            genElement('i', ['fa-solid', 'fa-trash']),
            document.createTextNode('Delete Task')
        ]);
        deleteTaskBtn.type = 'button';
        deleteTaskBtn.id = 'delete-task';
        deleteTaskBtn.setAttribute('aria-label', 'Delete task');

        const actions = genElement('div', 'task-card-actions', '', [
            markCompleteBtn,
            deleteTaskBtn
        ]);

        const article = genElement('article', 'task-card', '', [
            header,
            grid,
            actions
        ]);

        article.setAttribute('aria-label', 'Task details');
        article.id = id;

        return article;
    };



    //genExplorer

    const genExplorer = (title) => {
        // Icon inside the button
        const plusIcon = genElement("i", ["fa-solid", "fa-plus"]);

        // Button text
        const buttonText = genElement("span", null, "New List");

        // Action button
        const actionButton = genElement(
            "button",
            "explorer-action",
            "",
            [plusIcon, buttonText]
        );
        actionButton.type = "button";
        actionButton.setAttribute("aria-label", "Add new list");

        // Header title
        const projectTitle = genElement("h2", "project-title", title);

        // Explorer header
        const explorerHeader = genElement(
            "header",
            "explorer-header",
            "",
            [projectTitle, actionButton]
        );

        const explorerTree = genElement(
            "div",
            "explorer-tree"    
        );

        // Aside (Task Explorer)
        const taskExplorer = genElement(
            "aside",
            "task-explorer",
            "",
            [explorerHeader, explorerTree]
        );

        

        taskExplorer.setAttribute("aria-label", "Task Explorer");
        page.appendChild(taskExplorer);

        return taskExplorer;
    };

    // const oldgenList = (listId, listTitle, numTasks) => {
    //     // Create toggle button with icon, title, and count
    //     const toggleButton = genElement('button', 'list-toggle', '', [
    //         genElement('i', ['fa-solid', 'fa-chevron-down']),
    //         genElement('span', 'list-name', listTitle),
    //         genElement('span', 'list-count', numTasks)
    //     ]);
    //     toggleButton.type = 'button';
    //     toggleButton.setAttribute('aria-expanded', 'true');

    //     // Create add task button with icon
    //     const addButton = genElement('button', 'list-action', '', [
    //         genElement('i', ['fa-solid', 'fa-plus'])
    //     ]);
    //     addButton.type = 'button';
    //     addButton.setAttribute('aria-label', 'Add task');

    //     // Create header with both buttons
    //     const header = genElement('div', 'list-header', '', [
    //         toggleButton,
    //         addButton
    //     ]);

    //     // Create list to hold tasks
    //     const list = genElement('ul', 'task-list');
    //     //list.style.display = "none";

    //     // Create and return the section
    //     const section = genElement('section', 'list-group', '', [header, list]);
    //     section.id = listId;
        
    //     return section; // add id to header !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // };

    const genList = (listId, listTitle, numTasks) => {
        // Toggle button (chevron + title + count)
        const toggleButton = genElement('button', 'list-toggle', '', [
            genElement('i', ['fa-solid', 'fa-chevron-down']),
            genElement('span', 'list-name', listTitle),
            genElement('span', 'list-count', numTasks)
        ]);
        toggleButton.type = 'button';
        toggleButton.setAttribute('aria-expanded', 'true');

        // Add task button (+)
        const addButton = genElement('button', 'list-action', '', [
            genElement('i', ['fa-solid', 'fa-plus'])
        ]);
        addButton.type = 'button';
        addButton.setAttribute('aria-label', 'Add task');
        addButton.id = 'add-task'; // optional hook, if you want

        // Delete list button (x) - same styling, different icon
        const deleteButton = genElement('button', 'list-action', '', [
            genElement('i', ['fa-solid', 'fa-xmark'])
        ]);
        deleteButton.type = 'button';
        deleteButton.setAttribute('aria-label', 'Delete list');
        deleteButton.id = 'delete-list'; // hook for event delegation

        // Header row (toggle + actions)
        const header = genElement('div', 'list-header', '', [
            toggleButton,
            addButton,
            deleteButton
        ]);

        // Task container
        const list = genElement('ul', 'task-list');
        list.style.display = "none";

        // Section wrapper
        const section = genElement('section', 'list-group', '', [header, list]);
        section.id = listId;

        return section;
    };


    //==============//genTask

    const genTask = (taskId, taskTitle, isComplete) => {
        // Determine status class based on completion
        const statusClass = isComplete ? 'status-complete' : 'status-open';
        
        // Create button with status and title spans
        const button = genElement('button', 'task-link', '', [
            genElement('span', ['task-status', statusClass]),
            genElement('span', 'task-title', taskTitle)
        ]);
        button.type = 'button';
        button.setAttribute('aria-hidden', 'true'); // Move aria-hidden to status span if needed
        
        // Create list item with id
        const task = genElement('li', 'task-item', '', [button]);
        task.id = taskId;
        
        return task;
    };



    //==============Form-Generators=================//

    // const genProjectForm = () => {
    //     const titleInput = genElement("input");
    //     titleInput.type = "text";
    //     titleInput.id = "project-title";
    //     titleInput.name = "title";
    //     titleInput.required = true;
    //     titleInput.placeholder = "e.g. Home Renovation";

    //     const descTextarea = genElement("textarea");
    //     descTextarea.id = "project-description";
    //     descTextarea.name = "description";
    //     descTextarea.rows = 3;
    //     descTextarea.placeholder = "Optional description for this project";

    //     const form = genElement("form", "add-project-form", "", [
    //         genElement("div", "form-group", "", [
    //         genElement("label", null, "Project title"),
    //         titleInput
    //         ]),
    //         genElement("div", "form-group", "", [
    //         genElement("label", null, "Description"),
    //         descTextarea
    //         ]),
    //         genElement("div", "form-actions", "", [
    //         genElement("button", ["btn", "btn-primary"], "Add Project")
    //         ])
    //     ]);

    //     // Fix up label associations
    //     form.querySelector('label[for]')?.setAttribute("for", "project-title");
    //     form.querySelectorAll("label")[1].setAttribute("for", "project-description");
    //     form.querySelector("button").type = "submit";

    //     page.appendChild(genElement("section", "add-project", "", [
    //         genElement("h2", "section-title", "Add Project"),
    //         form
    //     ]));
    //     }



  return { switchPage, genWelcome, genProjectCard, genTaskPane, genExplorer, genList, genTask, genTaskCard }

})();

export default renderer;