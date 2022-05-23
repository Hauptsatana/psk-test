<template>
  <div class="entrance-block__container">
    <!-- Этажи с помещениями -->
    <div class="entrance-block__floors">
      <!-- Этажи подъезда -->
      <floor-row
        v-for="floorInfo, floorInfoIndex in entranceInfo?.floors"
        :key="floorInfoIndex"
        :floorInfo="floorInfo"
      />
      <!-- Заглушки для выравнивания всего дома по этажам -->
      <div
        v-for="floor in stubFloors"
        :key="floor"
        class="entrance-block__floor-stub"
      >
      </div>
    </div>
    <!-- Название -->
    <div class="entrance-block__title">
      {{entranceInfo?.title}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IEntranceInfo } from '@/types/flat';
import FloorRow from './FloorRow.vue';

export default defineComponent({
  components: {
    FloorRow,
  },
  props: {
    maxFloors: {
      type: Number,
      required: true,
    },
    entranceInfo: {
      type: Object as PropType<IEntranceInfo>,
      required: true,
    },
  },
  computed: {
    /**
     * Количество этажей-заглушек.
     */
    stubFloors(): number {
      return this.maxFloors - this.entranceInfo.floors.length;
    },
  },
});
</script>

<style lang="less">
@import '@/styles/_dimensions.less';
@import '@/styles/_mixins.less';

.entrance-block {
  &__floors {
    display: flex;
    flex-direction: column-reverse;
  }

  &__title {
    display: flex;
    align-items: center;
    align-content: center;
    padding-left: @flat-padding;
    height: @entrance-title-height;
    .overflow-ellipsis();
  }

  &__floor-stub {
    height: @flat-height;
  }
}
</style>
