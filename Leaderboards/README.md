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

- Retrieves time duration it took the server last time to cache all leaderboards
- Example response:
```json
{
  "duration": "15m35s"
}
```

## GET `/api/maps`

- Retrieves map list for specific PvE mode
- Query parameter `type` represents a PvE mode and is required, can have following values: `1`, `2`, `4`, `12`
- Example request URL: `/api/maps?type=1`
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

## GET `/api/leaderboards/pve-count`

- Retrieves total number of PvE leaderboard entries according to provided query parameters
- Query parameter `type` represents PvE mode and is required, can have following values: `1`, `2`, `4`, `12`
- Query parameter `players` represents player count in PvE mode and is required, can have following values: `1`, `2`, `3`, `4`, `12`
- Query parameter `map` represents map ID and is required, matches the `value` returned by `GET /api/maps` request
- Query parameter `month` represents selected time range and is required, matches the `value` returned by `GET /api/ranges` request
- Example request URL: `/api/leaderboards/pve-count?type=1&players=1&map=67&month=0`
- Example response:
```json
{
  "count": 200
}
```

## GET `/api/leaderboards/pve`

- Retrieves paginated list of PvE leaderboard entries or exports data to a CSV file, all according to provided query parameters
- Query parameter `type` represents PvE mode and is required, can have following values: `1`, `2`, `4`, `12`
- Query parameter `players` represents player count in PvE mode and is required, can have following values: `1`, `2`, `3`, `4`, `12`
- Query parameter `map` represents map ID and is required, matches the `value` returned by `GET /api/maps` request
- Query parameter `month` represents selected time range and is required, matches the `value` returned by `GET /api/ranges` request
- Query parameter `export` triggers download of the exported leaderboards in CSV format and is optional, can have any value, mere presence is enough
- Query parameter `page` can have value above 1 and is required only if query parameter `export` is not present, represents the page that we're loading data for
- Query parameter `number` can have value up to maximum 30 and is required only if query parameter `export` is not present, represents total results per each page
- Response parameter `time` is actually number of match steps, which needs to be divided by `10` in order to get number of seconds (10 steps = 1 second)
- Example request URL: `/api/leaderboards/pve?type=1&players=1&map=67&month=0&page=1&number=15`
- Example export request URL (returns `text/csv` data): `/api/leaderboards/pve?type=1&players=1&map=67&month=0&export=true`
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

## GET `/api/leaderboards/pvp-count`

- Retrieves total number of PvP leaderboard entries according to provided query parameters
- Query parameter `type` represents PvP mode and is required, can have following values: `1v1`, `2v2`
- Query parameter `month` represents selected time range and is required, matches the `value` returned by `GET /api/ranges` request
- Example request URL: `/api/leaderboards/pvp-count?type=1v1&month=0`
- Example response:
```json
{
  "count": 200
}
```

## GET `/api/leaderboards/pvp`

- Retrieves paginated list of PvP leaderboard entries or exports data to a CSV file, all according to provided query parameters
- Query parameter `type` represents PvE mode and is required, can have following values: `1v1`, `2v2`
- Query parameter `month` represents selected time range and is required, matches the `value` returned by `GET /api/ranges` request
- Query parameter `export` triggers download of the exported leaderboards in CSV format and is optional, can have any value, mere presence is enough
- Query parameter `page` can have value above 1 and is required only if query parameter `export` is not present, represents the page that we're loading data for
- Query parameter `number` can have value up to maximum 30 and is required only if query parameter `export` is not present, represents total results per each page
- Example request URL: `/api/leaderboards/pvp?type=1v1&month=0&page=1&number=15`
- Example export request URL (returns `text/csv` data): `/api/leaderboards/pvp?type=1v1&month=0&export=true`
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
