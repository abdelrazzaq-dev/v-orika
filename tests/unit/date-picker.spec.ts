import { shallowMount } from "@vue/test-utils";
import OrPickerDate from "@/components/PickerDate";
import OrInputDate from "@/components/InputDate";

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
