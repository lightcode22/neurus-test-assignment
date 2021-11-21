import store from "../store/index";
import hash from "custom-hash";

hash.configure({
	charSet: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
	maxLength: 5,
});

export default function (sessionId) {
	// превращение sessionId в короткий 5-значный хэш
	// для более удобного отображения (одно из требований)
	const shortSessionId = hash.digest(sessionId);

	const shelfEvents = store.getters["eventStore/getEventsBySession"](sessionId);

	const cart = [];

	for (const event of shelfEvents) {
		const idx = cart.map((i) => i.name).indexOf(event.productName);

		if (idx === -1) {
			// умножается на -1 так как в event дейтсвия рассматриваются
			// относительно полки, а в cart - относительно корзины
			cart.push({ name: event.productName, count: event.productCount * -1 });
		} else {
			cart[idx].count -= event.productCount;
		}
	}

	// добавление в сессию событий входа/выхода (если такие зафиксированы)
	let enterTime = store.getters["eventStore/turnstileEnter"](sessionId);

	if (enterTime !== "no_data")
		enterTime = new Date(enterTime * 1000).toLocaleTimeString();

	let exitTime = store.getters["eventStore/turnstileExit"](sessionId);

	if (exitTime !== "no_data")
		exitTime = new Date(exitTime * 1000).toLocaleTimeString();

	store.commit("cartStore/createNewCart", {
		shortSessionId,
		sessionId,
		enter: enterTime,
		exit: exitTime,
		cartItems: cart,
	});
}
