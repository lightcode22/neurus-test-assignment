<template>
	<div class="item-controls">
		<button @click="deleteItem">
			<fa-icon
				:icon="['far', 'trash-alt']"
				:style="{ color: '#cb444b' }"
				size="sm"
			/>
		</button>

		<button class="count-changer" @click="decrement">
			<fa-icon
				:icon="['fas', 'minus']"
				:style="{ color: '#307df7' }"
				size="sm"
			/>
		</button>

		<span class="count" :class="{ error: count < 0 }">{{ count }}</span>

		<button class="count-changer" @click="increment">
			<fa-icon
				:icon="['fas', 'plus']"
				:style="{ color: '#307df7' }"
				size="sm"
			/>
		</button>

		<button @click="isModalShown = true">
			<fa-icon
				:icon="['far', 'window-restore']"
				:style="{ color: '#307df7' }"
				size="sm"
			/>
		</button>
	</div>

	<Modal
		:isShown="isModalShown"
		:data="data"
		:id="shortSessionId"
		@closeModal="isModalShown = false"
	/>
</template>

<script>
import { ref, toRefs, inject } from "vue";
import { useStore } from "vuex";
import Modal from "./modals/ProductModal.vue";

export default {
	props: ["data"],
	components: { Modal },
	setup(props) {
		let data = toRefs(props.data);

		const isModalShown = ref(false);

		const store = useStore();

		const shortSessionId = inject("shortSessionId");

		const name = data.name.value;

		const deleteItem = () => {
			store.commit("cartStore/deleteItem", { shortSessionId, name });
		};

		const increment = () => {
			store.commit("cartStore/incrementCount", { shortSessionId, name });
		};

		const decrement = () => {
			store.commit("cartStore/decrementCount", { shortSessionId, name });
		};

		return {
			count: data.count,
			name: data.name,
			deleteItem,
			increment,
			decrement,
			Modal,
			isModalShown,
			shortSessionId,
		};
	},
};
</script>

<style lang="scss" scoped>
button {
	background: transparent;
	border: none;
	padding: 0;
}

.item-controls {
	text-align: right;
}
.count {
	font-size: 12px;
	font-weight: 500;

	&.error {
		color: red;
	}
}

.count-changer {
	margin: 0 12px;
}
</style>
