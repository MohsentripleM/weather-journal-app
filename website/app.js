/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=bd0528606c4ffbc824d410b8482e619d&units=metric";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// select button
const btn = document.getElementById("generate");
btn.addEventListener("click", generateAction);

function generateAction(e) {
  e.preventDefault();
  //select the user inputs by ID element
  const zipCodeInput = document.getElementById("zip");
  const userFeeling = document.getElementById("feelings").value;

  //Get function
  const getData = async function () {
    try {
      //code to fetsh data from api(await the fetsh)
      const apiResponse = await fetch(baseURL + zipCodeInput.value + apiKey);

      const response = await apiResponse.json();

      //   console.log(response);
      return response;
    } catch (error) {
      // code to log error
      console.log("catch Get error", error);
    }
  };

  //post function

  const postData = async function (url, data) {
    // code to fetsh route url and write request method, credentials, header,and body
    try {
      // console.log(url);
      console.log(data);
      await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      });

      //return;
    } catch (error) {
      console.log("catch post error", error);
    }
  };

  // update UI function
  const updateUI = async () => {
    // code to fetsh data from server. use url from get route (await fetsh)
    try {
      const newData = await fetch("/data");
      //code to convert json data (await conversion)
      const backData = await newData.json();
      //  console.log(backData);
      //code to conver UI with the fetshed data

      date.textContent = `Date: ${backData.date}`;
      temp.textContent = `Temperature: ${backData.temp}`;
      content.textContent = `Feelings: ${backData.content}`;
    } catch (error) {
      console.log("catch updateUI error", error);
    }
  };
  //invoking functions
  if (!zipCodeInput.value) {
    alert("please enter the zip code");
  } else {
    getData()
      .then(function (temperature) {
        // console.log(temperature);
        // console.log(test);
        postData("/add", {
          temp: temperature.main.temp,
          date: newDate,
          content: userFeeling,
        });
      })
      .then(() => {
        updateUI();
      });
  }
}
