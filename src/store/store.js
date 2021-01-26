// в большом приложении стор можно и даже нужно разбить на папки
// action mutations modules и index.js где все будем собирать и экспортировать
// и под каждый модуль в папке мутаций и действий соответствующая папка
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// ключ по которому будем хранить todo заметки в локальном хранилище
const STORAGE_KEY = 'todoNotes';

export default new Vuex.Store({
  state: {
    todoNotes: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
  },

  mutations: {
    createTodoNote(state, newTodo) {
      state.todoNotes.push({
        id: newTodo.id, title: newTodo.title, todoList: newTodo.todoList, completed: false,
      });
    },
    removeTodoNote(state, todoNote) {
      state.todoNotes.splice(state.todoNotes.indexOf(todoNote), 1);
    },
    updateTodoNote(state, { todoNote, title, todoList }) {
      // eslint-disable-next-line no-param-reassign
      todoNote.title = title;
      // eslint-disable-next-line no-param-reassign
      todoNote.todoList = todoList;
    },
  },

  actions: {
    createTodoNote({ commit }, newTodo) {
      commit('createTodoNote', {
        id: Date.now(),
        title: newTodo.title,
        todoList: newTodo.todoList,
      });
    },
    removeTodoNote({ commit }, todoNote) {
      commit('removeTodoNote', todoNote);
    },
    updateTodoNote({ commit }, { todoNote, title, todoList }) {
      commit('updateTodoNote', { todoNote, title, todoList });
    },
  },

  // обновляем локальное хранилище todo заметок, каждый раз при изменении store
  plugins: [(store) => {
    store.subscribe((mutation, { todoNotes }) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todoNotes));
    });
  }],
});
