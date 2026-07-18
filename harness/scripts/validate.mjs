import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const requiredFiles = [
  "README.md",
  "context/product.md",
  "context/architecture.md",
  "context/invariants.md",
  "process/sdd-workflow.md",
  "process/definition-of-done.md",
  "templates/spec.md",
  "templates/plan.md",
  "templates/tasks.md",
  "templates/verification.md",
  "templates/adr.md",
  "checklists/security.md",
  "checklists/release.md",
  "specs/000-platform-baseline/spec.md",
  "specs/000-platform-baseline/verification.md",
];

const errors = [];

for (const file of requiredFiles) {
  try {
    await access(resolve(root, file));
  } catch {
    errors.push(`Falta: ${file}`);
  }
}

const invariants = await readFile(resolve(root, "context/invariants.md"), "utf8").catch(() => "");
for (const phrase of ["servidor", "superadministrador", "No se despliega"]) {
  if (!invariants.includes(phrase)) errors.push(`Invariante no encontrado: ${phrase}`);
}

if (errors.length) {
  console.error("Harness inválido:\n" + errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Harness HAIC válido: ${requiredFiles.length} archivos requeridos presentes.`);
}
