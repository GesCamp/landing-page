import { Component, OnInit } from '@angular/core';
import { CompanieService, CompaniesDto } from '../../../../services/companies';
import { LinksStaffComponent } from '../../../../shared/components/links-staff/links-staff.component';
import { LinksHomeComponent } from '../../../../shared/components/links-home/links-home.component';
import {
  GetMediaResourceDto,
  GetMediaResourceService,
} from '../../../../services/resources';

@Component({
  standalone: true,
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  imports: [LinksStaffComponent, LinksHomeComponent],
})
export class DirectoryComponent implements OnInit {
  company: CompaniesDto | null = null;
  featuredMedia: GetMediaResourceDto | null = null;

  constructor(
    private directoryService: CompanieService,
    private readonly getMediaResource: GetMediaResourceService
  ) {}

  ngOnInit(): void {
    this.loadCompanyData();
  }

  loadCompanyData(): void {
    this.directoryService.getCompanyDetails('directorio-general').subscribe(
      (data: CompaniesDto[]) => {
        if (data.length > 0) {
          this.company = data[0]; // Asume que obtienes un array y toma el primer elemento

          if (this.company._links && this.company._links['wp:featuredmedia']) {
            const featuredMediaUrl =
              this.company._links['wp:featuredmedia'][0].href;
            this.loadFeaturedImage(featuredMediaUrl);
          }
        }
      },
      (error) => {
        console.error('Error al cargar los datos de la compañía:', error);
      }
    );
  }

  loadFeaturedImage(mediaUrl: string): void {
    this.getMediaResource.getMediaResource(mediaUrl).subscribe(
      (media: GetMediaResourceDto) => {
        this.featuredMedia = media;
      },
      (error) => {
        console.error('Error al cargar la imagen destacada:', error);
      }
    );
  }
}
