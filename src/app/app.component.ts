import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

@Component({
  selector: 'nb-root',
  template: `
  <h1>{{ msg }}</h1>
  <p> click on first button to get bearer token and then click on second button to get data from Lufthansa API</p>
  <button (click)="sendHeaderPOST()">send header by POST</button>  
  <button (click)="sendHeaderGET()">send header by Get</button>  
  <button (click)="sendCustomHeaderGET()">send custom header by Get</button>
  `,
  styles: []
})

export class AppComponent implements OnInit {
  
  client_id:string = "";
  client_secret:string = "";
  grant_type:string = "client_credentials";
  token:any;
  msg:string;

  constructor(private http:Http) { }

  ngOnInit() {
    if(this.client_id == "" && this.client_secret == "") {
      this.msg = "place API credentials in requests.component.ts";
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
  sendHeaderGET(){
    let head = new Headers();
    head.append("Authorization", "Bearer " + this.token);
    let opt = new RequestOptions({headers:head});
    this.http
    .get('https://api.lufthansa.com/v1/references/countries/DK?limit=20&offset=0', opt)
    .subscribe( response => { 
      console.log( response.json().CountryResource.Countries.Country.ZoneCode ); 
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