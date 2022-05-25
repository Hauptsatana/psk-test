import randomUUID from '@/utils/randomUuid';
import PopupManager from './PopupManager';
import { IOpenStackPanelConfig, IPopupConfig } from './types';

/**
 * Класс для открытия стековых панелей программно через код.
 * На один инстанс StackOpener будет создана ровно одна стековая панель.
 */
export default class StackOpener {
  /**
   * UUID ранее созданной стековой панели.
   */
  private popupId: string | null = null;

  open(config: IOpenStackPanelConfig): void {
    // Открываем панель первый раз - надо сгенерировать uuid.
    if (!this.popupId) {
      this.popupId = randomUUID();
    }

    const panelCfg: IPopupConfig = {
      ...config,
      id: this.popupId,
    };
    PopupManager.openPopup(panelCfg);
  }

  close(): void {
    if (!this.popupId) {
      return;
    }

    PopupManager.closePopup(this.popupId);
  }
}
