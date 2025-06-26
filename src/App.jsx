import { useState, useEffect, useRef } from "react";
import Section from "./Section";
import ProjectSection from "./ProjectSection";

const aboutContent = (
  <>
    Juan Trujillo est un développeur web issu du monde de l'édition et des lettres. Formé à la philosophie et à la littérature à la Sorbonne, il a d'abord travaillé dans le milieu du livre, comme éditeur et lecteur indépendant. Ce parcours a nourri chez lui un goût marqué pour les langages, les structures, et le soin apporté aux détails.
    <br />
    <br />
    Sa transition vers le développement web s'inscrit dans une volonté d'explorer de nouveaux médiums, sans renier son attachement à la culture, à la transmission et à la forme. Il conçoit aujourd'hui des interfaces comme on compose une page : avec précision, sens, et une attention portée à l'expérience de lecture et de navigation. Il s'intéresse plus particulièrement aux projets qui mêlent culture, dimension sociale et enjeux éducatifs à travers les outils numériques.
  </>
);

const initialProjects = [
  {
    title: "Marginalia",
    description: "Une plateforme sociale pour partager et explorer ses lectures.",
    link: "https://www.marginalia.world",
  },
];

function App() {
  const [activeSection, setActiveSection] = useState(null); // "about" | "projects" | null
  const [projects, setProjects] = useState(initialProjects);
  const loading = useRef(false);

  // Infinite scroll for projects
  useEffect(() => {
    if (activeSection !== "projects") return;
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading.current
      ) {
        loading.current = true;
        setTimeout(() => {
          // For demo, repeat the first project
          setProjects((prev) => [
            ...prev,
            { ...initialProjects[0], title: `${initialProjects[0].title} (copy ${prev.length})` },
          ]);
          loading.current = false;
        }, 300);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Reset projects when leaving the section
  useEffect(() => {
    if (activeSection !== "projects") setProjects(initialProjects);
  }, [activeSection]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 24,
          right: 32,
          zIndex: 100,
          display: "flex",
          gap: "1.5em",
        }}
      >
        <button
          onClick={() => setActiveSection((v) => (v === "about" ? null : "about"))}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            cursor: "pointer",
            color: activeSection === "about" ? "#111" : "#888",
            padding: "0.5em 1em",
            transition: "color 0.2s",
          }}
          aria-pressed={activeSection === "about"}
          aria-label="Show about"
        >
          about
        </button>
        <button
          onClick={() => setActiveSection((v) => (v === "projects" ? null : "projects"))}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            cursor: "pointer",
            color: activeSection === "projects" ? "#111" : "#888",
            padding: "0.5em 1em",
            transition: "color 0.2s",
          }}
          aria-pressed={activeSection === "projects"}
          aria-label="Show projects"
        >
          projects
        </button>
      </div>
      {activeSection === "about" && <Section>{aboutContent}</Section>}
      {activeSection === "projects" &&
        projects.map((project, idx) => (
          <ProjectSection key={idx} {...project} />
        ))}
    </>
  );
}

export default App;
