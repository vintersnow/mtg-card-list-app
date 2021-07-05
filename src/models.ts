interface CardDetail {
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
}

interface CardSimple {
  id: number;
  nameEnglish: string;
}

export { CardSimple, CardDetail };
