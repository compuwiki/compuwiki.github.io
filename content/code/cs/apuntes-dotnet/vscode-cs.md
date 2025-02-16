Claro, puedo ayudarte a configurar un proyecto de C# en Visual Studio Code. Sigue estos pasos:

1. **Instala Visual Studio Code**: Si aún no tienes Visual Studio Code instalado en tu sistema Arch Linux, puedes hacerlo desde la terminal con el siguiente comando:

   ```
   # winget install vscode
   # apt install code
   # yay -S visual-studio-code-bin
   ```

2. **Instala el complemento C#**: Abre Visual Studio Code y ve a la pestaña de extensiones en la barra lateral izquierda (icono de cuatro cuadrados). Busca "C#" y selecciona la extensión oficial de Microsoft para C#. Instálala.

3. **Crea un nuevo proyecto**: Ahora, vamos a crear un nuevo proyecto. Abre la terminal y navega hasta la ubicación donde desees crear el proyecto. Luego, ejecuta el siguiente comando para crear un nuevo proyecto de consola C#:

   ```
   dotnet new console -n NombreDelProyecto
   ```

   Asegúrate de reemplazar `NombreDelProyecto` con el nombre que desees para tu proyecto.

4. **Abre el proyecto en Visual Studio Code**: Ve a "File" (Archivo) -> "Open Folder" (Abrir Carpeta) y selecciona la carpeta de tu proyecto recién creado.

5. **Configura el lanzamiento (Run)**: Visual Studio Code detectará automáticamente que se trata de un proyecto C#. En la parte inferior del editor, deberías ver un botón de "Run" (Ejecutar). Si no lo ves, puedes crear un archivo `launch.json` en la carpeta `.vscode` de tu proyecto. Puedes usar una configuración como esta:

   ```json
   {
       "version": "0.2.0",
       "configurations": [
           {
               "name": ".NET Core Launch (console)",
               "type": "coreclr",
               "request": "launch",
               "preLaunchTask": "build",
               "program": "${workspaceFolder}/bin/Debug/netcoreappX.X/NombreDelProyecto.dll",
               "args": [],
               "cwd": "${workspaceFolder}",
               "stopAtEntry": false,
               "serverReadyAction": {
                   "action": "openExternally",
                   "pattern": "\\bNow listening on:\\s+(https?://\\S+)"
               },
               "env": {
                   "ASPNETCORE_ENVIRONMENT": "Development"
               },
               "sourceFileMap": {
                   "/Views": "${workspaceFolder}/Views"
               }
           }
       ]
   }
   ```

   Asegúrate de reemplazar `netcoreappX.X` con la versión de .NET Core que estás utilizando y `NombreDelProyecto` con el nombre de tu proyecto.

6. **Escribe tu código**: Ahora puedes escribir tu código C# en los archivos generados en tu proyecto.

7. **Ejecuta tu programa**: Para ejecutar tu programa, simplemente haz clic en el botón "Run" en la parte inferior o utiliza la combinación de teclas F5.

Espero que estos pasos te ayuden a configurar un proyecto de C# en Visual Studio Code en tu máquina con Arch Linux. Si tienes alguna pregunta adicional o necesitas más ayuda, no dudes en preguntar.