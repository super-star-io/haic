# Activación del primer superusuario HAIC

El registro público nunca permite elegir roles. Todos los usuarios nuevos comienzan como usuarios `standard` con nivel 1, excepto el correo configurado manualmente como usuario fundador.

## Activación inicial

1. Define `HAIC_BOOTSTRAP_SUPERUSER_EMAIL` en el entorno publicado con el correo exacto que utilizará el fundador al iniciar sesión.
2. Inicia sesión con ese correo y completa `/registro`.
3. La plataforma crea esa primera cuenta con rol `superadmin` y nivel 100.
4. Entra a `/admin` y usa la sección **Usuarios** para nombrar administradores o superusuarios adicionales.
5. Después del alta inicial puedes retirar la variable del entorno. El rol ya quedó persistido en la base de datos.

Si el correo ya se registró antes de definir la variable, deberá promoverse mediante una operación administrativa controlada en la base de datos. No existe una ruta pública para reclamar el rol.

## Reglas de seguridad incorporadas

- La identidad se verifica antes de crear el perfil HAIC.
- Los permisos se vuelven a comprobar en el servidor para cada lectura o escritura protegida.
- Sólo un superusuario puede crear otro superusuario.
- Sólo los superusuarios pueden crear, editar, publicar o archivar entradas.
- Los administradores gestionan usuarios, pero no tienen acceso al panel editorial.
- Un administrador no puede suspender su propia cuenta.
- Cambios editoriales y de acceso generan registros de auditoría.
- Las entradas se archivan en lugar de eliminarse definitivamente.
