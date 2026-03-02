# Todo Application

### A browser-based Todo application built as part of The Odin Project using HTML, CSS & JS.

[Live Demo](https://domradomski.github.io/todo-app/)
    
## 🧠 Architecture Overview

The application models data using a layered domain structure:

    User (global state module)
    └── Projects
        └── TaskLists
            └── Tasks


Each layer owns its own logic, validation, and persistence behavior.


## 📦 Core Domain Classes
    
Task: Represents a single task.

    Fields: Title, Due date (validated Date instance), Priority (enum-esque), Notes, Completion state and Unique ID

    Methods:

        - toggleComplete()

        - toJSON()

        - static fromJSON()

TaskList: Represents a collection of related tasks within a project.

    Fields: Title, Array of Task instances, Unique ID

    Methods:        

        - addTask(task)

        - removeTask(task)

        - removeTaskById(id)

        - getTaskById(id)

        - toJSON()

        - static fromJSON()

Project: Represents a top-level container grouping multiple task lists.

    Fields: Title, Description, Array of TaskList instances, Completion state and Unique ID

    Methods:

        - addToDo(list)

        - removeToDo(list)

        - removeToDoById(id)

        - getToDoById(id)

        - toJSON()

        - static fromJSON()

## 💾 Storage Abstraction

The Storage class provides a thin, defensive wrapper around the browser’s localStorage API.

Rather than interacting with localStorage directly throughout the application, persistence is centralized behind this abstraction to:

    Prevent scattered storage logic

    Enforce consistent serialization

    Improve testability and maintainability

Responsibilities:

    Validates availability of localStorage at runtime

    Serializes structured data before writing

    Parses stored JSON safely when reading

    Provides structured debugging output for inspection


## 👤 User Module (Global State Layer)

The User module acts as the application’s top-level state manager and coordination layer.

Unlike the domain classes (Project, TaskList, Task), the User is not a traditional class instance. Instead, it is implemented as a dedicated module that:

    Owns the global projects collection

    Manages currently opened tasks

    Provides controlled access to domain operations

    Coordinates persistence via the Storage abstraction

Responsibilities:

    Initialises application state by loading and rehydrating Projects from persisted JSON

    Exposes pure helper functions for:

        - Retrieving projects, lists, and tasks by ID

        - Creating and removing domain entities

        - Executing safe task mutations via higher-order utilities

    Acts as the single source of truth for application state

The module pattern was chosen instead of a User class beacuse this is a simple project that was never going to have more than one user in this iteration of the project. In the future I'd like to revist this project and create a User class with authentication.


## 🔄 Serialization & Rehydration Strategy

Application state is persisted using: JSON.stringify(projects)

Why I needed toJSON():

    All domain classes use private fields (#field) for encapsulation.

    Private fields are not enumerable, which means JSON.stringify() cannot access them automatically. Without explicit serialization logic:

        - Nested data disappears

        - Complex structures flatten incorrectly

        - Instances degrade into incomplete plain objects

    Each domain class implements a toJSON() method that returns a clean, explicit representation of its internal state.

    This ensures:

        - Only intentional data is serialized

        - No private implementation details leak

        - Nested structures remain intact

Rehydration via fromJSON():

    Data retrieved from storage is parsed into plain objects: JSON.parse(...)

    Plain objects do not contain:

        - Class methods

        - Prototypes

        - Encapsulation

        - Domain behavior

    To restore functionality, each layer implements a static factory:

        - Task.fromJSON()

        - TaskList.fromJSON()

        - Project.fromJSON()

    Rehydration occurs hierarchically:

        Projects
        → TaskLists
            → Tasks


    Each level reconstructs real class instances and restores nested relationships.

    Some data required explicit reconstruction:

        Date parsing – Stored as strings, restored as validated Date instances

        Enum reconstruction – Priority values are restored with identity integrity, not just raw strings

    Without this layer, tasks would lose behavioral correctness despite “looking” valid in storage.


## 🎨 Renderer Architecture

DOM logic is fully separated from domain logic.

The renderer is implemented as an IIFE to create a self-contained UI layer with private helper functions and no leaked globals.

This keeps DOM construction logic isolated from application state, exposing only a minimal public API while preventing accidental coupling to the rest of the system.

## 📱 Styling & Responsiveness

The visual design evolved iteratively alongside development, using ChatGPT as a real-time styling assistant rather than a one-shot generator.

The initial goal was a clean, modern interface built around:

    - A predominantly white layout with a subtle blue hue

    - Dark navy as the primary accent colour

    - Strong visual hierarchy with restrained contrast

The first step was generating a dedicated palette.css file to define reusable colour variables. These were previewed in a simple palette.html file to visually validate harmony, contrast, and usability before any layout work began.

This ensured that colour decisions were deliberate and consistent across the application.

Component-Driven Styling Process; Rather than prompting:

    - “Build me a todo app”
    - “Make this responsive”

The interface was built incrementally.

Each component was:

    - Structured in HTML

    - Styled intentionally

    - Refined in context

ChatGPT was used as a conversational CSS layer. In practice, this felt like writing plain English descriptions of visual intent and translating them into structured styling decisions.

This approach allowed:

    - Rapid iteration

    - Cleaner layout composition

    - More confident use of spacing and hierarchy

    - A significantly more polished visual result

    - The end product reflects collaborative refinement rather than automated generation.


## 🛠 Tooling

Webpack is used for:

    - ES module bundling

    - Development server

    - Production optimization

    - Source maps

Entry: src/index.js
Output: dist/

"scripts": {
    "build": "webpack",
    "start": "webpack serve --open"
}

npm run start launches the dev server and opens the app in the browser
npm run build generates an optimized production bundle in dist/


## 🌍 Deployment

The app is deployed using GitHub Pages.

Deployment process:

    - Run npm run build
    
    - Push the compiled dist/ output to the deployment branch
    
    - Configure GitHub Pages to serve that branch
    
    - No backend infrastructure is required.


## 🔮 Future Improvements

- Formal User class

- Authentication

- Backend API

- Database persistence

- Task editing improvements

- Sorting & filtering

- Automatic list completion




## 🎓 What This Project Represents

What began as a simple todo application developed into a structured exploration of application architecture.

The focus shifted away from feature expansion and toward internal design quality:

    - A layered domain model

    - Explicit serialization and rehydration boundaries

    - Clear separation between UI and business logic

    - Deliberate state management

The project ultimately became less about building functionality and more about building maintainable, well-structured software.
