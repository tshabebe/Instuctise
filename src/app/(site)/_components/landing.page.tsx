export default function LandingPageUI() {
  return (
    <div className="min-h-screen container bg-gradient-to-b">
      <header>
        <Header />
      </header>
      <main>
        <section>
          <div>hero</div>
        </section>
      </main>
    </div>
  );
}

function Header() {
  return <div className="flex">hello world</div>;
}
