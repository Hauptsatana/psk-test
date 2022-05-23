<template>
  <house-block
    v-for="houseInfo in houses"
    :key="houseInfo.id"
    :houseInfo="houseInfo"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IHouseInfo } from '@/types/flat';
import { getHousesInfo } from '@/resources/house';

import HouseBlock from './HouseBlock.vue';

export default defineComponent({
  components: {
    HouseBlock,
  },
  data() {
    return {
      houses: [] as IHouseInfo[],
    };
  },
  mounted() {
    getHousesInfo().then((houses: IHouseInfo[]) => {
      this.houses = houses;
    });
  },
});
</script>

<style>

</style>
