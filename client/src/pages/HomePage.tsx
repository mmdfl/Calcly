import CalculatorUI from '../components/CalculatorUI';
import HeroSection from '../components/HeroSection';
import TemplateLibraryPreview from '../components/TemplateLibraryPreview';
import { useAppContext } from '../context/AppContext';

export default function HomePage() {
  const { templates } = useAppContext();

  return (
    <main className="page">
      <HeroSection />
      <CalculatorUI template={templates[0]} />
      <TemplateLibraryPreview />
    </main>
  );
}
