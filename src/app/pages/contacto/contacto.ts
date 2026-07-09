import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class Contacto {
  contactoForm: FormGroup;
  enviado = false;
  enviando = false;

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactoForm.invalid) return;

    this.enviando = true;

    try {
      // Configura con tus credenciales de EmailJS
      await emailjs.send(
        'service_3q9bf2o',      // Reemplaza con tu Service ID
        'template_aoojowo',     // Reemplaza con tu Template ID
        {
          from_name: this.contactoForm.value.nombre,
          from_email: this.contactoForm.value.email,
          subject: this.contactoForm.value.asunto,
          message: this.contactoForm.value.mensaje
        },
        'YCQ64s6zxx8vf8MQd'       // Reemplaza con Public Key
      );

      this.enviado = true;
      this.contactoForm.reset();
      
      setTimeout(() => {
        this.enviado = false;
        this.enviando = false;
      }, 3000);
      
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
      this.enviando = false;
    }
  }

  get f() { return this.contactoForm.controls; }
}