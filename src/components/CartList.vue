<template>
	<ul>
		<TimeItemComponent
			v-if="enter"
			:isSubmitted="isSubmitted"
			:id="shortSessionId"
			:time="enter"
			title="вход"
		/>

		<CartItemComponent
			v-for="item of cartItems"
			:key="item.name"
			:item="item"
		/>

		<TimeItemComponent
			v-if="exit"
			:isSubmitted="isSubmitted"
			:id="shortSessionId"
			:time="exit"
			title="выход"
		/>
	</ul>
</template>

<script>
import { inject, computed } from "vue";
import { useStore } from "vuex";
import CartItemComponent from "./CartItem";
import TimeItemComponent from "./TimeItem";

export default {
	components: { CartItemComponent, TimeItemComponent },
	setup() {
		const shortSessionId = inject("shortSessionId");

		const store = useStore();

		const cartItems = computed(() =>
			store.getters["cartStore/getCartItems"](shortSessionId)
		);
		const enter = computed(() =>
			store.getters["cartStore/getEnterTime"](shortSessionId)
		);
		const exit = computed(() =>
			store.getters["cartStore/getExitTime"](shortSessionId)
		);
		const isSubmitted = computed(() =>
			store.getters["cartStore/getIsSubmitted"](shortSessionId)
		);

		return {
			CartItemComponent,
			TimeItemComponent,
			cartItems,
			enter,
			exit,
			isSubmitted,
			shortSessionId,
		};
	},
};
</script>

<style lang="scss" scoped>
ul {
	list-style: none;
	text-align: left;
	padding: 0;
	margin: 0;
}
</style>
