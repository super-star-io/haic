# Lista de seguridad

## Identidad y sesión

- [ ] Cookies `HttpOnly`, `Secure` en producción y política `SameSite` adecuada.
- [ ] La sesión se invalida al cerrar sesión y respeta expiración.
- [ ] Los callbacks OAuth usan orígenes y rutas permitidos.
- [ ] Mensajes de acceso no permiten enumerar cuentas.

## Autorización

- [ ] Cada endpoint sensible verifica usuario, estado, rol y nivel.
- [ ] No se aceptan roles o niveles enviados por el cliente como autoridad.
- [ ] La elevación de privilegios requiere un actor autorizado y queda auditada.
- [ ] Se probaron accesos horizontal y vertical no autorizados.

## Entradas y datos

- [ ] Validación de tipo, longitud, formato y valores permitidos.
- [ ] Consultas parametrizadas mediante el ORM.
- [ ] Contenido enriquecido se sanitiza antes de renderizarse.
- [ ] Logs y errores omiten secretos y datos innecesarios.

## Operación

- [ ] Secretos sólo en variables de entorno ignoradas por Git.
- [ ] Migraciones probadas con datos representativos.
- [ ] Existe procedimiento de recuperación para cambios destructivos.
- [ ] Dependencias nuevas tienen justificación y revisión básica.

