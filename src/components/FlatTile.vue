<template>
  <div
    :class="appliedClasses"
    @click="showPopup()"
    @keydown="showPopup()"
  >
    {{flatInfo?.planType}}
    <!-- Метка наличия у помещения особенностей -->
    <div v-if="hasMark" class="flat-tile__mark"></div>

    <StackPanel
      v-model:show="popupVisible"
      header="Сведения о помещении"
    >
      <flat-card :flatInfo="flatInfo" />

    </StackPanel>
  </div>

    <!-- Содержимое панели -->

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FlatStatus, FlatType, NullableFlatInfo } from '@/types/flat';

import FlatCard from './FlatCard.vue';
import StackPanel from './StackPanel.vue';

export default defineComponent({
  components: {
    FlatCard,
    StackPanel,
  },
  props: {
    flatInfo: {
      type: Object as PropType<NullableFlatInfo>,
      required: true,
    },
  },
  data() {
    return {
      /** Отображение диалога с полными сведениями */
      popupVisible: false,
    };
  },
  computed: {
    appliedClasses() {
      const status: FlatStatus | undefined = this.flatInfo?.status;
      const type: FlatType | undefined = this.flatInfo?.type;
      return {
        'flat-tile__container': true,
        'flat-tile__type-residential': type === FlatType.Residential,
        'flat-tile__type-non-residential': type === FlatType.NonResidential,
        'flat-tile__type-parking': type === FlatType.Parking,
        'flat-tile__status-for-sale': status === FlatStatus.ForSale,
        'flat-tile__status-processing': status === FlatStatus.Processing,
        'flat-tile__status-reserved': status === FlatStatus.Reserved,
        'flat-tile__status-signed': status === FlatStatus.Signed,
        'flat-tile__status-handed-over': status === FlatStatus.HandedOver,
      };
    },
    /**
     * Наличие особенностей у помещения.
     */
    hasMark(): boolean {
      const flatInfo: NullableFlatInfo = this.flatInfo;
      return !!(flatInfo?.subsidy || flatInfo?.marginal || flatInfo?.renovation || flatInfo?.installment);
    },
  },
  methods: {
    showPopup() {
      this.popupVisible = true;
    },
  },
});
</script>

<style lang="less">
@import '@/styles/_colors.less';
@import '@/styles/_dimensions.less';

.flat-tile {

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #b1b1b1;
    color: @color-light;
    font-size: @flat-font-size;
    cursor: pointer;

    &:hover {
      border: 2px solid @color-dark;
      background-color: @color-danger;
      color: @color-light;
      font-weight: bold;
    }
  }

  &__status-for-sale {
    background-color: @color-primary;
  }

  &__status-processing {
    background-color: @color-info;
  }

  &__status-reserved {
    background-color: @color-warning;
    color: @color-dark;
  }

  &__status-signed {
    background-color: @color-secondary;
  }

  &__status-handed-over {
    background-color: @color-success;
  }

  &__type-non-residential {
    border-radius: 50%;
  }

  &__type-parking {
    border-radius: 50%;
    border: 4px solid @color-danger;
  }

  &__mark {
    position: absolute;
    top: 0;
    right: 0;
    border-style: solid;
    border-width: 0 8px 8px 0;
    border-color: transparent @color-danger transparent transparent;

  }
}
</style>
