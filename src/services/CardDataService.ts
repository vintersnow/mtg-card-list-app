import axios from "axios";
import { CardDetail } from "@/models";

const fileName = "20210701.json";

export default class CardListService {
  async getCardList(): Promise<CardDetail[]> {
    return (await axios.get(`data/${fileName}`)).data;
  }
}
