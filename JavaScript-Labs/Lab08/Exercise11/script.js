const countries = {
  vietnam: { flag: "🇻🇳", iso: "VN", name: "Việt Nam", capital: "Hà Nội", population: "khoảng 101 triệu" },
  japan: { flag: "🇯🇵", iso: "JP", name: "Nhật Bản", capital: "Tokyo", population: "khoảng 124 triệu" },
  france: { flag: "🇫🇷", iso: "FR", name: "Pháp", capital: "Paris", population: "khoảng 68 triệu" },
  australia: { flag: "🇦🇺", iso: "AU", name: "Úc", capital: "Canberra", population: "khoảng 27 triệu" }
};

const countrySelect = document.querySelector("#country-select");
const lookupOutput = document.querySelector("#lookup-output");
const countryCards = document.querySelector("#country-cards");

function renderLookup() {
  const selectedKey = countrySelect.value;
  const selectedCountry = countries[selectedKey];
  const dotAccess = countries.vietnam.iso;
  const bracketAccess = countries["japan"].capital;
  lookupOutput.innerHTML = "<p>Truy cập bằng dấu chấm: <code>countries.vietnam.iso</code> → <strong>" + dotAccess + "</strong></p>" +
    "<p>Truy cập bằng ngoặc vuông: <code>countries[\"japan\"].capital</code> → <strong>" + bracketAccess + "</strong></p>" +
    "<p>Khóa lấy từ lựa chọn: <code>countries[selectedKey]</code> → <strong>" + selectedCountry.name + " · " + selectedCountry.capital + "</strong></p>";
}

function renderCountryCards() {
  let cardsHTML = "<div>";
  for (const key in countries) {
    const country = countries[key];
    cardsHTML += "<article><h3>" + country.flag + " " + country.name + " <small>" + country.iso + "</small></h3>" +
      "<p>Thủ đô: " + country.capital + "</p><p>Dân số: " + country.population + "</p></article>";
  }
  cardsHTML += "</div>";
  countryCards.innerHTML = cardsHTML;
}

renderLookup();
renderCountryCards();
countrySelect.addEventListener("change", renderLookup);
