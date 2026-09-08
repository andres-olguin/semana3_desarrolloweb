# NexusTech Store - Campus Hub UNAB (2026)

Marketplace de hardware y soluciones informáticas para la comunidad universitaria. Proyecto del **Taller Evaluado 1 - Desarrollo Web y Móvil**.

---

## 👥 Equipo y Quién Habla de Qué (Según el PPT)

1. **Miguel Margas** - *Catálogo & Transacciones*
   - **Diapo 02 (Problemática 4):** Ventas dispersas en WhatsApp/Instagram, falta de filtros técnicos y desconfianza sin seguimiento.
   - **Diapo 06 (Transacciones):** Validación de formularios en cliente (`was-validated`) y checkout simulado con código de seguimiento (`TRK-XXXXXX`).
2. **Enrique Chamys** - *Arquitectura & Git Flow*
   - **Diapo 03 (Arquitectura):** Stack 100% nativo (HTML5, CSS3, Bootstrap 5.3 nativo, JS Vanilla) sin React, sin frameworks pesados y sin backend.
   - **Diapo 08 (Git Flow):** Rama `main` en producción con GitHub Pages, `develop` para integrar y ramas `feature/*` por tarea.
3. **Maximiliano Valdés** - *Experiencia de Compra*
   - **Diapo 04 (Catálogo Masivo):** 2.400 productos creados en memoria con bucles y combinatoria, renderizando solo 24 por página (`slice`) para que no haya lag.
   - **Diapo 05 (Modales & Offcanvas):** Ventana de detalle del producto, opiniones de alumnos con estrellas y el menú lateral del carrito sumando subtotales.
4. **Andrés Olguín** - *Autenticación, Persistencia & Mobile*
   - **Diapo 07 (Persistencia):** `localStorage` para recordar el usuario activo ('A Andrés') al recargar con F5, vs el carrito que se guarda en arrays volátiles.
   - **Diseño Mobile:** Barra de navegación fija arriba (`fixed-top`), grilla responsiva de Bootstrap (`row-cols-1`, `md-2`, `xl-3`) y botones compactos que no se rompen en celulares.

---

## 💡 Respuestas Rápidas para la Comisión (Machete Rápido)

- **¿Por qué no hay backend ni base de datos?**
  Porque la rúbrica exigía probar dominio técnico nativo de frontend (HTML/CSS/JS). Todo funciona en cliente usando arrays en memoria y la Web Storage API.
- **¿Por qué la página no se pega con 2.400 productos?**
  Los 2.400 existen solo como variables en la memoria RAM. En la pantalla (DOM) solo se insertan 24 a la vez según la página activa.
- **¿Por qué el carrito se borra con F5 pero el usuario no?**
  La sesión se guarda en el disco del navegador con `localStorage.setItem()`. El carrito se guarda en una variable común de JavaScript (`let carrito = []`) que se limpia al reiniciar la pestaña.
- **¿Cómo validan que no manden campos vacíos?**
  Se usa `form.checkValidity()` de JavaScript con la clase `was-validated` de Bootstrap, lo que pinta los bordes rojos o verdes sin tener que recargar.

---

## Comandos de Git para Subir Cambios

git add index.html css/styles.css js/main.js README.md
git commit -m "docs: simplify comments, add README cheat sheet and sync project"
git push origin main