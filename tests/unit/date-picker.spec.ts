import { shallowMount } from "@vue/test-utils";
import OrPickerDate from "@/components/PickerDate/OrPickerDate.vue";
import OrInputDate from "@/components/InputDate/OrInputDate.vue";

describe("PickerDate.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(OrPickerDate);
    expect(wrapper.props("dateValue")).toBeTruthy();
  });
});

describe("PickerDate.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(OrInputDate);
    expect(wrapper.props("dateValue")).toBeTruthy();
  });
});
