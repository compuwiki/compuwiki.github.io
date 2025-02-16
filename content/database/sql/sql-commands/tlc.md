---
title: TCL (Transaction Control Language)
---

- [COMMIT](TCL.md#commit)
  - [Autocommit](TCL.md#commit)
- [ROLLBACK](TCL.md#commit)
- [SAVEPOINT](TCL.md#)

- To start a transaction

```sql
START TRANSACTION;

-- Autocommit
SELECT @@AUTOCOMMIT;

SET AUTCOMMIT = 0; -- autocommit to false
SET AUTCOMMIT = 1; -- autocommit to true

-- COMMIT. To finish a transaction, use commit or rollback
COMMIT;

-- SAVEPOINT
SAVEPOINT PuntoGuardado1;

-- ROLLBACK. start again the transaction
ROLLBACK;
ROLLBACK TO SAVEPOINT PuntoGuardado2;

EXEC sp_columns peliculas
```
