module.exports = {
    "roots": [
      "<rootDir>/"
    ],
    "testMatch": [
      "**/test/**/+(spec|test).+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  }