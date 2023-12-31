# Usamos una imagen oficial de Node.js
FROM node:20.5.0-slim

# Creamos un directorio para la aplicación
WORKDIR /home/app

# Copiamos 'package.json' y 'yarn.lock' al directorio de la aplicación
COPY package.json yarn.lock ./

# Instalamos solo las dependencias de producción
RUN yarn install --production

# Instalamos NestJS CLI localmente
RUN npm install @nestjs/cli

# Copiamos el código fuente de la aplicación al directorio de la aplicación
COPY . .

# Compilamos la aplicación usando NestJS CLI
RUN npx nest build

# Exponemos el puerto en el que tu aplicación corre (p.ej. 3000 si es el default de NestJS)
# EXPOSE 3000

# Configuramos el comando para iniciar la aplicación en modo producción
CMD ["node", "dist/main.js"]
