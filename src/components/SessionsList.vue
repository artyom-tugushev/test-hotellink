<script setup>
import { ref, onMounted } from "vue";
import sessionsList from "src/data/sessions";
import dayjs from "dayjs";

const fetchData = () => {
  // тут бы получил данные с бэка
  return;
};

const selectedSessions = ref([]);
const handleSelection = (session) => {
  if (selectedSessions.value.length > 1) selectedSessions.value = []; // нельзя больше 2

  // одновременно только один тип
  if (session.type === "long") {
    selectedSessions.value = [];
  } else if (selectedSessions.value[0]?.type === "long") {
    selectedSessions.value = [];
  }

  const index = selectedSessions.value.findIndex((s) => s.id === session.id);
  if (index === -1) {
    selectedSessions.value.push(session);
  } else {
    selectedSessions.value.splice(index, 1);
  }
};

const getSessionClasses = (session) => {
  return {
    active: selectedSessions.value.includes(session),
    "full-width": session.type === "long",
    "bg-light-grey":
      session.isAvailable || selectedSessions.value.includes(session),
    "border-light": !session.isAvailable,
    "text-grey": !session.isAvailable,
  };
};

onMounted(() => fetchData());
</script>

<template>
  <div class="sessions-wrap">
    {{ selectedSessions }}
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
        v-for="item in sessionsList"
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
          <div class="time font-700">
            {{ dayjs(item.startTime).format("HH:mm") }} —
            {{ dayjs(item.endTime).format("HH:mm") }}
          </div>
          <div class="name font-600 text-grey">
            {{ item.name
            }}<span v-if="item.isAvailable"> — {{ item.price }}₽</span>
          </div>
        </div>
      </q-btn>
    </div>
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
