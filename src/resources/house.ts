import {
  IHouseInfo,
  IEntranceInfo,
  IFloorInfo,
  IFlatInfo,
  NullableFlatInfo,
} from '@/types/flat';
import {
  IStoredEntranceInfo,
  IStoredFloorInfo,
  IStoredFloorFlatInfo,
  IStoredFlatInfo,
} from '@/types/dataSource';

/**
 * Нормализованные данные из файла.
 */
let normalizedData: IHouseInfo[];

function getNormalizedData(forceRead?: boolean): Promise<IHouseInfo[]> {
  // Данные уже нормализованы.
  if (normalizedData && !forceRead) {
    return Promise.resolve(normalizedData);
  }
  return import('@/assets/data.json').then((jsonData) => {
    // Получаем список домов.
    const result: IHouseInfo[] = jsonData.houses.map((houseId: string): IHouseInfo => ({
      id: houseId,
      entrances: [],
    }));

    // Соберем словарь домов.
    const houseDict: Record<string, IHouseInfo> = result
      .reduce((prev: Record<string, IHouseInfo>, houseInfo: IHouseInfo) => {
        const cur: Record<string, IHouseInfo> = {
          ...prev,
          [houseInfo.id]: houseInfo,
        };
        return cur;
      }, {});

    // Заполняем его информацией о подъездах.
    jsonData.entrances.forEach((storedEntranceInfo: IStoredEntranceInfo) => {
      /**
       * Преобразуем информацию об этажах.
       * На всякий случай предварительно отсортируем массив и защитимся от отсуствия данных.
       */
      const floors: IFloorInfo[] = storedEntranceInfo.floors
        .sort((floorA: IStoredFloorInfo, floorB: IStoredFloorInfo) => floorA.floor - floorB.floor)
        .reduce<IFloorInfo[]>((prevFloors: IFloorInfo[], storedFloorInfo: IStoredFloorInfo) => {
          if (storedFloorInfo.floor !== prevFloors.length + 1) {
            console.error('Неконсистентные данные!');
            prevFloors.push({
              number: storedFloorInfo.floor,
              flats: [],
            });
            return prevFloors;
          }

          /**
           * Преобразуем информацию о квартирах.
           * На всякий случай предварительно отсортируем и защитимся от отсутствия данных.
           */
          const flats: NullableFlatInfo[] = storedFloorInfo.flats
            .sort((flatA: IStoredFloorFlatInfo, flatB: IStoredFloorFlatInfo) => flatA.number - flatB.number)
            .reduce<NullableFlatInfo[]>((prevFlats: NullableFlatInfo[], storedFloorFlatInfo: IStoredFloorFlatInfo) => {
              if (storedFloorFlatInfo.number !== prevFlats.length + 1) {
                console.error('Неконсистентные данные!');
                prevFlats.push(null);
                return prevFlats;
              }

              // Получаем сведения по помещению.
              // eslint-disable-next-line operator-linebreak
              const storedFlatInfo: IStoredFlatInfo =
                (jsonData.flats as Record<string, IStoredFlatInfo>)[storedFloorFlatInfo.id] || null;

              // Преобразуем в объект нужной структуры (отличия только в  planType).
              const flatInfo: IFlatInfo = {
                id: storedFlatInfo.id,
                cost: storedFlatInfo.cost,
                type: storedFlatInfo.type,
                floor: storedFlatInfo.floor,
                number: storedFlatInfo.number,
                square: storedFlatInfo.square,
                status: storedFlatInfo.status,
                planType: storedFlatInfo.plan_type,
                subsidy: storedFlatInfo.subsidy,
                marginal: storedFlatInfo.marginal,
                renovation: storedFlatInfo.renovation,
                installment: storedFlatInfo.installment,
              };
              prevFlats.push(flatInfo);
              return prevFlats;
            }, []);

          prevFloors.push({
            number: storedFloorInfo.floor,
            flats,
          });
          return prevFloors;
        }, []);

      const entranceInfo: IEntranceInfo = {
        id: storedEntranceInfo.id,
        title: storedEntranceInfo.title,
        floors,
      };

      const houseInfo: IHouseInfo = houseDict[storedEntranceInfo.house_id];
      houseInfo.entrances.push(entranceInfo);
    });

    normalizedData = result;
    return result;
  });
}

export interface IHousesInfoParams {
  installments: boolean,
}

/**
 * Возвращает нормализованный список домов с информацией о них.
 */
export function getHousesInfo(): Promise<IHouseInfo[]> {
  return getNormalizedData();
}
