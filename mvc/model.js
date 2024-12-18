import { API } from './api.js';
import { View } from './view.js';

export const Model = ((api, view) => {
    class State {
        #todolist = [];
        #todoContainer = document.querySelector(
            `.${view.domstr.listContainer}`
        );
        // querySelector: Nodelist vs. getElementById: HTMLCollection
        // const todoContainer = document.getElementsByClassName(view.domstr.listContainer)[0];

        get todolist() {
            return this.#todolist;
        }

        set todolist(newtodolist) {
			this.#todolist = [...newtodolist];

			const tmp = view.createTmp(this.#todolist);
			view.render(this.#todoContainer, tmp);
		}
    }

    class Todo {
        constructor(title) {
            this.userId = 22;
            this.title = title;
            this.completed = false;
        }
    }

    return {
        ...api,
        State,
        Todo,
    };
})(API, View);