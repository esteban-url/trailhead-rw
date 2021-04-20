export const schema = gql`
  type UserMetadata {
    full_name: String
  }

  type Query {
    userMetadata: UserMetadata!
  }

  input UpdateUserMetadataInput {
    full_name: String
  }

  type Mutation {
    updateUserMetadata(input: UpdateUserMetadataInput!): UserMetadata!
  }
`
