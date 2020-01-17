<template lang="pug">
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
    .c-date-picker__dates(ref="datesContainers" @click="setDate")
      button.c-date-picker__day(v-for="item in gridItems" type="button")
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Emit } from "vue-property-decorator";
import { isNumber } from "util";
import {
  generateWeekdayNameInLocale,
  convertToMS,
  ILocaleOption,
  defaultsLocales
} from "@/util/helpers";

@Component({
  name: "date-picker"
})
export default class DatePicker extends Vue {
  @Prop({ default: () => new Date() }) dateValue!: Date;
  @Prop({ default: () => navigator.language }) locale!: string;
  @Prop({ default: () => defaultsLocales }) locales!: ILocaleOption[];

  @Ref("datesContainers") datesContainers!: HTMLElement;
  @Ref("forwardMonth") forwardMonth!: HTMLElement;
  @Ref("previousMonth") previousMonth!: HTMLElement;

  workingDate = this.dateValue;
  gridItems: number = 6 * 7;
  currentLocale = this.locales.find(item => item.localeCode === this.locale);
  dir =
    this.currentLocale && this.currentLocale.dir
      ? this.currentLocale.dir
      : document.dir;

  get localeWeekday() {
    if (this.currentLocale && this.currentLocale.shortDay) {
      if (this.currentLocale.theStartOfTheWeek === 1) {
        const tempLocale = [...this.currentLocale.shortDay];
        tempLocale.push(tempLocale.shift() as string);
        return tempLocale;
      }
      return this.currentLocale.shortDay;
    }
    return generateWeekdayNameInLocale(this.locale, { format: "short" });
  }

  get day() {
    return this.workingDate.toLocaleDateString(this.locale, { day: "numeric" });
  }

  get month() {
    return this.workingDate.toLocaleDateString(this.locale, { month: "long" });
  }

  get year() {
    return this.workingDate.toLocaleDateString(this.locale, {
      year: "numeric"
    });
  }

  setDate(event: { target: HTMLButtonElement }) {
    const dateString = event.target.dataset["date"];
    if (dateString) {
      this.workingDate = new Date(dateString);
      this.DateChanged();
      this.fillDatePickerDays();
    }
  }

  setDateChevrons() {
    if (this.dir === "rtl") {
      this.forwardMonth.classList.add("icon-chevron-right");
      this.previousMonth.classList.add("icon-chevron-left");
    } else {
      this.forwardMonth.classList.add("icon-chevron-left");
      this.previousMonth.classList.add("icon-chevron-right");
    }
  }

  fillDatePickerDays() {
    const today = new Date();
    const tmpDate = new Date(this.workingDate);
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
        element.classList.remove(
          "c-date-picker__day--clear",
          "c-date-picker__day--today",
          "c-date-picker__day--selected-date"
        );
        element.textContent = workingDate.getDate().toString();
        element.setAttribute("data-date", workingDate.toISOString());
        if (workingDate.getMonth() !== this.workingDate.getMonth()) {
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
          workingDate.getFullYear() === this.workingDate.getFullYear() &&
          workingDate.getMonth() === this.workingDate.getMonth() &&
          workingDate.getDate() === this.workingDate.getDate()
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

  @Emit()
  DateChanged() {
    return this.workingDate;
  }
}
</script>