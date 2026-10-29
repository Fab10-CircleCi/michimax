// Genera los íconos y la imagen para compartir a partir de los logos originales (no se versionan).
// Uso: npm run brand -- <carpeta-con-los-originales>   (por defecto, la raíz del proyecto)
//
//   simbolo.jpeg  App icon: huella dorada con botón de reproducir, en un cuadro redondeado
//   favicon.jpeg  Huella dorada simple sobre un cuadro
//   logo.jpeg     Logo horizontal: huellas, «Michimax» y «AHORA EN STREAMING»
//
// Si no existen con esos nombres, se usan los de Gemini (Gemini_Generated_Image_…).
import { existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const source = resolve(process.argv[2] ?? root);
const GEMINI = "Gemini_Generated_Image_1c4wn11c4wn11c4w";
const BACKGROUND = "#1a0b16";

function input(name: string, gemini: string): string {
  const preferred = join(source, name);
  const fallback = join(source, gemini);
  const path = existsSync(preferred) ? preferred : fallback;
  if (!existsSync(path)) throw new Error(`Falta ${name} (o ${gemini}) en ${source}`);
  return path;
}

/** El app icon trae esquinas blancas fuera del cuadro redondeado: se recorta al 75 % central. */
async function symbol(size: number) {
  const path = input("simbolo.jpeg", `${GEMINI}.jpeg`);
  const { width = 0, height = 0 } = await sharp(path).metadata();
  const crop = Math.round(Math.min(width, height) * 0.75);
  return sharp(path)
    .extract({ left: Math.round((width - crop) / 2), top: Math.round((height - crop) / 2), width: crop, height: crop })
    .resize(size, size);
}

async function main() {
  mkdirSync(join(root, "public", "brand"), { recursive: true });

  const favicon = input("favicon.jpeg", `${GEMINI} (2).jpeg`);
  await sharp(favicon).resize(256, 256).png({ palette: true, colors: 64 }).toFile(join(root, "app", "icon.png"));

  await (await symbol(180)).png({ palette: true }).toFile(join(root, "app", "apple-icon.png"));
  await (await symbol(96)).png({ palette: true }).toFile(join(root, "public", "brand", "michimax-simbolo.png"));

  const logo = input("logo.jpeg", `${GEMINI} (1).jpeg`);
  await sharp(logo)
    .resize(1200, 630, { fit: "cover", position: "centre", background: BACKGROUND })
    .jpeg({ quality: 82 })
    .toFile(join(root, "app", "opengraph-image.jpg"));

  console.log("✔ app/icon.png, app/apple-icon.png, app/opengraph-image.jpg, public/brand/michimax-simbolo.png");
}

await main();
