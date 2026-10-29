import type { Metadata } from "next";
import { FeatureRequestCard } from "@/components/FeatureRequestCard";
import { featureRequests } from "@/lib/feature-requests";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Solicitudes de funcionalidades",
  description: "Funcionalidades nuevas para construir en Michimax con tu agente de IA.",
};

export default function SolicitudesPage() {
  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Solicitudes de funcionalidades</h1>
      <p className={styles.lead}>
        El equipo de producto de Michimax pidió estas funcionalidades. Elige una y constrúyela con tu
        agente de IA.
      </p>
      <ol className={styles.steps}>
        <li>Copia el prompt de la solicitud.</li>
        <li>Pégalo en tu agente de IA dentro de tu fork de Michimax.</li>
        <li>Revisa que el agente suba la rama a tu fork.</li>
        <li>Abre tu pipeline en CircleCI y mira qué pasa.</li>
      </ol>

      <ul className={styles.list}>
        {featureRequests.map((request) => (
          <li key={request.id}>
            <FeatureRequestCard request={request} />
          </li>
        ))}
      </ul>
    </div>
  );
}
