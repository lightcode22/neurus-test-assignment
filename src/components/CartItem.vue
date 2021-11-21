<template>
	<li v-if="true">
		<div class="item-name">{{ data.name }}</div>

		<ItemControls v-if="!isSubmitted" :data="data" />
		<span v-else class="count">{{ data.count }}</span>
	</li>
</template>

<script>
import { computed, inject } from "vue";
import { useStore } from "vuex";
import ItemControls from "./ItemControls.vue";

export default {
	components: { ItemControls },
	props: ["item"],
	setup(props) {
		const store = useStore();

		const shortSessionId = inject("shortSessionId");

		const isSubmitted = computed(() =>
			store.getters["cartStore/getIsSubmitted"](shortSessionId)
		);

		return { ItemControls, data: props.item, isSubmitted };
	},
};
</script>

<style scoped>
li {
	font-size: 14px;
	padding: 8px 16px;

	color: #515c6b;

	display: flex;
	justify-content: space-between;
}

.item-name {
	font-size: 12px;
	font-weight: 500;
	letter-spacing: 0.3px;
	max-width: 250px;
}

.count {
	font-size: 14px;
	font-weight: 500;
}
</style>
