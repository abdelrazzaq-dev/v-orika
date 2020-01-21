import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { generateMonthNameInLocale } from "@/util/index";
import { ILocaleOption } from "@/util/interfaces";
import OrPickerDate from "../PickerDate/OrPickerDate.vue";
import ClickOutside from "../../directives/clickOutside";

@Component({
  name: "or-input-date",
  components: {
    OrPickerDate
  },
  directives: {
    ClickOutside
  }
})
export default class OrInputDate extends Vue {
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
