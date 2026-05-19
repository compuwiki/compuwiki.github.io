---
title: GraphQL
---

Query language and runtime for APIs. Single endpoint (usually `POST /graphql`); the client describes exactly the shape of data it wants.

## Operations

Three operation types: **query** (read), **mutation** (write), **subscription** (stream).

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}
```

Sent as JSON:

```json
{
  "query":     "query GetUser($id: ID!) { user(id: $id) { id name email } }",
  "variables": { "id": "42" },
  "operationName": "GetUser"
}
```

## Fields, arguments, aliases

```graphql
{
  # Argument
  user(id: "42") { name }

  # Alias — rename a field in the response
  admin: user(id: "1") { name }
  guest: user(id: "2") { name }
}
```

## Fragments (DRY)

```graphql
fragment UserCore on User {
  id
  name
  avatarUrl
}

query {
  me   { ...UserCore }
  team { members { ...UserCore } }
}
```

### Inline fragments (polymorphism)

```graphql
{
  search(text: "foo") {
    __typename
    ... on User    { name }
    ... on Post    { title }
    ... on Comment { body }
  }
}
```

## Variables and directives

```graphql
query Posts($limit: Int = 10, $withAuthor: Boolean!) {
  posts(limit: $limit) {
    id
    title
    author @include(if: $withAuthor) { name }
    draft  @skip(if: $withAuthor)
  }
}
```

Built-in directives: `@include(if:)`, `@skip(if:)`, `@deprecated(reason:)`.

## Mutations

```graphql
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    post   { id slug }
    errors { field message }
  }
}
```

Mutations at the top level run **serially**; query fields run in parallel.

## Subscriptions

```graphql
subscription OnMessage($roomId: ID!) {
  messageAdded(roomId: $roomId) {
    id
    text
    sender { name }
  }
}
```

Transport: WebSocket (`graphql-ws` protocol) or SSE.

## Schema Definition Language (SDL)

```graphql
"User of the system."
type User implements Node {
  id:      ID!
  name:    String!
  email:   String
  posts(first: Int = 10, after: String): PostConnection!
  role:    Role!
}

interface Node { id: ID! }

union SearchResult = User | Post | Comment

enum Role { ADMIN EDITOR VIEWER }

input CreatePostInput {
  title: String!
  body:  String!
  tags:  [String!] = []
}

type Mutation {
  createPost(input: CreatePostInput!): CreatePostPayload!
}

type Query {
  user(id: ID!): User
  posts(first: Int, after: String): PostConnection!
}

type Subscription {
  messageAdded(roomId: ID!): Message!
}

schema {
  query:        Query
  mutation:     Mutation
  subscription: Subscription
}
```

## Scalars

Built-in: `Int`, `Float`, `String`, `Boolean`, `ID`. Custom scalars (e.g. `DateTime`, `URL`, `JSON`) are common but transport as strings.

Type modifiers:

| Notation   | Meaning                              |
|------------|--------------------------------------|
| `String`   | nullable string                      |
| `String!`  | non-null string                      |
| `[String]` | nullable list of nullable strings    |
| `[String!]`| nullable list of non-null strings    |
| `[String]!`| non-null list of nullable strings    |
| `[String!]!` | non-null list of non-null strings  |

## Pagination (Relay-style cursors)

```graphql
{
  posts(first: 10, after: "cursor") {
    edges {
      cursor
      node { id title }
    }
    pageInfo { hasNextPage endCursor }
  }
}
```

## Errors

Standard response shape:

```json
{
  "data":   { "user": null },
  "errors": [
    { "message": "Not found",
      "path":    ["user"],
      "locations": [{ "line": 2, "column": 3 }],
      "extensions": { "code": "NOT_FOUND" } }
  ]
}
```

`data` and `errors` can both be present (partial results).

## Introspection

Every GraphQL server exposes its own schema:

```graphql
{ __schema { types { name kind } } }
{ __type(name: "User") { fields { name type { name kind } } } }
{ __typename }                     # works inside any selection set
```

Disable in production for closed APIs.

## Querying from the CLI

```sh
# Basic POST
curl -s https://api.example.com/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ me { id name } }"}'

# With variables
curl -s https://api.example.com/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"query($id:ID!){user(id:$id){name}}","variables":{"id":"42"}}'

# GET (read-only, query in URL)
curl -G https://api.example.com/graphql \
  --data-urlencode 'query={ me { id name } }'
```

Tooling: `graphql-cli`, `gql`, Insomnia, Postman, Apollo Sandbox, GraphiQL.

## Best practices

- Use **persisted queries** in production (client sends a hash, server has the text) — cuts payload size and locks the surface.
- Add a **query depth/complexity limit** server-side to prevent abusive nested queries.
- Prefer **input types** for mutation arguments — easier to evolve.
- Return **payload types** from mutations with a `errors` field for typed user errors (don't conflate with transport errors).
- Use `@deprecated(reason:)` instead of removing fields; clean up later.
- **Don't expose internal IDs** as `ID` — opaque global IDs (base64-encoded) are convention.
