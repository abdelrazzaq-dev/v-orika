import OrDateInput from "./components/dateInput"


const components = {
  OrDateInput
}

function install(Vue: any) {
  for (const component in components) {
    if (components[component]) {
      Vue.component(components[component].name, components[component])
    }
  }
}

export default {
  install,
  ...components
}
