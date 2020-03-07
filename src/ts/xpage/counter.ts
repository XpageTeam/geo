import partitionNumber from "../functions/partNumber"

/** Функция запустит счётчик на выбранном элементе
 * @param el: HTMLElement - на в нём будет счётчик
 * @param time: number - время, за которое счётчик завершится
 * @param onComlete: Function - коллбек
 * @param onUpdate: Function - исполняется при каждой итерации счётчика
 */
function Counter(el: HTMLElement, time: number, count?: number, onComplete?: Function, onUpdate?: Function): void {
	let counter = {count: parseInt(el.innerText.replace(" ", ""))};

	el.style.width = getComputedStyle(el).width	

	window.TweenLite.to(counter, time, {
		count: count,
		onUpdate(){
			el.innerText = partitionNumber(Math.ceil(counter.count))

			if (onUpdate)
				onUpdate(counter.count)
		},
		onComplete(){
			if (onComplete)
				onComplete()
			el.style.width = "auto"
		}
	})
}

export default Counter