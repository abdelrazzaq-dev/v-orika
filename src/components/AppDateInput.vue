<template lang="pug">
  .c-date-picker
    label.c-date-picker__label(
      v-if="label"
      :for="name"
      :class="labelCssClass"
      v-t="label"
    )
    .c-date-picker__container
      input.c-date-picker__field(
        @focus="showPicker = !showPicker"
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
import DatePicker from "./DatePicker.vue";
import { ILocaleOption } from "../util/helpers";

@Component({
  name: "app-date-input",
  components: {
    DatePicker
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
}
</script>
