<template lang="pug">
  .c-date-picker(v-click-outside="hide")
    label.c-date-picker__label(
      v-if="label"
      :for="name"
      :class="labelCssClass"
    ) {{label}}
    .c-date-picker__container
      input.c-date-picker__field(
        @focus="showPicker = true"
        @input="localeDateChanged"
        v-model="localeDate"
        v-on="$listeners"
        v-bind='$attrs'
        type="text"
        :name="name"
        :id="name"
        :class=`[
          fieldCssClass
        ]`
      )
      or-picker-date(
        v-if="showPicker"
        @date-changed="setLocaleDate"
        :dateValue="dateValue"
        :locale="locale"
        :locales="locales"
        :key="dateValue.toString()"
      )
</template>

<script lang="ts" src="./_script.ts"></script>
<style lang="scss" src="./_style.scss"></style>
