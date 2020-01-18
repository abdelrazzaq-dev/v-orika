<template>
  <div id="app">
    <h2 dir="rtl">العربية</h2>
    <app-date-input locale="ar" dir="rtl" name="eventDate" label="تاريخ الإزدياد" />
    <h2>Turc</h2>
    <app-date-input locale="tr" name="eventDate" label="Artış tarihi" />
    <h2>Francais</h2>
    <app-date-input locale="fr" name="eventDate" label="Date Naissance" />
    <h2>Allemand</h2>
    <app-date-input locale="de" name="eventDate" label="Datum der Erhöhung" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppDateInput from "./components/AppDateInput.vue";

@Component({
  components: {
    AppDateInput
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 500px;
  margin: auto;
  margin-top: 2rem;
}
</style>
