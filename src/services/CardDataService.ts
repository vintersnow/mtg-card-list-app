import { CardDetail } from "@/models";

async function getCachedData(
  cacheName: string,
  url: string
): Promise<CardDetail[]> {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    throw new Error("No Cache");
  }

  return (await cachedResponse.json()).map(formatCard);
}

async function deleteOldCaches(currentCache: string) {
  const keys = await caches.keys();

  for (const key of keys) {
    const isOurCache = "cardlist-" === key.substr(0, 9);

    if (currentCache === key || !isOurCache) {
      continue;
    }

    caches.delete(key);
  }
}

function formatCard(card: CardDetail): CardDetail {
  card.manaCost = card.manaCost.replaceAll(/{|}/g, "");
  return card;
}

export default class CardListService {
  async getCardList(): Promise<CardDetail[]> {
    const version = process.env.VUE_APP_CARD_LIST_VERSION;
    console.log(version);
    const cacheName = `cardlist-${version}`;
    const url = `data/${version}.json`;

    try {
      const cachedData = await getCachedData(cacheName, url);
      console.log("Cache Exists");
      console.log("cached", cachedData);
      return cachedData;
    } catch (err) {
      // no cache
    }
    console.log("No Cache");
    const cacheStorage = await caches.open(cacheName);
    await cacheStorage.add(url);
    const cachedData = getCachedData(cacheName, url);
    await deleteOldCaches(cacheName);

    console.log(cachedData);
    return cachedData;
  }
}
