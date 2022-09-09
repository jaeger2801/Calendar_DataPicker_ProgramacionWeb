const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const selected_date_element_two = document.querySelector('.date-picker .selected-date-two');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');
const images_per_month = document.querySelector('.date-picker .month-img');


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const JanuaryImg = 'src/Jiraiya_img.png';
const FebruaryImg = 'src/February_img.png';
const MarchImg = 'src/March_img.png';
const AprilImg = 'src/April_img.png';
const MayImg = 'src/May_img.png';
const JuneImg = 'src/June_img.png';
const JulyImg = 'src/July_img.png';
const AugustImg = 'src/August_img.png';
const SeptemberImg = 'src/September_img.png';
const OctoberImg = 'src/October_img.png';
const NovemberImg = 'src/November_img.png';
const DecemberImg = 'src/December_img.png';

let imagesMonth = [JanuaryImg, FebruaryImg, MarchImg, AprilImg, MayImg, JuneImg, JulyImg, AugustImg, SeptemberImg, OctoberImg, NovemberImg, DecemberImg];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate;
let selectedDay;
let selectedMonth;
let selectedYear;

let selectedDateTwo;
let selectedDayTwo;
let selectedMonthTwo;
let selectedYearTwo;


mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

/* selector de la segunda fecha */
selected_date_element_two.textContent = formatDate(date);
selected_date_element_two.dataset.value = selectedDateTwo;


populateDates();

// EVENT LISTENERS
date_picker_element.addEventListener('click', toggleDatePicker);

//flechas que permiten el cambio entre meses
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// FUNCTIONS
function toggleDatePicker (e) {
	if (!checkEventPathForClass(e.path, 'dates')) {
		dates_element.classList.toggle('active');
	}
}


//funcion para cambio de meses (avance)
function goToNextMonth (e) {
	/* images++;
	if (images > 11) {
		images = 0;
	} */

	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	mth_element.textContent = months[month] + ' ' + year;
	drawImages(month);
	populateDates();
}

//funcion para cambio de meses (retroceso)
function goToPrevMonth (e) {
	/* images--;
	if (images < 0) {
		images = 11;
	} */

	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	mth_element.textContent = months[month] + ' ' + year;
	drawImages(month);
	populateDates();
}

function populateDates (e) {
	days_element.innerHTML = '';
	let amount_days = 31;

	//configuración mes de febrero
	if (month == 1) {
		amount_days = 28;

	}

	for (let i = 0; i < amount_days; i++) {
		const day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i + 1;

		if(selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) 
		{
			day_element.classList.add('selected');
		}

		if(selectedDayTwo == (i + 1) && selectedYearTwo == year && selectedMonthTwo == month)
		{
			day_element.classList.add('selected-two');
		}

		if(selectedDate && selectedDateTwo && validateBetweenDates(i)){
			day_element.classList.add('between');
		}

		day_element.addEventListener('click', function () {

			if(!selectedDate || selectedDateTwo){
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;
			selectedDateTwo = undefined
			selectedDayTwo = undefined
			selectedMonthTwo = undefined
			selectedYearTwo = undefined

			} else if(selectedDate && !selectedDateTwo){
			selectedDateTwo = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDayTwo = (i + 1);
			selectedMonthTwo = month;
			selectedYearTwo = year;
			}


			selected_date_element.textContent = formatDate(selectedDate);
			selected_date_element.dataset.value = selectedDate;

			selected_date_element_two.textContent = formatDate(selectedDateTwo);
			selected_date_element_two.dataset.value = selectedDateTwo;

			populateDates();
		});

		days_element.appendChild(day_element);
	}
}


/* validacion de las dias entre fechas seleccionadas */
function validateBetweenDates(currentDay) {
	return ( selectedDate < selectedDateTwo && 
		(
			((currentDay + 1) > selectedDay && (currentDay + 1) < selectedDayTwo) && 
			(year >= selectedYear &&  year <= selectedYearTwo) &&
			(month >= selectedMonth && month <= selectedMonthTwo)
		))
		/* {
			return true
		}
		else return false */
}

// HELPER FUNCTIONS
function checkEventPathForClass (path, selector) {
	for (let i = 0; i < path.length; i++) {
		if (path[i].classList && path[i].classList.contains(selector)) {
			return true;
		}
	}
	
	return false;
}
function formatDate (d) {
	let day = d.getDate();
	if (day < 10) {
		day = '0' + day;
	}

	let month = d.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}

	let year = d.getFullYear();

	return day + ' / ' + month + ' / ' + year;
}

function drawImages(index) {
	images_per_month.setAttribute("src",imagesMonth[index]);
	console.log(imagesMonth);
}