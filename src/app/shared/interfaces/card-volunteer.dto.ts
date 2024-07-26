export interface CardInterfaceDto {
  id: string;
  name: string;
  title: string;
  contacts: ContactsDto[];
}

export interface ContactsDto {
  id: string;
  iconClass: string;
  text: string;
}
