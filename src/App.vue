<template>
  <div id="app">
    <app-datepicker name="eventDate" label="حدد تاريخ الحذث" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppDatepicker from "./components/AppDatepicker.vue";

@Component({
  components: {
    AppDatepicker
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 500px;
  margin: auto;
  margin-top: 2rem;
}
</style>
