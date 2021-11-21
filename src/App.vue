<template>
	<cart-block
		v-for="cart in carts"
		:key="cart.sessionId"
		:id="cart.shortSessionId"
	>
	</cart-block>
</template>

<script>
import { useStore } from "vuex";
import CartBlock from "./components/CartBlock.vue";
import createCartRecord from "./utils/createCartRecord";

export default {
	components: { CartBlock },
	setup() {
		const store = useStore();

		const events = store.state.eventStore.events;

		const uniqueSessions = [...new Set(events.map((e) => e.sessionId))];

		for (const sess of uniqueSessions) {
			createCartRecord(sess);
		}

		const carts = store.getters["cartStore/getAllCarts"];

		return {
			CartBlock,
			carts,
		};
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

#app {
	font-family: "Roboto", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: #f2f2f2;

	padding: 1px;
}

body {
	margin: 0;
	padding: 0;
}
</style>
