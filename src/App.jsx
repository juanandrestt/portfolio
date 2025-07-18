import Section from "./Section";
import cat from "./assets/cat.jpg";
import plant from "./assets/plant.jpg";
import yokai from "./assets/yokai.jpg";
import glissant from "./assets/glissant.jpg";
import old from "./assets/old.jpg";

const images = [cat, plant, yokai, glissant, old];

function getRandomPosition(maxWidth, maxHeight, imgWidth, imgHeight) {
  const left = Math.random() * (maxWidth - imgWidth);
  const top = Math.random() * (maxHeight - imgHeight);
  return { left, top };
}

const IMAGE_WIDTH = 180;
const IMAGE_HEIGHT = 180;

const aboutContent = (
  <>
    Juan Trujillo est un développeur web issu du monde de l'édition et des lettres. Formé à la philosophie et à la littérature à la Sorbonne, il a d'abord travaillé dans le milieu du livre, comme éditeur et lecteur indépendant. Ce parcours a nourri chez lui un goût marqué pour les langages, les structures, et le soin apporté aux détails.
    <br />
    <br />
    Sa transition vers le développement web s'inscrit dans une volonté d'explorer de nouveaux médiums, sans renier son attachement à la culture, à la transmission et à la forme. Il conçoit aujourd'hui des interfaces comme on compose une page : avec précision, sens, et une attention portée à l'expérience de lecture et de navigation. Il s'intéresse plus particulièrement aux projets qui mêlent culture, dimension sociale et enjeux éducatifs à travers les outils numériques.
  </>
);

import { useState, useRef, useEffect } from "react";

function App() {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionWidth = 700;
  const sectionHeight = 900;

  const [showAbout, setShowAbout] = useState(false);

  const [imgData, setImgData] = useState(
    images.map(() => ({
      width: null,
      height: null,
      left: null,
      top: null,
      loaded: false,
    }))
  );

  const [imagesPositioned, setImagesPositioned] = useState(false);

  useEffect(() => {
    if (
      !imagesPositioned &&
      imgData.every(img => img.loaded && img.width && img.height && img.left === null && img.top === null)
    ) {
      setImgData(prev =>
        prev.map((img) => {
          const { left, top } = getRandomPosition(windowSize.width, windowSize.height, img.width, img.height);
          return { ...img, left, top };
        })
      );
      setImagesPositioned(true);
    }
  }, [imgData, windowSize.width, windowSize.height, imagesPositioned]);

  const MAX_DIM = 180;
  const handleImgLoad = (e, idx) => {
    const { naturalWidth, naturalHeight } = e.target;
    let width = naturalWidth;
    let height = naturalHeight;
    if (width > MAX_DIM || height > MAX_DIM) {
      const scale = Math.min(MAX_DIM / width, MAX_DIM / height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }
    setImgData(prev =>
      prev.map((img, i) =>
        i === idx
          ? { ...img, width, height, loaded: true }
          : img
      )
    );
  };

  const dragInfo = useRef({ idx: null, offsetX: 0, offsetY: 0 });

  const handleMouseDown = (e, idx) => {
    e.preventDefault();
    const imgRect = e.target.getBoundingClientRect();
    dragInfo.current = {
      idx,
      offsetX: e.clientX - imgRect.left,
      offsetY: e.clientY - imgRect.top,
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const { idx, offsetX, offsetY } = dragInfo.current;
    if (idx === null) return;
    const img = imgData[idx];
    if (!img) return;
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;
    newLeft = Math.max(0, Math.min(windowSize.width - img.width, newLeft));
    newTop = Math.max(0, Math.min(windowSize.height - img.height, newTop));
    setImgData((prev) =>
      prev.map((data, i) => (i === idx ? { ...data, left: newLeft, top: newTop } : data))
    );
  };

  const handleMouseUp = () => {
    dragInfo.current = { idx: null, offsetX: 0, offsetY: 0 };
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e, idx) => {
    const touch = e.touches[0];
    const imgRect = e.target.getBoundingClientRect();
    dragInfo.current = {
      idx,
      offsetX: touch.clientX - imgRect.left,
      offsetY: touch.clientY - imgRect.top,
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const { idx, offsetX, offsetY } = dragInfo.current;
    if (idx === null) return;
    const img = imgData[idx];
    if (!img) return;
    let newLeft = touch.clientX - offsetX;
    let newTop = touch.clientY - offsetY;
    newLeft = Math.max(0, Math.min(windowSize.width - img.width, newLeft));
    newTop = Math.max(0, Math.min(windowSize.height - img.height, newTop));
    setImgData((prev) =>
      prev.map((data, i) => (i === idx ? { ...data, left: newLeft, top: newTop } : data))
    );
  };

  const handleTouchEnd = () => {
    dragInfo.current = { idx: null, offsetX: 0, offsetY: 0 };
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  };

  const imageElements = images.map((src, idx) => {
    const { left, top, width, height, loaded } = imgData[idx];
    if (!loaded || left === null || top === null) {
      return (
        <img
          key={idx}
          src={src}
          alt={`random-${idx}`}
          style={{ visibility: "hidden", position: "fixed" }}
          onLoad={(e) => handleImgLoad(e, idx)}
          draggable={false}
        />
      );
    }
    return (
      <img
        key={idx}
        src={src}
        alt={`random-${idx}`}
        className="draggable-img"
        style={{
          left: `${left}px`,
          top: `${top}px`,
          width: `${width}px`,
          height: `${height}px`,
          zIndex: 2 + idx
        }}
        onMouseDown={(e) => handleMouseDown(e, idx)}
        onTouchStart={(e) => handleTouchStart(e, idx)}
        onLoad={(e) => handleImgLoad(e, idx)}
        draggable={false}
      />
    );
  });

  return (
    <Section>
      <div className="section-container" style={{ width: sectionWidth, height: sectionHeight }}>
        {/* About button */}
        <span
          className="about-btn"
          onClick={() => setShowAbout((v) => !v)}
          aria-label="Toggle about"
          role="button"
          tabIndex={0}
          onKeyPress={e => {
            if (e.key === "Enter" || e.key === " ") setShowAbout((v) => !v);
          }}
        >
          about
        </span>
        {imageElements}
        {showAbout && (
          <div className="about-content">
            {aboutContent}
          </div>
        )}
        </div>
      </Section>
  );
}

export default App;