/* Global Variables */
const APIKey = '33d88ff4a1f7f80be70bc95ed99e2434';
const doc = document;
// Create a new date instance dynamically with JS
let d = new Date();
const options = {month:'short', day:'numeric', year:'numeric', weekday:'short', hour: '2-digit', minute:'2-digit'}
const dateString = d.toLocaleDateString("en-US", options)
const APIUnits = 'imperial';
const returnedTemp = doc.getElementById('temp')

const generateButton = doc.getElementById('generate');
generateButton.addEventListener('click', getInfo);


function getInfo() {
    const zip = doc.getElementById('zip').value;
    const feelingsInput = document.getElementById('feelings');

    const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=${APIUnits}&appid=${APIKey}`;
    getWeatherData(baseURL)
        .then(function (weatherInfo) {
            if (weatherInfo.cod == "200") {
                const temperature = weatherInfo.main.temp.toFixed(0);
                const city = `${weatherInfo.name}, ${weatherInfo.sys.country}`
                const feelings = feelingsInput.value;
                postMethod('/add', { temperature, city, feelings });
                updateUI();

            } else {
                console.log('Request Unsuccessful');
                return;
            }
        })
}

// Perform API Call
async function getWeatherData(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
}

async function postMethod(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}


async function updateUI() {
    const response = await fetch('/all');
    const retrievedData = await response.json();
    document.getElementById('date').innerHTML = `Date: ${dateString}`;
    document.getElementById('city').innerHTML = `City: ${retrievedData.city} `;
    returnedTemp.innerHTML = `Temperature: ${retrievedData.temperature} &#176;F`;
    document.getElementById('content').innerHTML = `Feelings: ${retrievedData.feelings}`;
}

