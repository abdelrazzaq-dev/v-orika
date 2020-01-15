<template lang="pug">
  .c-date-picker
    label.c-date-picker__label(
      v-if="label"
      :for="name"
      :class="labelCssClass"
      v-t="label"
    )
    div
      input.c-date-picker__field(
        v-bind='$attrs'
        type="text"
        :name="name"
        :id="name"
        :value="localeDate"
        :class=`[
          fieldCssClass
        ]`
      )
      .c-date-picker__picker
        .c-date-picker__header
          button.c-date-picker__switch
          div
            button.c-date-picker__date {{ day }}
            button.c-date-picker__date {{ month }}
            button.c-date-picker__date {{ year }}
          button.c-date-picker__switch
          .c-date-picker__weekdays
            .c-date-picker__weekday(v-for="item in localeWeekday") {{ item }}
        .c-date-picker__dates(ref="datesContainers")
          button.c-date-picker__day(v-for="item in gridItems" type="button")

</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from "vue-property-decorator";
import { isNumber } from "util";
import { generateWeekdayNameInLocal, convertToMS } from "@/util/helpers";

@Component({
  name: "app-datepicker"
})
export default class AppDatepicker extends Vue {
  @Prop() labelCssClass?: string | [string];
  @Prop() fieldCssClass?: string | [string];
  @Prop() label?: string;
  @Prop() name!: string;
  @Prop({ default: () => new Date() }) dateValue!: Date;
  @Prop({ default: "ar" }) locale!: string;
  @Prop({
    default: () => [
      {
        localeCode: "ar",
        shortDay: ["أحد", "إثن", "ثلاث", "أرب", "خمس", "جمع", "سبت"],
        theStartOfTheWeek: 1
      }
    ]
  })
  localeOptions!: [
    {
      localeCode: string;
      shortDay?: string[];
      shortMonth?: string[];
      theStartOfTheWeek?: number;
    }
  ];

  @Ref("datesContainers") datesContainers!: HTMLElement;

  gridItems: number = 6 * 7;
  localeDate: string = "";
  currentLocale = this.localeOptions.find(
    item => item.localeCode === this.locale
  );

  get localeWeekday() {
    if (this.currentLocale && this.currentLocale.shortDay) {
      if (this.currentLocale.theStartOfTheWeek === 1) {
        const tempLocale = this.currentLocale.shortDay;
        tempLocale.push(tempLocale.shift() as string);
        return tempLocale;
      }
      return this.currentLocale.shortDay;
    }
    return generateWeekdayNameInLocal(this.locale, { format: "short" });
  }

  get day() {
    if (this.currentLocale)
      return this.dateValue.toLocaleDateString(this.locale, { day: "numeric" });
    return this.dateValue.toLocaleDateString(undefined, { day: "numeric" });
  }

  get month() {
    if (this.currentLocale)
      return this.dateValue.toLocaleDateString(this.locale, { month: "long" });
    return this.dateValue.toLocaleDateString(undefined, { month: "long" });
  }

  get year() {
    if (this.currentLocale)
      return this.dateValue.toLocaleDateString(this.locale, {
        year: "numeric"
      });
    return this.dateValue.toLocaleDateString(undefined, { year: "numeric" });
  }

  fillCalender() {
    const today = new Date();
    const tmpDate = this.dateValue;
    const tmpDateFirstDayDate = tmpDate.setDate(1);
    let tmpDateFirstDay = tmpDate.getDay();
    if (this.currentLocale && this.currentLocale.theStartOfTheWeek === 1) {
      if (tmpDateFirstDay === 0) tmpDateFirstDay = 6;
      tmpDateFirstDay -= 1;
    }
    const workingDate = new Date(
      tmpDateFirstDayDate - convertToMS({ days: tmpDateFirstDay })
    );

    for (const key in this.datesContainers.children) {
      if (this.datesContainers.children.hasOwnProperty(key)) {
        const element = this.datesContainers.children[key];
        element.textContent = workingDate.getDate().toString();
        element.setAttribute("data-date", workingDate.toISOString());
        if (workingDate.getMonth() !== this.dateValue.getMonth()) {
          element.classList.add("c-date-picker__day--clear");
        }
        if (
          workingDate.getFullYear() === today.getFullYear() &&
          workingDate.getMonth() === today.getMonth() &&
          workingDate.getDate() === today.getDate()
        ) {
          element.classList.add("c-date-picker__day--today");
        }
        if (
          workingDate.getFullYear() === this.dateValue.getFullYear() &&
          workingDate.getMonth() === this.dateValue.getMonth() &&
          workingDate.getDate() === this.dateValue.getDate()
        ) {
          element.classList.add("c-date-picker__day--selected-date");
        }
        workingDate.setDate(workingDate.getDate() + 1);
      }
    }
  }

  mounted() {
    this.fillCalender();
  }
}
</script>
