export interface CardDetail {
  id: string;
  cardType: string;
  nameEnglish: string;
  nameJapanese: string;
  manaCost: string;
  power: string;
  toughness: string;
  price: number;
  textEnglish: string;
  textJapanese: string;
  type: string;
  types: string[];
  image_urls: string[];
}

export interface CardSimple {
  id: number;
  nameEnglish: string;
}

export interface CardFilterObject {
  cardName: string;
  text: string;
}
