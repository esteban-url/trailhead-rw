export const schema = gql`
  type AppMetadata {
    roles: [String]
    created_by: String
    lastUpdated_by: String
  }
  type UserMetadata {
    full_name: String
  }

  type User {
    id: String!
    aud: String
    role: String
    email: String!
    confirmed_at: DateTime
    confirmation_sent_at: DateTime
    recovery_sent_at: DateTime
    app_metadata: AppMetadata
    user_metadata: UserMetadata
    created_at: DateTime!
    updated_at: DateTime!
  }

  input CreateUserInput {
    email: String!
    password: String!
    user_metadata: JSONObject
    app_metadata: JSONObject
  }
  input UpdateUserInput {
    id: String!
    email: String!
    password: String
    roles: [String]
    user_metadata: JSONObject
    app_metadata: JSONObject
  }
  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
    deleteUser(id: String!): Boolean
  }

  type Query {
    users: [User!]!
    user(id: String!): User!
  }
`
