const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let JanuaryImg
let FebruaryImg
let MarchImg
let AprilImg
let MayImg
let JuneImg
let JulyImg
let AugustImg
let SeptemberImg
let OctoberImg
let NovemberImg
let DecemberImg

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

function preload() {
	JanuaryImg = new loadImage('src/Jiraiya_img.png');
	FebruaryImg = new loadImage('src/February_img.png');
	MarchImg = new loadImage('src/March_img.png');
	AprilImg = new loadImage('src/April_img.png');
	MayImg = new loadImage('src/May_img.png');
	JuneImg = new loadImage('src/June_img.png');
	JulyImg = new loadImage('src/July_img.png');
	AugustImg = new loadImage('src/August_img.png');
	SeptemberImg = new loadImage('src/September_img.png');
	OctoberImg = new loadImage('src/October_img.png');
	NovemberImg = new loadImage('src/November_img.png');
	DecemberImg = new loadImage('src/December_img.png');
}

const images = [JanuaryImg, FebruaryImg, MarchImg, AprilImg, MayImg, JuneImg, JulyImg, AugustImg, SeptemberImg, OctoberImg, NovemberImg, DecemberImg];

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;


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
	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

//funcion para cambio de meses (retroceso)
function goToPrevMonth (e) {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	mth_element.textContent = months[month] + ' ' + year;
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