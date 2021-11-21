<template>
	<div class="cart-block" :class="{ submitted: isSubmitted }">
		<CartHeader />
		<CartList />
		<EditPanel v-if="!isSubmitted" />
	</div>
</template>

<script>
import { provide, unref, computed } from "vue";
import { useStore } from "vuex";
import CartHeader from "./CartHeader.vue";
import CartList from "./CartList.vue";
import EditPanel from "./EditPanel.vue";

export default {
	components: { CartHeader, CartList, EditPanel },
	props: ["id"],

	setup(props) {
		const shortSessionId = unref(props.id);

		const store = useStore();

		const isSubmitted = computed(() =>
			store.getters["cartStore/getIsSubmitted"](shortSessionId)
		);

		provide("shortSessionId", shortSessionId);

		return {
			CartHeader,
			CartList,
			EditPanel,
			isSubmitted,
		};
	},
};
</script>

<style lang="scss" scoped>
.cart-block {
	background-color: white;

	border: 2px solid #ca29e4;
	border-radius: 8px;

	width: 440px;
	margin: 40px auto;

	box-sizing: border-box;
	overflow: hidden;

	&.submitted {
		border: none;
		border-left: 4px solid #355dff;
	}
}
</style>
