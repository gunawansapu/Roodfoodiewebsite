import React, { useEffect, useRef } from "react";

function FireEffect({ width = 100, height = 40 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const maxParticles = 60;

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createParticle() {
      return {
        x: random(0, width),
        y: height,
        size: random(10, 20),
        velocityY: random(1, 3),
        alpha: 1,
        color: `rgba(255, ${Math.floor(random(100, 180))}, 0,`,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      if (particles.length < maxParticles) {
        particles.push(createParticle());
      }

      particles.forEach((p, i) => {
        p.y -= p.velocityY;
        p.alpha -= 0.02;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size
          );
          gradient.addColorStop(0, p.color + `${p.alpha})`);
          gradient.addColorStop(0.5, p.color + `${p.alpha * 0.5})`);
          gradient.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      // cleanup if needed
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        filter: "blur(4px)",
        opacity: 0.8,
        zIndex: -1,
      }}
    />
  );
}

export default FireEffect;
