import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "./models/user";
import { Observable, throwError } from 'rxjs';
import {Plant} from "./models/plant";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new User();
  plant : Plant;

  constructor(private http: HttpClient) { }

  baseurl: string = "http://localhost:8080";

  createUser(data): Observable<any> {

    return this.http.post(this.baseurl +'/addUser', data);

  }

  addPlant(data): Observable<any> {

    return this.http.post(this.baseurl +'/addPlant', data);

  }

  getPlants() {
    return this.http.get(this.baseurl +'/getAllplants');
  }

  getUsers() {
    return this.http.get(this.baseurl +'/getAllusers');
  }
  setLoggedInUser(user){
    this.user = user;
  }

  getLoggedInUser(){
   return this.user;
  }

  deletePlant(id: string){
    return this.http.delete(this.baseurl + '/delete/'+ id , {headers : this.headers});
  }

}