# Auctions API

Running frontend application: https://auctions.skylords.eu

Running backend application: https://auctions.backend.skylords.eu

Backend application caches new data every 10 minutes.

## General responses

- Response when the backend is unable to process a request:
```json
{
  "state": "invalid"
}
```

## GET `/api/auctions/next-load`

- Retrieves number of milliseconds until next refresh of cached data
- Query parameter `type` is required, can have following values: `backend` or `csv`
- Example request URL to fetch the remaining time until backend caches new data: `/api/auctions/next-load?type=backend`
- Example request URL to fetch the remaining time until backend creates new CSV cache: `/api/auctions/next-load?type=csv`
- Example response:
```json
{
  "in": 593197
}
```

## GET `/api/auctions/export`

- Exports all auctions to a CSV file
- Caches new entries every 20 minutes

## GET `/api/auctions/count`

- Retrieves total number of auctions per searched terms
- Query parameter `cardName` represents card's name and is optional
- Query parameter `minBfpPrice` represents minimum price range in BFP for a card and is optional
- Query parameter `maxBfpPrice` represents maximum price range in BFP for a card and is optional
- Example request URL: `/api/auctions/count?cardName=Northguards&minBfpPrice=10&maxBfpPrice=1000`
- Example response:
```json
{
  "count": 197
}
```

## GET `/api/auctions`

- Retrieves paginated list of auctions per searched terms
- Query parameter `cardName` represents card's name and is optional
- Query parameter `minBfpPrice` represents minimum price range in BFP for a card and is optional
- Query parameter `maxBfpPrice` represents maximum price range in BFP for a card and is optional
- Query parameter `page` can have value above 1 and is required, represents the page that we're loading data for
- Query parameter `number` can have value up to maximum 30 and is required, represents total results per each page
- Example request URL: `/api/auctions?cardName=Grinder&minBfpPrice=15000&maxBfpPrice=25000&page=1&number=15`
- Example response:
```json
[
  {
    "auctionId": 2728823,
    "cardName": "Grinder",
    "cardId": 1607,
    "currentPrice": 21999,
    "startingPrice": 21999,
    "buyoutPrice": 22000,
    "endingOn": "<48h"
  }
]
```

## GET `/api/auction`

- Retrieves info about a single auction
- Query parameter `id` represents auction identifier and is required
- Example request URL: `/api/auction?id=2728823`
- Example response:
```json
{
  "auctionId": 2728823,
  "cardName": "Grinder",
  "cardId": 1607,
  "currentPrice": 21999,
  "startingPrice": 21999,
  "buyoutPrice": 22000,
  "endingOn": "<48h"
}
```

## GET `/api/cards`

- Retrieves info about specific card
- Query parameter `id` represents card identifier and is required, it's value can be either a number (identifier, to retrieve a specific card) or `all` (which retrieves all cards)
- Example request URL: `/api/cards?id=253`
- Example request URL for all cards: `/api/cards?id=all`
- Example response:
```json
{
  "cardId": 253,
  "cardName": "Northguards",
  "rarity": "Common",
  "expansion": "Twilight",
  "promo": "No",
  "obtainable": "In packs",
  "fireOrbs": 0,
  "frostOrbs": 1,
  "natureOrbs": 0,
  "shadowOrbs": 0,
  "neutralOrbs": 0,
  "cardType": "Frost",
  "affinity": "None"
}
```
