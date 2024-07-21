import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectoryComponent } from './pages/companies/company/directory/directory.component';
import { CompaniesComponent } from './pages/companies/companies/companies.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    ShellComponent,
    NgbModule,
    DirectoryComponent,
    CompaniesComponent,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuOption: string = '';

  onOption(menuOption: string) {
    this.menuOption = menuOption;
  }
}
