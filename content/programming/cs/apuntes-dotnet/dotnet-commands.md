# .NET

.NET (previously named .NET Core) is a FOSS software framework from Microsoft for C#, Visual Basic, and F#. It is designed to be cross-platform, modular and apt for modern applications, as opposed to its predecessor, the .NET Framework.

## Installation

On Arch Linux: `sudo pacman -S dotnet-runtime dotnet-sdk aspnet-runtime`
On Debian/GNU Linux: `sudo apt install dotnet-sdk`
On Fedora Linux: `sudo dnf install dotnet-sdk`
On macOS: `brew tap caskroom/cask & brew cask install dotnet`
On MS Windows: `winget install Microsoft.DotNet.SDK.7`

## .NET commands

Here are the `dotnet` commands mentioned in our previous discussions and their purposes:

- `dotnet new console -n YourProjectName`: creates a new Console project with the specified name.
- `dotnet new razor -n YourProjectName`: creates a new Razor project with the specified name.

- `dotnet build`: compiles the project and creates the necessary binaries.
- `dotnet restore`: restores the project's dependencies and downloads any required packages.
- `dotnet run`: builds and runs the project, starting a local development server or application.

- `dotnet clean`: cleans the project, removing build artifacts.

- `dotnet --version`: is used to check the installed version of the .NET SDK.
- `dotnet --list-sdks`: lists the installed .NET SDKs on your system.
- `dotnet --global upgrade`: is used to upgrade the global .NET SDK to the latest version.

These commands are essential for managing and working with .NET projects in Visual Studio Code and other development environments. Depending on your project's requirements, you'll use these commands to create, build, run, and maintain your .NET applications.

> Example for creating a Razor project

```sh
dotnet new console -n YourProjectName
cd YourProjectName
dotnet build
dotnet run
```


## References
- https://github.com/dotnet/core
- https://learn.microsoft.com/en-us/dotnet/core/install/linux
- https://wiki.archlinux.org/title/.NET
