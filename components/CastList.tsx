import type { CastMember } from "@/lib/telenovelas";
import styles from "./CastList.module.css";

export function CastList({ cast }: { cast: CastMember[] }) {
  return (
    <ul className={styles.list}>
      {cast.map((member) => (
        <li key={member.name} className={styles.member}>
          <span className={styles.avatar} aria-hidden="true">
            {member.name.charAt(0)}
          </span>
          <div>
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.role}>
              {member.role} · {member.breed}
            </p>
            <p className={styles.bio}>{member.bio}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
