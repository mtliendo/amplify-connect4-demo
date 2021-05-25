/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onGameCreatedForSelf = /* GraphQL */ `
  subscription OnGameCreatedForSelf($sentToPlayer: String!) {
    onGameCreatedForSelf(sentToPlayer: $sentToPlayer) {
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
export const onGameUpdatedByID = /* GraphQL */ `
  subscription OnGameUpdatedByID($id: ID!) {
    onGameUpdatedByID(id: $id) {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
