/**
 * Структуры данных в том виде, в котором они хранятся в файле.
 */

import { FlatType, FlatStatus } from './flat';

export interface IStoredFlatInfo {
    id: string;
    cost: number;
    type: FlatType;
    floor: number;
    number: string;
    square: number;
    status: FlatStatus;
    // eslint-disable-next-line camelcase
    plan_type: string | null;
    subsidy: boolean;
    marginal: boolean;
    renovation: boolean;
    installment: boolean;
}

export interface IStoredFloorFlatInfo {
    id: string;
    number: number;
}

export interface IStoredFloorInfo {
    floor: number;
    flats: IStoredFloorFlatInfo[];
}

export interface IStoredEntranceInfo {
    id: string;
    // eslint-disable-next-line camelcase
    house_id: string;
    title: string;
    floors: IStoredFloorInfo[];
}
