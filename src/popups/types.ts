/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IPopupConfig {
  id: string;

  /**
   * Закрывать всплывашку по клику вне зоны всплывашки.
   */
  closeOnOutsideClick?: boolean;

  /**
   * Компонент Vue в блоке содержимого всплывающей панели.
   */
  // FIXME: Какой тип использовать для произвольного компонента Vue?
  contentTemplate: any;

  /**
   * Опции компонента.
   */
  contentOptions?: object;

  /**
   * Заголовок всплывающей панели.
   */
  header: string;
}

export interface IOpenStackPanelConfig {
  /**
   * Заголовок всплывающей панели.
   */
  header: string;

  /**
   * Компонент Vue в блоке содержимого всплывающей панели.
   */
  // FIXME: Какой тип использовать для компонента Vue?
  contentTemplate: any;

  /**
   * Опции компонента.
   */
  contentOptions?: object;
}

/**
 * Методы, которые поддерживает менеджер окон.
 */
export interface IPopupManager {
  openPopup(popupCfg: IPopupConfig): void;
  closePopup(popupId: string): void;
}
