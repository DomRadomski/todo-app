// title, description, dueDate and priority
import Priority from './priority';
import { isAfter, parseISO } from 'date-fns';

class Task {
  #title;
  #dueDate;
  #priority;
  #description;

  constructor(title, dueDate, priority = Priority.NORMAL, description = '') {
    
    // Title validation
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title must be a non-empty string');
    }

    // Date validation
    if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
      throw new Error('dueDate must be a valid Date');
    }

    // Priority validation
    if (!Object.values(Priority).includes(priority)) {
      throw new Error(
        `Priority must be one of: ${Object.values(Priority).join(', ')}`
      );
    }

    // Description validation
    if (typeof description !== 'string') {
      throw new Error('Description must be a string');
    }

    // Assign to private fields
    this.#title = title;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#description = description;
    
    }

    // Getters
    get title() {
    return this.#title;
    }

    get dueDate() {
    return this.#dueDate;
    }

    get priority() {
    return this.#priority;
    }

    get description() {
    return this.#description;
    }

    get isUpcoming() {
    return this._dueDate > new Date();
    }

    // Derived property
    get isOverdue() {
    return Date.now() > this.#dueDate.getTime();
    }

    set title(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error('Task title must be a non-empty string');
    }
    this.#title = value.trim();
    }

    set dueDate(value) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
        throw new Error('dueDate must be a valid Date');
    }
    this.#dueDate = value;
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
}

export default Task;

