---
title: ASP.NET MVC with Authentication and DB-First
---

# ASP.NET MVC with Authentication and DB-First

Goal: Build an ASP.NET Core MVC application with Entity Framework Core that manages domain entities with role-based authentication and authorization.

## 1. Create the MVC Project

- Create a new **ASP.NET Core Web App (MVC)** project on .NET 8.
- Enable HTTPS.
- Enable Individual Accounts authentication.

## 2. Add Dependencies

Install EF Core + Identity packages compatible with .NET 8.

## 3. Configure Connection Strings

In `appsettings.json`, define one or two connection strings depending on whether app data and identity data share the same database.

## 4. Reverse Engineer Models and DbContext

Use **EF Core Power Tools** or `Scaffold-DbContext`.

Example:

```sh
Scaffold-DbContext "Name=DefaultConn" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -ContextDir Data -Context AppContext -DataAnnotations
```

## 5. Register Services in `Program.cs`

- Register DbContexts with `AddDbContext`.
- Register Identity.
- Enable authentication and authorization middleware.
- Map Razor pages.

## 6. Migrations and Seeding

Use migrations to evolve schema and optional seed data.

```sh
Add-Migration InitialCreate -Context IdentityContext -OutputDir Data/Migrations
Update-Database -Context IdentityContext
```

## 7. Authentication UI

Scaffold Identity pages (Login, Register, Logout) when customization is needed.

## 8. Protect Controllers with Roles

```csharp
[Authorize(Roles = "admin")]
public class AdminController : Controller
{
  public IActionResult Index() => View();
}
```

## 9. Validation

Use data annotations such as `[Required]`, `[Range]`, and `[EmailAddress]` in model properties.

## 10. Optional Enhancements

- Pagination and sorting
- Filtering UI
- Better error handling and logging
