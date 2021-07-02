interface CardDetail {
  id: number;
  cardType: string;
  nameEnglish: string;
  nameJapanese: string;
  cost: string;
  power: string;
  toughness: string;
  price: number;
  text: string;
}

interface CardSimple {
  id: number;
  name: string;
}

export { CardSimple, CardDetail };
