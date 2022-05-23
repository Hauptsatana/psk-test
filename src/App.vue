<template>
  <house-list />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HouseList from './components/HouseList.vue';

@Options({
  components: {
    HouseList,
  },
})
export default class App extends Vue {}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style lang="less" src="@/styles/global.less"></style>
