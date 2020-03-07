/**
 * Здесь все скрипты,
 * связанные с селектайзом
*/

require("../js/selectize.min.js");

document.addEventListener("DOMContentLoaded", () => {
	$(".btn-simple").click(function(){
		$(".popup-mini").fadeOut(300);
	
		// if (!is.touchDevice())
		$("select.city-select__select")[0].selectize.open();
	});

	if (!is.touchDevice()){
		$("select:not(.no-selectize):not(.fs-selectize)").each(function() {
			selectizeInit($(this));
		});

		$("body").on("click", ".selectize-control.multi .selectize-input .item", function(){
			let $this = $(this),
				value = $this.data("value"),
				$input = $this.closest(".selectize-input"),
				$select = $this.closest(".selectize-control").prev("select");

			$select[0].selectize.removeItem(value);

			$select[0].selectize.refreshItems(); 
			$select[0].selectize.refreshOptions();

			if (!$input.find(".item").length){
				$input.find("input[type='text']").css({
					position: "static",
					opacity: 0,
					left: 0,
				})
			}
		});
	}else{
		/** Селектайз обязательно инициализируется
		 * для селекта в шапке
		 */
		$(".head__logo-city select.city-select__select").each(function(){
			selectizeInit($(this));
		});
	}
});

function selectizeInit($select){
	$select.selectize({
		placeholder: $select.closest("div").data("placeholder") || $select.data("placeholder") || "",
		closeAfterSelect: true,
		onChange(){
			$(".selectize-input input").blur()
		}
	});
}