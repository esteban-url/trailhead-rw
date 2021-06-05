export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  JSON: Record<string, unknown>;
  JSONObject: Record<string, unknown>;
  Time: string;
};

export type AppMetadata = {
  __typename?: 'AppMetadata';
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  created_by?: Maybe<Scalars['String']>;
  lastUpdated_by?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  user_metadata?: Maybe<Scalars['JSONObject']>;
  app_metadata?: Maybe<Scalars['JSONObject']>;
};





export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  deleteUser?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  redwood?: Maybe<Redwood>;
  user: User;
  users: Array<User>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Redwood = {
  __typename?: 'Redwood';
  version?: Maybe<Scalars['String']>;
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
};


export type UpdateUserInput = {
  id: Scalars['String'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  user_metadata?: Maybe<Scalars['JSONObject']>;
  app_metadata?: Maybe<Scalars['JSONObject']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  aud?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  confirmed_at?: Maybe<Scalars['DateTime']>;
  confirmation_sent_at?: Maybe<Scalars['DateTime']>;
  recovery_sent_at?: Maybe<Scalars['DateTime']>;
  app_metadata?: Maybe<AppMetadata>;
  user_metadata?: Maybe<UserMetadata>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type UserMetadata = {
  __typename?: 'UserMetadata';
  full_name?: Maybe<Scalars['String']>;
  avatar_type?: Maybe<Scalars['String']>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'created_at'>
    & { user_metadata?: Maybe<(
      { __typename?: 'UserMetadata' }
      & Pick<UserMetadata, 'full_name' | 'avatar_type'>
    )>, app_metadata?: Maybe<(
      { __typename?: 'AppMetadata' }
      & Pick<AppMetadata, 'roles'>
    )> }
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'created_at' | 'updated_at'>
    & { user_metadata?: Maybe<(
      { __typename?: 'UserMetadata' }
      & Pick<UserMetadata, 'full_name' | 'avatar_type'>
    )>, app_metadata?: Maybe<(
      { __typename?: 'AppMetadata' }
      & Pick<AppMetadata, 'roles' | 'created_by' | 'lastUpdated_by'>
    )> }
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);
