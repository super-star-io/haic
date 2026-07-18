# Plan de implementación — 010

## Resumen

Crear un arreglo `teamMembers` con contenido editorial y renderizarlo mediante `map()` en una cuadrícula `repeat(auto-fit, minmax(...))`. Copiar las fotografías proporcionadas a `public/team/` y conservar los originales intactos.

## Escalabilidad

Cada integrante es un objeto con `name`, `role`, `education`, `description` e `imageUrl`. Agregar una tarjeta sólo requiere añadir un objeto; la cuadrícula redistribuye columnas automáticamente.

## Privacidad

Sólo se publican nombre, formación y fotografía entregados explícitamente para este fin. No se muestran correos ni datos de cuenta.

