<template>
	<teleport to="body">
		<div v-if="show" class="overlay">
			<div class="modal">
				<button @click="close" class="close-button">
					<fa-icon
						:icon="['fas', 'times']"
						:style="{ color: '#307df7' }"
						size="sm"
					/>
				</button>

				<div class="modal-container">
					<h2>Изменить время {{ displayWord + "а" }}</h2>
					<form @submit.prevent="submitModal">
						<div>
							<label for="time">Время (очистка поля удалит запись)</label>
							<input id="time" v-model="inputTime" />
						</div>
						<div class="submit-block">
							<button type="submit" class="add-button">Подтвердить</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script>
import { ref, computed, inject } from "vue";
import { useStore } from "vuex";

export default {
	props: ["isShown", "time", "displayWord"],
	emits: ["closeModal"],
	setup(props, { emit }) {
		const store = useStore();

		const type = props.displayWord === "вход" ? "enter" : "exit";

		const shortSessionId = inject("shortSessionId");

		const show = computed(() => props.isShown);

		const inputTime = ref(props.time);

		const close = () => {
			emit("closeModal", false);
		};

		const submitModal = () => {
			store.commit("cartStore/editTime", {
				shortSessionId,
				type,
				time: inputTime.value,
			});

			close();
		};

		return {
			show,
			inputTime,
			close,
			submitModal,
		};
	},
};
</script>

<style lang="scss" scoped>
.overlay {
	position: fixed;
	z-index: 999;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.7);
	font-family: "Roboto", sans-serif;
}

.modal {
	background-color: white;
	padding: 20px;
	width: 400px;
	margin: 10% auto;
	border-radius: 8px;
}

.close-button {
	border: none;
	background-color: white;
	float: right;
	font-size: 20px;
	font-weight: 700;
}

.modal-container {
	margin-top: 50px;
	width: 100%;

	& h2 {
		text-align: center;
	}
}

form {
	& div {
		margin: 32px 16px;
	}

	& input {
		width: 100%;
		margin-top: 8px;
	}

	& .submit-block {
		text-align: center;
		margin: 0;
	}

	& .add-button {
		background-color: #307df7;
		color: white;
		padding: 10px 20px;
		font-weight: 700;
		border: none;
		border-radius: 8px;
	}

	.error {
		color: red;
		font-size: 14px;
	}
}
</style>
