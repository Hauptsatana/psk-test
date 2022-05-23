<template>
    <div class="floor-row__container">
        <!-- Помещения на этаже -->
        <div class="floor-row__flats" v-if="floorInfo">
            <div class="floor-row__flat-wrapper"
                v-for="flat in floorInfo.flats"
                :key="flat?.id"
            >
                <flat-tile
                    :flatInfo="flat"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IFloorInfo } from '@/types/flat';
import FlatTile from './FlatTile.vue';

export default defineComponent({
  components: { FlatTile },
  props: {
    floorInfo: Object as PropType<IFloorInfo>,
  },
});
</script>

<style lang="less">
@import '@/styles/_variables.less';

.floor-row {
  &__container {
    display: flex;
    flex-direction: row;
  }

  &__flats {
    display: flex;
    flex-direction: row;
  }

  &__flat-wrapper {
    width: @flat-width;
    height: @flat-height;
    padding: @flat-padding;
  }
}

</style>
