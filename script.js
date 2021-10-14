'use strict'
'use strict'

// Когда произойдет полная загрузка страницы
window.addEventListener('load', () => {
	const lines = document.querySelector('.header-lines') // Контейнер с линиями
	const dots = document.querySelectorAll('.dot') // точки на линиях
	const points = document.querySelectorAll('.point') // Free and PRO
	const blik = document.querySelector('.blik') // блик
	
	lines.style.animation = `animationLines 2s linear`

	lines.addEventListener('animationend', () => {
		lines.style.width = `100%`;
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
	})
}) 






