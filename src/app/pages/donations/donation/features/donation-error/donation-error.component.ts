import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-donation-error',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './donation-error.component.html',
  styleUrl: './donation-error.component.css',
})
export class DonationErrorComponent {}
