import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-image-modal',
    imports: [CommonModule],
    templateUrl: './image-modal.component.html',
    styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  @Input() imageUrl!: string;
  @Input() imageTitle!: string;

  constructor(public activeModal: NgbActiveModal) {}

  closeModal(): void {
    this.activeModal.dismiss(); // Cierra el modal
  }
}
