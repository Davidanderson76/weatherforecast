$(document).ready(function(){

    $("#submitWeather").click(function(){

        var city = $("#city").val();
        var queryUrl = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric' + '&appid=a0230666122f5a62a46562b7d71a9b25';

        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then (function(response){
            console.log(response);
        })
    });
}); 
