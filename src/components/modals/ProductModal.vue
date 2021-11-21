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
					<h2>Добавить новый продукт</h2>
					<form @submit.prevent="submitModal">
						<div>
							<label for="productName">Наименование продукта</label>
							<input id="productName" v-model="formValues.name.value" />
							<span v-if="formValues.nameError.value" class="error"
								>нужно указать наименование</span
							>
						</div>

						<div>
							<label for="productQuantity">Количество продукта</label>
							<input id="productQuantity" v-model="formValues.quantity.value" />
							<span v-if="formValues.quantityError.value" class="error"
								>нужно указать число</span
							>
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
import { reactive, toRefs, unref, computed } from "vue";
import { useStore } from "vuex";

export default {
	props: ["isShown", "data", "id"],
	emits: ["closeModal"],
	setup(props, { emit }) {
		const store = useStore();

		const isEdit = !!props.data;

		let originalName = "";

		const shortSessionId = unref(props.id);

		const show = computed(() => props.isShown);

		const formValues = toRefs(
			reactive({
				name: "",
				quantity: "",
				nameError: false,
				quantityError: false,
			})
		);

		if (isEdit) {
			originalName = unref(props.data.name);
			formValues.name.value = unref(props.data.name);
			formValues.quantity.value = unref(props.data.count);
		}

		const close = () => {
			emit("closeModal", false);
		};

		const submitModal = () => {
			let isValid = true;
			formValues.nameError.value = false;
			formValues.quantityError.value = false;

			if (!formValues.name.value) {
				formValues.nameError.value = true;
				isValid = false;
			}

			if (!formValues.quantity.value || isNaN(formValues.quantity.value)) {
				formValues.quantityError.value = true;
				isValid = false;
			}

			if (isValid) {
				const name = formValues.name.value;
				const quantity = formValues.quantity.value;

				if (isEdit) {
					store.commit("cartStore/editItem", {
						shortSessionId,
						originalName,
						name,
						quantity,
					});
				} else {
					store.commit("cartStore/addNewCartItem", {
						shortSessionId,
						name,
						quantity,
					});
				}

				close();
			}
		};

		return {
			show,
			formValues,
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
