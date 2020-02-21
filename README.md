# graphql-application
A example of a web application made with graphql

## Summary

- [ Introduction to GraphQL ](#introduction-to-graphql)

<a name="introduction-to-graphql"></a>

## Introduction to GraphQL

The GraphQL comes from a new idea of how to manage data, because when using REST APIs we always have to set up a new endpoint to get information we need. In GraphQL, we work with the following idea:

1. We've got well defined data/schemas separated by nodes that we can access on demand (sometimes these nodes are parents of another nodes, so we can have them like a inner join on a database)

2. With one single request, we specify the node (and his children if we want to) that we wanna get the data from.

In order to work with this new kinda way to get data, when using GraphQL we have **TypeDefs** and **Resolvers**.

- Typedefs: We use them to describe the format of the data that exists on the nodes.

- Resolvers: All methods and business logics to get the needed data.