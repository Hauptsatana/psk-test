<template>
    <div class="house-block__container">

      <div class="house-block__schema">
        <!-- Этажи -->
        <floor-numbers :maxFloors="maxFloors" />
        <!-- Подъезды -->
        <entrance-block
            v-for="entrance in houseInfo.entrances"
            :key="entrance.id"
            class="house-block__entrance"
            :entranceInfo="entrance"
            :max-floors="maxFloors"
        />
      </div>

      <!-- uid дома -->
      <div class="house-block__name">
        Дом {{houseInfo.id}}
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IEntranceInfo, IHouseInfo } from '@/types/flat';
import EntranceBlock from './EntranceBlock.vue';
import FloorNumbers from './FloorNumbers.vue';

export default defineComponent({
  components: {
    EntranceBlock,
    FloorNumbers,
  },
  props: {
    houseInfo: {
      type: Object as PropType<IHouseInfo>,
      required: true,
    },
  },
  computed: {
    maxFloors(): number {
      const entranceFloors: number[] = this.houseInfo.entrances
        .map<number>((entranceInfo: IEntranceInfo) => entranceInfo.floors.length)
        .sort((a: number, b: number) => b - a);

      return entranceFloors[0] || 0;
    },
  },
});
</script>

<style lang="less">
@import '@/styles/_dimensions.less';

.house-block {

  &__schema {
    display: flex;
    flex-direction: row;
  }

  &__entrance {
    padding-right: @entrance-padding;
  }

  &__name {
    font-weight: bold;
    padding-left: calc(@floor-number-width + @flat-padding);
    padding-bottom: @house-padding-bottom;
  }
}
</style>
