import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  plantForm :FormGroup;
  name : string;
  latinname : string;
  type : string;
  quantity : number; 

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService

  ) { this.validatorForm(); }

  ngOnInit(): void {
  }

  validatorForm() {
    this.plantForm = this.formBuilder.group({
      name: ['', [Validators.required]],
	  latinname: ['', [Validators.required]],
	  type: ['', [Validators.required]],
      quantity: ['', [Validators.required]]     
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.plantForm.valid) {
      alert('Nem sikerült a felvétel!');
      return false;

    } else {
      this.appService.addPlant(this.plantForm.value).subscribe(
        (res) => {
          alert('A növény hozzáadása az adatbázishoz sikeres!');
          this.ngZone.run(() => this.router.navigateByUrl('/list'));
        }, (error) => {
          console.log(error);
        });
    }
  }
}