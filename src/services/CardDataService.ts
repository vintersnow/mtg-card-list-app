import axios from "axios";
import { CardDetail } from "@/models";

export default class CardListService {
  async getCardList(): Promise<CardDetail[]> {
    return (await axios.get("data/card_list.json")).data;
  }
}
