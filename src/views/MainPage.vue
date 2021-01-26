<template>
  <div class="main-page">
    <div class="container">
      <h1 class="title">
        небольшое SPA приложение для TODO заметок
      </h1>
      <a
        class="button _green _big"
        @click="isTodoNoteCreatingWindowVisible = !isTodoNoteCreatingWindowVisible"
      >
        Создать заметку
      </a>
      <div class="todo-notes-container">
        <TodoNoteItem
          v-for="todoNote in todoNotes"
          :key="todoNote.id"
          :todo-note="todoNote"
          :show-confirmation-window="showConfirmationWindow"
        />
      </div>
      <CreateNewTodoNote
        v-show="isTodoNoteCreatingWindowVisible"
        :cancel-creating-new-todo="cancelCreatingNewTodo"
      />
    </div>
    <ConfirmationWindow
      v-show="isConfirmationWindowVisible"
      :confirm-changes="removeChoosedTodoNote"
      :cancel-changes="() => {isConfirmationWindowVisible = false}"
      title="Вы действительно хотите удалить заметку"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TodoNoteItem from '../components/main-page/TodoNote.vue';
import CreateNewTodoNote from '../components/main-page/CreateNewTodoNote.vue';
import ConfirmationWindow from '../components/common/ConfirmationWindow.vue';

export default {
  components: {
    TodoNoteItem,
    CreateNewTodoNote,
    ConfirmationWindow,
  },

  data() {
    return {
      isTodoNoteCreatingWindowVisible: false,
      isConfirmationWindowVisible: false,
      todoNodeForConfirm: {},
    };
  },

  computed: {
    todoNotes() {
      return this.$store.state.todoNotes;
    },
  },

  methods: {
    ...mapActions([
      'createTodoNote',
      'editTodoNote',
      'removeTodoNote',
    ]),

    cancelCreatingNewTodo() {
      this.isTodoNoteCreatingWindowVisible = false;
    },

    showConfirmationWindow(todoNote) {
      this.todoNodeForConfirm = todoNote;
      this.isConfirmationWindowVisible = true;
    },

    removeChoosedTodoNote() {
      this.removeTodoNote(this.todoNodeForConfirm);
      this.isConfirmationWindowVisible = false;
    },
  },
};
</script>

<style lang="scss">
  .main-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .todo-notes-container {
    background: aliceblue;
  }
</style>
