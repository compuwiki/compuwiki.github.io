---
title: NoSQL
tags: [database, nosql]
---

NoSQL ("Not Only SQL") is a family of database approaches designed to handle large volumes of data with flexible, distributed structures. Unlike relational databases, NoSQL avoids rigid schemas and strict key/table dependencies.

## Key characteristics

- **Horizontal scalability** — scale out by adding servers instead of upgrading one.
- **Flexible data model** — documents, key-value, wide-column, or graph.
- **High throughput** — optimized for fast reads and writes.
- **High availability** — designed for fault tolerance and automatic replication.

## Types

1. **Document stores** — JSON, BSON, or XML documents. Examples: MongoDB, CouchDB.
2. **Key-value stores** — each entry is a unique key with its associated value. Examples: Redis, DynamoDB.
3. **Wide-column stores** — data organized in columns rather than rows. Examples: Apache Cassandra, HBase.
4. **Graph databases** — efficient storage of relationships between entities. Examples: Neo4j, ArangoDB.

## Use cases

- Web and mobile apps with unstructured data.
- Big data and real-time analytics.
- Caching layers to speed up other systems.
- Social networks and recommendation engines.

## Trade-offs

**Pros**

- Scalability and schema flexibility.
- Efficient handling of large data volumes.
- High availability and fault tolerance.

**Cons**

- Limited support for complex multi-row transactions.
- Less maturity than relational databases in some areas.
- Standards vary between systems.

## Bottom line

NoSQL is a powerful alternative where relational databases hit their limits. Choosing between SQL and NoSQL depends on the application type, data volume, and scalability requirements.
