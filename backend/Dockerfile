# Etapa 1: Build con Maven
FROM maven:3.8.5-openjdk-17 AS build
# Esto asegura que estemos trabajando sobre la carpeta backend
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución
FROM eclipse-temurin:17-jdk-alpine
# Quitamos la barra inicial de /target/ para evitar errores de ruta
COPY --from=build target/*.jar app.jar
EXPOSE 8080

# Usamos parámetros para asegurar que Spring lea bien el entorno
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "/app.jar"]