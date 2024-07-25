import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanieService } from '../../../../services/companies';
import {
  GetMediaResourceDto,
  GetMediaResourceService,
} from '../../../../services/resources';
import { CardInterfaceDto } from '../../../../shared/interfaces/card-volunteer.dto';
import { DirectoryDto } from '../../../../shared/interfaces/directory.dto';
import { ApiTag } from '../../../../services/environments/api-tag/api-tag.enum';
import { LinksStaffComponent } from '../../../../shared/components/links-staff/links-staff.component';
import { LinksHomeComponent } from '../../../../shared/components/links-home/links-home.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css'],
  imports: [LinksStaffComponent, LinksHomeComponent, CommonModule],
})
export class VolunteersComponent implements OnInit {
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  nombre!: string;
  name!: string;
  featuredMedia: GetMediaResourceDto | null = null;
  directory: any = {};
  businessCards: CardInterfaceDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private directoryService: CompanieService,
    private readonly getMediaResource: GetMediaResourceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.name = params['nombre-company'];
      this.loadDirectoryData();
    });
  }

  loadDirectoryData(): void {
    this.directoryService
      .getCompanyDetails(`${ApiTag.VOLUNTEERS}-${this.name}`)
      .subscribe(
        (data: DirectoryDto[]) => {
          if (data.length > 0) {
            this.directory = data[0];
            if (this.directory.content && this.directory.content.rendered) {
              this.extractBusinessCards(this.directory.content.rendered);
            } else {
              console.warn(
                'La propiedad "rendered" no está disponible en los datos de la compañía.'
              );
            }
            if (
              this.directory._links &&
              this.directory._links['wp:featuredmedia']
            ) {
              const featuredMediaUrl =
                this.directory._links['wp:featuredmedia'][0].href;
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
    this.getMediaResource
      .getMediaResource(mediaUrl)
      .subscribe((media: GetMediaResourceDto) => {
        this.featuredMedia = media;
      });
  }

  extractBusinessCards(content: string): void {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const businessCardElements = doc.querySelectorAll(
      '.wp-block-business-card'
    );

    this.businessCards = Array.from(businessCardElements).map(
      (element, index) => {
        const attributes = element.getAttribute('data-attributes');
        let cardData: any = {};
        if (attributes) {
          try {
            cardData = JSON.parse(attributes);
          } catch (error) {
            console.error(
              'Error al parsear los atributos de la tarjeta de negocio:',
              error
            );
          }
        }
        const name = cardData.name || '';
        const title = cardData.title || '';
        const contacts = cardData.contacts.map((contact: any, indexs: any) => ({
          id: `contact-${indexs}`,
          iconClass: contact.icon?.class || '',
          text: contact.text || '',
        }));

        return { id: `card-${index}`, name, title, contacts }; // Usa índice como parte del ID
      }
    );
  }
}
