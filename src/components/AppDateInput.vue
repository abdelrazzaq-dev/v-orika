<template lang="pug">
  .c-date-picker(v-click-outside="hide")
    label.c-date-picker__label(
      v-if="label"
      :for="name"
      :class="labelCssClass"
    ) {{label}}
    .c-date-picker__container
      input.c-date-picker__field(
        @focus="showPicker = true"
        @input="localeDateChanged"
        v-model="localeDate"
        v-bind='$attrs'
        type="text"
        :name="name"
        :id="name"
        :class=`[
          fieldCssClass
        ]`
      )
      date-picker(
        v-if="showPicker"
        @date-changed="setLocaleDate"
        :dateValue="dateValue"
        :locale="locale"
        :locales="locales"
        :key="dateValue.toString()"
      )
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
//@ts-ignore
import ClickOutside from "vue-click-outside";
import DatePicker from "./DatePicker.vue";
import { ILocaleOption, generateMonthNameInLocale } from "../util/helpers";

@Component({
  name: "app-date-input",
  components: {
    DatePicker
  },
  directives: {
    ClickOutside
  }
})
export default class AppDateInput extends Vue {
  @Prop({ default: () => new Date() }) dateValue!: Date;
  @Prop() labelCssClass?: string | [string];
  @Prop() fieldCssClass?: string | [string];
  @Prop() locales?: ILocaleOption[];
  @Prop() locale?: string;
  @Prop() label?: string;
  @Prop() name!: string;
  showPicker: boolean = false;
  localeDate: string = "";
  localeMonths: string[] = generateMonthNameInLocale(
    this.locale || navigator.language
  );

  setLocaleDate(date: Date) {
    this.localeDate = date.toLocaleDateString(this.locale, {
      month: "long",
      year: "numeric",
      day: "numeric"
    });
  }

  localeDateChanged() {
    const dateMap: string[] = this.localeDate.split(/[ ,-/\\،]/);
    if (dateMap.length > 0) {
      if (!+dateMap[0]) {
        dateMap.shift();
      }
      if (+dateMap[0]) {
        this.dateValue.setDate(+dateMap[0]);
      }
      if (!+dateMap[1]) {
        if (this.localeMonths.includes(dateMap[1])) {
          this.dateValue.setMonth(this.localeMonths.indexOf(dateMap[1]));
        }
      }
      if (+dateMap[1]) {
        this.dateValue.setMonth(+dateMap[1] - 1);
      }
      if (+dateMap[2]) {
        this.dateValue.setFullYear(+dateMap[2]);
      }
    }
  }

  hide() {
    this.showPicker = false;
  }
  mounted() {
    this.setLocaleDate(this.dateValue);
  }
}
</script>
