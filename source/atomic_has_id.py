from __future__ import annotations
import json

def has_id(value):
    for v in value:
        if "scryfallOracleId" in v["identifiers"]:
            return True
    return False


def check(atomic_file) -> (bool, list[str]):
    with open(atomic_file) as f:
        data = json.load(f)["data"]

    cards_with_no_id = [name for name, value in data.items() if not has_id(value)]
    return (len(cards_with_no_id) == 0, cards_with_no_id)

def main():
    result = check("AtomicCards.json")
    if not result[0]:
        print(f"There is {len(result[1])} card with no id")
        print(result[1])


if __name__ == "__main__":
    main()
