import TaskList from './tasklist';

class Project {
  #title;
  #description;
  #todolists;
  #isComplete;
  #projectId;

  constructor(title, description = '', todolists=null, isComplete=null, projectId=null) {
    // Title validation
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('Project title must be a non-empty string');
    }

    // Description validation
    if (typeof description !== 'string') {
      throw new Error('Project description must be a string');
    }

    this.#title = title.trim();
    this.#description = description;
    this.#todolists = todolists ?? [];
    this.#isComplete = isComplete ?? false;
    this.#projectId = projectId ?? crypto.randomUUID();
    }

    /* ========= Getters ========= */

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get todolists() {
        // Defensive copy
        return this.#todolists;
    }

    get isComplete() {
        return this.#isComplete;
    }

    get projectId() {
        return this.#projectId;
    }

    get numLists() {
        return this.todolists.length;
    }

    toJSON() {
        return {
            projectId: this.#projectId,
            title: this.#title,
            description: this.#description,
            isComplete: this.#isComplete,
            todolists: this.#todolists, // TaskList instances, which serialize via their toJSON getter
        };
    }

    static fromJSON({ projectId, title, description, isComplete, todolists } = {}) {
        const hydratedLists = Array.isArray(todolists)
            ? todolists.map(TaskList.fromJSON)
            : [];

        return new Project(title, description, hydratedLists, isComplete, projectId);
}   

    /* ========= Setters ========= */

    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
        throw new Error('Project title must be a non-empty string');
        }
        this.#title = value.trim();
    }

    set description(value) {
        if (typeof value !== 'string') {
        throw new Error('Project description must be a string');
        }
        this.#description = value;
    }

    /* ========= Behavior ========= */

    addToDo(list) {
        if (!(list instanceof TaskList)) {
        throw new Error('Only TaskList instances can be added to a project');
        }
        this.#todolists.unshift(list);
    }

    removeToDo(list) {
        if (!(list instanceof TaskList)) {
        throw new Error('Only TaskList instances can be removed from a project');
        }

        const index = this.#todolists.indexOf(list);
        if (index === -1) {
        throw new Error('TaskList not found in this project');
        }

        this.#todolists.splice(index, 1);
    }

    getToDoById(id) {
        return this.#todolists.find(list => list.listId === id) ?? null;
    }

    removeToDoById(id) {
    const list = this.getToDoById(id);
    if (!list) {
      throw new Error('To-do not found in this To-do List');
    }
    this.removeToDo(list);
  }

}

export default Project;
