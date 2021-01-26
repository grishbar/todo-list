<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// иногда в проекте все стили хранятся в соответствующих файлах
// и импортируются из них но я предпочитаю хранить стили в компонентах
</script>

<style lang="scss">
  /* Критические стили одинаковые для всего проекта */
  * {
    box-sizing: border-box;
  }

  p {
    margin: 0;
  }

  body {
    margin: 0;
  }

  #app {
    font-family: sans-serif;
  }

  .button {
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    cursor: pointer;
    transition: all .4s ease;

    &._green {
      background-color: #4CAF50;

      &:hover {
        background-color: #3e8e41;
      }
    }

    &._blue {
      background-color: #008CBA;
    }

    &._red {
      background-color: #f44336;
    }

    &._gray {
      background-color: #e7e7e7;
      color: black;
    }

    &._black {
      background-color: #555555;
    }

    &._big {
      width: 100%;
    }

    &._small {
      padding: 6px 14px;
    }

    &._disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .popup {
    position: fixed;
    z-index: 100;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: white;
    padding: 40px;
    -webkit-box-shadow: 10px 10px 5px 100vw rgba(0,0,0,0.15);
    -moz-box-shadow: 10px 10px 5px 100vw rgba(0,0,0,0.15);
    box-shadow: 10px 10px 5px 100vw rgba(0,0,0,0.15);

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

    &__close:before, &__close:after {
      position: absolute;
      left: 9px;
      content: ' ';
      height: 18px;
      width: 2px;
      background-color: #333;
    }

    &__close:before {
      transform: rotate(45deg);
    }

    &__close:after {
      transform: rotate(-45deg);
    }
  }
</style>
