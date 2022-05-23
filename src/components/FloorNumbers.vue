<template>
  <div class="floor-numbers__container">
    <div
      v-for="floor in maxFloors"
      :key="floor"
      class="floor-numbers__floor"
    >
      {{floor}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Линейка с номерами этажей.
 */
export default defineComponent({
  props: {
    maxFloors: Number,
  },
});
</script>

<style lang="less">
@import '@/styles/_variables.less';

.floor-numbers {

  &__container {
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: @entrance-title-height;
  }

  &__floor {
    width: @floor-number-width;
    height: @flat-height;
    padding: @flat-padding @flat-padding @flat-padding 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
