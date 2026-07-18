# Invariantes del sistema

Estas reglas no pueden romperse sin una decisión arquitectónica explícita y aprobada.

1. El registro público crea usuarios sin privilegios administrativos.
2. Sólo un superadministrador autenticado puede elevar a otro usuario a superadministrador.
3. El primer superadministrador requiere una activación manual, auditable y fuera del flujo público.
4. Toda autorización sensible se aplica del lado del servidor.
5. Una sesión válida debe persistir durante la navegación hasta expirar o cerrarse explícitamente.
6. Un usuario suspendido no accede a contenido protegido ni a administración.
7. El detalle de un proyecto respeta el nivel mínimo configurado para su entrada.
8. Los cambios de rol, estado, acceso y contenido administrativo generan trazabilidad.
9. Ninguna respuesta expone contraseñas, hashes, tokens, secretos ni cookies de sesión.
10. No se despliega, publica ni modifica infraestructura remota sin autorización explícita.
11. Los cambios existentes del propietario se conservan; una especificación sólo toca archivos declarados en su alcance.
12. Toda migración de datos incluye impacto, compatibilidad y procedimiento de recuperación.

