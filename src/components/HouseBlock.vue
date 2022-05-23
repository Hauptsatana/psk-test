<template>
    <div class="house-block__container">
        <!-- Этажи -->
        <floor-numbers :maxFloors="maxFloors" />
        <!-- Подъезды -->
        <entrance-block
            v-for="entrance in houseInfo?.entrances"
            :key="entrance.id"
            class="house-block__entrance"
            :entranceInfo="entrance"
            :max-floors="maxFloors"
        />

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
@import '@/styles/_variables.less';

.house-block {

  &__container {
    display: flex;
    flex-direction: row;
  }

  &__entrance {
    padding-right: @entrance-padding;
  }
}
</style>
