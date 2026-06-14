---
title: Connect MySQL from a Spring Java Project
---

# Guide: Connect MySQL from a Spring Java Project Deployed on Tomcat

This guide explains how to connect a Maven + Spring Java project (deployed on Apache Tomcat) to a local MySQL database running in XAMPP.

## 1. Start MySQL in XAMPP

1. Open **XAMPP Control Panel** (`xampp-control.exe`).
2. Start **Apache** and **MySQL**.
3. Open **phpMyAdmin** (`http://localhost/phpmyadmin`).

Create a database user and grant privileges, then create a sample database (`animaldb`) and table.

## 2. Create a Spring Project

Use [Spring Initializer](https://start.spring.io/) with:

- Project: Maven
- Language: Java
- Dependencies: Spring Web, Spring Data JPA, Thymeleaf

## 3. Configure `application.properties`

```txt
spring.application.name=demo
spring.jpa.hibernate.ddl-auto=validate
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:localhost}:3306/animaldb
spring.datasource.username=your_user
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

## 4. Add Dependencies

If you use Maven, include the MySQL connector in `pom.xml`:

```xml
<dependency>
  <groupId>com.mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
  <version>9.2.0</version>
</dependency>
```

## 5. IntelliJ Database Connection

### Community Edition

- Open **JPA Explorer**.
- Add a MySQL connection in DB Connections.
- Test connection and download drivers if needed.

### Ultimate Edition

- Open **View -> Tool Windows -> Database**.
- Use URL: `jdbc:mysql://localhost:3306/animaldb`.

## 6. Three-Layer Architecture

Typical layering:

- Entity (Model)
- Repository
- Service
- Controller
- Thymeleaf views

## 7. Basic Example

### Entity

```java
@Entity
@Table(name = "animal")
public class Animal {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private Integer averageLifespan;

  @Column(nullable = false)
  private Boolean extinct;
}
```

### Repository

```java
@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
```

### Service

```java
@Service
public class AnimalService {
  @Autowired
  private AnimalRepository animalRepository;

  public List<Animal> getAll() {
    return animalRepository.findAll();
  }
}
```

### Controller

```java
@Controller
public class AnimalController {
  @Autowired
  private AnimalService animalService;

  @GetMapping("/animals")
  public String listAnimals(Model model) {
    model.addAttribute("animals", animalService.getAll());
    return "animals";
  }
}
```
