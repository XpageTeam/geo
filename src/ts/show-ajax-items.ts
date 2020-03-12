import domReady from "./xpage/ready";
import App from "./xpage/core";

const showObserverConfig = {
		rootMargin: "0px 0px",
		threshold: .3
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
				element.querySelector("img").addEventListener("load", function(){
					showObserver.observe(element);
				});
			else{
				showObserver.observe(element);
			}
};