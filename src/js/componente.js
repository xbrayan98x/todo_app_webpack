// ## IMPORTS

// classes js
import { Todo } from '../classes';

// instacias en index
import { tareas } from '../index';

// refrencias HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBrrCmpl  = document.querySelector('.clear-completed');
const ulFiltros   =  document.querySelector('.filters');
const aFiltros    =  document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
      <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template">
    </li>
  `;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;
  divTodoList.append( div.firstElementChild );
  return div.firstElementChild;
}


// Events
txtInput.addEventListener('keyup',(e) =>{
  // e <- nos dirá que tecla presionó el user
  if ( e.keyCode === 13 && txtInput.value.length > 0 ) {
    const nuevoTodo = new Todo(txtInput.value);
    tareas.nuevoTodo( nuevoTodo );
    crearTodoHtml( nuevoTodo );
    txtInput.value = '';
  }
});

divTodoList.addEventListener('click', (e) => {
  // a que elemento del li como tal dimos click, input,label..
  const nombreElemento = e.target.localName;
  const todoElemento   = e.target.parentElement.parentElement;
  const todoId         = todoElemento.getAttribute('data-id');

  if ( nombreElemento.includes('input') ) {
    tareas.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
  }else if ( nombreElemento.includes('button') ) {
    tareas.eliminarTodo( todoId );
    divTodoList.removeChild( todoElemento );
  }
});

btnBrrCmpl.addEventListener('click', (e) => {
  tareas.eliminarCompletados();
  for (let i = divTodoList.children.length -1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if ( elemento.classList.contains('completed') ) {
      divTodoList.removeChild(elemento);
    }
  }
});


ulFiltros.addEventListener('click', (e) => {
    const filtro = e.target.text;
    if ( !filtro ) { return; }

    aFiltros.forEach( elem => elem.classList.remove('selected'));
    e.target.classList.add('selected');


    for ( const elemento of divTodoList.children ) {
      elemento.classList.remove('hidden');
      const completado = elemento.classList.contains('completed');
      switch ( filtro ) {
        case 'Pendientes':
            if ( completado ) {
              elemento.classList.add('hidden');
            }
          break;

          case 'Completados':
              if ( !completado ) {
                elemento.classList.add('hidden');
              }
            break;
      }
    }
});
