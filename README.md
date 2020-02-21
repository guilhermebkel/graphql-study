# graphql-application
An example of a web application made with graphql

## Summary

- [ Introduction to GraphQL ](#introduction-to-graphql)
- [ Working with types inf GraphQL](#working-with-types-in-graphql)

<a name="introduction-to-graphql"></a>

## Introduction to GraphQL

The GraphQL comes from a new idea of how to manage data, because when using REST APIs we always have to set up a new endpoint to get information we need. In GraphQL, we work with the following idea:

1. We've got well defined data/schemas separated by nodes that we can access on demand (sometimes these nodes are parents of another nodes, so we can have them like a inner join on a database)

2. With one single request, we specify the node (and his children if we want to) that we wanna get the data from.

In order to work with this new kinda way to get data, when using GraphQL we have **TypeDefs** and **Resolvers**.

- Typedefs: We use them to describe the format of the data that exists on the nodes.

- Resolvers: All methods and business logics to get the needed data.

<a name="working-with-types-in-graphql"></a>

## Working with types in GraphQL

In GraphQL we have common types that we can use by default (Scalar Types) for some data response, such as: **Int**, **Float**, **String**, **Boolean**, **ID**.

Usually we define the schema type that way:
```graphql
type User {
	id: ID
	name: String!
	email: String!
	childrenName: [String]
}

# When using the exclamation after a scalar type (Ex: String!), we're saying that this field must be provided.
# When using the scalar type between brackets (Ex: [String]), we're specifying that's a array of the given scalar type.
```

If we want to add a custom scalar type, we need to do the following on our **TypeDefs**:
```graphql
scalar Date # Creates a new scalar of type Date
```

