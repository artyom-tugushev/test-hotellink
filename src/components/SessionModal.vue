<script setup>
import dayjs from "dayjs";
import { ref, computed } from "vue";
import "dayjs/locale/ru";
dayjs.locale("ru");

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "closeModal"]);

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const errors = ref([]);
const fullName = ref(null);
const mail = ref(null);
const phone = ref(null);

const submit = async () => {
  const data = {
    guests: parseInt(props.data.guests),
    date: props.data.date.toISOString(),
    sessions: props.data.sessions.map((element) => element.id),
    name: fullName.value.trim(),
    mail: mail.value.trim(),
    phone: phone.value.trim(),
  };
  console.log(data);

  try {
    // отправляем данные
    emit("update:modelValue", false);
  } catch {}
};

const isWarningShow = ref(false);
const handleClick = () => {
  if (!mail.value || !fullName.value || !phone.value) {
    isWarningShow.value = true;
    return;
  }

  isWarningShow.value = false;
  submit();
};

const sessionsInfo = computed(() =>
  props.data.sessions
    .map(
      (item) =>
        `${item.name} — ${item.price}₽ (${dayjs(item.startTime).format(
          "HH:mm"
        )} - ${dayjs(item.endTime).format("HH:mm")})`
    )
    .join(", ")
);

const clearModal = () => {
  fullName.value = null;
  mail.value = null;
  phone.value = null;
  isWarningShow.value = false;
};
</script>

<template>
  <q-dialog
    v-model="visible"
    @hide="clearModal"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <q-card class="wrap">
      <q-card-section class="row items-start no-wrap q-pb-none">
        <div class="text-h6">Бронирование</div>
        <q-space></q-space>
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section class="row items-start no-wrap q-pb-none">
        <div class="stats-wrap">
          <div>
            <span class="font-600 q-mr-xs">Гости:</span> {{ props.data.guests }}
          </div>
          <div>
            <span class="font-600 q-mr-xs">Дата:</span>
            {{ dayjs(props.data.date).format("D MMMM YYYY") }}
          </div>
          <div>
            <span class="font-600 q-mr-xs">Сеансы:</span>{{ sessionsInfo }}
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="input-wrap">
          <q-input
            color="dark"
            bg-color="white"
            rounded
            outlined
            v-model="fullName"
            placeholder="ФИО"
            :rules="[(val) => !!val || 'Обязательное поле']"
            :error="!!errors.fio"
            :error-message="errors.fio"
          />
          <q-input
            mask="+7 (###) ### - ####"
            color="dark"
            bg-color="white"
            rounded
            outlined
            v-model="phone"
            placeholder="Телефон"
            :rules="[(val) => !!val || 'Обязательное поле']"
            :error="!!errors.phone"
            :error-message="errors.phone"
          />
          <q-input
            color="dark"
            bg-color="white"
            rounded
            outlined
            v-model="mail"
            placeholder="E-mail"
            :rules="[(val) => !!val || 'Обязательное поле']"
            :error="!!errors.mail"
            :error-message="errors.mail"
          />
        </div>
      </q-card-section>

      <div class="btn-wrap">
        <q-btn
          color="primary"
          text-color="white"
          rounded
          label="Оплатить"
          class="full-width action-button"
          @click="handleClick"
        ></q-btn>
        <div
          class="button-warning font-600"
          v-if="isWarningShow && (!mail || !phone || !fullName)"
        >
          Пожалуйста, заполните все поля
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.wrap {
  width: 100%;
  max-width: 60vw;
}
.input-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.stats-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.btn-wrap {
  padding: 16px;
  padding-top: 0;
}

.action-button {
  padding: 10px;
}
.button-warning {
  width: 100%;
  text-align: center;
  margin-top: 4px;
  font-size: 12px;
  color: $negative;
}

@media (max-width: 1023px) {
  .wrap {
    max-width: 100vw;
  }
}
</style>
