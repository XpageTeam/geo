// let $ = require("jquery");

document.addEventListener("DOMContentLoaded", e => {
	if (!$(".range__cont").length)
		return

	require("jquery-ui/ui/widgets/slider.js");

	if (is.touchDevice())
		require("./touch-for-ui-slider.js");

	$(".range__cont").each((i, el) => {
		let $this = $(el);

		let $range = $this.find(".range"),
			$min = $this.find(".range__cur--min"),
			$max = $this.find(".range__cur--max"),
			$minInput = false,
			$maxInput = false;

		if ($this.find(".range__min").length)
				$minInput = $this.find(".range__min");

		if ($this.find(".range__max").length)
			$maxInput = $this.find(".range__max");

		let min = +$range.attr("data-min"),
			max = +$range.attr("data-max"),
			step = +$range.attr("data-step"),
			curMin = +$this.find(".range__min").val(),
			curMax = +$this.find(".range__max").val(),
			$rangeLeftCircle, $rangeRightCircle;

		$range.slider({
			animate: "normal",
			min: min,
			max: max,
			values: [+curMin, +curMax],
			range: true,
			step: step,
			slide(e, ui){
				// $min.text(ui.values[0]);
				// $max.text(ui.values[1]);
				$rangeLeftCircle.attr("data-value", ui.values[0]);
				$rangeRightCircle.attr("data-value", ui.values[1]);
			},
			change(e, ui){
				// $min.text(ui.values[0]);
				// $max.text(ui.values[1]);
			},
			stop(e, ui){
				if ($minInput)
					$minInput.val(ui.values[0]).trigger("change")

				if ($maxInput)
					$maxInput.val(ui.values[1]).trigger("change")
			},
			create(e, ui){
				if ($minInput)
					$minInput.val(curMin)
				if ($maxInput)
					$maxInput.val(curMax)

				$rangeLeftCircle = $range.find("span").eq(0);
				$rangeRightCircle = $range.find("span").eq(1);

				$rangeLeftCircle.attr("data-value", curMin);
				$rangeRightCircle.attr("data-value", curMax);

				// $min.text(curMin);
				// $max.text(curMax);
			}
		})
	})
})