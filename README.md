# Coding Exercise: Data Storage API (Node.js) :turtle::rocket:

Implement a small HTTP service in Node.js to store objects organized by repository.
Clients of this service should be able to `GET`, `PUT`, and `DELETE` objects.

## Expectations

We ask that you spend no more than 2 hours on this exercise. We value your time and don't want to set unreasonable expectations on how long you should work on this exercise.

This exercise gives you an opportunity to build a service on your own time, rather than an in-person interview where you code on a whiteboard.

## General Requirements

* The service should identify objects by their content. This means that two objects with the same content should be considered identical, and only one such object should be stored per repository. Objects with the same content can exist in different repositories.
* The included tests should pass and not be modified. Adding additional tests is encouraged.
* Do not move or rename any of the existing files.
* The service should implement the API as described below.
* The data can be persisted in memory, on disk, or wherever you like.
* External dependencies can be used, but are not required.

## Suggestions

* Your code will be read by humans, so organize it sensibly.
* Use this repository to store your work. Committing just the final solution is *OK* but we'd love to see your incremental progress. We suggest taking a look at [GitHub flow](https://guides.github.com/introduction/flow/) to structure your commits.
* [Submit a pull request](https://help.github.com/articles/creating-a-pull-request/) once you are happy with your work.
* Treat this pull request as if you're at work submitting it to your colleagues, or to an open source project. The body of the pull request can be used to describe your reasoning and any assumptions or tradeoffs in your implementation.
* You are welcome to use the existing [`express` module](https://www.npmjs.com/package/express) dependency or any other web framework that you are comfortable with.
* Remember that this is a web application, and multiple requests could come in at the same time. Be sure to plan for this.
* For data storage, try to get to a working solution and avoid complex dependencies.

## API

### Upload an Object

```
PUT /data/{repository}
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
GET /data/{repository}/{objectID}
```

#### Response

```
Status: 200 OK
{object data}
```

Objects that are not on the server will return a `404 Not Found`.

### Delete an Object

```
DELETE /data/{repository}/{objectID}
```

#### Response

```
Status: 200 OK
```

## Getting started and Testing

This exercise requires a recent version of Node.js. Get started by installing dependencies:

```sh
npm install
```

Write your server implementation in `server.js`. Then run the tests:

```sh
npm test
```

Or run them continuously as you work:

```sh
npm run test-watch
```

Once you have a working implementation, open a pull request that includes your changes.

## Submitting Your Work
When you are finished, please remember to commit all of your code, push your changes to GitHub, open a Pull Request, then visit https://interviews.githubapp.com/ and click `Done`.
