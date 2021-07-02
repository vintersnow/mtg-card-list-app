import json
from dataclasses import dataclass, is_dataclass, asdict
from typing import List, Dict
from collections import defaultdict
import sys


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


@dataclass
class FormattedCard:
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

    @classmethod
    def create(cls, card: AtomicCard):
        japanese_name = ""
        japanese_text = ""
        for foreign_data in card.foreign_data:
            if foreign_data["language"] == "Japanese":
                japanese_name = foreign_data["name"] if "name" in foreign_data else ""
                japanese_text = foreign_data["text"] if "text" in foreign_data else ""

        return cls(
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
        )


def main():
    cards = []
    with open("AtomicCards.json") as f:
        data = json.load(f)
        for name, value in data["data"].items():
            for c in value:
                d = defaultdict(str, **c)
                card = AtomicCard.create(d)
                cards.append(card)

    formated_cards = [FormattedCard.create(c) for c in cards]
    print(formated_cards[0], file=sys.stderr)

    print(json.dumps(formated_cards, default=custom_default))


if __name__ == "__main__":
    main()
