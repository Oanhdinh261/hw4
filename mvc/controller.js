import {Model} from './model.js';
import {View} from './view.js';

export const Controller = ((model, view) => {
	const state = new model.State();
	const todoContainer = document.querySelector(
		`.${view.domstr.listContainer}`
	);
	const inputbox = document.querySelector(`.${view.domstr.inputBox}`);

	const addTodo = () => {
		inputbox.addEventListener("keyup", (e) => {
			if (e.key === "Enter" && e.target.value.trim() !== "") {
				const newtodo = new model.Todo(e.target.value);
				console.log("New todo being added:", newtodo); // Log the new todo
	
				model.addTodo(newtodo)
					.then((todo) => {
						console.log("API Response for addTodo:", todo); // Log the response
						if (todo && todo.id) {
							state.todolist = [todo, ...state.todolist]; // Add to state
						} else {
							console.error("Failed to add todo. Invalid response:", todo);
						}
					})
					.catch((error) => console.error("Error adding todo:", error));
	
				e.target.value = ""; // Clear input
			}
		});
	};
	
	
	const deleteTodo = () => {
		todoContainer.addEventListener("click", (e) => {
			if (e.target.classList.contains(view.domstr.deleteBtn)) {
				console.log("Deleting todo with ID:", e.target.id);
				state.todolist = state.todolist.filter(
					(todo) => +todo.id !== +e.target.id
				);
				model.deleteTodo(e.target.id);
			}
		});
	};
	
	const checkMark = () => {
		todoContainer.addEventListener("click", (e) => {
			const liItem = e.target.closest("li");
			if (liItem) {
				const itemId = +liItem.dataset.id;
				liItem.classList.toggle("checked");
	
				state.todolist = state.todolist.map((todo) =>
					todo.id === itemId ? { ...todo, completed: !todo.completed } : todo
				);
			}
		});
	};
	
	
	
	

	const init = () => {
		model.getTodos().then((todolist) => {
			state.todolist = todolist.reverse();
		});
	};
	
	const bootstrap = () => {
		init();
		deleteTodo();
		addTodo();
		checkMark(); // Mark todo as completed
	};
	

	return { bootstrap };
})(Model, View);