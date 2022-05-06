import json
from collections import defaultdict

atomic_file = "AtomicCards.json"
identifiers_file = 'AllIdentifiers.json'
printings_file = "AllPrintings.json"

def show(name: str):
    with open(atomic_file) as f:
        data = json.load(f)["data"]
    with open(identifiers_file) as f:
        ids = json.load(f)["data"]
    card = data[name]
    printings = get_printings()
    result = {
            "atomic": card,
            "identifiers": get_identifiers(card, ids),
            "printings": printings[name],
            }
    print(json.dumps(result))


def get_identifiers(cards, identifiers):
    result = list()
    for card in cards:
        for identifier in [identifier for identifier in identifiers.values() if identifier["name"] == card["name"]]:
            if match_identifier(card, identifier):
                result.append(identifier)
    return result

def get_printings():
    printings = defaultdict(list, [])
    with open(printings_file) as f:
        data = json.load(f)["data"]
    for card_set in data.values():
        for card in card_set["cards"]:
            printings[card["name"]].append(card)
    return printings

def match_identifier(card, identifier):
    card_ids = card["identifiers"]
    identifier_ids = identifier["identifiers"]
    keys = set(card_ids.keys()) & set(identifier_ids.keys())
    for key in keys:
        if key in card_ids and key in identifier_ids and card_ids[key] == identifier_ids[key]:
            return True
    return False

if __name__ == "__main__":
    card_name = "Life of Toshiro Umezawa // Memory of Toshiro"
    card_name = "Boseiju, Who Endures"
    card_name = "Courier's Briefcase"
    show(card_name)
