import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  reactiveForm: FormGroup;
  name: String = '';
  description: String = '';
  submit: any;


  constructor(private fb: FormBuilder) {

    this.reactiveForm = this.fb.group({
      // formControlName: [value, validator]
      name: [null, Validators.required],
      description: [null, Validators.compose([Validators.required, Validators.max(50)])],
      validate: '',
    });

  }

  // Get our form info on submission
  handleFormSubmit(submit) {
    this.description = submit.description;
    this.name = submit.name;
  }

}











// Validators
// min(min: number)
// max(max: number)
// required(control: AbstractControl)
// requiredTrue(control: AbstractControl)
// email(control: AbstractControl)
// minLength(minLength: number)
// maxLength(maxLength: number)
// pattern(pattern: string | RegExp)
// nullValidator(c: AbstractControl)
// compose(validators: | null | undefined)
// composeAsync(validators: (Asy | null)[])