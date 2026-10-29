// Optimiza el material del catálogo para el repositorio (los originales pesan ~340 MB).
// Requisitos: ffmpeg en el PATH.
// Uso: npm run media -- <carpeta-origen>   (por defecto ./netflix-CATalog-human)
//
// Por cada carpeta "NN-slug/" del origen genera en public/titulos/<slug>/:
//   - still-1.webp, still-2.webp, still-3.webp  (540×945)
//   - clip.mp4                                  (480×832, H.264, sin audio)
// Los tiles de 9 s se omiten: son el mismo clip seguido de los fotogramas.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const source = resolve(process.argv[2] ?? join(root, "netflix-CATalog-human"));
const output = join(root, "public", "titulos");
const STILL_WIDTH = 540;
const STILL_HEIGHT = 945;

function kilobytes(path: string): string {
  return `${Math.round(statSync(path).size / 1024)} KB`;
}

async function main() {
  const folders = readdirSync(source, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  if (folders.length === 0) {
    throw new Error(`No se encontraron carpetas NN-slug en ${source}`);
  }

  for (const folder of folders) {
    const slug = folder.replace(/^\d{2}-/, "");
    const from = join(source, folder);
    const to = join(output, slug);
    mkdirSync(to, { recursive: true });

    for (const still of ["still-1", "still-2", "still-3"]) {
      const input = join(from, `${still}.png`);
      if (!existsSync(input)) throw new Error(`Falta ${input}`);
      await sharp(input)
        .resize(STILL_WIDTH, STILL_HEIGHT, { fit: "cover" })
        .webp({ quality: 72, effort: 6 })
        .toFile(join(to, `${still}.webp`));
    }

    const clip = join(to, "clip.mp4");
    execFileSync("ffmpeg", [
      "-y", "-loglevel", "error",
      "-i", join(from, "clip-6s.mp4"),
      "-an",
      "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-profile:v", "main", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      clip,
    ]);

    console.log(`✔ ${slug}  clip ${kilobytes(clip)}  still-1 ${kilobytes(join(to, "still-1.webp"))}`);
  }
}

await main();
