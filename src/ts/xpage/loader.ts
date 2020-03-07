import randomInt from "../functions/randomInt"
import Counter from "./counter"
import { App } from "./index";

document.addEventListener("DOMContentLoaded", () => {
	const loadStepsCount = randomInt(4, 10), // Количество шагов в загрузчике
		// loadingTime = randomInt(1, 4), // Время работы загрузчика
        progressCounter = App.getElement(".loader__text span"),
        progressBg = App.getElement(".loader__bg");

	let loadPercentsForSteps: number[] = new Array(loadStepsCount), // Массив процентов загрузки для каждого шага
		timeForSteps: number[] = new Array(loadStepsCount); // Время прохода каждого шага
	
	// последний элемент всегда 100
	loadPercentsForSteps[loadPercentsForSteps.length - 1] = 100
	timeForSteps[timeForSteps.length - 1] = .1

	for (let i = 0; i < loadPercentsForSteps.length - 1; i++){
		loadPercentsForSteps[i] = (i > 0 
            ? randomInt(
                loadPercentsForSteps[i - 1] + 1,
                parseInt((100 / loadStepsCount * i).toString())
            )
            : randomInt(
                parseInt(progressCounter.innerText),
                parseInt((100 / loadStepsCount).toString())
            )
        )

		timeForSteps[i] = randomInt(50, 200) / 1000
	}

	let curStep = 0;
	const loadingAnimate = (step: number, time: number) => {
        curStep++
        
		Counter(
            progressCounter, 
            time, 
            loadPercentsForSteps[curStep - 1], 
            function(){
                if (curStep < loadStepsCount)
                    loadingAnimate(loadPercentsForSteps[curStep], timeForSteps[curStep])
                else{
                    document.body.classList.remove("loading")
                    document.body.classList.add("loaded")
                } 
            },
            function(currentCounter: number){
                progressBg.style.transform = `skewY(-2deg) scaleY(1.2) translate3d(0,${Math.abs(currentCounter - 100)}%,0)`;
            }
        )
	};

	loadingAnimate(loadPercentsForSteps[0], timeForSteps[0])
})