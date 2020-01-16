<template lang="pug">
  .c-date-picker(ref="datePicker")
    label.c-date-picker__label(
      v-if="label"
      :for="name"
      :class="labelCssClass"
      v-t="label"
    )
    .c-date-picker__container
      input.c-date-picker__field(
        v-bind='$attrs'
        type="text"
        :value="localeDate"
        :name="name"
        :id="name"
        :class=`[
          fieldCssClass
        ]`
      )
      .c-date-picker__picker
        .c-date-picker__header
          button.c-date-picker__chevron(ref="forwardMonth")
          button.c-date-picker__chevron(ref="previousMonth")
          .c-date-picker__date
            button.c-date-picker__date-item {{ day }}
            button.c-date-picker__date-item {{ month }}
            button.c-date-picker__date-item {{ year }}
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
  @Prop({ default: () => navigator.language }) locale!: string;
  @Prop({
    default: () => [
      {
        localeCode: "ar",
        shortDay: ["أحد", "إثن", "ثلاث", "أرب", "خمس", "جمع", "سبت"],
        theStartOfTheWeek: 1,
        dir: "rtl"
      }
    ]
  })
  localeOptions!: [
    {
      localeCode: string;
      shortDay?: string[];
      shortMonth?: string[];
      theStartOfTheWeek?: number;
      dir?: "ltr" | "rtl";
    }
  ];

  @Ref("datePicker") datePicker!: HTMLElement;
  @Ref("datesContainers") datesContainers!: HTMLElement;
  @Ref("forwardMonth") forwardMonth!: HTMLElement;
  @Ref("previousMonth") previousMonth!: HTMLElement;

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
    return this.dateValue.toLocaleDateString(this.locale, { day: "numeric" });
  }

  get month() {
    return this.dateValue.toLocaleDateString(this.locale, { month: "long" });
  }

  get year() {
    return this.dateValue.toLocaleDateString(this.locale, { year: "numeric" });
  }

  setDateChevrons() {
    const dir =
      this.currentLocale && this.currentLocale.dir
        ? this.currentLocale.dir
        : this.datePicker.dir
        ? this.datePicker.dir
        : document.dir;

    if (dir === "rtl") {
      this.forwardMonth.classList.add("icon-chevron-right");
      this.previousMonth.classList.add("icon-chevron-left");
    } else {
      this.forwardMonth.classList.add("icon-chevron-left");
      this.previousMonth.classList.add("icon-chevron-right");
    }
    this.datePicker.dir = dir;
  }

  fillDatePickerDays() {
    const today = new Date();
    const tmpDate = new Date(this.dateValue);
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
    this.fillDatePickerDays();
    this.setDateChevrons();
  }
}
</script>
