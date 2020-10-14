$(document).ready(function(){
    //getting current day using moment js
    const currentDate = moment();
    console.log("Today's date is: " + currentDate.format('MM/DD/YYYY'));

    //on click activates the function to enter the input into the search
    $("#search-button").on("click",function() {
        var searchValue = $("#search-value").val();
    
    //clearing the input after the search
    $("#search-value").val("");

    searchWeather(searchValue);

});

    $(".history").on("click", "li", function() {
        searchWeather($(this).text());
    });


    function searchWeather(searchValue) {

        //VARIABLES
        var key = "&appid=774645a1338c2b284cd26096d423753e";
        var url = "https://api.openweathermap.org/data/2.5/forecast";
        var searchValue = $("#search-value").val();
        $("#search-value").val("");

        //API Call

        $.ajax({
            type: "GET",
            url: url + searchValue + key,
            dataType: "json",
            success: function(data) {
                if (history.indexOf(searchValue) === -1) {
                    history.push(searchValue);
                    window.localStorage.setItem("history", JSON.stringify(history));

                    makeRow(searchValue);
                }
            $("#today").empty();


            //dynamically creating html for weather results

            var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() +")");
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
            var cardBody = $("<div>").addClass("card-body");
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            //appending info to html page here

            title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);

            getForecast(searchValue);
            getUVIndex(data.coord.lat, data.coord.lon);
        }
    });
}

    //establishing the getForecast function here
    function getForecast(searchValue) {
        $.ajax({
            type: "GET",
            url: url + searchValue + key,
            dataType: "json",
            success: function(data) {
                $("#forecast").html("<h4 class=\"mt-3\">5-day Forecast:</h4>").append("<div class=\"row\">");

                //Loop through all forecasts
                for (var i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
            
                        var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
            
                        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            
                        var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                        var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

                        //appending to the pager here
                        col.append(card.append(body.append(title, img, p1, p2)));
                        $("#forecast .row").append(col);
                    }
                }
            }
        });
    }

    //function to obtain the uv index

    function getUVIndex(lat, lon) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=7ba67ac190f85fdba2e2dc6b9d32e93c&lat=" + lat + "&lon=" + lon,
            dataType: "json",
            success: function(data) {
              var uv = $("<p>").text("UV Index: ");
              var btn = $("<span>").addClass("btn btn-sm").text(data.value);

              if (data.value < 3) {
                  btn.addClass("btn-success");
              }
              else if (data.value < 7) {
                  btn.addClass("btn-warning");
              }
              else {
                  btn.addClass("btn-danger");
              }
              $("#today .card-body").append(uv.append(btn));
            }
        });
    }

//search history
var history = JSON.parse(window.localStorage.getItem("history"))  || [];
if (history.length > 0) {
    searchWeather(history[history.length-1]);
}
    for (var i = 0; i < history.length; i++) {
        makeRow(history[i]);
    }














    //getting current day using moment js
    const currentDate = moment();
    console.log("Today's date is: " + currentDate.format('MM/DD/YYYY'));

    
})