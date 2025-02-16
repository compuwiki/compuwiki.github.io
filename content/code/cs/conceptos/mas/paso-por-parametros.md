# Paso por parámetros

Parámetros por: 
- Copia. Genera un nuevo espacio en memoria con una copia de las variables)
- Nombre (`out, ref`). Si cambia su contenido
- Referencia. No existe en C#.

Sin embargo las tablas o arrays y strings apuntan a la referencia en memoria por tanto al copiarse, se copia el hueco en memoria.

El string es un dato invariante.

s = "Hola";
s = s + '*';

Genera un nuevo string s = "Hola*"
