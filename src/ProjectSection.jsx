function ProjectSection({ title, description, link }) {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        lineHeight: 1.6,
        maxWidth: 700,
        margin: '0 auto',
        padding: '2rem',
        boxSizing: 'border-box',
        background: '#f7f7f7',
        borderBottom: '1px solid #eee',
      }}
    >
      <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: 700 }}>
        {title}
      </h2>
      <p style={{ marginBottom: '1.5rem' }}>{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#222',
            textDecoration: 'underline',
            fontWeight: 500,
            fontSize: '1.1rem',
          }}
        >
          Visit project
        </a>
      )}
    </section>
  );
}

export default ProjectSection;