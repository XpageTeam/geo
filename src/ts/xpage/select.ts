import EventListener from "./EventListener";
import App from "./core";
import Element from "./Element";

interface selectElement {
	render(template?: string): string;
	replaceTemplateMarks(template: string): string;
}

declare global {
	interface HTMLSelectElement {
		seletized?: boolean;
		mySelect: select;
	}
}

enum selectType {
	Single,
	Mutiple
}
enum optionsState {
	opened,
	closed
}

enum selectState{
	opened,
	closed
}

class select {
	private _type: selectType = selectType.Single;
	private _el: HTMLSelectElement;
	private _options: HTMLOptionsCollection;
	private _customOptions: selectOptions;

	public _curState: selectState = selectState.closed;

	set el(el: HTMLSelectElement) {
		this._el = el;
	}
	get el() {
		return this._el;
	}
	set options(options: HTMLOptionsCollection) {
		this._options = options;

		this._customOptions = new selectOptions(options);
	}

	set value(newVal: string) {
		if (newVal == this.el.value) return;

		this.el.value = newVal;

		new EventListener(this.el).trigger("change");
	}

	constructor(select: string);
	constructor(select: HTMLSelectElement);
	constructor(select: any) {
		if (window.is.touchDevice()) return;

		if (typeof select == "string")
			this._el = App.elementsGetter(select)
				? (App.elementsGetter(select)[0] as HTMLSelectElement)
				: document.createElement("select");
		else if (select instanceof HTMLSelectElement) this._el = select;
		else {
			throw Error(`${select} is not a select.`);
			return;
		}

		if (!this._el.options.length || this._el.seletized) return;

		this.options = this._el.options;

		this.createSelect();

		this._el.seletized = true;
		this._el.mySelect = this;
	}

	public renderOptions() {
		if (this.el.closest("div").querySelector(".my-select__list-cont"))
			this.el
				.closest("div")
				.querySelector(".my-select__list-cont")
				.remove();

		const fakeDiv = document.createElement("div"),
			options = this._customOptions.render();

		fakeDiv.innerHTML = options;

		this._el.parentNode.insertBefore(
			fakeDiv.querySelector(".my-select__list-cont"),
			this._el.nextSibling
		);

		const $options = new Element(
			this.el.closest("div").querySelectorAll(".my-select__list-option")
		);

		new EventListener($options).add(
			"click",
			(el: HTMLElement, event: Event, i: number) => {
				$options.removeClass("selected");
				el.classList.add("selected");

				// this.value = el.getAttribute("value") || "0"

				this.value = this.el
					.querySelector(`option:nth-child(${i + 1})`)
					.getAttribute("value");

				this.close();
			}
		);
	}

	private createSelect() {
		this.renderOptions();

		this.bindEvents();
	}

	private bindEvents() {
		new EventListener(this.el).add(
			"mousedown",
			(el: HTMLSelectElement, e: Event) => {
				this.toggle();

				e.preventDefault();
			}
		);

		new EventListener("body").add(
			"click",
			(el: HTMLBodyElement, event: Event) => {
				const target = new Element(event.target),
					parent = this.el
						.closest("div")
						.querySelector(".my-select__list") as HTMLElement;

				if (
					!target.is(this.el) &&
					!new Element(this.el).has(target) &&
					!target.is(parent) &&
					!new Element(parent).has(target) &&
					this._curState == selectState.opened
				) {
					this.close();
					console.log(1232)	
				}
			}
		);

		// new EventListener(this.el).add("change", () => {
		// 	// console.log("asdf")
		// });

		new EventListener(this.el).add(
			"focus",
			(el: HTMLSelectElement, e: Event) => {
				this.open();
			}
		);

		new EventListener(this.el).add(
			"blur",
			(el: HTMLSelectElement, e: Event) => {
				this.close();
			}
		);

		// создаём экземпляр MutationObserver
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				switch (mutation.type) {
					case "childList":
					case "attributes":
						this.options = this._el.options;
						this.renderOptions();
				}
			});
		});

		// передаём в качестве аргументов целевой элемент и его конфигурацию
		observer.observe(this.el, { childList: true });
	}

	public open() {
		this.el.classList.add("js__opened");
		this._curState = selectState.opened;
	}

	public close() {
		this.el.classList.remove("js__opened");
		this._curState = selectState.closed;
	}

	public toggle() {		
		if (this.el.classList.contains("js__opened")) {
			this.close();
		} else {
			this.open();
		}
	}
}

class selectOptions implements selectElement {
	private _template: string =
		"<div class='my-select__list-cont'><ul class='my-select__list'>%options%</ul></div>";
	private _state: optionsState = optionsState.closed;

	public _optionsArray: selectOption[] = [];
	public length: number = 0;

	set state(newState: optionsState) {
		this.state = newState;
	}

	get state(): optionsState {
		return this.state;
	}

	get renderedOptions(): string {
		let optionsString = "";

		for (let option of this._optionsArray)
			optionsString += ` ${option.render()}`;

		return optionsString;
	}

	get options(): selectOption[] {
		return this._optionsArray;
	}

	constructor(private _options: HTMLOptionsCollection) {
		this.length = this._options.length;

		if (this.length == 0) return;

		for (let i = 0; i < this.length; i++) {
			this._optionsArray.push(new selectOption(this._options[i]));
		}
	}

	public replaceTemplateMarks(template: string): string {
		return template.replace("%options%", this.renderedOptions);
	}

	public render(template?: string): string {
		if (!template) return this.replaceTemplateMarks(this._template);
		else return this.replaceTemplateMarks(template);
	}
}

class selectOption implements selectElement {
	private _text: string;
	private _template: string =
		"<li %attrs% class='my-select__list-option %classes%'>%text%</li>";
	private _value: string;
	private _attributes: NamedNodeMap;
	private _classes: string;

	get text() {
		return this._text;
	}

	get value() {
		return this._value;
	}

	get attributes() {
		return this._attributes;
	}

	constructor(private _el: HTMLOptionElement) {
		this._text = this._el.text;
		this._value = this._el.value;

		this._attributes = this._el.attributes;
	}

	private getAttrsString(): string {
		interface attrsObject {
			name: string;
			value: string;
		}

		let attrsObject: attrsObject[] = [],
			attrsString = "";

		let i = 0;

		for (const curAttr of Array.prototype.slice.call(this.attributes)){
			if (curAttr.localName != "class"){
				attrsObject.push({
					name: curAttr.localName,
					value: curAttr.textContent || ""
				});

				attrsString += ` ${curAttr.name}='${curAttr.value}'`;
			}else{
				this._classes = curAttr.value;
			}
		}
		
		// for (let i = 0; i < this.attributes.length; i++) {
		// 	if (this.attributes[i].localName != "class"){
		// 		attrsObject.push({
		// 			name: this.attributes[i].localName,
		// 			value: this.attributes[i].textContent || ""
		// 		});

		// 		attrsString += ` ${attrsObject[i].name}='${attrsObject[i].value}'`;
		// 	}else{
		// 		this._classes = this.attributes[i].value;
		// 	}
		// }

		return attrsString;
	}

	public replaceTemplateMarks(template: string): string {
		return template
			.replace("%attrs%", this.getAttrsString())
			.replace("%classes%", this._classes)
			.replace("%text%", this.text);
	}

	public render(template?: string): string {
		if (!template) return this.replaceTemplateMarks(this._template);
		else return this.replaceTemplateMarks(template);
	}
}

export default select;
