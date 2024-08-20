import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FloatInputComponent } from '../../../../../shared/components/float-input/float-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsService } from '../../../../../services';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FloatInputComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  contactForm!: FormGroup;
  responseData: any;
  submissionStatus: string = '';
  private formsService = inject(FormsService);

  // form id
  formId = 123;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombres: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      celular: [
        '+56', // Inicializa el input con +56
        [Validators.required, Validators.pattern(/^\+56\d{9}$/)], // Valida que el input contenga +56 seguido de 9 dígitos
      ],
      mensaje: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = new FormData();
      formData.append(
        'your-name',
        this.contactForm.get('nombres')?.value || ''
      );
      formData.append('your-email', this.contactForm.get('email')?.value || '');

      formData.append(
        'your-subject',
        this.contactForm.get('asunto')?.value || ''
      );

      formData.append(
        'your-cellphone',
        this.contactForm.get('celular')?.value || ''
      );

      formData.append(
        'your-message',
        this.contactForm.get('mensaje')?.value || ''
      );

      formData.append('_wpcf7_unit_tag', '0c6b143');

      this.formsService.submitForm(this.formId, formData).subscribe(
        (response) => {
          this.responseData = response;
          this.submissionStatus = 'Form submitted successfully!';
          this.contactForm.reset();
          this.contactForm.get('celular')?.setValue('+56'); // Reiniciar con el prefijo
        },
        (error) => {
          console.error('Error submitting form', error);
          this.submissionStatus = 'There was an error submitting the form.';
        }
      );
    } else {
      console.warn('Form is invalid');
    }
  }

  // Asegura que el prefijo +56 no se elimine
  enforcePrefix() {
    const celularControl = this.contactForm.get('celular');
    celularControl?.valueChanges.subscribe((value) => {
      // Si el usuario selecciona todo y escribe, se mantiene el prefijo
      if (!value.startsWith('+56')) {
        celularControl.setValue('+56' + value.replace(/^\+56/, ''), {
          emitEvent: false,
        });
      }
    });
  }

  preventPrefixDeletion(event: KeyboardEvent) {
    const control = this.contactForm.get('celular');
    const cursorPosition = (event.target as HTMLInputElement).selectionStart;
    if (cursorPosition !== null && cursorPosition <= 3) {
      // Si el cursor está en la posición del prefijo, no permitir eliminarlo
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
      }
    }
  }
}
