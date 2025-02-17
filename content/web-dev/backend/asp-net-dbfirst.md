---
title: ASP.NET MVC con Auth y DbFirst
---

<!-- # **Guía ASP.NET MVC con Auth y DbFirst** ✨ -->

**Objetivo:** Crear una aplicación web en ASP.NET Core MVC con Entity Framework Core que gestione discos y clientes con autenticación y autorización basadas en roles y vistas. Esta práctica se desarrollará sobre la base de datos **Chinook** y una base de datos de usuarios.

---

## **1️⃣ Crear el Proyecto ASP.NET MVC con Autenticación**

- Abrir Visual Studio y crear el proyecto "ASP.NET Core Web App (MVC)" con .NET8, configurar para HTTPS y autenticación con cuentas locales.

## **2️⃣ Agregar Dependencias**

> **Nota:** Estos paquetes incluyen herramientas de Entity Framework Core para scaffolding, autenticación con Identity y conexión a SQL Server.
> Usar la versión de paquetes nuget 8 para compatibilidad con .NET8 y el proyecto de la profesora

- A. Instala los paquetes necesarios mediante la interfaz gráfica de NuGet o ejecutando los siguientes comandos en la consola de NuGet Package Manager (en una sola línea separado por ";" o línea a línea):

```sh
Install-Package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore -Version 8.0.10; Install-Package Microsoft.AspNetCore.Identity.EntityFrameworkCore -Version 8.0.10; Install-Package Microsoft.AspNetCore.Identity.UI -Version 8.0.10; Install-Package Microsoft.EntityFrameworkCore.SqlServer -Version 8.0.10; Install-Package Microsoft.EntityFrameworkCore.Tools -Version 8.0.10; Install-Package Microsoft.VisualStudio.Web.CodeGeneration.Design -Version 8.0.7;
```

- B. Edita el archivo `.csproj` para incluir las dependencias de los paquetes nuget necesarios. (recomendado*)

```xml
  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore" Version="8.0.10" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="8.0.10" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.UI" Version="8.0.10" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.10" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.10">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="8.0.7" />
  </ItemGroup>
```

## **3️⃣ Configurar la Cadena de Conexión**

> Se recomienda tener una cadena de conexión por cada Base de Datos.

- Agregar la **ConnectionString** en `appsettings.json`, apuntando a la base de datos.
  - Si la BD contiene usuarios solo necesitamos una base de datos y una cadena de conexión.
  - Si la BD no contiene usuarios entonces hay que añadirlos, bien en la misma BD o creando una nueva (migration+update). Por tanto podrían ser una o dos cadenas de conexión.

```json
{
...
  "ConnectionStrings": {
    "DefaultConn": "Server=(localdb)\\MSSQLLocalDB;Database=__Chinook__;Trusted_Connection=True;MultipleActiveResultSets=True",
    "IdentityConn": "Server=(localdb)\\MSSQLLocalDB;Database=__Users__;Trusted_Connection=True;MultipleActiveResultSets=True"
  }
...
}
```

## **4️⃣ Generar Contexto y Modelos con Ingeniería Inversa**

> El comando "Scaffold-DbContext" solo necesita una cadena de conexión para conectarse a la base de datos

- Usar **EF Core Power Tools** o `Scaffold-DbContext` para generar el DB-Context y los modelos.
- Configuración en **EF Core Power Tools**:

```
Data source: Microsoft SQL Server (Microsoft SqlClient)
Server name: (localdb)\MSSQLLocalDB
Username:
Password:
Encrypt: Optional (False)
Authentication: Windows Authentication
Database name: <nombre_de_la_bd>
```

- Comando equivalente en la consola de paquete de Windows:

```sh
Scaffold-DbContext "Name=conn" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Tables Customer -ContextDir Data -Context IdentityNewContext -DataAnnotations

Scaffold-DbContext "Name=DefaultConn" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Tables Clientes, Cuentas -ContextDir Data -Context AlonsoContext -DataAnnotations
```

- Por defecto los `DbContext` se almacenan en el directorio `Data/`.

## **5️⃣ Registrar Servicios en `Program.cs`**

- Configurar la base de datos `AddDbContext()` , configurar identity `AddDbContext()`, añadir autenticación `UseAuthentication()` y mapeado de páginas Razor `MapRazorPages()`.

```csharp
builder.Services.AddDbContext<NameContext>(options =>
 options.UseSqlServer(Configuration.GetConnectionString("Connection__Name")));
builder.Services.AddDefaultIdentity<IdentityUser>(options => {
    options.SignIn.RequireConfirmedAccount = false;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 5;
}).AddRoles<IdentityRole>().AddEntityFrameworkStores<"Context__Name">();

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.UseMigrationsEndPoint();
else {
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapRazorPages();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.Run();
```

## **6️⃣ Modificar Contexto para actualizar BD (migración o sembrado)**

> [!NOTE] Lo ideal es un contexto por base de datos, para conectar cada BD independientemente. Podemos crear uno nuevo si es necesario o modificar los existentes.

> IdentityDbContext debe estar siempre o bien en un solo contexto o separado

- Si queremos añadir los usuarios `asp-net-users` podemos hacer que el contexto herede de IdentityDbContext. Además podemos añadir nuevas tablas (migration) o nuevos datos (seeding).

```csharp
public partial class IdentityContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    // Constructores
    public IdentityContext() { }

    public IdentityContext(DbContextOptions<IdentityContext> options)
        : base(options) { }

    // Configuración del modelo y sembrado de datos
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Sembrado de datos para la tabla TableX
        modelBuilder.Entity<TableX>().HasData(
            new TableX { ID = 3, Descripcion = "Serie" }
        );
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
```

```sh
# Generar la migración en base al contexto
Add-Migration InitialCreate -Context IdentityContext -OutputDir Data/Migrations

# Actualizar la base de datos aplicando la migración
Update-Database -Context IdentityContext

# Eliminar la última migración
# Remove-Migration -Context IdentityContext
```

## **7️⃣ Configurar Login y Registro**

> Si estás trabajando con **ASP.NET Core Identity** y usas "Authentication Type: Individual Accounts", **los usuarios ya vienen definidos** en la clase **`ApplicationUser`** que es una clase personalizada que hereda de `IdentityUser` y se configura automáticamente para manejar la autenticación y la autorización de los usuarios. Si Identity no está configurado tendrás que crear tu propio **`DbContext`** y los modelos correspondientes para los usuarios.

> [!NOTE]
> Para registrar y loguear usuarios podemos automatizar la creación del controlador y las vistas como "Nuevo elemento con Scaffold", pinchando encima de `Controllers` y `Add -> New Scaffold Item -> Identity`. Y luego seleccionando Login, Logout y Register

- Asignar el rol `"usuario"` por defecto al registrar nuevos usuarios:

```csharp
var roleResult = await _userManager.AddToRoleAsync(user, "usuario");
if (!roleResult.Succeeded)
{
 ModelState.AddModelError(string.Empty, "Failed to assign role.");
    return Page();
}
```

## **8️⃣ Agregar Botones de Autenticación en el Layout**

- Incluir `_LoginPartial` en `_Layout.cshtml` dentro del `<header>`:

```html
<div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
 <ul class="navbar-nav flex-grow-1"></ul>
    <partial name="_LoginPartial" />
</div>
```

## **9️⃣ Generar Controladores y Vistas personalizadas**

- Generar controladores y vistas con **Entity Framework**, luego personalizarlas.
- Proteger rutas con roles usando `[Authorize]`:

```csharp
[Authorize(Roles = "administrador, platinum")]
public class AdminNombreController : Controller
{
 // Acción visible solo para administradores
    [Authorize(Roles = "administrador")]
    public IActionResult ManageUsers()
    {
     // Lógica para gestionar usuarios
        return View();
    }

    // Acción visible para administradores y platinum
    public IActionResult ViewCustomers()
    {
     // Lógica para listar clientes
        return View();
    }
}
```

- Enlace para crear nuevo modelo dentro de otro modelo asociado

```html
<div>
    <a asp-action="Create" asp-controller="Series" asp-route-genreId="ViewData.GenreId">Crear nueva X</a>
</div>
```

## **🔟 Agregar validaciones a los modelos**

- **Agregar validaciones en los modelos:** Usa atributos de validación en las propiedades de los modelos, como `[Required]`, `[EmailAddress]`, `[Range]`, etc.

```csharp
[Required(ErrorMessage = "El campo es obligatorio")]
[Range(1, int.MaxValue, ErrorMessage = "Debe ser un número entero positivo")]
public int Precio { get; set; }
```

## **Extra**

- **Implementar paginación y ordenación en listas:**
  - Puedes usar la biblioteca `X.PagedList` o implementar paginación manual
  - Agrega funcionalidad de filtrado y ordenación en las listas de usuarios y clientes.
- **Filtrado en las vistas:**
  - Crea un formulario en la vista para filtrar datos por campos específicos.

```cs
    // GET: Series/Create (Permite seleccionar género)
    [Authorize(Roles = "administrador")]
    public IActionResult Create()
    {
        ViewBag.Genres = new SelectList(_context.Genres, "GenreId", "GenreName");
        return View();
    }

    // GET: Series/CreateForGenre/{genreId} (Fija el género desde la vista anterior)
    [Authorize(Roles = "administrador")]
    public IActionResult CreateForGenre(int genreId)
    {
        var genre = _context.Genres.Find(genreId);
        if (genre == null) return NotFound();

        var model = new Series { GenreId = genreId };
        ViewBag.GenreName = genre.GenreName;
        return View(model);
    }

    // POST: Series/Create (Con dropdown)
    [HttpPost]
    [ValidateAntiForgeryToken]
    [Authorize(Roles = "administrador")]
    public async Task<IActionResult> Create(Series model)
    {
        if (ModelState.IsValid)
        {
            _context.Series.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        ViewBag.Genres = new SelectList(_context.Genres, "GenreId", "GenreName");
        return View(model);
    }

    // POST: Series/CreateForGenre (Con género fijo)
    [HttpPost]
    [ValidateAntiForgeryToken]
    [Authorize(Roles = "administrador")]
    public async Task<IActionResult> CreateForGenre(Series model)
    {
        if (ModelState.IsValid)
        {
            _context.Series.Add(model);
            await _context.SaveChangesAsync();
            return RedirectToAction("Series", "Genre", new { id = model.GenreId });
        }

        ViewBag.GenreName = _context.Genres.Find(model.GenreId)?.GenreName;
        return View(model);
    }

```

---

### Comparación Rápida

| Característica           | **ViewBag**                         | **ViewData**                            | **Model Binding**                          |
| ------------------------ | ----------------------------------- | --------------------------------------- | ------------------------------------------ |
| **Tipo**                 | Dinámico (`dynamic`)                | Diccionario clave-valor (`Dictionary`)  | Modelo fuerte (clase tipada)               |
| **Verificación de Tipo** | No (errores en tiempo de ejecución) | No (errores en tiempo de ejecución)     | Sí (verificación en tiempo de compilación) |
| **Uso**                  | Datos pequeños y simples            | Datos pequeños y simples                | Datos complejos o entidades completas      |
| **Ideal Para**           | Datos temporales o ligeros          | Datos simples entre controlador y vista | Modelos de datos complejos, formularios    |
| **Ventaja**              | Facilidad de uso                    | Más explícito que `ViewBag`             | Control y seguridad en datos complejos     |
