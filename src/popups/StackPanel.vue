<template>
  <!-- <teleport to="body" v-if="show"> -->
    <div
      class="stack-panel__container"
      :style="{zIndex: zIndex}"
      v-if="show"
    >
      <!-- Заголовок -->
      <div class="stack-panel__header">
        <div class="stack-panel__title">{{header}}</div>
        <div class="stack-panel__icons">
          <!-- Кнопка закрытия -->
          <button class="stack-panel__icon" @click="close">
              <span class="fa fa-xmark fa-xl"></span>
          </button>
        </div>
      </div>

      <!-- Содержимое -->
      <div class="stack-panel__content">
        <ScrollPanel
          class="stack-panel__scroll-panel"
        >
          <slot></slot>
        </ScrollPanel>
      </div>
    </div>
  <!-- </teleport> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScrollPanel from 'primevue/scrollpanel';

/**
 * Выезжающая справа панель
 */
export default defineComponent({
  components: {
    ScrollPanel,
  },
  props: {
    /** Показать панель */
    show: Boolean,
    width: Number,
    header: String,
  },
  data() {
    return {
      // TODO: Получать zIndex от PopupManager
      zIndex: 100,
    };
  },
  methods: {
    /**
     * Закрыть панель
     */
    close() {
      this.$emit('update:show');
    },
  },
});
</script>

<style lang="less">
  @panel-padding: 10px;
  @panel-border: 1px solid #dee2e6;
  @header-background: #f8f9fa;
  @content-background: #ffffff;

  .stack-panel {

    &__container {
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      background: @header-background;
      border: @panel-border;
      padding: @panel-padding;
    }

    &__title {
      font-weight: bold;
    }

    &__icon {
      border: 0 none;
      background: transparent;
      border-radius: 50%;
      transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
      cursor: pointer;
      width: 32px;
      height: 32px;

      &:hover {
        background: #e9ecef;
        border-color: transparent;
      }
    }

    &__content {
      height: 100%;

      background: @content-background;
      border: @panel-border;
      padding: @panel-padding;
    }

    &__scroll-panel {
      height: 100%;
      width: 100%;
    }
  }
</style>
