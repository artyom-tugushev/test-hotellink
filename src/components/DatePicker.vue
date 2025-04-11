<script setup>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const emits = defineEmits(["dataUpdated"]);
const date = ref(new Date());

const formatDate = (date) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("ru-RU", options).replace(/(\.|\sг)/g, "");
};
</script>

<template>
  <VueDatePicker
    locale="ru"
    multi-calendars
    :enable-time-picker="false"
    :clearable="false"
    auto-apply
    :format="formatDate"
    v-model="date"
    @update:model-value="$emit('dataUpdated', date)"
  >
  </VueDatePicker>
</template>
