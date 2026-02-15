import { useAppContext } from '../context/AppContext';

export default function TemplateLibraryPreview() {
  const { templates } = useAppContext();

  return (
    <section id="templates" className="card template-library">
      <h2>Template Library Preview</h2>
      <div className="steps">
        <span>1. Create</span>
        <span>2. Run</span>
        <span>3. Share</span>
      </div>
      <div className="template-grid">
        {templates.map((template) => (
          <article key={template.id} className="template-card">
            <h3>{template.name}</h3>
            <p>{template.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
