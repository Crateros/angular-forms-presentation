import { Component, AfterViewInit, ViewChild, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {

  // Template form
  templateDisabled: String = '';
  templateUserName: String = '';
  templateUserInfo: String = '';
  templateFormControls: any;
  @ViewChild(NgForm) templateForm: NgForm;

  // Reactive form
  reactiveForm: FormGroup;
  reactiveFormControls: any;
  userNameValidationWarning: String = 'This field is required';
  userInfoValidationWarning: String = 'This field must be at least 10 characters long';

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      // Disabled state is improperly set in the template (console throws warning)
      improperDisabled: [null],
      // Disabled is properly set on the FormControl
      properDisabled: [ { value: null, disabled: true } ],
      userName: [null, Validators.required],
      // for multiple validators use Validators.compose
      userInfo: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      toggleNameValidation: [false],
      toggleInfoValidation: [false]
    });
  }

  ngOnInit() {
    this.templateFormControls = Object.keys(this.templateForm.controls);
    this.reactiveFormControls = Object.keys(this.reactiveForm.controls);

    this.reactiveForm.get('toggleNameValidation').valueChanges.subscribe(change => {
        this.toggleNameValidation();
    });

    this.reactiveForm.get('toggleInfoValidation').valueChanges.subscribe(change => {
      this.toggleInfoValidation();
    });
  }

  ngAfterViewInit() {
    console.log('TEMPLATE form controls AfterViewInit: ', this.templateForm.controls);
    console.log('REACTIVE form controls AfterViewInit: ', this.reactiveForm.controls);
  }

  ngOnChanges() {}

  toggleNameValidation() {
    if (this.reactiveForm.get('toggleNameValidation').value === true) {
      // When adding validation to the current validators array you have to include all values (previous and new)
      this.reactiveForm.get('userName').setValidators([Validators.required, Validators.minLength(10)]);
    } else {
      this.reactiveForm.get('userName').setValidators([Validators.required]);
      // Reset validation warning to original value to match state of validators
      this.userNameValidationWarning = 'This field is required';
    }
  }

  toggleInfoValidation() {
    if (this.reactiveForm.get('toggleInfoValidation').value === true) {
      this.reactiveForm.get('userName').setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(50)]);
      this.userInfoValidationWarning = 'This field must be between 10 and 50 characters long';
    } else {
      this.reactiveForm.get('userName').setValidators([Validators.required, Validators.minLength(10)]);
      this.userInfoValidationWarning = 'This field must be at least 10 characters long';
    }
    this.reactiveForm.get('userInfo').updateValueAndValidity();
  }

  UpdateTemplateForm() {
    this.templateFormControls = Object.keys(this.templateForm.controls);
  }

  // Demonstrate the necessity for updateValueAndValidity
  updateReactiveFormUserName() {
    this.reactiveForm.get('userName').updateValueAndValidity();
    // Update validation warning to match updated state of validators
    this.userNameValidationWarning = 'First and last name required';
  }

}


// /^[a-zA-
