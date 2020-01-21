import OrInputDate from "@/components/InputDate/OrInputDate.vue";
import OrPickerDate from "@/components//PickerDate/OrPickerDate.vue";

const components = [OrInputDate, OrPickerDate];

function install(Vue: any) {
  for (const component in components) {
    if (components[component]) {
      Vue.component(components[component].name, components[component]);
    }
  }
}

export default { install, ...components };
