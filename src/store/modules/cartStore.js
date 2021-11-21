const state = () => ({
	carts: [],
});

const getters = {
	getSessionById(state) {
		return (sessionId) => {
			return state.carts.filter((sess) => sess.sessionId === sessionId);
		};
	},
	getAllCarts(state) {
		return state.carts;
	},

	getEnterTime(state) {
		return (shortSessionId) =>
			state.carts.find((cart) => cart.shortSessionId === shortSessionId).enter;
	},
	getExitTime(state) {
		return (shortSessionId) =>
			state.carts.find((cart) => cart.shortSessionId === shortSessionId).exit;
	},
	getCartItems(state) {
		return (shortSessionId) =>
			state.carts.find((cart) => cart.shortSessionId === shortSessionId)
				.cartItems;
	},
	getIsSubmitted(state) {
		return (shortSessionId) =>
			state.carts.find((cart) => cart.shortSessionId === shortSessionId)
				.isSubmitted;
	},
};

const mutations = {
	createNewCart(state, payload) {
		state.carts.push({
			shortSessionId: payload.shortSessionId,
			sessionId: payload.sessionId,
			enter: payload.enter,
			exit: payload.exit,
			cartItems: payload.cartItems,
			isSubmitted: false,
		});
	},

	addNewCartItem(state, payload) {
		const name = payload.name;
		const count = payload.quantity;

		const cart = state.carts.find(
			(cart) => cart.shortSessionId === payload.shortSessionId
		);

		cart.cartItems.push({ name, count });
	},

	deleteItem(state, payload) {
		const cart = state.carts.find(
			(cart) => cart.shortSessionId === payload.shortSessionId
		);

		cart.cartItems = cart.cartItems.filter(
			(item) => item.name !== payload.name
		);
	},

	editItem(state, payload) {
		const cart = state.carts.find(
			(cart) => cart.shortSessionId === payload.shortSessionId
		);

		const item = cart.cartItems.find(
			(item) => item.name === payload.originalName
		);

		item.name = payload.name;
		item.count = payload.quantity;
	},

	editTime(state, payload) {
		const cart = state.carts.find(
			(cart) => cart.shortSessionId === payload.shortSessionId
		);

		cart[payload.type] = payload.time;
	},

	incrementCount(state, payload) {
		const cart = state.carts.find(
			(cart) => cart.shortSessionId === payload.shortSessionId
		);

		cart.cartItems.find((item) => item.name === payload.name).count += 1;
	},

	decrementCount(state, payload) {
		const cart = state.carts.find(
			(cart) => cart.shortSessionId === payload.shortSessionId
		);

		cart.cartItems.find((item) => item.name === payload.name).count -= 1;
	},
	submitStore(state, payload) {
		state.carts.find(
			(cart) => cart.shortSessionId === payload
		).isSubmitted = true;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
};
