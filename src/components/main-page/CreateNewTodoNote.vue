<template>
  <div class="popup new-todo">
    <div
      class="popup__close"
      @click="cancelTodoNoteWindowCreating"
    />
    <div class="new-todo__input-block">
      <label class="new-todo__title">
        Заголовок заметки:
      </label>
      <input
        v-model.trim="todoNoteTitle"
        type="text"
        class="new-todo__input"
      >
    </div>
    <div class="new-todo__input-block">
      <label class="new-todo__title">
        Название задачи:
      </label>
      <input
        v-model.trim="todoItemTitle"
        type="text"
        class="new-todo__input"
      >
      <button
        class="new-todo__add-task button _blue _small"
        @click="addTodoItem"
      >
        Добавить задачу
      </button>
    </div>
    <div
      v-if="todoList.length"
      class="new-todo__tasks"
    >
      <p class="new-todo__title">
        Список задач:
      </p>
      <div
        v-for="todoItem in todoList"
        :key="todoItem.id"
        class="tasks-list__task"
      >
        <p>{{ todoItem.title }}</p>
      </div>
    </div>
    <div class="new-todo__bottom">
      <button
        class="button _gray _small"
        @click="cancelTodoNoteWindowCreating"
      >
        Отмена
      </button>
      <button
        class="button _green _small"
        @click="addTodoNote"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    cancelCreatingNewTodo: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },

  data() {
    return {
      showTodoNoteCreatingWindow: false,
      todoNoteTitle: '',
      todoItemTitle: '',
      todoList: [],
    };
  },

  computed: {
    todoNotes() {
      return this.$store.state.todos;
    },
  },

  methods: {
    ...mapActions([
      'createTodoNote',
    ]),

    addTodoNote() {
      if (this.todoNoteTitle && this.todoList.length) {
        this.createTodoNote({ title: this.todoNoteTitle, todoList: this.todoList });
        this.todoNoteTitle = '';
        this.todoItemTitle = '';
        this.todoList = [];
      }
    },

    addTodoItem() {
      this.todoList.push({ title: this.todoItemTitle, completed: false, id: Date.now() });
      this.todoItemTitle = '';
    },

    checkInputs() {

    },

    cancelTodoNoteWindowCreating() {
      this.cancelCreatingNewTodo();
      this.todoNoteTitle = '';
      this.todoItemTitle = '';
      this.todoList = [];
    },
  },
};
</script>

<style lang="scss">
  .new-todo {
    &__title {
      margin: 0;
    }

    &__input-block {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 20px;

      &._small {
        width: auto;
      }
    }

    &__input {
      padding: 6px 14px;
    }

    &__close {
      position: absolute;
      right: 20px;
      top: 15px;
      width: 18px;
      height: 18px;
      opacity: 0.3;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
