import { Component, OnInit } from '@angular/core';
import {Plant} from "../models/plant";
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import {NgModule} from "@angular/core";
import {User} from "../models/user";

declare var module: {
  id: string;
}

@Component({
  moduleId : module.id,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [AppService]
})
export class ListComponent implements OnInit {

  plants: Plant[] = [];
  plant = new Plant();


  constructor(private router: Router,
  private appService: AppService) { }

  ngOnInit(): void {
    this.getPlants();
  }
  getPlants() {
    this.appService.getPlants().subscribe(res => {
      this.plants = res as Plant[];
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  doDelete(plant){
    this.appService.deletePlant(plant._id).subscribe(data => {
      this.plants.splice(this.plants.indexOf(plant),1);
    });
  }


}