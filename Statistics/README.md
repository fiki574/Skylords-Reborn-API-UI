# Statistics API

Running frontend application: https://stats.skylords.eu

Running backend application: https://stats.backend.skylords.eu

Backend application caches new data every minute.

To retrieve statistics from the test server rather than the production one, append `/test` at the end of every URL.

## GET `/api/accounts`

- Retrieves number of registered, in-game accounts
- Example response:
```json
{
  "count": 58442
}
```

## GET `/api/sessions`

- Retrieves number of currently online players
- Example response:
```json
{
  "count": 64
}
```

## GET `/api/matches`

- Retrieves number of currently running matches
- Example response:
```json
{
  "count": 18
}
```

## GET `/api/matches/1v1`

- Retrieves number of won 1v1 matches
- Example response:
```json
{
  "count": 52135
}
```

## GET `/api/matches/2v2`

- Retrieves number of won 2v2 matches
- Example response:
```json
{
  "count": 933
}
```

## GET `/api/matches/1pve`

- Retrieves number of won 1-player PvE matches
- Example response:
```json
{
  "count": 33533
}
```

## GET `/api/matches/2pve`

- Retrieves number of won 2-player PvE matches
- Example response:
```json
{
  "count": 16027
}
```

## GET `/api/matches/4pve`

- Retrieves number of won 4-player PvE matches
- Example response:
```json
{
  "count": 13084
}
```

## GET `/api/matches/12pve`

- Retrieves number of won 12-player PvE matches
- Example response:
```json
{
  "count": 848
}
```

## GET `/api/quests/active`

- Retrieves number of active quests
- Example response:
```json
{
  "count": 144792
}
```

## GET `/api/auctions`

- Retrieves number of live auctions
- Example response:
```json
{
  "count": 1604
}
```

## GET `/api/cards`

- Retrieves number of cards that all players own
- Example response:
```json
{
  "count": 14554602
}
```

## GET `/api/upgrades`

- Retrieves number of card upgrades that all players own
- Example response:
```json
{
  "count": 3977367
}
```

## GET `/api/boosters`

- Retrieves number of unopened boosters in players' inventories
- Example response:
```json
{
  "count": 229773
}
```

## GET `/api/mails`

- Retrieves number of sent in-game mails
- Example response:
```json
{
  "count": 287460
}
```

## GET `/api/decks`

- Retrieves number of all players' decks
- Example response:
```json
{
  "count": 262488
}
```

## GET `/api/transactions`

- Retrieves number of various in-game transactions (trade, mail)
- Example response:
```json
{
  "count": 5160698
}
```

## GET `/api/experience`

- Retrieves sum of PvE experience of all players
- Example response:
```json
{
  "count": 2824516948
}
```

## GET `/api/elo`

- Retrieves sum of PvP ELO of all players
- Example response:
```json
{
  "count": 39819369
}
```

## GET `/api/bfp`

- Retrieves sum of BFP of all players
- Example response:
```json
{
  "count": 30738409
}
```

## GET `/api/gold`

- Retrieves sum of Gold of all players
- Example response:
```json
{
  "count": 1152602300
}
```
