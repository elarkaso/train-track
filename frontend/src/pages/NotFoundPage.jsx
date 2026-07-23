import { ErrorMessage } from "../components/messages/ErrorMessage";

function NotFoundPage() {
  return (
    <section className="page-layout page-layout-narrow">
      <header className="page-header">
        <p className="eyebrow">Navigation</p>
        <h2>Page not found</h2>
        <p className="page-subtitle">The page you requested does not exist or has been moved.</p>
      </header>
      <ErrorMessage message="404 - Page not found" />
    </section>
  );
}

export default NotFoundPage;