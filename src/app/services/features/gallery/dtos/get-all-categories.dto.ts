export type GetAllGalleriesDto = Readonly<{
  galleries: GalleriesDto[];
  total_galleries: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}>;

export type GalleriesDto = Readonly<{
  id: number;
  title: string;
  content: string;
  link: string;
  random_image: RandomImageDto;
  publication_date: Date;
  slug: string;
}>;

export type RandomImageDto = Readonly<{
  id: number;
  url: string;
  alt: string;
}>;
