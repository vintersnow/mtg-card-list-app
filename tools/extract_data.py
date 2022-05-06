import json
from dataclasses import dataclass, is_dataclass, asdict
from typing import List, Dict
from collections import defaultdict
import sys
import argparse
import uuid

def custom_default(o):
    if is_dataclass(o):
        return asdict(o)
    raise TypeError(f"{o!r} is not JSON serializable")

@dataclass
class AtomicCard:
    converted_mana_cost: str
    foreign_data: List[Dict]
    identifiers: Dict
    mana_cost: str
    name: str
    subtypes: List[str]
    supertypes: List[str]
    power: str
    toughness: str
    text: str
    type: str
    types: List[str]

    @classmethod
    def create(cls, json_data):
        return cls(
            converted_mana_cost=json_data["convertedManaCost"],
            foreign_data=json_data["foreignData"],
            identifiers=json_data["identifiers"],
            mana_cost=json_data["manaCost"],
            name=json_data["name"],
            subtypes=json_data["subtypes"],
            supertypes=json_data["supertypes"],
            text=json_data["text"],
            type=json_data["type"],
            types=json_data["types"],
            power=json_data["power"],
            toughness=json_data["toughness"],
        )

class ImageRepository:
    def unique_id(self, key, value):
        return f"{key}_{value}"

    def __init__(self, identifier_data: dict):
        self.map = {}
        for value in identifier_data.values():
            if "scryfallId" not in value["identifiers"]:
                continue
            scryfall_id = value["identifiers"]["scryfallId"]
            for key, card_id in value["identifiers"].items():
                self.map[self.unique_id(key, card_id)] = scryfall_id

    def get_urls(self, card: AtomicCard) -> List[str]:
        ret = []
        for key, card_id in card.identifiers.items():
            if self.unique_id(key, card_id) in self.map:
                scryfall_id = self.map[self.unique_id(key, card_id)]
                ret.append(self.create_url(scryfall_id))
        if len(ret) == 0:
            print(f"no id for {card.name}", file=sys.stderr)
        return list(set(ret))

    def create_url(self, scryfall_id: str):
        first_char = scryfall_id[0]
        second_char = scryfall_id[1]
        format = "border_crop"
        return f"https://c1.scryfall.com/file/scryfall-cards/{format}/front/{first_char}/{second_char}/{scryfall_id}.jpg"



@dataclass
class FormattedCard:
    id: str
    convertedManaCost: str
    nameEnglish: str
    nameJapanese: str
    textEnglish: str
    textJapanese: str
    manaCost: str
    power: str
    toughness: str
    type: str
    types: List[str]
    image_urls: List[str]

    @classmethod
    def create(cls, card: AtomicCard, image_repository: ImageRepository):
        japanese_name = ""
        japanese_text = ""
        for foreign_data in card.foreign_data:
            if foreign_data["language"] == "Japanese":
                japanese_name = foreign_data["name"] if "name" in foreign_data else ""
                japanese_text = foreign_data["text"] if "text" in foreign_data else ""
        unique_id = str(uuid.uuid4())

        return cls(
            id=unique_id,
            convertedManaCost=card.converted_mana_cost,
            nameEnglish=card.name.strip('"'),
            nameJapanese=japanese_name.strip('"'),
            textEnglish=card.text.strip('"'),
            textJapanese=japanese_text.strip('"'),
            manaCost=card.mana_cost,
            power=card.power,
            toughness=card.toughness,
            type=card.type,
            types=card.types,
            image_urls=image_repository.get_urls(card),
        )


def main():
    cards = []
    parser = argparse.ArgumentParser()
    parser.add_argument('atomic_path', type=str)
    parser.add_argument('identifiers_path', type=str)
    args = parser.parse_args()
    with open(args.atomic_path) as f:
        data = json.load(f)
        for name, value in data["data"].items():
            for c in value:
                d = defaultdict(str, **c)
                card = AtomicCard.create(d)
                cards.append(card)
    with open(args.identifiers_path) as f:
        data = json.load(f)
        image_repository = ImageRepository(data["data"])

    formated_cards = [FormattedCard.create(c, image_repository) for c in cards]

    print(json.dumps(formated_cards, default=custom_default))


if __name__ == "__main__":
    main()
