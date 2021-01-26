<template>
  <div class="edit-note">
    <h1>редактировать заметку</h1>
    <input
      v-model="newTodoNoteTitle"
      type="text"
    >
    <div
      v-for="todoItem in newTodoList"
      :key="todoItem.id"
      class="tasks-list__task"
    >
      <input
        v-model="todoItem.title"
        type="text"
      >
      <input
        v-model="todoItem.completed"
        type="checkbox"
      >
    </div>
    <div class="new-todo__input-block _small">
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
    <button
      class="button _red"
      @click="showRemoveConfirmationWindow"
    >
      удалить заметку
    </button>
    <div class="edit-note__buttons">
      <button
        class="button _gray"
        @click="showCancelConfirmationWindow"
      >
        отменить
      </button>
      <button
        class="button _green"
        @click="submitChanges"
      >
        сохранить
      </button>
    </div>
    <ConfirmationWindow
      v-show="isConfirmationWindowVisible"
      :confirm-changes="confirmationWindowProps['confirm-changes']"
      :cancel-changes="confirmationWindowProps['cancel-changes']"
      :title="confirmationWindowProps.title"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ConfirmationWindow from '../components/common/ConfirmationWindow.vue';

export default {
  components: {
    ConfirmationWindow,
  },

  props: {
    todoNote: {
      type: Object,
      default() {
        return { title: 'не указана todo заметки', todoList: [] };
      },
    },
  },

  data() {
    return {
      isConfirmationWindowVisible: false,
      newTodoNoteTitle: this.todoNote.title,
      todoItemTitle: '',
      newTodoList: this.todoNote.todoList,
      currentTodoNoteItem: {},
      confirmationWindowProps: {},
    };
  },

  computed: {
    todoNotes() {
      return this.$store.state.todoNotes;
    },
  },

  created() {
    if (!this.todoNote.id) {
      const uri = window.location.href.split('/');
      const todoNoteId = uri.pop();
      this.currentTodoNoteItem = this.todoNotes.find((el) => String(el.id) === todoNoteId);
      this.newTodoNoteTitle = this.currentTodoNoteItem.title;
      this.newTodoList = this.currentTodoNoteItem.todoList;
    } else {
      this.currentTodoNoteItem = this.todoNote;
    }
  },

  methods: {
    ...mapActions([
      'createTodoNote',
      'removeTodoNote',
      'updateTodoNote',
    ]),

    cancelСhanges() {
      this.$router.push({ name: 'main-page' });
    },

    submitChanges() {
      this.updateTodoNote({
        todoNote: this.currentTodoNoteItem,
        title: this.newTodoNoteTitle,
        todoList: this.newTodoList,
      });
      this.$router.push({ name: 'main-page' });
    },

    addTodoItem() {
      if (this.todoItemTitle.length) {
        this.newTodoList.push({ title: this.todoItemTitle, completed: false, id: Date.now() });
        this.todoItemTitle = '';
      }
    },

    showCancelConfirmationWindow() {
      this.confirmationWindowProps.title = 'Отменить редактирование заметки?';
      this.confirmationWindowProps['cancel-changes'] = () => { this.isConfirmationWindowVisible = false; };
      this.confirmationWindowProps['confirm-changes'] = this.cancelСhanges;
      this.isConfirmationWindowVisible = true;
    },

    showRemoveConfirmationWindow() {
      this.confirmationWindowProps.title = 'Вы действительно хотите удалить заметку';
      this.confirmationWindowProps['cancel-changes'] = () => { this.isConfirmationWindowVisible = false; };
      this.confirmationWindowProps['confirm-changes'] = () => {
        this.removeTodoNote(this.currentTodoNoteItem);
        this.$router.push({ name: 'main-page' });
      };
      this.isConfirmationWindowVisible = true;
    },
  },
};
</script>

<style lang="scss">
  .edit-note {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__buttons {
      display: flex;
    }
  }
</style>
