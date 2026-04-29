# Simulador QPACK

Este proyecto consiste en un simulador del algoritmo de compresión de encabezados QPACK, utilizado en HTTP/3.

El objetivo del simulador es mostrar de manera visual y simplificada cómo QPACK reduce el tamaño de los headers HTTP utilizando tablas e índices.

---

## ¿Qué es QPACK?

QPACK es un algoritmo de compresión de headers que forma parte del protocolo HTTP/3.

Su función es reducir la cantidad de datos transmitidos en la red, reemplazando headers repetidos por índices almacenados en tablas.

---

## ¿Cómo funciona el simulador?

El simulador implementa una versión simplificada del proceso de QPACK:

1. Se ingresan headers HTTP.
2. El sistema busca el header en:
   - Tabla estática
   - Tabla dinámica
3. Si el header existe:
   - Se reemplaza por un índice.
4. Si no existe:
   - Se envía como literal.
   - Se almacena en la tabla dinámica.

---

## Componentes del simulador

- **Resultado:** Muestra si el header fue codificado como índice o literal.
- **Tabla dinámica:** Almacena headers nuevos durante la ejecución.
- **Tabla estática:** Contiene headers predefinidos basados en el estándar.
- **Proceso QPACK:** Explica paso a paso lo que ocurre.
- **Estadísticas:** Muestra el ahorro en bytes.

---

## Tabla estática

La tabla estática utilizada en este simulador está basada en el estándar oficial:

RFC 9204 (QPACK):  
https://www.rfc-editor.org/rfc/rfc9204.html#appendix-A

Para facilitar la implementación, se usa una versión simplificada donde el nombre y el valor del header están combinados.

---

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript

El simulador funciona completamente en el navegador sin necesidad de servidor.

---

## Objetivo del proyecto

Este proyecto fue desarrollado con fines educativos para comprender el funcionamiento del algoritmo QPACK de manera visual y práctica.

---

## Notas

- La implementación es una simulación, no una implementación completa del protocolo.
- No se incluye codificación binaria real.
- Se enfoca en la comprensión conceptual del algoritmo.
- Otra fuente de información sobre Qpack: https://http3-explained.haxx.se/es/h3/h3-streams

---

## Autor

Proyecto desarrollado para la asignatura de Programación Web.
