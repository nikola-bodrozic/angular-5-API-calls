import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

@Component({
  selector: 'nb-root',
  templateUrl:'app.component.html',
  styles: []
})

export class AppComponent  implements OnInit {
  client_id:string = "";
  client_secret:string = "";
  grant_type:string = "client_credentials";
  token:any;
  msg:string;
  airports:any[];
  
  constructor(private http:Http) { }
  
  ngOnInit() {
    if(this.client_id == "" && this.client_secret == "") {
      this.msg = "place API credentials in app.component.ts in lines 18 & 19";
      return false;
    }
  }
  
  // POST data as form with application/x-www-form-urlencoded
  sendHeaderPOST() {
    let creds = `client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=${this.grant_type}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({headers:headers});
    this.http
    .post('https://api.lufthansa.com/v1/oauth/token/', creds, options)
    .subscribe( response => { 
      this.token = response.json().access_token; 
      console.log(this.token); 
    });   
  }
  
  // GET data with header using bearer token
  sendHeaderGET(lat:string, lang:string){
    let api_url =`https://api.lufthansa.com/v1/references/airports/nearest/${lat},${lang}?lang=en`;
    let head = new Headers();
    head.append("Authorization", "Bearer " + this.token);
    let opt = new RequestOptions({headers:head});
    this.http
    .get(api_url, opt)
    .subscribe( response => { 
      this.airports = response.json().NearestAirportResource.Airports.Airport
    });   
  }  

  // GET data with custom header
  sendCustomHeaderGET(){
    let head = new Headers();
    head.append("X-CustomHeader", "CustomValue");
    let opt = new RequestOptions({headers:head});
    this.http
    .get('http://localhost/i5.php', opt)
    .subscribe( response => {
      console.log( response.json() ); 
    });   
  }  
}