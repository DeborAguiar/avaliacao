import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DummyApiService } from '../dummy-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: any
  editable: boolean = false
  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    picture: [''],
    gender: [''],
    title: [''],
    email: [''],
    phone: [''],
    street: [''],
    city: [''],
    state: [''],
    country: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private dummyApiService: DummyApiService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((par: any) => {
      this.userDetails(par.id);
      this.disableForm()
    });
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

  userDetails(id: string): void {
    this.dummyApiService.getUserDetails(id).subscribe(
      (response) => {
        this.user = response;
        this.form.controls['firstName'].patchValue(this.user.firstName);
        this.form.controls['lastName'].patchValue(this.user.lastName);
        this.form.controls['picture'].patchValue(this.user.picture);
        this.form.controls['gender'].patchValue(this.user.gender);
        this.form.controls['title'].patchValue(this.user.title);
        this.form.controls['email'].patchValue(this.user.email);
        this.form.controls['phone'].patchValue(this.user.phone);
        this.form.controls['street'].patchValue(this.user.location.street);
        this.form.controls['city'].patchValue(this.user.location.city);
        this.form.controls['state'].patchValue(this.user.location.state);
        this.form.controls['country'].patchValue(this.user.location.country);
      },
      (error) => {
        alert(error)
      }
    );
  }

  saveChanges() {
    if (this.form.valid) {
      this.user.updatedDate = new Date().toISOString();
      this.dummyApiService.updateUser(this.user.id, this.user).subscribe(
        (response) => { },
        (error) => {
          alert(error);
        }
      );
    }
  }

  disableForm() {
    if (this.form.disabled) {
      this.form.enable();
      this.form.get('email')?.disable()
    } else
      this.form.disable();
  }
}
