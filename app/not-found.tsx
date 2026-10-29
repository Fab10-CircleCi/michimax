import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: "var(--space-12)" }}>
      <h1>¡Esta gatita se perdió!</h1>
      <p>El título que buscas se escondió debajo del sofá.</p>
      <p>
        <Link href="/">Volver al inicio</Link>
      </p>
    </div>
  );
}
