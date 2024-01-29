import todoStore from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases";

const ElementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
    };

    //Cuando la función APP () se llama
    (() => {
        const app = document.createElement("div");
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML 
    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUl = document.querySelector(ElementIds.TodoList);

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        
        if( event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();

        event.target.value = '';    
    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id'));
        displayTodos();
    });
    
    todoListUl.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const elementId = event.target.closest('[data-id]');
        if(!isDestroyElement || !elementId){
            return;
        }
        
        todoStore.deleteTodo(elementId.getAttribute('data-id'));
        displayTodos();

        // todoStore.toggleTodo( element.getAttribute('data-id'));
    });

};
