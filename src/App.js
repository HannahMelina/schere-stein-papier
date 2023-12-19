import "./App.css";
import { FaHandScissors } from "react-icons/fa";
import { FaHandRock } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { useState } from "react";

const actions = {
  sicssior: ["paper"],
  rock: ["sicssior"],
  paper: ["rock"],
};

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
}

function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }
  return null;
}

function ActionIcon({ action, ...props }) {
  const icons = {
    sicssior: FaHandScissors,
    rock: FaHandRock,
    paper: FaHandPaper,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
}

function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className="Player">
      <div className="score">{`${name}:${score}`}</div>
      <div className="action">
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  );
}

function ActionButton({ action = "rock", onActionSelected }) {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  );
}

function ShowWinner({ winner = 0 }) {
  const text = {
    "-1": "Du hast Gewonnen!",
    0: "Es ist unentschieden!",
    1: "Du hast verloren! :(",
  };
  return <h2>{text[winner]}</h2>;
}

function Game() {
  const [playerAction, setplayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();

    setplayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  return (
    <div className="center">
      <h1>Schere, Stein, Papier</h1>
      <div>
        <div className="container">
          <Player name="Player" score={playerScore} action={playerAction} />{" "}
          <Player
            name="Computer"
            score={computerScore}
            action={computerAction}
          />
        </div>
        <div>
          {" "}
          <ActionButton action="rock" onActionSelected={onActionSelected} />
          <ActionButton action="paper" onActionSelected={onActionSelected} />
          <ActionButton action="sicssior" onActionSelected={onActionSelected} />
        </div>{" "}
        <ShowWinner winner={winner} />
      </div>
    </div>
  );
}

export default Game;
