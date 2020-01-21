import OrInputDate from "@/components/InputDate";
import OrPickerDate from "@/components//PickerDate";

const components = [OrInputDate, OrPickerDate];

function install(Vue: any) {
  for (const component in components) {
    if (components[component]) {
      Vue.component(components[component].name, components[component]);
    }
  }
}

export default { install };
export { default as OrInputDate } from "@/components/InputDate/OrInputDate.vue";
export { default as OrPickerDate } from "@/components/PickerDate/OrPickerDate.vue";
