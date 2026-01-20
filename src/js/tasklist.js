import Task from "./task";
import Priority from "./priority";

class TaskList {
    #title;
    #description;
    #priority;
    #tasklist;

    constructor(title, description='') {
    // Title validation
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title must be a non-empty string');
    }

    // Description validation
    if (typeof description !== 'string') {
      throw new Error('Description must be a string');
    }

    this.#title = title;
    this.#description = description;
    this.#priority = Priority.NORMAL;
    this.#tasklist = [];

    }

    get title() {
    return this.#title;
    }

    get description() {
    return this.#description;
    }

    get priority() {
        return this.#priority;
    }

    get tasklist() {
        return this.#tasklist;
    }

    set title(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error('Task title must be a non-empty string');
    }
    this.#title = value.trim();
    }

    set priority(value) {
    if (!Object.values(Priority).includes(value)) {
        throw new Error(
        `Priority must be one of: ${Object.values(Priority).join(', ')}`
        );
    }
    this.#priority = value;
    }

    set description(value) {
    if (typeof value !== 'string') {
        throw new Error('Description must be a string');
    }
    this.#description = value;
    }

    addTask(task) {
        if (!(task instanceof Task)) {
            throw new Error('Only Task instances can be added');
        }
        this.#tasklist.push(task);
    }

    removeTask(task) {
        if (!(task instanceof Task)) {
            throw new Error('Only Task instances can be removed');
        }

        const index = this.#tasklist.indexOf(task);

        if (index === -1) {
            throw new Error('Task not found in this list');
        }

        this.#tasklist.splice(index, 1);
    }

    //filter by priority ascending descending
    // Add task complete and task list complete if tasks are complete what if there's no tasks in task list???
    //check if tasklst is empty then differne tvonditions if nt empty then check if all sbtasks are complete if not then it needs to be ticked manually
}
