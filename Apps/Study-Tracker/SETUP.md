# Development environment

Last verified on Windows 11 x64 on 2026-08-21.

## Required software

- Git with Git LFS
- .NET SDK 10 or newer for the Roslyn extraction service
- Node.js 24 or newer with npm for the role-specific MCP/API layer
- Python 3.12 with pip for confidence scoring and evaluation
- Docker Desktop with Linux containers and Docker Compose
- Neo4j Community Edition, pinned to the Docker image `neo4j:2026.07.1`

Java and Neo4j Desktop are not required when Neo4j runs in Docker. A local
SQL Server installation is also not required for static code analysis. The
Danphe database backup contains a FILESTREAM filegroup, so a full restore of
that backup requires Windows SQL Server; SQL Server on Linux does not support
FILESTREAM. The backup itself was integrity-checked with SQL Server 2022 in a
temporary Docker container.

## Verify the workstation

Open a new PowerShell window after installing software and run:

```powershell
git --version
git lfs version
dotnet --version
node --version
npm --version
python --version
pip --version
docker --version
docker compose version
docker info
```

## Start Neo4j locally

Use a strong local password in place of `CHANGE_ME_STRONG_PASSWORD`:

```powershell
docker run --name legana-neo4j --detach --restart unless-stopped `
  --publish 7474:7474 --publish 7687:7687 `
  --env NEO4J_AUTH=neo4j/CHANGE_ME_STRONG_PASSWORD `
  neo4j:2026.07.1
```

Neo4j Browser is then available at `http://localhost:7474`.

## Current implementation limitation

The dependency manifests are still empty: `LegAna.Core.csproj`,
`package.json`, and `requirements.txt`. Do not install guessed project
dependencies globally. Populate and pin those manifests when the first
executable vertical slice is implemented.
