import { createStore } from "vuex";
import cartStore from "./modules/cartStore";
import eventStore from "./modules/eventStore";

const store = createStore({
	modules: {
		cartStore,
		eventStore,
	},
});

export default store;
