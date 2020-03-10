/**
 * Переключение белой и чёрной тем
 */



import domReady from "./xpage/ready";
import EventListener from "./xpage/EventListener";
import App from "./xpage/core";

const nightClass = "day-night--night",
	dayClass = "day-night--day",

	excludeBodyNightClass = "exclusive_dark",
	excludeBodyDayClass = "exclusive_white";

let switchers: Array<HTMLElement>;

enum themes {
	day,
	night
}

domReady(() => {
	switchers = App.transformNodeListToArray(
					document.querySelectorAll(".day-night")
				);

	if (!switchers.length) return;

	/**
	 * Устанавливаем нужное состояние
	 * переключателя
	 */
	if (document.body.classList.contains("white-color"))
		switchTheme(themes.day);
	else
		switchTheme(themes.night);

	new EventListener(".day-night__btn").add("click", function(el: HTMLElement){
		if (el.classList.contains("active")) return;

		if (el.classList.contains("day-night__btn--night")){
			if (!document.body
					.classList.contains(excludeBodyNightClass) 
				&& !document.body
					.classList.contains(excludeBodyDayClass)
			)
				window.Cookies.remove("whiteColor");
			
			document.body.classList.remove("white-color");

			switchTheme(themes.night);
		}else{
			if (!document.body
					.classList.contains(excludeBodyNightClass)
				 && !document.body
					 .classList.contains(excludeBodyDayClass)
			)
				window.Cookies.set("whiteColor", 1, {expires: 30});

			document.body.classList.add("white-color");

			switchTheme(themes.day);
		}
	});
});

function switchTheme(targetTheme?: themes){
	switch(targetTheme){
		case themes.day:
			for (const switcher of switchers){
				switcher.classList.remove(nightClass);
				switcher.classList.add(dayClass);
			}
		break;


		case themes.night:
		default:
			for (const switcher of switchers){
				switcher.classList.remove(dayClass);
				switcher.classList.add(nightClass);
			}
	}
}