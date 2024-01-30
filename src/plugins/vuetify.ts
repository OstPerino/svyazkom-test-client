import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { ru } from "vuetify/locale";

import { createVuetify } from "vuetify";

export default createVuetify({
  locale: {
    locale: "ru",
    fallback: "ru",
    messages: { ru },
  }
});
