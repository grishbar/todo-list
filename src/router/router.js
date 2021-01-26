import Vue from 'vue';
import Router from 'vue-router';
import EditTodoNote from '../views/EditTodoNote.vue';
import MainPage from '../views/MainPage.vue';

Vue.use(Router);

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: [
    {
      path: '/edit-todo-note/:todoNoteId',
      name: 'edit-todo-note',
      component: EditTodoNote,
      props: true,
    },
    {
      path: '/',
      name: 'main-page',
      component: MainPage,
      props: true,
    },
  ],
});

export default router;
