# Sisorg Front (React + Vite + MUI)

SPA que permite subir un TXT con filas `Name#Value#Color`, ver el resultado en **tabla** y en **gráfico de barras**.
> **Importante:** Antes de correr el front, levantá **backend + base de datos**.

---

## 1 Prerrequisitos

- **Docker** y **Docker Compose** instalados (para DB y/o API)
- **Node.js** `>= 20.19` o `>= 22.12`  
  Recomendado: usar `nvm`
  ```bash
  nvm use 22.12.0
  ```

---

## 2 Levantar Backend + DB primero

### Opción A: Todo con Docker Compose (recomendada)

En el root del backend (donde está `docker-compose.yml`):
```bash
docker compose up -d
```
Esto levanta **MySQL** y la **API** .  
Cuando esté arriba, la API queda en algo como: `http://localhost:5196`.

### Opción B: DB en Docker + API local

1. Levantá **MySQL** con `docker compose up -d`.

2. Corré la API local:
   ```bash
   dotnet run --project Sisorg.Api
   ```

3. Verificá Swagger en: `http://localhost:5196/swagger`

---

## 3 Configurar el Front

En la carpeta del front (`sisorg-front/`), crear un archivo **`.env.local`** con la URL de la API:
```env
VITE_API_URL=http://localhost:5196
```
> 

---

## 4 Instalar y correr

```bash
npm i
npm run dev
```
Abrí la URL que te muestra Vite (usualmente `http://localhost:5173`).

---

## 5) Uso

1. En la home, subí un archivo `.txt` con este formato (ejemplo válido):
   ```txt
   Argentina#1500#FF0000
   Brazil#4005#00FF00
   Colombia#345#0000FF
   ```
   - **Name**: letras/números, sin espacios.
   - **Value**: dígitos (entero).
   - **Color**: 6 hex dígitos (sin `#`).

2. Serás redirigido a `/registry/:id`:
   - Tabla con las filas.
   - **Gráfico de barras**.
   - Botón para **borrar** el registro (bonus).

3. Si hay error de validación, aparece un mensaje claro en el front (alert/snackbar) y el backend devuelve JSON con `code/message/correlationId`.

---

## 6 Estructura (Atomic Design)

```
src/
  api/
    api.ts
    registries.ts         
  hooks/
    useRegistries.ts     
  types/
    registry.ts           
  components/
    atoms/
      ColorDot.tsx
      ErrorSnackbar.tsx
      FileInputButton.tsx
    molecules/
      UploadField.tsx
      RowList.tsx
    organisms/
      UploadCard.tsx
      RegistrySummary.tsx
      RowsBarChart.tsx    
    pages/
      HomePage.tsx         
      RegistryPage.tsx    
  app/
    queryClient.ts         
    router.tsx            
  main.tsx
```

---

## 7 Scripts útiles

```bash
npm run dev      # modo desarrollo
npm run build    # build de producción
npm run preview  # previsualizar build
```

---

## 8 Problemas comunes

- **Vite/rolldown “native binding not found”**  
  Suele pasar por bug de npm con dependencias opcionales. Solución:
  ```bash
  # PowerShell en Windows
  Remove-Item -Recurse -Force node_modules
  Remove-Item -Force package-lock.json
  npm cache clean --force
  npm i
  ```

- **“Unsupported engine … requires Node 20.19+ / 22.12+”**  
  Actualizá Node con `nvm use 22.12.0` y reinstalá dependencias.

- **Mensaje “Console Ninja” bloquea Vite**  
  Es un plugin/terminal que interfiere. Abrí una terminal del sistema (PowerShell/CMD) y corré `npm run dev` ahí.

---

## 9 Endpoints usados por el Front

- `POST /api/registries` (multipart key: `file`)
- `GET  /api/registries/{id}`
- `DELETE /api/registries/{id}`

Swagger: `/swagger`

---

## 10) Checklist rápido de Docker (backend)

Si tus archivos son los que venís usando, están **OK** siempre que cumplan esto:

- **docker-compose.yml**
  - Servicio `mysql` (o `db`) con:
    - Imagen `mysql:8.0`
    - Variables: `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_ROOT_PASSWORD`
    - Puerto expuesto `3306:3306`
    - `healthcheck` (opcional, recomendable)
    - Volume para persistencia
  - Servicio `api` con:
    - `build` apuntando a `Sisorg.Api`
    - `ASPNETCORE_URLS=http://+:8080`
    - `ports: ["5196:8080"]` (o el que uses)
    - `depends_on` la DB (idealmente `condition: service_healthy`)
    - `ConnectionStrings__Default=server=db;port=3306;database=sisorg;user=sisorg;password=sisorg;TreatTinyAsBoolean=false`

- **Dockerfile de la API**
  - Multi-stage (SDK 8.0 para build + ASP.NET 8.0 runtime)
  - `EXPOSE 8080`
  - `ENTRYPOINT ["dotnet", "Sisorg.Api.dll"]`
