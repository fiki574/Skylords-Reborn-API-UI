# Auctions API

Running frontend application: https://auctions.skylords.eu

Running backend application: https://auctions.backend.skylords.eu

Backend application caches new data every 10 minutes.

## GET `/api/auctions/export`

- Exports all auctions to a CSV file
- Caches new entries every 20 minutes

## POST `/api/auctions/count`

- Retrieves total number of auctions per searched terms
- Search terms: card name (`input`), minimum price in BFP (`min`), maximum price in BFP (`max`)
- Example request body:
```json
{
  "input": "",
  "min": 0,
  "max": 1000000
}
```

- Example response:
```json
{
  "count": 1974
}
```

## POST `/api/auctions/:page/:number`

- Retrieves paginated list of auctions per searched terms
- Search terms: card name (`input`), minimum price in BFP (`min`), maximum price in BFP (`max`)
- Parameter `:page` can have value above 1, represents the page that we're loading data for
- Parameter `:number` can have value up to maximum 30, represents total results per each page
- Example request URL: `/api/auctions/1/15`
- Example request body:
```json
{
  "input": "",
  "min": 0,
  "max": 1000000
}
```

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

## GET `/api/auction/:auctionId`

- Retrieves info about a single auction
- Parameter `:auctionId` represents auction identifier, by which we're loading the wanted data
- Example request URL: `/api/auction/2728823`
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

## GET `/api/cards/:cardId`

- Retrieves info about specific card
- Parameter `:cardId` represents card identifier, it's value can be either a number (identifier, to retrieve specific card) or `all` (which retrieves all cards)
- Example request URL: `/api/cards/253`
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
