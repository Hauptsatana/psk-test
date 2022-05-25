<template>
  <div class="popup-manager" id="popupManager">
      <!-- Отображаемые стековые панели -->
      <stack-panel
        v-for="shownPopupCfg, popupId in popups"
        :key="popupId"
        :header="shownPopupCfg.popupConfig.header"
        v-model:show="shownPopupCfg.show"
      >
        <component
          :is="shownPopupCfg.popupConfig.contentTemplate"
          v-bind="shownPopupCfg.popupConfig.contentOptions"
        />
      </stack-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StackPanel from './StackPanel.vue';
import PopupManager from './PopupManager';
import { IPopupConfig } from './types';

interface IShownPopupConfig {
  show: boolean;
  popupConfig: IPopupConfig;
}

/**
 * Компонентная часть менеджера окон, через которую создаются компоненты всплывающих панелей.
 */
export default defineComponent({
  components: { StackPanel },
  data() {
    return {
      popups: {} as Record<string, IShownPopupConfig>,
    };
  },
  created(): void {
    PopupManager.setManagerComponent(this);
    // window.$pmc = this;
  },
  methods: {
    openPopup(popupCfg: IPopupConfig): void {
      this.popups[popupCfg.id] = {
        show: true,
        popupConfig: popupCfg,
      };
    },
    closePopup(popupId: string): void {
      if (!this.popups[popupId]) {
        return;
      }

      this.popups[popupId] = {
        show: false,
        popupConfig: this.popups[popupId].popupConfig,
      };
    },
  },
});

</script>

<style>
  .popup-manager {
    position: relative;
  }
</style>
