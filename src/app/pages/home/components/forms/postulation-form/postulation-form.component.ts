import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsService } from '../../../../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postulation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './postulation-form.component.html',
  styleUrl: './postulation-form.component.css',
})
export class PostulationFormComponent {
  infoForm: FormGroup;
  responseData: any;
  submissionStatus: string = '';
  private formsService = inject(FormsService);

  formId = 94;

  constructor(private fb: FormBuilder) {
    this.infoForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log('Form submitted'); // Asegúrate de que esta línea se ejecute
    if (this.infoForm.valid) {
      const formData = new FormData();
      formData.append('your-name', this.infoForm.get('name')?.value || '');
      formData.append('your-email', this.infoForm.get('email')?.value || '');

      formData.append('_wpcf7_unit_tag', '0c6b143');

      this.formsService.submitForm(this.formId, formData).subscribe(
        (response) => {
          this.responseData = response;
          this.submissionStatus = 'Form submitted successfully!';
          this.infoForm.reset();
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
}
