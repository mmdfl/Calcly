import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero card">
      <div>
        <h1>Turn any logic into a reusable calculator</h1>
        <p>
          Build custom functions, save as templates, and share instantly with your team.
        </p>
        <div className="hero-actions">
          <Link to="/builder" className="btn btn-primary">
            Create your calculator
          </Link>
          <a href="#templates" className="btn btn-outline">
            Explore templates
          </a>
        </div>
      </div>
      <div className="hero-graphic" aria-hidden>
        <div className="node-grid" />
      </div>
    </section>
  );
}
