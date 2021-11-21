<template>
	<div class="cart-header" :class="{ submitted: isSubmitted }">
		<div class="avatar" :class="{ submitted: isSubmitted }"></div>

		<div class="info-block">
			<div class="header-info">
				<div class="main-info">{{ shortSessionId }}</div>
				<div class="sub-info">{{ enter }} - {{ exit }}</div>
			</div>

			<div class="header-info">
				<div class="main-info">
					{{ Math.floor(1000000 + Math.random() * 9000000) }}
				</div>
				<div class="sub-info">VV Card id</div>
			</div>

			<div v-if="!isSubmitted" class="header-controls">
				<button class="edit-button">
					<fa-icon
						:icon="['far', 'edit']"
						:style="{ color: '#9b989e' }"
						size="lg"
					/>
				</button>

				<button class="more-button">
					<fa-icon
						:icon="['fas', 'ellipsis-v']"
						:style="{ color: '#9b989e' }"
						size="lg"
					/>
				</button>
			</div>
			<div v-else class="header-controls">
				<fa-icon
					:icon="['fas', 'check']"
					:style="{ color: '#35c44c' }"
					size="sm"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { inject, computed } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const shortSessionId = inject("shortSessionId");

		const store = useStore();

		const enter = store.getters["cartStore/getEnterTime"](shortSessionId);
		const exit = store.getters["cartStore/getExitTime"](shortSessionId);

		const isSubmitted = computed(() =>
			store.getters["cartStore/getIsSubmitted"](shortSessionId)
		);

		return {
			shortSessionId,
			enter,
			exit,
			isSubmitted,
		};
	},
};
</script>

<style lang="scss" scoped>
.cart-header {
	background-color: #fef6ff;
	border-bottom: 1px solid #edeff4;

	padding: 8px 16px;

	display: flex;

	&.submitted {
		background-color: #f8f9ff;
	}
}

.info-block {
	flex: 1;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.header-info {
	text-align: left;
}

.header-controls {
	margin-left: 40px;

	& button {
		background: transparent;
		border: none;
		padding: 0;

		font-size: 16px;
	}

	& span {
		margin: 0 10px;
	}
}

.edit-button {
	margin-right: 20px;
}

.main-info {
	font-size: 14px;
	font-weight: bold;
}
.sub-info {
	font-size: 12px;
	color: #9b989e;
}
.avatar {
	background-color: #ca29e4;
	border-radius: 50%;

	height: 36px;
	width: 36px;

	margin-right: 16px;

	&.submitted {
		background-color: #355dff;
	}
}
</style>
