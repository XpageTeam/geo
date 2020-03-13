import domReady from "./xpage/ready";
import App from "./xpage/core";
import loadImg from "./functions/imageLoader";

const showObserverConfig = {
		// root: document.querySelector(".ajax--list"),
		rootMargin: "0px 0px",
		threshold: .5
	},
	showObserverCallback = (entries: Array<IntersectionObserverEntry>) => {
		entries.forEach((item: IntersectionObserverEntry) => {
			if (item.isIntersecting)
				item.target.classList.add("animated");
		});
	},
	showObserver = new IntersectionObserver(showObserverCallback, showObserverConfig);

domReady(() => {
	for (const item of App.elementsGetter(".ajax--item"))
		if (item.querySelector("img"))
			loadImg(
				item.querySelector("img"),
				() => {
					showObserver.observe(item);
				}
			);
		else
			showObserver.observe(item);

	let observer = new MutationObserver(observerCallback);

	let config = {
		childList: true,
	};

	if (document.querySelector(".ajax--list"))
		observer.observe(document.querySelector(".ajax--list"), config)
});

function observerCallback(mutations: Array<MutationRecord>){
	let addedElements = App.transformNodeListToArray(mutations[0].addedNodes);
		for (let element of addedElements)
			if (element.querySelector("img"))
				loadImg(
					element.querySelector("img"),
					() => {
						showObserver.observe(element);
					}
				);
			else
				showObserver.observe(element);
};