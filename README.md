# Angular 5 Calls OAuth and RESTful APIs

## install
* place your credentials from Lufthansa API in `client_id` & `client_secret` in AppComponent lines 11 & 12
* run `npm install` to install dependancies
* copy `i5.php` to `/var/www/html` file must be accessible in browser at `http://localhost/i5.php`
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`

## features
* POST call to get bearer token - method AppComponent::sendHeaderPOST
* GET call to consume informations using token in HTTP header - method AppComponent::sendHeaderPOST
* Submiting custom header to file i5.php using GET - method AppComponent::sendCustomHeaderGET