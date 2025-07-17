import { Component } from '@angular/core';
import { ButtonComponent } from 'src/ui/molecules';
import { ModalComponent } from 'src/ui/organisms';
import { SlotDirective } from 'src/ui/utils';

@Component({
  selector: 'app-sign-up-terms-and-conditions',
  imports: [ModalComponent, ButtonComponent, SlotDirective],
  templateUrl: './sign-up-terms-and-conditions.component.html',
})
export class SignUpTermsAndConditionsComponent {

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
