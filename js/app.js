// Start app
$('#loader').show()
$('#secoundPartApp').hide()

loadAPI();
// load API (native JS)
function loadAPI() {
    try {
        var result;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {

                    $('#loader').hide()
                    $('#secoundPartApp').show()

                    result = JSON.parse(xmlhttp.response);
                    finalResult = result.data;

                    // For create table
                    for (let i = 0; i < finalResult.length; i++) {
                        crtTable(finalResult[i])
                    }
                }
                else {
                    return console.log("Error");
                }
            }
        }
        xmlhttp.open("GET", "https://api.myjson.com/bins/rgxr4");
        xmlhttp.send();
    }
    catch (err) {
        console.log(err);
    }
}

var counter = 0;
function crtTable(ObjectAPI) {

    var bodyTable = document.getElementById('bodyTable');

    // Create row 
    var row = document.createElement('tr');
    bodyTable.appendChild(row);

    // Create currency name
    var name = document.createElement('td');
    row.appendChild(name);
        // Create href link
        var a = document.createElement('a');
        a.setAttribute('title', counter);
        a.setAttribute("onclick", "openDetails(this)");
        a.style.fontSize = '1.3em'
        a.innerHTML = ObjectAPI.name;
        name.appendChild(a);
    
    // Create shortcut
    var shortName = document.createElement('td');
    shortName.style.fontWeight = 'bolder';
    shortName.innerHTML = ObjectAPI.symbol;
    row.appendChild(shortName);

    // Current value
    var valuePrice = document.createElement('td');
    valuePrice.setAttribute('id', 'valuePrice' + counter)
    valuePrice.innerHTML = ObjectAPI.quote.USD.price.toFixed(3);
    row.appendChild(valuePrice);

    // Changes last 24h
    var last24 = document.createElement('td');
    var lastChanges = ObjectAPI.quote.USD.percent_change_24h.toFixed(2)
    last24.innerHTML = lastChanges + ' %';
    if (ObjectAPI.quote.USD.percent_change_24h <= 0) {
        last24.style.color = 'red'
    } else {
        last24.style.color = 'green'
    }
    row.appendChild(last24);

    // Amount field
    var amount = document.createElement('td');
    row.appendChild(amount);
        // Create input amount
        var inputAmount = document.createElement('input');
        inputAmount.setAttribute('type', 'number');
        inputAmount.setAttribute('id', counter);
        inputAmount.setAttribute('class', 'form-control form-control-sm');
        inputAmount.setAttribute('placeholder', 'Enter your amount');
        inputAmount.setAttribute("oninput", "enableBtn(this)");
        inputAmount.style.textAlign = 'center'
        amount.appendChild(inputAmount);
        // Create button
        var btnAmount = document.createElement('button');
        btnAmount.setAttribute('type', 'button');
        btnAmount.setAttribute('id', 'btnAmount' + counter)
        btnAmount.setAttribute('value', counter);
        btnAmount.setAttribute('class', 'btn peach-gradient btn-sm');
        btnAmount.setAttribute('disabled', 'true');
        btnAmount.setAttribute("onclick", "currentCoin(this)");
        btnAmount.style.width = '90%';
        btnAmount.innerHTML = 'Submit';
        amount.appendChild(btnAmount);

    // Your value
    var yourValue = document.createElement('td');
    yourValue.setAttribute('id', 'yourValue' + counter)
    if (!inputAmount.value) {
        yourValue.innerHTML = "$ 0.00"
    } else {
        yourValue.innerHTML = "$ " + parseInt(valuePrice.innerHTML) * parseInt(inputAmount.value);
    }
    row.appendChild(yourValue);

    counter++;
}


// Function to activate this button
function enableBtn(input) {
    var num = input.id;
    document.getElementById('btnAmount' + num).disabled = false;
    if (!input.value) {
        document.getElementById('btnAmount' + num).disabled = true;
    }
}

// Function to sum your coin
function currentCoin(btn) {
    // This value using like counter
    var amount = parseInt(document.getElementById(btn.value).value);
    // Get current price of this value
    var currentPrice = parseInt(document.getElementById('valuePrice' + btn.value).innerHTML);
    // Inner data in field
    document.getElementById('yourValue' + btn.value).innerHTML = '$ ' + amount * currentPrice;
    // Counter
    var counterForLS = document.getElementById(btn.value).id;
    var forSave = amount * currentPrice;
    // Save data in local storage
    localStorage.setItem('currentVal' + counterForLS, forSave)
}

// Open details page
function openDetails(a) {
    // Choose current API
    var ApiDetails = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=' + a.title;
    // Set this API in local storage
    localStorage.setItem('ApiDetails',ApiDetails)
    window.location.assign('pages/details.html')
}

// Refresh data every 60sec
setInterval( function () { 
    document.getElementById('bodyTable').innerHTML = '';
    loadAPI(); 
}, 60000);