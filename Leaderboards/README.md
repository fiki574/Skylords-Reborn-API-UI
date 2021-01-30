# Leaderboards API

Running frontend application: https://leaderboards.skylords.eu

Running backend application: https://leaderboards.backend.skylords.eu

Backend application caches new data every 6 hours.

## General responses

- Response when the backend is in process of caching new data:
```json
{
  "state": "loading"
}
```

- Response when the backend is unable to process a request:
```json
{
  "state": "invalid"
}
```

## GET `/api/next-load`

- Retrieves number of milliseconds until next refresh of cached leaderboards data
- Example response:
```json
{
  "in": 21511697
}
```

## GET `/api/last-load`

- Retrieves time duration it took the server to cache all leaderboards
- Example response:
```json
{
  "duration": "15m35s"
}
```

## GET `/api/maps/:xpve`

- Retrieves map list for specific PvE mode
- Parameter `:xpve` represents a PvE mode, can have following values: `1pve`, `2pve`, `4pve`, `12pve`
- Example request URL: `/api/maps/1pve`
- Example response:
```json
[
  {
    "name": "Introduction",
    "value": 67
  }
]
```

## GET `/api/ranges`

- Retrieves list of available time ranges
- Example response:
```json
[
  {
    "name": "This month",
    "value": 0
  },
  {
    "name": "Last month",
    "value": 1
  }
]
```

## GET `/api/difficulties`

- Retrieves list of all PvE difficulties
- Example response:
```json
[
  {
    "name": "Standard",
    "value": 1
  },
  {
    "name": "Advanced",
    "value": 2
  }
]
```

## GET `/api/leaderboards/pve-count/:type/:players/:map/:month`

- Retrieves total number of PvE leaderboard entries according to path parameters
- Parameter `:type` represents PvE mode, can have following values: `1`, `2`, `4`, `12`
- Parameter `:players` represents player count in PvE mode, can have following values: `1`, `2`, `3`, `4`, `12`
- Parameter `:map` represents map ID, matches the `value` returned by `GET /api/maps/:xpve` request
- Parameter `:month` represents selected time range, matches the `value` returned by `GET /api/ranges` request
- Example request URL: `/api/leaderboards/pve-count/1/1/67/0`
- Example response:
```json
{
  "count": 200
}
```
- Example response when the backend is caching new data:
```json
{
  "state": "loading"
}
```

## GET `/api/leaderboards/pve/:type/:players/:map/:month/:page/:number`

- Retrieves paginated list of PvE leaderboard entries according to path parameters
- Parameter `:type` represents PvE mode, can have following values: `1`, `2`, `4`, `12`
- Parameter `:players` represents player count in PvE mode, can have following values: `1`, `2`, `3`, `4`, `12`
- Parameter `:map` represents map ID, matches the `value` returned by `GET /api/maps/:xpve` request
- Parameter `:month` represents selected time range, matches the `value` returned by `GET /api/ranges` request
- Parameter `:page` can have value above 1, represents the page that we're loading data for
- Parameter `:number` can have value up to maximum 30, represents total results per each page
- Response parameter `time` is actually number of match steps, which needs to be divided by `10` in order to get number of seconds (10 steps = 1 second)
- Example request URL: `/api/leaderboards/pve-count/1/1/67/0/1/15`
- Example response:
```json
[
  {
    "name": "Player1",
    "map": 67,
    "time": 8791,
    "difficulty": 1,
    "experience": 236187
  },
  {
    "name": "Player2",
    "map": 67,
    "time": 9856,
    "difficulty": 1,
    "experience": 18314
  }
]
```

## GET `/api/leaderboards/pvp-count/:type/:month`

- Retrieves total number of PvP leaderboard entries according to path parameters
- Parameter `:type` represents PvP mode, can have following values: `1v1`, `2v2`
- Parameter `:month` represents selected time range, matches the `value` returned by `GET /api/ranges` request
- Example request URL: `/api/leaderboards/pvp-count/1v1/0`
- Example response:
```json
{
  "count": 200
}
```

## GET `/api/leaderboards/pvp/:type/:month/:page/:number`

- Retrieves paginated list of PvP leaderboard entries according to path parameters
- Parameter `:type` represents PvE mode, can have following values: `1v1`, `2v2`
- Parameter `:month` represents selected time range, matches the `value` returned by `GET /api/ranges` request
- Parameter `:page` can have value above 1, represents the page that we're loading data for
- Parameter `:number` can have value up to maximum 30, represents total results per each page
- Example request URL: `/api/leaderboards/pvp/1v1/0/1/15`
- Example response:
```json
[
  {
    "name": "Player1",
    "rating": 166494,
    "activity": 100,
    "totalMatches": 35,
    "winsLimited": 678,
    "losesLimited": 179,
    "baseElo": 166494
  },
  {
    "name": "Player2",
    "rating": 150602,
    "activity": 100,
    "totalMatches": 16,
    "winsLimited": 401,
    "losesLimited": 106,
    "baseElo": 150602
  }
]
```

- Additional example response for `2v2` leaderboards:
```json
[
  {
    "players": ["Player1", "Player2"],
    "baseElo": 100000,
    "rating": 0,
    "activity": 0,
    "wins": 0,
    "losses": 0
  },
  {
    "players": ["Player3", "Player4"],
    "baseElo": 100000,
    "rating": 0,
    "activity": 0,
    "wins": 0,
    "losses": 0
  }
]
```
