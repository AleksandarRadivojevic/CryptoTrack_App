// Load from local storage API Details
var Api = localStorage.getItem("ApiDetails"); // This Api using with really data
var TestApi = 'https://api.myjson.com/bins/jy0o0';

// Loader waiting response
$('#loader').show();
$('#bodyApp').hide();

try {
    var result;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {

                // Show data
                $('#loader').hide()
                $('#bodyApp').show()

                result = JSON.parse(xmlhttp.response);
                finalResult = result.data[1];

                // Inner data in HTML
                document.getElementById('symbol').innerHTML = finalResult.symbol;
                document.getElementById('name').innerHTML = finalResult.name;
                document.getElementById('description').innerHTML = finalResult.description;
                document.getElementById('url').innerHTML = finalResult.urls.website;
                document.getElementById("img").src = finalResult.logo;
            }
            else {
                return console.log("Error");
            }
        }
    }
    xmlhttp.open("GET", TestApi);
    xmlhttp.send();
}
catch (err) {
    console.log(err);
}