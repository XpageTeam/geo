import is from "is_js";
import {randomInteger} from "../functions/functions.js";

/**
 * Опасный патч
 * ! выполнено профессионалом
 * ! не повторять дома
 */
Array.prototype.swap = function(firstItem, secondItem){
	this[firstItem] = this.splice(secondItem, 1, this[firstItem])[0];
	return this;
}

let gridArray = [],
	sizes = {
		x: is.desktop() ? 3 : (is.tablet() ? 2 : 1),
		y: 30, // 10
	},
	resultArray = [];
	// funcCounter = 0;


/** 
 * Эта функция генерирует случайную сетку 
 * для элементов на главной странице
 */
const gridGeneration = (_ = false) => {
	let offsetY = !gridArray.length ? 0 : gridArray.length - 1;

	for (let i = offsetY; i < sizes.y + offsetY; i++){
		for (let j = 0; j < sizes.x; j++){
			if (!Array.isArray(gridArray[i]))
				gridArray[i] = [];

			if (!isNaN(gridArray[i][j]))
				continue;

			var formatTable = (e = false) => {
				let randElement = randomInteger(1, sizes.x);

				// funcCounter++;

				switch (randElement){
					case 3:
						if (!Array.isArray(gridArray[i + 1]))
							gridArray[i + 1] = [];

						if (i + 1 != sizes.y && gridArray[i][j - 1] != 3 
							&& gridArray[i + 1][j - 1] != 3){
							gridArray[i + 1][j] = randElement;
							gridArray[i][j] = randElement;
							return "col"
						}else
							return formatTable()
					break;

					case 2:
						if (j + 1 != sizes.x && isNaN(gridArray[i][j + 1])){
							if (i)
								if (gridArray[i - 1][j] == 2 && gridArray[i - 1][j + 1] == 2)
									return formatTable()

							gridArray[i][j] = randElement;
							gridArray[i][j + 1] = randElement;
							return "row";
						}else
							return formatTable()

					break;

					default:
						gridArray[i][j] = randElement;
						return "box"

						break;
				}
			};

			resultArray.push(formatTable());
		}
	}

	return resultArray;
}

export default gridGeneration;