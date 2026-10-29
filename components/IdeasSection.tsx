import { ideas } from "@/lib/ideas";
import styles from "./IdeasSection.module.css";

export function IdeasSection() {
  return (
    <section className={styles.section} aria-labelledby="titulo-ideas">
      <h2 id="titulo-ideas" className={styles.title}>
        Ideas para seguir construyendo
      </h2>
      <p className={styles.lead}>
        Terminaste el taller. Estas son pistas, no prompts: cada una está pensada para 10–15 minutos con tu
        agente de IA. Escribe tú la solicitud y cumple estas tres reglas:
      </p>
      <ul className={styles.rules}>
        <li>
          <strong>No rompas el CI.</strong> Los cuatro jobs (lint, typecheck, unit-tests y accessibility) deben
          seguir en verde.
        </li>
        <li>
          <strong>Agrega pruebas.</strong> Pruebas unitarias en <code>tests/unit/</code> para lo que construyas; si
          creas una página, enlázala desde el sitio para que la prueba de accesibilidad la encuentre.
        </li>
        <li>
          <strong>Piensa en accesibilidad desde el inicio.</strong> Nombre en cada control, etiquetas visibles,
          buen contraste, que funcione con teclado y que respete «menos movimiento».
        </li>
      </ul>

      <ul className={styles.ideas}>
        {ideas.map((idea) => (
          <li key={idea.title} className={styles.idea}>
            <h3 className={styles.ideaTitle}>{idea.title}</h3>
            <p className={styles.description}>{idea.description}</p>
            <p className={styles.accessibility}>
              <span className={styles.accessibilityLabel}>Accesibilidad:</span> {idea.accessibility}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
