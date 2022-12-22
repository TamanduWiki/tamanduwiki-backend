export interface ICreatePageRequestDTO {
  title: string;
  content: string;
  slug: string;
  imageBase64: string;
  imageFileType: string;
  categoriesTitles?: string[];
}
