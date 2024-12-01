export type GetPrincipalCarouselInputDto = Readonly<{
  content: RenderedPrincipalBanner;
}>;

export type RenderedPrincipalBanner = Readonly<{
  rendered: string;
}>;

export interface ImageDetailsDto {
  id: number;
  src: string;
  alt?: string;
  link?: string | null;
}
