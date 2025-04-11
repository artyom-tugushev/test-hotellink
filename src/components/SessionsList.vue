<script setup>
import { ref, onMounted } from "vue";
import sessionsList from "src/data/sessions";
import dayjs from "dayjs";

const sessions = ref(null);

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

  // проверяем, чтобы сеансы были рядом (не больше 30 минут)
  if (selectedSessions.value.length > 1) {
    const [firstSession, secondSession] = selectedSessions.value;

    const firstStart = dayjs(firstSession.startTime);
    const firstEnd = dayjs(firstSession.endTime);
    const secondStart = dayjs(secondSession.startTime);
    const secondEnd = dayjs(secondSession.endTime);

    const timeDiff1 = secondStart.diff(firstEnd, "minute");
    const timeDiff2 = firstStart.diff(secondEnd, "minute");

    // если сеансы НЕ рядом
    if (Math.abs(timeDiff1) > 30 && Math.abs(timeDiff2) > 30) {
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

onMounted(() => fetchData());
</script>

<template>
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
        v-for="(item, index) in sessions"
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
  </div>
</template>

<style scoped lang="scss">
.title-wrap {
  margin-bottom: 16px;
}
.session-wrap {
  min-width: 120px;
}
.q-btn {
  border: 2px solid $light;
}
.active {
  border: 2px solid $primary;
  background-color: white !important;
}
.session-content {
  .name {
    font-size: 12px;
  }
}
</style>
