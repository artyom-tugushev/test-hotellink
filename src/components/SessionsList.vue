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
};

const getSessionClasses = (session) => {
  return {
    active: selectedSessions.value.includes(session),
    overnight: isSessionOvernight(session),
    "full-width": session.type === "long",
    "bg-light-grey":
      session.isAvailable || selectedSessions.value.includes(session),
    "border-light": !session.isAvailable,
    "text-grey": !session.isAvailable,
  };
};

const isSessionOvernight = (session) => {
  return !dayjs(session.startTime).isSame(dayjs(session.endTime), "day");
};

onMounted(() => fetchData());
</script>

<template>
  <div
    v-if="sessions"
    class="sessions-wrap"
  >
    <div class="row-wrap title-wrap">
      <div
        v-for="title in ['Сеанс 1', 'Сеанс 2', 'Сеанс 3']"
        class="session-card col-4"
      >
        <div class="text-center font-600">{{ title }}</div>
      </div>
    </div>

    <div class="row-wrap">
      <q-btn
        no-caps
        v-for="item in sessions"
        :disable="!item.isAvailable"
        :key="item.id"
        @click="handleSelection(item)"
        :class="getSessionClasses(item)"
        class="session-card session cursor-pointer"
      >
        <div
          class="session-content"
          :class="{ 'text-grey': !item.isAvailable }"
        >
          <!-- <div>{{ isSessionOvernight(item) }}</div> -->
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

    {{ selectedSessions }}
  </div>
</template>

<style scoped lang="scss">
.row-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.title-wrap {
  margin-bottom: 8px;
  height: 32px;
}
.session-card {
  width: calc((100% - (8px * 2)) / 3);
}

.session {
  border: 2px solid $light;
}
.active {
  border: 2px solid black;
}

.session-content {
  .name {
    font-size: 12px;
  }
}

.border-light {
  border: 2px solid $light;
}
</style>
