<script setup>
import { ref, onMounted } from "vue";
import sessionsList from "src/data/sessions";
import dayjs from "dayjs";
import DatePicker from "./DatePicker.vue";
import SessionModal from "./SessionModal.vue";

const sessions = ref(null);
const selectRef = ref(null);
const guestCount = ref("1 человек");
const options = ["1 человек", "2 человека", "3 человека", "4 человека"];
const visible = ref(false);
const selectedDate = ref(new Date());

const fetchData = async () => {
  // тут бы получил данные с бэка
  try {
    sessions.value = sessionsList;
  } catch {}
};

const selectedSessions = ref([]);
const handleSelection = (session) => {
  // добавляем / удаляем сессии в выбранные
  const id = selectedSessions.value.findIndex((s) => s.id === session.id);

  // кейс с длинным сеансом
  if (session.type === "long") selectedSessions.value = [];
  if (
    selectedSessions.value.length &&
    selectedSessions.value[0].type === "long"
  ) {
    selectedSessions.value = [];
  }

  // добавляем / удаляем сеансы
  if (id === -1) selectedSessions.value.push(session);
  else selectedSessions.value.splice(id, 1);

  // максимум 2 элемента в массиве
  if (selectedSessions.value.length > 2) {
    selectedSessions.value = selectedSessions.value.slice(-1);
  }

  // сеансы рядом (не больше 30 минут) и не пересекаются
  if (selectedSessions.value.length > 1) {
    const [firstSession, secondSession] = selectedSessions.value;

    const firstStart = dayjs(firstSession.startTime);
    const firstEnd = dayjs(firstSession.endTime);
    const secondStart = dayjs(secondSession.startTime);
    const secondEnd = dayjs(secondSession.endTime);

    const timeDiff1 = secondStart.diff(firstEnd, "minute");
    const timeDiff2 = firstStart.diff(secondEnd, "minute");

    // проверка на пересечение
    const isOverlapping =
      secondStart.isBefore(firstEnd) && firstStart.isBefore(secondEnd);

    if (isOverlapping || timeDiff1 > 30 || timeDiff2 > 30) {
      selectedSessions.value = [];
      selectedSessions.value.push(session);
    }
  }
};

const getSessionClasses = (session) => {
  return {
    active: selectedSessions.value.includes(session),
    "text-grey": !session.isAvailable,
    "bg-light-grey":
      session.isAvailable || selectedSessions.value.includes(session),
  };
};

const isSessionOvernight = (session) => {
  return !dayjs(session.startTime).isSame(dayjs(session.endTime), "day");
};

const getColumnClass = (session) => {
  if (session.type === "long") return "col-12";
  else if (isSessionOvernight(session)) return "col-5";
  else return "col";
};

const handleDateUpdate = (date) => {
  selectedDate.value = date;
  fetchData();
};

const isWarningShow = ref(false);
const handleClick = () => {
  if (!selectedSessions.value.length) {
    isWarningShow.value = true;
    return;
  }

  isWarningShow.value = false;
  visible.value = true;
};

onMounted(() => fetchData());
</script>

<template>
  <div class="flex q-gutter-sm q-mb-lg">
    <q-select
      outlined
      v-model="guestCount"
      :options="options"
      class="select"
      ref="selectRef"
      @update:model-value="selectRef.blur()"
      dropdown-icon="keyboard_arrow_down"
    />

    <DatePicker
      class="date-picker"
      @data-updated="handleDateUpdate"
    />
  </div>

  <div
    v-if="sessions"
    class="sessions-wrap"
  >
    <div class="row title-wrap q-col-gutter-sm">
      <div
        v-for="(title, index) in ['Сеанс 1', 'Сеанс 2', 'Сеанс 3']"
        class="col"
        :class="{ 'col-5': index === 2 }"
      >
        <div class="text-center font-600">{{ title }}</div>
      </div>
    </div>

    <div class="row q-col-gutter-sm">
      <div
        v-for="item in sessions"
        :key="item.id"
        :class="getColumnClass(item)"
        class="session-wrap"
      >
        <q-btn
          no-caps
          :disable="!item.isAvailable"
          :ripple="false"
          @click="handleSelection(item)"
          :class="getSessionClasses(item)"
          class="full-width"
        >
          <div
            class="session-content"
            :class="{ 'text-grey': !item.isAvailable }"
          >
            <div class="time font-700">
              <span v-if="item.type === 'long'">Длительный сеанс</span>
              {{ dayjs(item.startTime).format("HH:mm") }} —
              {{ dayjs(item.endTime).format("HH:mm") }}
            </div>
            <div class="name font-600 text-grey">
              {{ item.name }}
              <span v-if="item.isAvailable"> — {{ item.price }}₽</span>
            </div>
          </div>
        </q-btn>
      </div>
    </div>

    <div class="relative-position">
      <q-btn
        color="primary"
        text-color="white"
        rounded
        label="БРОНИРОВАТЬ"
        class="full-width q-mt-md action-button"
        @click="handleClick"
      ></q-btn>
      <div
        class="button-warning font-600"
        v-if="isWarningShow && !selectedSessions.length"
      >
        Пожалуйста, выберите сеанс
      </div>
    </div>
  </div>

  <SessionModal
    v-model="visible"
    :data="{
      guests: guestCount,
      date: selectedDate,
      sessions: selectedSessions,
    }"
  ></SessionModal>
</template>

<style scoped lang="scss">
.title-wrap {
  margin-bottom: 16px;
}
.session-wrap {
  min-width: 120px;
}
.q-btn:not(.action-button) {
  border: 2px solid $light;
}
.action-button {
  padding: 10px;
}
.button-warning {
  position: absolute;
  bottom: -24px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: $negative;
}

.active {
  border: 2px solid $primary !important;
  background-color: white !important;
}
.session-content {
  .name {
    font-size: 12px;
  }
}
.date-picker {
  max-width: 200px;
}
.q-select {
  min-width: 200px;
  height: 40px;
}
</style>
