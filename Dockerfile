# Usamos una imagen oficial de Node.js
FROM node:16-slim

# Creamos un directorio para la aplicación
WORKDIR /usr/src/app

# Copiamos 'package.json' y 'yarn.lock' al directorio de la aplicación
COPY package.json yarn.lock ./

# Instalamos solo las dependencias de producción
RUN yarn install --production

# Copiamos el código fuente de la aplicación al directorio de la aplicación
COPY . .

# Exponemos el puerto en el que tu aplicación corre (p.ej. 3000 si es el default de NestJS)
EXPOSE 3000

# Configuramos el comando para iniciar la aplicación en modo producción
CMD ["yarn", "start:prod"]
