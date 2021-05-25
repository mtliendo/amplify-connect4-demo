/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      username
      bio
      profilePic
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        bio
        profilePic
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      createdByPlayer
      sentToPlayer
      gameName
      player1
      player2
      currentPlayer
      board
      gameStatus
      messages {
        sender
        message
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdByPlayer
        sentToPlayer
        gameName
        player1
        player2
        currentPlayer
        board
        gameStatus
        messages {
          sender
          message
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const playersByUsername = /* GraphQL */ `
  query PlayersByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    playersByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        bio
        profilePic
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const gamesBySentToPlayer = /* GraphQL */ `
  query GamesBySentToPlayer(
    $sentToPlayer: String
    $gameStatus: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gamesBySentToPlayer(
      sentToPlayer: $sentToPlayer
      gameStatus: $gameStatus
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdByPlayer
        sentToPlayer
        gameName
        player1
        player2
        currentPlayer
        board
        gameStatus
        messages {
          sender
          message
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gamesCreatedBySelf = /* GraphQL */ `
  query GamesCreatedBySelf(
    $createdByPlayer: String
    $gameStatus: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gamesCreatedBySelf(
      createdByPlayer: $createdByPlayer
      gameStatus: $gameStatus
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdByPlayer
        sentToPlayer
        gameName
        player1
        player2
        currentPlayer
        board
        gameStatus
        messages {
          sender
          message
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
