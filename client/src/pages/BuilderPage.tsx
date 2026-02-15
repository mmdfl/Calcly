import { Link } from 'react-router-dom';
import FormBuilder from '../components/FormBuilder';
import TemplateLibraryPreview from '../components/TemplateLibraryPreview';

export default function BuilderPage() {
  return (
    <main className="page">
      <header className="builder-header card">
        <h1>Build calculator templates</h1>
        <Link to="/" className="btn btn-outline">
          Back Home
        </Link>
      </header>
      <FormBuilder />
      <TemplateLibraryPreview />
    </main>
  );
}
