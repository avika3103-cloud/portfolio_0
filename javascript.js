(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var statusEl = document.getElementById("placeholder-status");
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  var placeholderNodes = [];
  var node;

  while ((node = walker.nextNode())) {
    if (node.nodeValue && node.nodeValue.indexOf("PLACEHOLDER") !== -1) {
      placeholderNodes.push(node);
    }
  }

  placeholderNodes.forEach(function (textNode) {
    var parent = textNode.parentNode;
    if (!parent) {
      return;
    }

    var parts = textNode.nodeValue.split(/(PLACEHOLDER)/g);
    var fragment = document.createDocumentFragment();

    parts.forEach(function (part) {
      if (part === "PLACEHOLDER") {
        var mark = document.createElement("mark");
        mark.className = "placeholder-mark";
        mark.textContent = part;
        fragment.appendChild(mark);
      } else if (part) {
        fragment.appendChild(document.createTextNode(part));
      }
    });

    parent.replaceChild(fragment, textNode);
  });

  if (statusEl && placeholderNodes.length > 0) {
    statusEl.hidden = false;
    statusEl.textContent =
      "This page still has " +
      placeholderNodes.length +
      " PLACEHOLDER value(s). Search the files for PLACEHOLDER and replace them with your details.";
  }
})();

(function () {
  "use strict";

  var API_KEY = "1410ca11a307649037cb0e286c10bc4a";
  var form = document.getElementById("weather-form");
  var cityInput = document.getElementById("weather-city");
  var statusEl = document.getElementById("weather-status");
  var resultEl = document.getElementById("weather-result");
  var tempEl = document.getElementById("weather-temp");
  var conditionsEl = document.getElementById("weather-conditions");
  var windEl = document.getElementById("weather-wind");

  if (!form || !cityInput || !statusEl || !resultEl) {
    return;
  }

  function setStatus(message, isError) {
    statusEl.textContent = message;
    statusEl.classList.toggle("is-error", Boolean(isError));
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();
    if (!city) {
      resultEl.hidden = true;
      setStatus("Enter a city name to search.", true);
      return;
    }

    setStatus("Searching weather for " + city + "…", false);
    resultEl.hidden = true;

    var url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      encodeURIComponent(city) +
      "&appid=" +
      API_KEY +
      "&units=metric";

    fetch(url)
      .then(function (response) {
        if (response.status === 404) {
          throw new Error("City not found. Try another spelling.");
        }
        if (!response.ok) {
          throw new Error("Weather data is unavailable right now.");
        }
        return response.json();
      })
      .then(function (data) {
        var temp = data.main && typeof data.main.temp === "number" ? data.main.temp : null;
        var conditions =
          data.weather && data.weather[0] && data.weather[0].description
            ? data.weather[0].description
            : "Unavailable";
        var wind =
          data.wind && typeof data.wind.speed === "number" ? data.wind.speed : null;
        var place = data.name ? data.name : city;

        tempEl.textContent = temp === null ? "Unavailable" : Math.round(temp) + " °C";
        conditionsEl.textContent =
          conditions.charAt(0).toUpperCase() + conditions.slice(1);
        windEl.textContent =
          wind === null
            ? "Unavailable"
            : wind.toFixed(1) + " m/s (" + (wind * 3.6).toFixed(1) + " km/h)";

        resultEl.hidden = false;
        setStatus("Current weather in " + place + ".", false);
      })
      .catch(function (error) {
        resultEl.hidden = true;
        setStatus(
          error && error.message
            ? error.message
            : "Could not load weather. Please try again.",
          true
        );
      });
  });
})();
