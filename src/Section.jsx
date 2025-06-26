function Section({ children }) {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        lineHeight: 1.6,
        maxWidth: 700,
        margin: '0 auto',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </section>
  );
}

export default Section;