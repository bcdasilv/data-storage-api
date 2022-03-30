# Data Storage API (Node.js)

The goal is to implement a small HTTP service in Node.js to store objects organized by repository.

Clients should be able to make `GET`, `PUT`, and `DELETE` requests.

## Requirements

* The service should identify objects by their content. Two objects with the same content should be considered identical, and only one such object should be stored per repository.
* Objects with the same content can exist in different repositories.
* The data can be persisted in memory, on disk, or wherever you like.

## API

### Upload an Object

```
PUT /data/{repo}
```

#### Response

```
Status: 201 Created
{
  "oid": "2845f5a412dbdfacf95193f296dd0f5b2a16920da5a7ffa4c5832f223b03de96",
  "size": 1234
}
```

### Download an Object

```
GET /data/{repo}/{objID}
```

#### Response

```
Status: 200 OK
{data}
```

Objects that are not on the server will return a `404 Not Found`.

### Delete an Object

```
DELETE /data/{repo}/{objID}
```

#### Response

```
Status: 200 OK
```
