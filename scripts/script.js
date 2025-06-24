const container = document.querySelector('.paper');

function randomOffset() {
  // Retourne un nombre entre -1.5 et +1.5
  return (Math.random() * 1.6 - 0.8).toFixed(2);
}

function animateClipPath() {
  const pointsTop = [];
  const pointsBottom = [];
  for (let i = 0; i <= 20; i++) {
    const x = i * 5;
    const yTop = 3 + parseFloat(randomOffset());
    pointsTop.push(`${x}% ${yTop}%`);

    const yBottom = 97 + parseFloat(randomOffset());
    pointsBottom.unshift(`${x}% ${yBottom}%`);
  }
  
  const clipPathString = `polygon(${pointsTop.join(', ')}, ${pointsBottom.join(', ')})`;
  container.style.clipPath = clipPathString;
  
  setTimeout(animateClipPath, 1200);
}

animateClipPath();