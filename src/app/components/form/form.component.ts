import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent{

  //Default
  genderIgnore = "Other";
  //Pattern
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passPattern = "^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$" 
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      // ^[0-9]+$          - Assert only number
  
  //FormControl Center
  constructor(private fb: FormBuilder) { }

  profile = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
    email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
    password: this.fb.group({
      contra: ['',[Validators.required, Validators.pattern(this.passPattern)]],
      confirmacion: ['',Validators.required]
    }, {validator: this.matchingPasswords('contra', 'confirmacion')}),
    gender: [this.genderIgnore],
    calendar: ['', Validators.required]
  })

  //Confirmacion de Password
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  isSubmitted = false;
  submitForm(){
    this.isSubmitted = true;
    if (!this.profile.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.profile.value)
    }
  }


  public errorMessages = {
    nombre: [
      { type: 'required', message: 'Name es requerido' },
      { type: 'maxlength', message: 'Tiene un maximo de 15 caracteres'},
      { type: 'minlength', message: 'Tiene un minimo de 2 caracteres'}
    ],
    apellido: [
      { type: 'required', message: 'Apellido es requerido' },
      { type: 'maxlength', message: 'Tiene un maximo de 15 caracteres'},
      { type: 'minlength', message: 'Tiene un minimo de 2 caracteres'}
    ],
    email: [
      { type: 'required', message: 'Mail es requerido' },
      { type: 'pattern', message: 'Mail no valido'},
    ],
    calendar: [
      { type: 'required', message: 'Fecha de Nacimiento es requerida' },
    ],
    contra: [
      { type: 'required', message: 'Contraseña es requerida' },
      { type: 'pattern', message: 'Contraseña requiere un cierto patron'},
    ],
    confirmacion: [
      { type: 'required', message: 'Confirmación es requerida' },
    ],

  }

  get nombre(){
    return this.profile.get('nombre');
  }

  get apellido(){
    return this.profile.get('apellido');
  }

  get email(){
    return this.profile.get('email');
  }

  get calendar(){
    return this.profile.get('calendar');
  }

  get contra(){
    return this.profile.get('password.contra');
  }

  get confirmacion(){
    return this.profile.get('password.confirmacion');
  }
}
