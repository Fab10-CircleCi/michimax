import Image from "next/image";
import { stillPath, type Show } from "@/lib/catalog";
import styles from "./StillsGallery.module.css";

const NUMBERS = [1, 2, 3] as const;

export function StillsGallery({ show }: { show: Show }) {
  return (
    <ul className={styles.gallery}>
      {NUMBERS.map((number) => (
        <li key={number}>
          <Image
            className={styles.still}
            src={stillPath(show.slug, number)}
            alt={show.stills[number - 1]}
            width={540}
            height={945}
            sizes="(min-width: 900px) 200px, 30vw"
          />
        </li>
      ))}
    </ul>
  );
}
