'use strict'
'use strict'

// Когда произойдет полная загрузка страницы
window.addEventListener('load', () => {
	const container = document.querySelector('.container') // Контейнер
	const lines = document.querySelector('.header-lines') // Контейнер с линиями
	const dots = document.querySelectorAll('.dot') // точки на линиях
	const points = document.querySelectorAll('.point') // Free and PRO
	const blik = document.querySelector('.blik') // блик

	const slider = document.querySelector('.slider')
	const sliderContainer = document.querySelector('.slider-container') //Контейнер со слайдами
	const slides = document.getElementsByClassName('slide') //Слайдеры
	
	lines.style.width = `100%`

	lines.addEventListener('transitionend', () => {
		[...dots].forEach((e) => {
			e.style.opacity = `1`
			e.style.animation = `animationDots .4s linear`
		});
		[...points].forEach((e) => {
			e.style.opacity = `1`
		})
		points[1].style.animation = `animationPoint 3s linear infinite`
		blik.style.animation = `animationBlik 1s linear .5s`
		blik.addEventListener('animationend', () => {
			blik.style.animation = ''
			setTimeout(() => {
				blik.style.animation = `animationBlik 1s linear .2s`
			},9000)
		})
	});
	
	// Слайдер 

	// Функция создания слайдера
	(function getSlider() {
		const lastSlideCopy = slides[slides.length - 1].cloneNode(true) 
		const firstSlideCopy = slides[0].cloneNode(true)
		const slidePrepend = slides[0].cloneNode(false)
		const slideAppend = slides[0].cloneNode(false)
		lastSlideCopy.classList.add('lastSlideCopy')
		sliderContainer.prepend(lastSlideCopy)
		firstSlideCopy.classList.add('firstSlideCopy')
		sliderContainer.append(firstSlideCopy)
		sliderContainer.prepend(slidePrepend)
		sliderContainer.append(slideAppend)
	})()
	const widthSliderContainer = slides[0].offsetWidth*(slides.length) + 5*(slides.length-1)
	let ind = 2
	let startX, finishX
	sliderContainer.style.width = `${widthSliderContainer}px`
	sliderContainer.style.transform = `translateX(${((slider.offsetWidth - slides[0].offsetWidth)/2)-(slides[0].offsetWidth+5)*ind}px)`

	let setInt = setInterval(() => {
		runSliderLeft ()
	}, 5000);

	// Функция движения слайдера влево 
	function runSliderLeft () {
		sliderContainer.style.transition = ".5s ease-in-out"
		if (slider.classList.contains("run")) return
		slider.classList.add("run")
		ind++
		sliderContainer.style.transform = `translateX(${((slider.offsetWidth - slides[0].offsetWidth)/2)-(slides[0].offsetWidth+5)*ind}px)`
		sliderContainer.addEventListener('transitionend', () => {
			if (slides[ind].classList.contains('firstSlideCopy')) {
				sliderContainer.style.transition = "none"
				ind = 2
				sliderContainer.style.transform = `translateX(${((slider.offsetWidth - slides[0].offsetWidth)/2)-(slides[0].offsetWidth+5)*ind}px)`
			}
			slider.classList.remove("run")
		})
	}

	// Функция движения слайдера вправо
	function runSliderRight () {
		sliderContainer.style.transition = ".5s ease-in-out"
		if (slider.classList.contains("run")) return
		slider.classList.add("run")
		ind--
		sliderContainer.style.transform = `translateX(${((slider.offsetWidth - slides[0].offsetWidth)/2)-(slides[0].offsetWidth+5)*ind}px)`
		sliderContainer.addEventListener('transitionend', () => {
			if (slides[ind].classList.contains('lastSlideCopy')) {
				sliderContainer.style.transition = "none"
				ind = slides.length - 3
				sliderContainer.style.transform = `translateX(${((slider.offsetWidth - slides[0].offsetWidth)/2)-(slides[0].offsetWidth+5)*ind}px)`
			}
			slider.classList.remove("run")
		})
	}

	// Обработчики события для свайпа(запоминаем координаты при начале касания и при конце. Сравниваем и вызываем функию движения слайдера. Останавливаем автоматический свайп слайдера)
	slider.addEventListener('touchstart', (e) => {
		startX = e.touches[0].clientX
	})
	slider.addEventListener('touchmove', (e) => {
		finishX = e.touches[0].clientX
		if (startX - finishX > 50) {
			if (slider.classList.contains("run")) return
			clearInterval(setInt)
			runSliderLeft()
		} 
		if (startX - finishX < -50) {
			if (slider.classList.contains("run")) return
			clearInterval(setInt)
			runSliderRight()
		}
	})
}) 



