<template>
  <div
    class="flat-tile__container"
    @mouseenter="showPopup()"
    @focus="showPopup()"
  >
    {{flatInfo?.planType}}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NullableFlatInfo } from '@/types/flat';

export default defineComponent({
  props: {
    flatInfo: Object as PropType<NullableFlatInfo>,
  },
  methods: {
    showPopup() {
      const a = 10;
      console.log(a);
    },
  },
});
</script>

<style lang="less">
.flat-tile__container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b1b1b1;
  background-color: #a6a6a6;
  color: #dfdfdf;
  font-weight: bold;
  font-size: 12px;

  &:hover {
    border-color: #030303;
  }
}
</style>
