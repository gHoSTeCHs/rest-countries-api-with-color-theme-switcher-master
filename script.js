const spinner = document.querySelector('.spinner');
const lightIcon = document.querySelector('.fa-sun');
const darkIcon = document.querySelector('.fa-moon');
const toggleButton = document.querySelector('#toggle-mode-button');
const htmlElement = document.body;
const currentTheme = document.querySelector('.current_theme');
const cards = document.querySelector('.cards');
const search = document.querySelector('.search');

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

async function getCountries() {
	const URL = 'https://restcountries.com/v3.1/all';
	const res = await fetch(URL);
	const data = await res.json();

	data.forEach((country) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `<a href="#/country_details?id=${country.name.common}">
							<div class="imgDiv">
								<img src="${country.flags.png}" alt="" />
							</div>
							<div class="countryDetails">
								<h3>${country.name.common}</h3>
								<p>Population: <span class="answer">${country.population}</span></p>
								<p>Region: <span class="answer">${country.region}</span></p>
								<p>Capital: <span class="answer">${country.capital}</span></p>
							</div>
						</a>
					</div>`;
		document.querySelector('.cards').appendChild(div);

		// div.addEventListener('click', () => {

		// 	countryDetails();
		// });
	});
	spinner.style.display = 'none';
}

getCountries();
/*
//Native name
const native = data[123].name.nativeName;
	const naitieObj = Object.values(native);

	console.log(naitieObj[0].official);
*/

const countryName = window.location.hash.split('=')[1];

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
					div.innerHTML = `<a href="#/country_details?id=${country.name.common}">
							<div class="imgDiv">
								<img src="${country.flags.png}" alt="" />
							</div>
							<div class="countryDetails">
								<h3>${country.name.common}</h3>
								<p>Population: <span class="answer">${country.population}</span></p>
								<p>Region: <span class="answer">${country.region}</span></p>
								<p>Capital: <span class="answer">${country.capital}</span></p>
							</div>
						</a>
					</div>`;
					cards.appendChild(div);
				});
			} catch (error) {
				cards.innerHTML = 'Country not Found';
			}
		}
		countrySearch();
	} else {
		getCountries();
	}
});
