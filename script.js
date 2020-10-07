$(document).ready(function(){

    //getting current day using moment js
    const currentDate = moment();
    console.log("Today's date is: " + currentDate.format('MM/DD/YYYY'));

    $("#submitWeather").click(function(){
        var key = "&appid=774645a1338c2b284cd26096d423753e";
        var city = $( "#city" ).val();
        var url = "https://api.openweathermap.org/data/2.5/forecast";

        $.ajax({
        url: url, //API Call
        dataType: "json",
        type: "GET",
        data: {
            q: city,
            appid: key,
            units: "metric",
            cnt: "10"
        },
        success: function(data) {
            console.log('Received data:', data)
            
            $("#showWeatherForcast").html;

}})})});