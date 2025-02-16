---
tit: PLC (Procedure Language Construct)
---

- DECLARE
- SET
- IF, IF EXISTS
- IF-ELSE
- WHILE
- FOR
- LOOP
- EXIT
- CASE
- GOTO

> Example with all PCL syntaxis

```sql
CREATE PROCEDURE calculate_total_sales()
BEGIN
  DECLARE total_sales DECIMAL(10, 2);
  DECLARE sale_price DECIMAL(10, 2);
  DECLARE sale_quantity INT;
  DECLARE sale_cursor CURSOR FOR SELECT price, quantity FROM sales;

  SET total_sales = 0;
  OPEN sale_cursor;

  sale_loop: LOOP
    FETCH sale_cursor INTO sale_price, sale_quantity;
    IF sale_price IS NULL THEN
      LEAVE sale_loop;
    END IF;
    SET total_sales = total_sales + (sale_price * sale_quantity);
  END LOOP sale_loop;

  CLOSE sale_cursor;
  SELECT total_sales;
END;
```
