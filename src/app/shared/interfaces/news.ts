export interface News {
    title: string;
    date: string;
    author: string;
    image: string;
    introduction: string;
    subtitle: string;
    content: string[];
    relatedLinks?: { title: string, url: string }[];
  }
  