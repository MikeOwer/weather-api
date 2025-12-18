# Weather API - Authentication & User Management

## Descripción

API REST con autenticación JWT implementada en Rails 8. Utiliza `has_secure_password` para el manejo seguro de contraseñas y tokens JWT para autenticación. Incluye integración con OpenWeather API para consultas de pronóstico del tiempo.

## Configuración Inicial

1. Instalar dependencias:
```bash
bundle install
```

2. Configurar variables de entorno:
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y agregar tu API key de OpenWeather
OPENWEATHER_API_KEY=tu_api_key_aqui
```

3. Crear y migrar la base de datos:
```bash
rails db:create
rails db:migrate
```

4. Iniciar el servidor:
```bash
rails server
```

---

## Endpoints de Autenticación

### 1. Registro de Usuario

**POST** `/auth/register`

Crea un nuevo usuario y devuelve un JWT token.

**Request:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response Success (201 Created):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDMxMjM0NTZ9.abc123...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "created_at": "2024-12-16T10:30:00.000Z"
  }
}
```

**Response Error (422 Unprocessable Entity):**
```json
{
  "errors": [
    "Email has already been taken",
    "Password is too short (minimum is 6 characters)"
  ]
}
```

---

### 2. Login de Usuario

**POST** `/auth/login`

Autentica un usuario existente y devuelve un JWT token.

**Request:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

**Request Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response Success (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDMxMjM0NTZ9.abc123...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "created_at": "2024-12-16T10:30:00.000Z"
  }
}
```

**Response Error (401 Unauthorized):**
```json
{
  "error": "Invalid email or password"
}
```

---

## Endpoints de Usuarios (Requieren Autenticación)

Todos los endpoints de usuarios requieren el header de autorización:
```
Authorization: Bearer <token>
```

### 3. Listar Todos los Usuarios

**GET** `/users`

**Request:**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

**Response Success (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "created_at": "2024-12-16T10:30:00.000Z",
    "updated_at": "2024-12-16T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "María García",
    "email": "maria@example.com",
    "created_at": "2024-12-16T11:00:00.000Z",
    "updated_at": "2024-12-16T11:00:00.000Z"
  }
]
```

**Response Error (401 Unauthorized):**
```json
{
  "error": "Unauthorized"
}
```

---

### 4. Obtener Usuario por ID

**GET** `/users/:id`

**Request:**
```bash
curl -X GET http://localhost:3000/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

**Response Success (200 OK):**
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "created_at": "2024-12-16T10:30:00.000Z",
  "updated_at": "2024-12-16T10:30:00.000Z"
}
```

**Response Error (404 Not Found):**
```json
{
  "error": "User not found"
}
```

---

### 5. Actualizar Usuario

**PUT** `/users/:id`

**Request:**
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos Pérez",
    "email": "juancarlos@example.com"
  }'
```

**Request Body:**
```json
{
  "name": "Juan Carlos Pérez",
  "email": "juancarlos@example.com",
  "password": "newpassword123"
}
```

**Response Success (200 OK):**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "name": "Juan Carlos Pérez",
    "email": "juancarlos@example.com",
    "created_at": "2024-12-16T10:30:00.000Z",
    "updated_at": "2024-12-16T14:20:00.000Z"
  }
}
```

**Response Error (422 Unprocessable Entity):**
```json
{
  "errors": [
    "Email has already been taken"
  ]
}
```

---

### 6. Eliminar Usuario

**DELETE** `/users/:id`

**Request:**
```bash
curl -X DELETE http://localhost:3000/users/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

**Response Success (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

**Response Error (404 Not Found):**
```json
{
  "error": "User not found"
}
```

---

## Endpoints de Weather (Requieren Autenticación)

### 7. Obtener Temperatura Actual de Todas las Ciudades

**GET** `/weather/current`

Obtiene la temperatura actual de todas las ciudades disponibles desde Reservamos, combinando datos de ambas APIs.

**Request:**
```bash
curl -X GET http://localhost:3000/weather/current \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

**Response Success (200 OK):**
```json
{
  "weather": [
    {
      "city_name": "Guadalajara",
      "temperature": 22.5,
      "weather_condition": "Clear",
      "weather_description": "clear sky",
      "lat": 20.6737,
      "long": -103.344
    },
    {
      "city_name": "Ciudad de México",
      "temperature": 18.3,
      "weather_condition": "Clouds",
      "weather_description": "scattered clouds",
      "lat": 19.4326,
      "long": -99.1332
    }
  ],
  "count": 2
}
```

**Notas:**
- Temperaturas en grados Celsius (°C)
- Datos cacheados por 10 minutos
- Combina información de Reservamos (ciudades) y OpenWeather (clima)

**Response Error (422 Unprocessable Entity):**
```json
{
  "error": "Failed to fetch weather data: connection timeout"
}
```

---

### 8. Obtener Pronóstico de 5 Días

**POST** `/weather/days`

Obtiene el pronóstico del tiempo de los próximos 5 días para una ubicación específica.

**Request Body:**
```json
{
  "lat": 40.7128,
  "lon": -74.0060
}
```

**Request:**
```bash
curl -X POST http://localhost:3000/weather/days \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
  -H "Content-Type: application/json" \
  -d '{"lat": 40.7128, "lon": -74.0060}'
```

**Response Success (200 OK):**
```json
[
  {
    "date": "2025-12-17",
    "temp_max": 23.5,
    "temp_min": 15.2,
    "weather_condition": "Rain",
    "weather_description": "light rain"
  },
  {
    "date": "2025-12-18",
    "temp_max": 25.1,
    "temp_min": 16.8,
    "weather_condition": "Clear",
    "weather_description": "clear sky"
  },
  {
    "date": "2025-12-19",
    "temp_max": 24.3,
    "temp_min": 17.5,
    "weather_condition": "Clouds",
    "weather_description": "scattered clouds"
  },
  {
    "date": "2025-12-20",
    "temp_max": 22.8,
    "temp_min": 16.1,
    "weather_condition": "Rain",
    "weather_description": "moderate rain"
  },
  {
    "date": "2025-12-21",
    "temp_max": 21.9,
    "temp_min": 15.3,
    "weather_condition": "Clear",
    "weather_description": "clear sky"
  }
]
```

**Notas:**
- Temperaturas en grados Celsius (°C)
- Datos cacheados por 10 minutos
- Agrupa pronósticos por día
- Devuelve temperaturas máximas y mínimas del día

**Response Error - Parámetros Faltantes (400 Bad Request):**
```json
{
  "error": "Missing required parameters: lat and lon are required"
}
```

**Response Error - Coordenadas Inválidas (400 Bad Request):**
```json
{
  "error": "Invalid coordinates: lat must be between -90 and 90, lon must be between -180 and 180"
}
```

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 OK | Solicitud exitosa |
| 201 Created | Recurso creado exitosamente |
| 400 Bad Request | Parámetros inválidos o faltantes |
| 401 Unauthorized | Token inválido o no proporcionado |
| 404 Not Found | Recurso no encontrado |
| 422 Unprocessable Entity | Errores de validación o API externa |
| 500 Internal Server Error | Error del servidor |

---

## Validaciones del Modelo User

- **name**: Requerido
- **email**: Requerido, único, formato válido
- **password**: Requerido en registro/login, mínimo 6 caracteres

---

## Estructura del Proyecto

```
app/
├── controllers/
│   ├── auth_controller.rb               # Registro y login
│   ├── users_controller.rb              # CRUD de usuarios
│   ├── weather_controller.rb            # Clima actual y pronóstico
│   └── concerns/
│       └── authenticable.rb             # Concern de autenticación
├── models/
│   └── user.rb                          # Modelo User con validaciones
└── services/
    ├── authentication_service.rb        # Lógica de autenticación
    ├── user_service.rb                  # Lógica de usuarios
    ├── json_web_token.rb                # Manejo de JWT
    ├── open_weather_service.rb          # Cliente HTTP para OpenWeather API
    └── reservamos_cities_service.rb     # Cliente HTTP para Reservamos API
```

---

## Notas Técnicas

### JWT Token
- **Expiración**: 24 horas
- **Algoritmo**: HS256
- **Header**: `Authorization: Bearer <token>`

### Seguridad
- Contraseñas hasheadas con `bcrypt` vía `has_secure_password`
- Tokens firmados con `secret_key_base`
- Validaciones en modelo y servicios

### Arquitectura
- **Controllers delgados**: Solo manejan HTTP request/response
- **Services**: Contienen toda la lógica de negocio
- **Concerns**: Funcionalidad compartida (autenticación)

### Integración OpenWeather
- **Cliente HTTP**: Faraday con timeouts configurados (10s total, 5s conexión)
- **Manejo de errores**: Captura errores de red, timeouts, y respuestas HTTP no exitosas
- **Validaciones**: Coordenadas validadas en el servicio
- **API Key**: Cargada desde variable de entorno `OPENWEATHER_API_KEY`
- **Endpoint**: `https://api.openweathermap.org/data/2.5/forecast`
- **Unidades**: Métricas (Celsius, m/s) usando parámetro `units=metric`
- **Idioma**: Español usando parámetro `lang=es`
- **Caché**: Rails.cache con expiración de 10 minutos
- **Combinación de APIs**: GET /weather/current combina Reservamos (ciudades) + OpenWeather (clima)

### Integración Reservamos
- **Cliente HTTP**: Faraday con timeouts configurados (10s total, 5s conexión)
- **Filtrado**: Solo devuelve objetos con `result_type: "city"`
- **Manejo de errores**: Captura errores de red, timeouts, y respuestas HTTP no exitosas
- **Endpoint**: `https://search.reservamos.mx/api/v2/places`
