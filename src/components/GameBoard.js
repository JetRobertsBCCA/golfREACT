import React, { useState } from "react";
import Ball from "./Ball";
import Hole from "./Hole";
import "./GameBoard.css";

const GameBoard = () => {
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 300 });
  const [isAiming, setIsAiming] = useState(false);
  const [aim, setAim] = useState({ angle: 0, power: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleMouseDown = (e) => {
    setIsAiming(true);
  };

  const handleMouseUp = (e) => {
    if (isAiming) {
      const rect = e.target.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const dx = mouseX - ballPosition.x;
      const dy = mouseY - ballPosition.y;
      const angle = Math.atan2(dy, dx);
      const power = Math.min(Math.sqrt(dx * dx + dy * dy) / 10, 50);

      setAim({ angle, power });
      setIsAiming(false);
      shootBall(angle, power);
    }
  };

  const shootBall = (angle, power) => {
    const velocity = {
      x: Math.cos(angle) * power,
      y: Math.sin(angle) * power,
    };

    const interval = setInterval(() => {
      setBallPosition((prev) => {
        const newX = prev.x + velocity.x * 0.1;
        const newY = prev.y + velocity.y * 0.1;

        velocity.x *= 0.98;
        velocity.y *= 0.98;

        if (Math.abs(velocity.x) < 0.5 && Math.abs(velocity.y) < 0.5) {
          clearInterval(interval);
          checkWin(newX, newY);
          return { x: newX, y: newY };
        }

        return { x: newX, y: newY };
      });
    }, 20);
  };

  const checkWin = (x, y) => {
    const holeX = 450;
    const holeY = 300;
    const distance = Math.sqrt((x - holeX) ** 2 + (y - holeY) ** 2);
    if (distance < 20) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setBallPosition({ x: 50, y: 300 });
    setGameOver(false);
  };

  return (
    <div
      className="game-board"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Ball position={ballPosition} />
      <Hole />
      {gameOver && (
        <div className="game-over">
          <h2>You Win!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      {isAiming && (
        <div
          className="aim-line"
          style={{
            left: ballPosition.x,
            top: ballPosition.y,
          }}
        ></div>
      )}
    </div>
  );
};

export default GameBoard;
