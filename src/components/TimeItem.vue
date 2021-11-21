<template>
	<li class="turnstile-event">
		<span class="title">{{ displayTitle }}</span>
		<div>
			<span class="time">{{ displayTime }}</span
			><span class="icon" v-if="!submitted" @click="isModalShown = true">
				<fa-icon
					:icon="['far', 'window-restore']"
					:style="{ color: '#307df7' }"
					size="sm"
			/></span>
		</div>
	</li>

	<TimeModal
		:isShown="isModalShown"
		:time="displayTime"
		:displayWord="displayTitle"
		@closeModal="isModalShown = false"
	/>
</template>

<script>
import { ref, computed } from "vue";
import TimeModal from "./modals/TimeModal.vue";

export default {
	components: { TimeModal },
	props: ["isSubmitted", "id", "time", "title"],
	setup(props) {
		const submitted = computed(() => props.isSubmitted);
		const displayTime = computed(() => props.time);
		const displayTitle = ref(props.title);

		const isModalShown = ref(false);

		return {
			submitted,
			displayTime,
			displayTitle,
			isModalShown,
			TimeModal,
		};
	},
};
</script>

<style lang="scss" scoped>
.turnstile-event {
	padding: 8px 16px;

	display: flex;
	justify-content: space-between;

	& .title {
		color: #cb444b;
		font-size: 14px;
		font-weight: 500;
		text-transform: capitalize;
	}

	& div {
		font-size: 13px;
	}

	& .time {
		color: #515c6b;

		font-weight: 500;
	}

	& .icon {
		margin-left: 12px;
	}

	&:first-child {
		border-bottom: 1px solid #f2f4f7;
		margin-bottom: 8px;
	}

	&:last-child {
		border-top: 1px solid #f2f4f7;
		margin-top: 8px;
	}
}
</style>
