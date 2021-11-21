<template>
	<div class="edit-panel">
		<button class="add" @click="isModalShown = true">Добавить продукт</button>
		<button class="save" @click="save">Сохранить</button>
	</div>

	<Modal
		:isShown="isModalShown"
		@closeModal="isModalShown = false"
		:id="shortSessionId"
	/>
</template>

<script>
import { inject, ref } from "vue";
import { useStore } from "vuex";
import Modal from "./modals/ProductModal.vue";

export default {
	components: { Modal },
	setup() {
		const isModalShown = ref(false);

		const store = useStore();

		const shortSessionId = inject("shortSessionId");

		const save = () => {
			store.commit("cartStore/submitStore", shortSessionId);
		};

		return {
			Modal,
			isModalShown,
			save,
			shortSessionId,
		};
	},
};
</script>

<style lang="scss" scoped>
.edit-panel {
	border-top: 1px solid #edeff4;

	display: flex;
	justify-content: space-between;

	padding: 12px 20px;
}

button {
	padding: 10px 20px;
	font-weight: 700;
	border: none;
	border-radius: 8px;
}

.add {
	background-color: #eaf2fe;
	color: #307df7;
}

.save {
	background-color: #307df7;
	color: white;
}
</style>
