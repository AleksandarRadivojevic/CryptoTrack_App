<?php
$url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
$parameters = [
  'start' => '1',
  'limit' => '5000',
  'convert' => 'USD'
];

$headers = [
  'Accepts: application/json',
  'X-CMC_PRO_API_KEY: 93c4a652-d405-4e7a-899a-7b2f1449bc98',
  "Access-Control-Allow-Origin: *"
];
$qs = http_build_query($parameters); // query string encode the parameters
$request = "{$url}?{$qs}"; // create the request URL


$curl = curl_init(); // Get cURL resource
// Set cURL options
curl_setopt_array($curl, array(
  CURLOPT_URL => $request,            // set the request URL
  CURLOPT_HTTPHEADER => $headers,     // set the headers 
  CURLOPT_RETURNTRANSFER => 1  ,
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_SSL_VERIFYHOST => false,       // ask for raw response instead of bool
));
curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
if (!curl_exec($curl)) {
  die('Error: "' . curl_error($curl) . '" - Code: ' . curl_errno($curl));
}
$response = curl_exec($curl); // Send the request, save the response

print_r(json_decode($response)); // print json decoded response
curl_close($curl); // Close request
?>