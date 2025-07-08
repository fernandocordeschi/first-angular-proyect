// import { Component } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-vucumpra-register',
  standalone: false,
  templateUrl: './vucumpra-register.component.html',
  styleUrl: './vucumpra-register.component.scss'
})
export class VucumpraRegisterComponent {

  @Output() formSubmitted = new EventEmitter();

  // creamos el form group
  formRegister = new FormGroup({
  username: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  confirmPassword: new FormControl('', []),
  terms: new FormControl(true, [Validators.requiredTrue]) 
}, [this.isMismatch]);



  
  private isMismatch(control: AbstractControl): ValidationErrors | null {
    // si no coinciden, devuelvo el objeto ValidationErrors
    if (control.get('password')?.value !== control.get('confirmPassword')?.value) {
      return  { passwordMismatch: true };
    }

    return null
  };

  setDefaultValues() {
    this.formRegister.setValue({
      username: 'demoUser',
      email: 'demo@email.com',
      password: '123456',
      confirmPassword: '123456',
      terms: true,
    });
  }

  onSubmit() {
  if (this.formRegister.valid) {
    alert('Registro exitoso:\n' + JSON.stringify(this.formRegister.value, null, 2));
    this.formSubmitted.emit(this.formRegister.value);
  } else {
    alert('El formulario contiene errores. Revisá los campos marcados.');
    this.formRegister.markAllAsTouched(); // Esto forza que se muestren los errores visuales
  }
}


}
