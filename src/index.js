import './estilos.css';
import { Todo, TodoList } from './classes/';
import { crearTodoHtml }  from './js/componente';


export const tareas = new TodoList();

tareas.todos.forEach( todo  => crearTodoHtml(todo) );
