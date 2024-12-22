export type GetAllGalleriesDto = Readonly<{
  data: GalleriesDto[];
  pagination: PaginationGalleriesDto;
}>;

export type GalleriesDto = Readonly<{
  gid: number;
  name: string;
  slug: string;
  path: string;
  title: string;
  galdesc?: string;
  pageid: number;
  previewpic: number;
  author: number;
  extras_post_id: number;
  random_image: RandomImageDto;
  image_date: Date;
}>;

export type RandomImageDto = Readonly<{
  id: number;
  title: string;
  url: string;
}>;

export type PaginationGalleriesDto = Readonly<{
  total_galleries: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}>;
