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

  margin-top: 60px;
}
</style>

<!-- Общие стили на странице -->
<style lang="less" src="@/styles/global.less"></style>

<!-- Иконки -->
 <style src="@/assets/font-awesome/css/fontawesome.css" rel="stylesheet"></style>
 <style src="@/assets/font-awesome/css/solid.css" rel="stylesheet"></style>

 <!-- Стили PriveVue -->
<style src="primevue/resources/themes/saga-blue/theme.css"></style>
<style src="primevue/resources/primevue.min.css"></style>
<style src="primeflex/primeflex.min.css"></style>
