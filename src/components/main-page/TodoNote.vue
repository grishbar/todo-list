<template>
  <div class="todo-note-item">
    <div class="todo-note-item__top-block">
      <p class="todo-note-item__title">
        {{ todoNote.title }}
      </p>
      <div class="todo-note-item__buttons">
        <router-link
          :to="{ name: 'edit-todo-note', params: {todoNoteId: todoNote.id, todoNote} }"
          class="button _blue _small"
        >
          редактировать
        </router-link>
        <button
          class="button _red _small"
          @click="showConfirmationWindow(todoNote)"
        >
          удалить
        </button>
      </div>
    </div>
    <div
      v-if="todoNote.todoList && todoNote.todoList.length"
      :key="Date.now()"
      class="tasks-list"
    >
      <div class="tasks-list__title">
        Список задач:
      </div>
      <div
        v-for="todoItem in todoNote.todoList"
        :key="todoItem.id"
        class="tasks-list__task"
      >
        <p>{{ todoItem.title }}</p>
        <input
          v-model="todoItem.completed"
          type="checkbox"
          disabled
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    todoNote: {
      type: Object,
      default() {
        return { title: 'не указано навзвание todo заметки', todoList: [] };
      },
    },
    showConfirmationWindow: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },

  methods: {
    ...mapActions([
      'removeTodoNote',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .tasks-list {
    margin-left: 20px;

    &__task {
      display: flex;
      align-items: center;
    }
  }

  .todo-note-item {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 20px 20px;
    border: 1px solid black;
    border-top: none;

    &:first-child {
      border-top: 1px solid black;
    }

    &__top-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
</style>
