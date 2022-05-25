/* eslint-disable @typescript-eslint/ban-ts-comment */

import { IPopupConfig, IPopupManager } from './types';

/**
 * Класс менеджера всплывающих окон.
 * Сам менеджер является синглтоном.
 * Создает инстансы всплывающих окон, раздает z-index.
 */
class PopupManager {
  private component: IPopupManager | null = null;

  /**
   * Регистрируем компононент Vue, через который будем открывать всплывающие окна.
   */
  setManagerComponent(component: IPopupManager) {
    this.component = component;
  }

  openPopup(panelCfg: IPopupConfig) {
    if (!this.component) {
      return;
    }

    this.component.openPopup(panelCfg);
  }

  closePopup(popupId: string) {
    if (!this.component) {
      return;
    }

    this.component.closePopup(popupId);
  }
}

const popupManager: PopupManager = new PopupManager();

export default popupManager;
