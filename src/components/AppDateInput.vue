<template lang="pug">
  .c-date-picker(v-click-outside="hide")
    label.c-date-picker__label(
      v-if="label"
      :for="name"
      :class="labelCssClass"
      v-t="label"
    )
    .c-date-picker__container
      input.c-date-picker__field(
        @focus="showPicker = true"
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
        :dateValue="dateValue"
        :locale="locale"
        :locales="locales"
      )
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ClickOutside from "vue-click-outside";
import DatePicker from "./DatePicker.vue";
import { ILocaleOption } from "../util/helpers";

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
  localeDate: string = this.dateValue.toLocaleDateString(this.locale, {
    month: "long",
    year: "numeric",
    day: "numeric"
  });

  hide() {
    this.showPicker = false;
  }
}
</script>
