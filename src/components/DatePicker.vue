<script setup>
import { onMounted, ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const date = ref(null);
onMounted(() => (date.value = new Date()));
</script>

<template>
  <VueDatePicker
    locale="ru"
    multi-calendars
    :enable-time-picker="false"
    :clearable="false"
    auto-apply
    v-model="date"
  >
  </VueDatePicker>
</template>
