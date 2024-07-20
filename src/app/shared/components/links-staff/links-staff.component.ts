import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-links-staff',
  templateUrl: './links-staff.component.html',
  styleUrls: ['./links-staff.component.scss']
})
export class LinksStaffComponent {
  // input component
  @Input() name!: string;
}
