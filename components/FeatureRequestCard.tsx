import { branchCommand, type FeatureRequest } from "@/lib/feature-requests";
import { CopyButton } from "./CopyButton";
import styles from "./FeatureRequestCard.module.css";

export function FeatureRequestCard({ request }: { request: FeatureRequest }) {
  const headingId = `solicitud-${request.id}`;

  return (
    <article className={styles.card} aria-labelledby={headingId}>
      <p className={styles.number}>Solicitud {request.number}</p>
      <h2 id={headingId} className={styles.title}>
        {request.title}
      </h2>
      <p className={styles.summary}>{request.summary}</p>

      <CopyButton text={request.prompt} label="Copiar prompt" context={request.title} />

      <details className={styles.details}>
        <summary>Ver el prompt completo</summary>
        <pre className={styles.prompt}>{request.prompt}</pre>
      </details>

      <div className={styles.fallback}>
        <h3 className={styles.fallbackTitle}>¿Sin tiempo? Usa las ramas de respaldo</h3>
        <BranchStep
          title="Paso 2: la funcionalidad ya construida"
          branch={request.brokenBranch}
          context={`rama de respaldo rota de ${request.title}`}
        />
        <BranchStep
          title="Paso 3: la funcionalidad arreglada"
          branch={request.fixedBranch}
          context={`rama de respaldo arreglada de ${request.title}`}
        />
      </div>
    </article>
  );
}

function BranchStep({ title, branch, context }: { title: string; branch: string; context: string }) {
  const command = branchCommand(branch);

  return (
    <div className={styles.step}>
      <p className={styles.stepTitle}>{title}</p>
      <p className={styles.fallbackText}>
        Sube a tu fork la rama <code>{branch}</code>:
      </p>
      <pre className={styles.command}>
        <code>{command}</code>
      </pre>
      <CopyButton text={command} label="Copiar comando" context={context} variant="secondary" />
    </div>
  );
}
