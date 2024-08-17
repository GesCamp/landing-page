export type GetGalleryBySlugDto = Readonly<{
  id: number;
  title: string;
  content: string;
  link: string;
  images: ImageGalleryDto[];
  publication_date: Date;
  total_images: number; // Total de imágenes en la galería
  per_page: number; // Número de imágenes por página
  current_page: number; // Página actual
  total_pages: number;
}>;

export type ImageGalleryDto = Readonly<{
  id: number;
  url: string;
  alt: string;
  title: string;
}>;
