// export const NonResidialPremises = 'Нежилове помещение';
// export const ResisialPremises = 'Жилое';
// export const Parking = 'паркинг';

/**
 * Назначение помещения
 */
// eslint-disable-next-line no-shadow
export enum FlatType {
    Residential = 'Квартира',
    NonResidential = 'Нежилые помещения',
    Parking = 'паркинг',
}

/**
 * Текущий статус помещения
 */
// eslint-disable-next-line no-shadow
export enum FlatStatus {
    HandedOver = 'Выданы ключи',
    Signed = 'Договор',
    Reserved = 'Бронь',
    Processing = 'Оформление',
    ForSale = 'Свободна',
}

/**
 * Сведения о помещении
 */
export interface IFlatInfo {
    id: string;
    cost: number;
    type: FlatType;
    floor: number;
    number: string;
    square: number;
    status: FlatStatus;
    planType: string | null;
    subsidy: boolean;
    marginal: boolean;
    renovation: boolean;
    installment: boolean;
}

export type NullableFlatInfo = IFlatInfo | null;

export interface IFloorInfo {
    number: number;
    flats: NullableFlatInfo[];
}

export interface IEntranceInfo {
    id: string;
    title: string;
    floors: IFloorInfo[];
}

export type NullableEntranceInfo = IEntranceInfo | null;

export interface IHouseInfo {
    id: string;
    entrances: IEntranceInfo[];
}
