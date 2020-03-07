const getMonthNameById = id => {
	let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа",
					"Сентября", "Октября", "Ноября", "Декабря"];

	return months[id.toString().replace(/^0/, "")];
};

export default getMonthNameById;