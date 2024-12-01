export type GetAllPostsDto = Readonly<{
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  category?: string;
  imageUrl: string;
}>;
