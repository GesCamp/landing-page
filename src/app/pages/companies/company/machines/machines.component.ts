import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewMachines } from '@app/shared/interfaces/viewMachines';
import { WordpressService } from '@app/shared/services/wordpress.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent {
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
    this.wordpressService.getPage('machines-' + this.name ).subscribe(company => {
      console.log('company:', company);
      this.company = company[0];
    });
  }
  viewMachines: ViewMachines = {
    name: 'B-1',
    description: 'Superinendente Abelardo Ortega Manriquez',
    patent: 'zz zz 25'
  }
}
