import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewVolunteers } from '@app/shared/interfaces/viewVolunteers';
import { WordpressService } from '@app/shared/services/wordpress.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {
  items = [0,1,2,3,4,5,6,7,8,9,10,11];
  nombre!: string;
  name!: string;
  constructor(private route: ActivatedRoute, private wordpressService: WordpressService) {
    this.route.params.subscribe((params) => {
      this.name = params['nombre-company'];
      // Haga algo con el slug, como cargar la noticia correspondiente
    });
  }

  company: any = {};
  ngOnInit() {
    console.log('nombre company:', this.name);
    this.wordpressService.getPage('volunteers-' + this.name ).subscribe(company => {
      console.log('company:', company);
      this.company = company[0];
    });
  }
  viewVolunteers: ViewVolunteers = {
    name: 'Omar Olate Salas',
    description: '1ra Compañía',
    range: 'Voluntario'
  }
}
