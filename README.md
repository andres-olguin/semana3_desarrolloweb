# NexusTech Store - Campus Hub UNAB (2026)

Marketplace de hardware y soluciones informáticas para la comunidad universitaria. Proyecto del **Taller Evaluado 1 - Desarrollo Web y Móvil**[cite: 2].

---

## 👥 Equipo y Quién Habla de Qué (Según el PPT)

1. **Miguel Margas** - *Catálogo & Transacciones*[cite: 2]
   - **Diapo 02 (Problemática 4):** Ventas dispersas en WhatsApp/Instagram, falta de filtros técnicos y desconfianza sin seguimiento[cite: 2].
   - **Diapo 06 (Transacciones):** Validación de formularios en cliente (`was-validated`) y checkout simulado con código de seguimiento (`TRK-XXXXXX`)[cite: 1, 2].
2. **Enrique Chamys** - *Arquitectura & Git Flow*[cite: 2]
   - **Diapo 03 (Arquitectura):** Stack 100% nativo (HTML5, CSS3, Bootstrap 5.3 nativo, JS Vanilla) sin React, sin frameworks pesados y sin backend[cite: 2].
   - **Diapo 08 (Git Flow):** Rama `main` en producción con GitHub Pages, `develop` para integrar y ramas `feature/*` por tarea[cite: 2].
3. **Maximiliano Valdés** - *Experiencia de Compra*[cite: 2]
   - **Diapo 04 (Catálogo Masivo):** 2.400 productos creados en memoria con bucles y combinatoria, renderizando solo 24 por página (`slice`) para que no haya lag[cite: 2].
   - **Diapo 05 (Modales & Offcanvas):** Ventana de detalle del producto, opiniones de alumnos con estrellas y el menú lateral del carrito sumando subtotales[cite: 2].
4. **Andrés Olguín** - *Autenticación, Persistencia & Mobile*[cite: 2]
   - **Diapo 07 (Persistencia):** `localStorage` para recordar el usuario activo ('A Andrés') al recargar con F5[cite: 2], vs el carrito que se guarda en arrays volátiles[cite: 2].
   - **Diseño Mobile:** Barra de navegación fija arriba (`fixed-top`)[cite: 1], grilla responsiva de Bootstrap (`row-cols-1`, `md-2`, `xl-3`)[cite: 2] y botones compactos que no se rompen en celulares.

---

## 💡 Respuestas Rápidas para la Comisión (Machete Rápido)

- **¿Por qué no hay backend ni base de datos?**
  Porque la rúbrica exigía probar dominio técnico nativo de frontend (HTML/CSS/JS)[cite: 2]. Todo funciona en cliente usando arrays en memoria y la Web Storage API[cite: 2].
- **¿Por qué la página no se pega con 2.400 productos?**
  Los 2.400 existen solo como variables en la memoria RAM[cite: 2]. En la pantalla (DOM) solo se insertan 24 a la vez según la página activa[cite: 2].
- **¿Por qué el carrito se borra con F5 pero el usuario no?**
  La sesión se guarda en el disco del navegador con `localStorage.setItem()`[cite: 1, 2]. El carrito se guarda en una variable común de JavaScript (`let carrito = []`) que se limpia al reiniciar la pestaña[cite: 1, 2].
- **¿Cómo validan que no manden campos vacíos?**
  Se usa `form.checkValidity()` de JavaScript con la clase `was-validated` de Bootstrap[cite: 1, 2], lo que pinta los bordes rojos o verdes sin tener que recargar[cite: 2].

---

## 🚀 Comandos de Git para Subir los Cambios

```bash
git add index.html css/styles.css js/main.js README.md
git commit -m "docs: simplify comments, add README cheat sheet and sync project"
git push origin main