export type GetGalleryByIdDto = Readonly<{
  gallery: GalleryInfoDto;
  images: ImageGalleryDto[];
  pagination: PaginationGalleryDto;
}>;
export type GalleryInfoDto = Readonly<{
  id: number;
  title: string;
  description: string;
  path: string;
  date: Date;
}>;

export type ImageGalleryDto = Readonly<{
  id: number;
  title: string;
  url: string;
  slug: string;
  description: string;
  altText: string;
  imageDate: Date;
}>;

export type PaginationGalleryDto = Readonly<{
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}>;
