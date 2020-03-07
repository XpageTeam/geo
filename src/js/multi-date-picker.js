import $ from "jquery";
import is from "is_js";

// require("../js/selectize.min.js");
require("jquery-ui/ui/widgets/datepicker.js");
require("../js/jquery.datepicker.extension.range.min.js");

document.addEventListener("DOMContentLoaded", e => {
	if (BX.message('SITE_LANG') == 'RU')
		require("jquery-ui/ui/i18n/datepicker-ru.js");
	else
		require("jquery-ui/ui/i18n/datepicker-en-GB.js");
})


const printDateseIntoInput = ($input, dates) => {
	$input.html(is.desktop() ? "" : (!is.ios() ? (BX.message('SITE_LANG') == 'RU' ? "Выбрано: 0" : "Selected: 0") : (BX.message('SITE_LANG') == 'RU' ? "Объектов: 0" : "Selected: 0")));

	if (!dates.length){
		$input.prev(".multi-date__placeholder").show();
		return
	}

	$input.prev(".multi-date__placeholder").hide();

	if (is.desktop())
		for (let date of dates)
			$input.append("<div class='multi-date__date'>"+date+"</div>")
	else{

		let mobileWord = (BX.message('SITE_LANG') == 'RU' ? "Выбрано: " : "Selected: ")

		if (is.ios())
			mobileWord = (BX.message('SITE_LANG') == 'RU' ? "Объектов: " : "Selected: ")

		if (dates.length == 1)
			$input.text(dates[0])
		else
			$input.text(mobileWord += dates.length)
	}
};

$(_ => {

	$.datepicker.setDefaults($.datepicker.regional[(BX.message('SITE_LANG') == 'RU' ? 'ru' : "en-GB")]);

	$("body").on("click", ".multi-date__date", function(e) {
		let date = $(this).text(),
			$this = $(this);

		let $textInput = $this.closest(".multi-date").prev(".date-input-multiple");

		let datesArray = $textInput.val().split(", ");
		let dateIndex = datesArray.indexOf(date);

		datesArray.splice(dateIndex, 1);

		$textInput.datepicker("setDate", datesArray);
		$textInput.val(datesArray.join(", "));

		printDateseIntoInput($this.closest(".multi-date__content"), datesArray);

		// $this.remove();
	});


	$(".date-input-multiple").each((i, el) => {
		let $this = $(el);

		$this.after("<div class='multi-date filter-input'><div class='multi-date__content'></div></div>");

		if (is.desktop())
			$this.next(".multi-date").prepend("<div class='multi-date__placeholder'>"+(BX.message('SITE_LANG') == 'RU' ? "Дата" : 'Date')
+"</div>");

		let $fakeInput = $this.next(".multi-date").find(".multi-date__content");

		$("body").on("click", event => {
			let $target = $(event.target);

			if ($target.is($fakeInput.closest(".multi-date")) 
				|| $fakeInput.closest(".multi-date").has($target).length
				&& !$target.is($(".multi-date__date")))
				$this.datepicker("show");
		});

		$this.datepicker({
			range: "multiple",
			maxDate: "+3y",
			changeMonth: true,
			dateFormat: "dd.mm.yy",
			changeYear: true,
			onSelect(dateText, inst, extensionRange){
				$this.val(extensionRange.datesText.join(", ")).trigger("change");

				printDateseIntoInput($fakeInput, extensionRange.datesText);

				// if (is.desktop())
					// makeSelectizeInCalendar();

				$this.datepicker("hide");
			},
			beforeShow(){
				if (is.desktop())
					makeSelectizeInCalendar();
			},
			onChangeMonthYear(){
				if (is.desktop())
					makeSelectizeInCalendar();
			}
		});

		$fakeInput.html(is.desktop() ? "" : (!is.ios() ? "Выбрано: 0" : "Объектов: 0"));

		$this.addClass("invisible-input");

		if (!$this.val())
			return

		let datesArray = $this.val().split(",");

		$this.datepicker("setDate", datesArray);

		printDateseIntoInput($fakeInput, datesArray);
	});

	$(".input--date").each((i, el) => {
		let $this = $(el);

		$this.datepicker({
			language: BX.message('SITE_LANG') == 'RU' ? 'ru' : "en",
			// maxDate: $this.attr("data-max") == "today" ? new Date() : "+1y",
			// minDate: $this.attr("data-max") == "today" ? "-10y" : new Date(),
			dateFormat: "dd.mm.yy",
			changeMonth: true,
			changeYear: true,
			beforeShow(){
				if (is.desktop())
					makeSelectizeInCalendar();
			},
			onChangeMonthYear(){
				if (is.desktop())
					makeSelectizeInCalendar();
			}
		});
	});
});

const makeSelectizeInCalendar = _ => {
	setTimeout(_ => {
		$(".ui-datepicker-title select:not(.selectized)").selectize();
	}, 100)
};