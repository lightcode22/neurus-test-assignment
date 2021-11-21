import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import "@/assets/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faEllipsisV,
	faMinus,
	faPlus,
	faCheck,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

import {
	faEdit,
	faTrashAlt,
	faWindowRestore,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
	faEdit,
	faEllipsisV,
	faTrashAlt,
	faMinus,
	faPlus,
	faWindowRestore,
	faCheck,
	faTimes
);

createApp(App).component("fa-icon", FontAwesomeIcon).use(store).mount("#app");
