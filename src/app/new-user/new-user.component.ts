import { Component } from '@angular/core';
import { DummyApiService } from '../dummy-api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  user = {
    title: null,
    firstName: null,
    lastName: null,
    gender: null,
    email: null,
    dateOfBirth: null,
    registerDate: '',
    phone: null,
    picture: null,
    location: {
      street: null,
      city: null,
      state: null,
      country: null,
      timezone: null,
    }
  }
  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    picture: [''],
    gender: ['', Validators.required],
    title: ['', Validators.required],
    email: ['', Validators.required],
    phone: [''],
    street: [''],
    city: [''],
    state: [''],
    country: [''],
  });

  constructor(
    private dummyApiService: DummyApiService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.controls['firstName'].valueChanges.subscribe(newValue => { this.user.firstName = newValue; });
    this.form.controls['lastName'].valueChanges.subscribe(newValue => { this.user.lastName = newValue; });
    this.form.controls['picture'].valueChanges.subscribe(newValue => { this.user.picture = newValue; });
    this.form.controls['gender'].valueChanges.subscribe(newValue => { this.user.gender = newValue; });
    this.form.controls['title'].valueChanges.subscribe(newValue => { this.user.title = newValue; });
    this.form.controls['email'].valueChanges.subscribe(newValue => { this.user.email = newValue; });
    this.form.controls['phone'].valueChanges.subscribe(newValue => { this.user.phone = newValue; });
    this.form.controls['street'].valueChanges.subscribe(newValue => { this.user.location.street = newValue; });
    this.form.controls['city'].valueChanges.subscribe(newValue => { this.user.location.city = newValue; });
    this.form.controls['state'].valueChanges.subscribe(newValue => { this.user.location.state = newValue; });
    this.form.controls['country'].valueChanges.subscribe(newValue => { this.user.location.country = newValue; });
  }


  create() {
    this.user.registerDate = new Date().toISOString();

    console.log("🚀 ~ file: new-user.component.ts:69 ~ NewUserComponent ~ create ~ this.user:", this.user)
    if (this.form.valid) {
      this.dummyApiService.createUser(this.user).subscribe(
        (response) => {
          alert("Usuário criado!")
          this.router.navigate(['../users']);
        },
        (error) => {
          console.error(error)
        })
    }

  }

}
