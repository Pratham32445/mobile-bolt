 const  {ArtifactParser } = require("./parser")

const rawaData = [
    "```xml", "<boltArtifact id=\"snake-ladder-game\" title=\"Snake and Ladder Game in React Native\">",
    "  <boltAction type=\"file\" filePath=\"package.json\">",
    "{", "  \"name\": \"snake-ladder\",", "  \"version\": \"1.0.0\",",
    "  \"main\": \"index.js\",", "  \"scripts\": {",
    "    \"start\": \"expo start --dev-client\",",
    "    \"android\": \"expo run:android\",", "    \"ios\": \"expo run:ios\",",
    "    \"web\": \"expo start --web\",", "    \"dev\": \"expo start --port 8081\"",
    "  },", "  \"dependencies\": {", "    \"@expo/vector-icons\": \"^14.0.0\",",
    "    \"expo\": \"~52.0.0\",", "    \"expo-asset\": \"~9.0.2\",",
    "    \"expo-dev-client\": \"~3.5.2\",", "    \"expo-splash-screen\": \"~0.18.2\",",
    "    \"expo-status-bar\": \"~1.4.4\",", "    \"react\": \"18.2.0\",",
    "    \"react-native\": \"0.73.6\",", "    \"react-native-confetti-cannon\": \"^1.0.4\",",
    "    \"react-native-safe-area-context\": \"4.5.0\",",
    "    \"react-native-screens\": \"~3.20.0\"",
    "  },", "  \"devDependencies\": {", "    \"@babel/core\": \"^7.20.0\",",
    "    \"@types/react\": \"~18.0.27\",", "    \"typescript\": \"^4.9.4\"",
    "  },", "  \"private\": true", "}", "  </boltAction>",
    "  <boltAction type=\"shell\">", "npm install",
    "  </boltAction>", "  <boltAction type=\"file\" filePath=\"src/components/Board.tsx\">",
    "import React from 'react';", "import { View, StyleSheet, Dimensions, Text } from 'react-native';",
    "", "interface BoardProps {", "  boardSize: number;",
    "  playerPos: number;", "  ladders: { [key: number]: number };",
    "  snakes: { [key: number]: number };", "}", "",
    "const Board: React.FC<BoardProps> = ({ boardSize, playerPos, ladders, snakes }) => {",
    "  const boardSquares = [];", "  const screenWidth = Dimensions.get('window').width;",
    "  const squareSize = (screenWidth - 40) / boardSize;",
    "", "  const isLadderStart = (squareNumber: number) => {",
    "    return ladders.hasOwnProperty(squareNumber);",
    "  };", "", "  const isSnakeHead = (squareNumber: number) => {",
    "    return snakes.hasOwnProperty(squareNumber);",
    "  };", "", "", "  for (let i = boardSize * boardSize; i >= 1; i--) {",
    "    const row = Math.ceil(i / boardSize);",
    "    const isEvenRow = row % 2 === 0;", "    const squareNumber = isEvenRow ? (boardSize * row - (boardSize - (i % boardSize || boardSize))) : i;",
    "    const isPlayerHere = squareNumber === playerPos;",
    "", "    boardSquares.push(", "      <View", "        key={i}",
    "        style={[", "          styles.square,",
    "          {", "            width: squareSize,",
    "            height: squareSize,", "            backgroundColor: (row + (squareNumber % boardSize)) % 2 === 0 ? '#fff' : '#f0f0f0',",
    "          },", "          isPlayerHere && styles.playerSquare,",
    "          isLadderStart(squareNumber) && styles.ladderStart,",
    "          isSnakeHead(squareNumber) && styles.snakeHead,",
    "        ]}", "      >", "        <Text style={styles.squareText}>{squareNumber}</Text>",
    "        {isPlayerHere && <View style={styles.playerToken} />}",
    "        {isLadderStart(squareNumber) && <Text style={styles.overlayText}>⬆</Text>}",
    "        {isSnakeHead(squareNumber) && <Text style={styles.overlayText}>⬇</Text>}",
    "      </View>", "    );", "  }", "", "  return <View style={[styles.board, { width: screenWidth - 20 }]}>{boardSquares}</View>;",
    "};", "", "const styles = StyleSheet.create({", "  board: {",
    "    flexDirection: 'row',", "    flexWrap: 'wrap',",
    "    margin: 10,",
]

export const stringData = `<boltArtifact id="snake-ladder-game" title="Snake and Ladder Game in React Native">
  <boltAction type="file" filePath="package.json">
{
  "name": "snake-ladder",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start --dev-client",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "dev": "expo start --port 8081"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "expo": "~52.0.0",
    "expo-asset": "~9.0.2",
    "expo-dev-client": "~3.5.2",
    "expo-splash-screen": "~0.18.2",
    "expo-status-bar": "~1.4.4",
    "react": "18.2.0",
    "react-native": "0.73.6",
    "react-native-confetti-cannon": "^1.0.4",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.0.27",
    "typescript": "^4.9.4"
  },
  "private": true
}
  </boltAction>
  <boltAction type="shell">
npm install
  </boltAction>
  <boltAction type="file" filePath="src/components/Board.tsx">
import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

interface BoardProps {
  boardSize: number;
  playerPos: number;
  ladders: { [key: number]: number };
  snakes: { [key: number]: number };
}

const Board: React.FC<BoardProps> = ({ boardSize, playerPos, ladders, snakes }) => {
  const boardSquares = [];
  const screenWidth = Dimensions.get('window').width;
  const squareSize = (screenWidth - 40) / boardSize;

  const isLadderStart = (squareNumber: number) => {
    return ladders.hasOwnProperty(squareNumber);
  };

  const isSnakeHead = (squareNumber: number) => {
    return snakes.hasOwnProperty(squareNumber);
  };


  for (let i = boardSize * boardSize; i >= 1; i--) {
    const row = Math.ceil(i / boardSize);
    const isEvenRow = row % 2 === 0;
    const squareNumber = isEvenRow ? (boardSize * row - (boardSize - (i % boardSize || boardSize))) : i;
    const isPlayerHere = squareNumber === playerPos;

    boardSquares.push(
      <View
        key={i}
        style={[
          styles.square,
          {
            width: squareSize,
            height: squareSize,
            backgroundColor: (row + (squareNumber % boardSize)) % 2 === 0 ? '#fff' : '#f0f0f0',
          },
          isPlayerHere && styles.playerSquare,
          isLadderStart(squareNumber) && styles.ladderStart,
          isSnakeHead(squareNumber) && styles.snakeHead,
        ]}
      >
        {isPlayerHere && <View style={styles.playerToken} />}
        {isLadderStart(squareNumber) && <Text style={styles.overlayText}>⬆</Text>}
        {isSnakeHead(squareNumber) && <Text style={styles.overlayText}>⬇</Text>}
      </View>
    );
  }

  return <View style={[styles.board, { width: screenWidth - 20 }]}>{boardSquares}</View>;
};`

const artifact = new ArtifactParser();
artifact.addText(stringData);
artifact.parse();