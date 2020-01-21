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
<script lang="ts" src="./_script.ts"></script>
<style lang="scss" src="./_style.scss"></style>
