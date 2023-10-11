const spinner = document.querySelector('.spinner');
const lightIcon = document.querySelector('.fa-sun');
const darkIcon = document.querySelector('.fa-moon');
const toggleButton = document.querySelector('#toggle-mode-button');
const htmlElement = document.body;
const body = document.querySelector('.homeBody');
const details_section = document.querySelector('.details_section');
const currentTheme = document.querySelector('.current_theme');
const cards = document.querySelector('.cards');
const search = document.querySelector('.search');
const state = {
	li_listeners: {},
};

function navigateTo(route) {
	switch (route) {
		case '':
			homepage();
			break;
		case 'country':
			detailsPage();
			break;
		default:
			break;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	currentTheme.innerHTML = `<h4>Dark mode</h4>`;
	lightIcon.style.display = 'none';
});

toggleButton.addEventListener('click', () => {
	if (htmlElement.getAttribute('data-theme') === 'dark') {
		htmlElement.setAttribute('data-theme', 'light');
		currentTheme.innerHTML = `<h4>Dark mode</h4>`;
		lightIcon.style.display = 'none';
		darkIcon.style.display = 'flex';
	} else {
		htmlElement.setAttribute('data-theme', 'dark');
		currentTheme.innerHTML = `<h4>Light mode</h4>`;
		darkIcon.style.display = 'none';
		lightIcon.style.display = 'flex';
	}
});

function addCommas(number) {
	let numberString = number.toString();
	numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return numberString;
}

function homepage() {
	body.style.display = 'block';
	details_section.style.display = 'none';
	async function getCountries() {
		const URL = 'https://restcountries.com/v3.1/all';
		const res = await fetch(URL);
		const data = await res.json();

		data.forEach((country) => {
			const div = document.createElement('div');
			div.classList.add('card');
			div.setAttribute('countryName', country.name.common);
			div.addEventListener('click', () => {
				const atrri = div.getAttribute('countryName');
				window.location.hash = `#country/${atrri}`;
			});
			div.innerHTML = `
							<div class="imgDiv">
								<img src="${country.flags.png}" alt="" />
							</div>
							<div class="countryDetails">
								<h3>${country.name.common}</h3>
								<p>Population: <span class="answer">${addCommas(country.population)}</span></p>
								<p>Region: <span class="answer">${country.region}</span></p>
								<p>Capital: <span class="answer">${country.capital}</span></p>
							</div>
						`;
			document.querySelector('.cards').appendChild(div);
		});
		spinner.style.display = 'none';
	}

	getCountries();
}

search.addEventListener('input', () => {
	if (search.value !== '') {
		async function countrySearch() {
			const URL = `https://restcountries.com/v3.1/name/${search.value}`;

			try {
				const res = await fetch(URL);
				const data = await res.json();

				cards.innerHTML = '';

				data.forEach((country) => {
					const div = document.createElement('div');
					div.classList.add('card');
					div.setAttribute('countryName', country.name.common);
					div.addEventListener('click', () => {
						const atrri = div.getAttribute('countryName');
						window.location.hash = `#country/${atrri}`;
					});

					div.innerHTML = `
							<div class="imgDiv">
								<img src="${country.flags.png}" alt="" />
							</div>
							<div class="countryDetails">
								<h3>${country.name.common}</h3>
								<p>Population: <span class="answer">${addCommas(country.population)}</span></p>
								<p>Region: <span class="answer">${country.region}</span></p>
								<p>Capital: <span class="answer">${country.capital}</span></p>
							</div>
						`;
					cards.appendChild(div);
				});
			} catch (error) {
				cards.innerHTML = 'Country not Found';
			}
		}
		countrySearch();
	} else {
		homepage();
	}
});

// FILTER COUNTRIES BASED ON REGION
const filter = document.getElementById('filter');

filter.addEventListener('change', () => {
	const selectedRegion = filter.value;

	async function getByRegion() {
		const URL = `https://restcountries.com/v3.1/region/${selectedRegion}`;

		try {
			const res = await fetch(URL);
			const data = await res.json();

			cards.innerHTML = '';

			data.forEach((country) => {
				const div = document.createElement('div');
				div.classList.add('card');
				div.setAttribute('countryName', country.name.common);
				div.addEventListener('click', () => {
					const atrri = div.getAttribute('countryName');
					window.location.hash = `#country/${atrri}`;
				});
				div.innerHTML = `
							<div class="imgDiv">
								<img src="${country.flags.png}" alt="" />
							</div>
							<div class="countryDetails">
								<h3>${country.name.common}</h3>
								<p>Population: <span class="answer">${addCommas(country.population)}</span></p>
								<p>Region: <span class="answer">${country.region}</span></p>
								<p>Capital: <span class="answer">${country.capital}</span></p>
							</div>
						`;
				cards.appendChild(div);
			});
		} catch (error) {
			console.log('Error:', error);
		}
	}

	getByRegion();
});

async function detailsPage() {
	details_section.style.display = 'block';
	const countryName = window.location.hash.substring(1).split('/')[1];
	try {
		const URL = `https://restcountries.com/v3.1/name/${countryName}`;
		const res = await fetch(URL);
		const data = await res.json();
		const country = data[0];
		const native = Object.values(country.name.nativeName)[0];
		const nativeName = native.official;
		const currencies = country.currencies;
		const currency = Object.values(currencies);
		const language = country.languages;
		const languages = Object.values(language);
		languages.forEach((lang) => {
			return ` <p> ${lang}</p> `;
		});
		const contents = `<div class="container">
				<button class="back" type="button">
					<i class="fa-solid fa-arrow-left-long"></i>Back
				</button>
				<div class="detailsContainer">
					<div class="detailsImg">
						<img src="${country.flags.png}" alt="" />
					</div>
					<div class="detailsContent">
						<div class="head"><h1>${country.name.common}</h1></div>
						<div class="d">
							<div class="d1">
								<div class="details1">
									<p>Native Name: <span class="answer">${nativeName}</span></p>
									<p>Population: <span class="answer">${addCommas(country.population)}</span></p>
									<p>Region: <span class="answer">${country.region}</span></p>
									<p>Sub Region: <span class="answer">${country.subregion}</span></p>
									<p>Capital: <span class="answer">${country.capital}</span></p>
								</div>
								<div class="details2">
									<p>Top Level Domain: <span class="answer">${country.tld}</span></p>
									<p>Currencies: <span class="answer">${currency[0].name}</span></p>
									<p>
										Languages: <span class="answer">${languages}</span>
									</p>
								</div>
							</div>
							<div class="border">
								<p>Border Countries: 
							</div>
						</div>
					</div>
				</div>
			</div>`;
		body.style.display = 'none';
		details_section.innerHTML = contents;
		const btn = document.querySelector('button');
		btn.addEventListener('click', () => {
			window.location.hash = '';
		});
	} catch (error) {
		console.error('Erorr:', error);
	}
}

window.addEventListener('hashchange', () => {
	const location = window.location.hash;
	if (location == '') {
		navigateTo('');
	} else {
		navigateTo('country');
	}
});

window.dispatchEvent(new Event('hashchange'));
