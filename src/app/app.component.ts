import { Component, AfterViewInit, ViewChild, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {

  reactiveForm: FormGroup;
  userName: String = '';
  userNameValidation: String = 'This field is required';
  userInfo: String = '';
  displayForm: any;
  templateUserName: String = '';
  templateUserDescription: String = '';
  @ViewChild(NgForm) templateForm: NgForm;


  constructor(private fb: FormBuilder) {

    this.reactiveForm = this.fb.group({
      // formControluserName: [value, validator]
      userName: [null, Validators.required],
      // for multiple validators use Validators.compose
      userInfo: [null, Validators.compose([Validators.required, Validators.min(10), Validators.max(50)])],
      toggleValidate: '',
    });
  }

  ngOnInit() {
    this.reactiveForm.controls.toggleValidate.valueChanges.subscribe(change => {
      console.log('change: ', change);

      if (change === true) {
        console.log('here');
        // When adding validation to the current validators array you have to include all values (previous and new)
        this.reactiveForm.get('userName').setValidators([Validators.required, Validators.minLength(10)]);
        this.userNameValidation = 'First & Last name required';
        console.log(this.reactiveForm.controls.userName);
      } else {
        this.reactiveForm.get('userName').setValidators([Validators.required]);
      }
      // After changing validators you have to update the form and validity state
      this.reactiveForm.get('userName').updateValueAndValidity();
    });
  }

  ngAfterViewInit() {
    console.log('reactive: ', this.reactiveForm);
    console.log('template: ', this.templateForm);
    console.log('template controls: ', this.templateForm.controls);
  }

  ngOnChanges() {
    console.log('template: ', this.templateForm.controls);
  }

  showChanges() {
    console.log('template: ', this.templateForm.controls);
  }

}


// /^[a-zA-
