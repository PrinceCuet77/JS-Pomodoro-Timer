// clock
let minute = document.querySelector('.minute')
let second = document.querySelector('.second')

let timeCount,
	pomodoroTimer = 0

// buttons
let start = document.querySelector('.start')
let pause = document.querySelector('.pause')
let reset = document.querySelector('.reset')

// sounds
let clickSound = new Audio('click.mp3')
let bell = new Audio('bell.mp3')

// titles
let pomodoro = document.querySelector('.pomodoro')
let shortBreak = document.querySelector('.short-break')
let longBreak = document.querySelector('.long-break')

// clock times
let clockOne = document.querySelector('.clock-one')
let clockTwo = document.querySelector('.clock-two')
let clockThree = document.querySelector('.clock-three')
let clockFour = document.querySelector('.clock-four')

// others
let container = document.querySelector('.container')
let contentClock = document.querySelector('.content-clock')
let counter = document.querySelector('.counter')

// all settings for short break
function forShortBreak() {
	document.title = 'Short Break'
	container.style.backgroundColor = '#28abb9'
	contentClock.style.backgroundColor = '#9acde0'
	counter.style.backgroundColor = '#9acde0'

	start.style.color = '#43658b'
	pause.style.color = '#43658b'
	reset.style.color = '#43658b'

	clockOne.style.color = '#43658b'
	clockTwo.style.color = '#43658b'
	clockThree.style.color = '#43658b'
	clockFour.style.color = '#43658b'

	pomodoro.style.backgroundColor = ''
	shortBreak.style.backgroundColor = '#43658b'
	longBreak.style.backgroundColor = ''
}

// all settings for pomodoro
function forPomodoro() {
	document.title = 'Time to work'
	container.style.backgroundColor = '#f89c13'
	contentClock.style.backgroundColor = '#faab2c'
	counter.style.backgroundColor = '#faab2c'

	start.style.color = '#f57c06'
	pause.style.color = '#f57c06'
	reset.style.color = '#f57c06'

	clockOne.style.color = '#f57c06'
	clockTwo.style.color = '#f57c06'
	clockThree.style.color = '#f57c06'
	clockFour.style.color = '#f57c06'

	pomodoro.style.backgroundColor = '#f57c06'
	shortBreak.style.backgroundColor = ''
	longBreak.style.backgroundColor = ''
}

// all settings for long break
function forLongBreak() {
	document.title = 'Long Break'
	container.style.backgroundColor = '#226b64'
	contentClock.style.backgroundColor = '#309986'
	counter.style.backgroundColor = '#309986'

	start.style.color = '#184b46'
	pause.style.color = '#184b46'
	reset.style.color = '#184b46'

	clockOne.style.color = '#184b46'
	clockTwo.style.color = '#184b46'
	clockThree.style.color = '#184b46'
	clockFour.style.color = '#184b46'

	pomodoro.style.backgroundColor = ''
	shortBreak.style.backgroundColor = ''
	longBreak.style.backgroundColor = '#184b46'
}

// default button settings
pause.style.display = 'none'
reset.style.display = 'none'

// when window reload
window.addEventListener('DOMContentLoaded', () => {
	// formatting minutes and seconds
	formatMinute()
	formatSecond()

	pomodoro.style.backgroundColor = '#f57c06'
})

// when 'start' button is clicked
start.addEventListener('click', () => {
	// clock starts
	if (timeCount === undefined) {
		clickSound.play()
		timeCount = setInterval(timer, 1000)
	}

	// for window title in pomodoro time
	if (pomodoroTimer == 0) {
		document.title = 'Time to work'
	}

	// button settings in pomodoro time
	start.style.display = 'none'
	pause.style.display = 'block'
	reset.style.display = 'block'
})

// when 'pause' button is clicked
pause.addEventListener('click', () => {
	// stop the clock
	stopInterval()

	// add sound when clock is pause
	clickSound.play()

	// button settings in pause time
	start.style.display = 'block'
	pause.style.display = 'none'
	reset.style.display = 'block'
})

// stop the clock
function stopInterval() {
	clearInterval(timeCount)
	timeCount = undefined
}

// when 'reset' button is clicked
reset.addEventListener('click', () => {
	stopInterval()

	clickSound.play()

	if (pomodoroTimer == 7) {
		// Long break
		minute.innerText = 20
		second.innerText = 0

		// formating minutes and seconds
		formatMinute()
		formatSecond()
	} else {
		if (pomodoroTimer % 2 == 1) {
			// Short break
			minute.innerText = 5
			second.innerText = 0

			// formating minutes and seconds
			formatMinute()
			formatSecond()
		} else {
			// Pomodoro
			minute.innerText = 25
			second.innerText = 0

			// formating minutes and seconds
			formatMinute()
			formatSecond()
		}
	}

	buttonReset()
})

// Format minutes
function formatMinute() {
	if (minute.innerText < 10) {
		minute.innerText = `0${minute.innerText}`
	}
}
// Format seconds
function formatSecond() {
	if (second.innerText < 10) {
		second.innerText = `0${second.innerText}`
	}
}

// button settings in 'reset' time
function buttonReset() {
	start.style.display = 'block'
	pause.style.display = 'none'
	reset.style.display = 'none'
}

function timer() {
	if (second.innerText != 0) {
		// Second count down
		second.innerText--

		// only format seconds because just seconds is changed
		formatSecond()
	} else if (minute.innerText != 0 && second.innerText == 0) {
		// When one minute is gone
		minute.innerText--
		second.innerText = 59

		// formatting minutes and seconds
		formatMinute()
		formatSecond()
	}

	if (second.innerText == 0 && minute.innerText == 0) {
		// When any period is done
		stopInterval()

		// for the purpose of counting cycle
		pomodoroTimer++

		// in pomodoro time
		if (pomodoroTimer == 0) {
			clockOne.innerHTML = '<i class="far fa-clock"></i>'
			clockTwo.innerHTML = '<i class="far fa-clock"></i>'
			clockThree.innerHTML = '<i class="far fa-clock"></i>'
			clockFour.innerHTML = '<i class="far fa-clock"></i>'
		}

		bell.play()

		if (pomodoroTimer == 7) {
			// for long break
			pomodoroTimer = -1
			minute.innerText = 20
			second.innerText = 0

			formatMinute()
			formatSecond()

			forLongBreak()
			clockFour.innerHTML = '<i class="fas fa-clock"></i>'
		} else {
			if (pomodoroTimer % 2 == 1) {
				// for short break
				minute.innerText = 5
				second.innerText = 0

				formatMinute()
				formatSecond()

				if (pomodoroTimer == 1) {
					clockOne.innerHTML = '<i class="fas fa-clock"></i>'
				} else if (pomodoroTimer == 3) {
					clockTwo.innerHTML = '<i class="fas fa-clock"></i>'
				} else if (pomodoroTimer == 5) {
					clockThree.innerHTML = '<i class="fas fa-clock"></i>'
				}

				forShortBreak()
			} else {
				// for pomodoro
				minute.innerText = 25
				second.innerText = 0

				formatMinute()
				formatSecond()

				forPomodoro()
			}
		}

		buttonReset()
	}
}

// for clock cycle one
clockOne.addEventListener('click', () => {
	clockOne.innerHTML = '<i class="fas fa-clock"></i>'
	clockTwo.innerHTML = '<i class="far fa-clock"></i>'
	clockThree.innerHTML = '<i class="far fa-clock"></i>'
	clockFour.innerHTML = '<i class="far fa-clock"></i>'

	pomodoroTimer = 1
	minute.innerText = 5
	second.innerText = 0

	formatMinute()
	formatSecond()

	forShortBreak()
	stopInterval()
	buttonReset()
})

// for clock cycle two
clockTwo.addEventListener('click', () => {
	clockOne.innerHTML = '<i class="fas fa-clock"></i>'
	clockTwo.innerHTML = '<i class="fas fa-clock"></i>'
	clockThree.innerHTML = '<i class="far fa-clock"></i>'
	clockFour.innerHTML = '<i class="far fa-clock"></i>'

	pomodoroTimer = 3
	minute.innerText = 5
	second.innerText = 0

	formatMinute()
	formatSecond()

	forShortBreak()
	stopInterval()
	buttonReset()
})

// for clock cycle three
clockThree.addEventListener('click', () => {
	clockOne.innerHTML = '<i class="fas fa-clock"></i>'
	clockTwo.innerHTML = '<i class="fas fa-clock"></i>'
	clockThree.innerHTML = '<i class="fas fa-clock"></i>'
	clockFour.innerHTML = '<i class="far fa-clock"></i>'

	pomodoroTimer = 5
	minute.innerText = 5
	second.innerText = 0

	formatMinute()
	formatSecond()

	forShortBreak()
	stopInterval()
	buttonReset()
})

// for clock cycle four
clockFour.addEventListener('click', () => {
	clockOne.innerHTML = '<i class="fas fa-clock"></i>'
	clockTwo.innerHTML = '<i class="fas fa-clock"></i>'
	clockThree.innerHTML = '<i class="fas fa-clock"></i>'
	clockFour.innerHTML = '<i class="fas fa-clock"></i>'

	pomodoroTimer = 7
	minute.innerText = 20
	second.innerText = 0

	formatMinute()
	formatSecond()

	forLongBreak()
	stopInterval()
	buttonReset()
})
