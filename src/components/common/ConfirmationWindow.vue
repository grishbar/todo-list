<template>
  <div class="popup confirmation-window">
    <a
      class="close-button popup__close"
      @click="cancelChanges"
    />
    <p class="confirmation-window__title">
      {{ title }}
    </p>
    <button
      class="confirmation-window__button button _green _small"
      @click="confirmChanges"
    >
      Да
    </button>
  </div>
</template>

<script>
export default {
  props: {
    confirmChanges: {
      type: Function,
      default() {
        return () => {};
      },
    },
    cancelChanges: {
      type: Function,
      default() {
        return () => {};
      },
    },
    title: {
      type: String,
      default() {
        return '';
      },
    },
  },
};
</script>

<style lang="scss">
  .confirmation-window {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title {
      margin-bottom: 20px;
    }
  }
</style>
