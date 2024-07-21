import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-links-staff',
  templateUrl: './links-staff.component.html',
  styleUrls: ['./links-staff.component.scss'],
  imports: [RouterLink],
})
export class LinksStaffComponent {
  // input component
  @Input() name!: string;
}
