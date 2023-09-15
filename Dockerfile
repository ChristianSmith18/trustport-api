# Usamos una imagen oficial de Node.js
FROM node:20.5.0-slim

# # Creamos un directorio para la aplicación
# WORKDIR /usr/src/app

# # Copiamos 'package.json' y 'yarn.lock' al directorio de la aplicación
# COPY package.json yarn.lock ./

# # Instalamos solo las dependencias de producción
# RUN yarn install --production

# # Copiamos el código fuente de la aplicación al directorio de la aplicación
# COPY . .

# # Exponemos el puerto en el que tu aplicación corre (p.ej. 3000 si es el default de NestJS)
# EXPOSE 3000

# # Configuramos el comando para iniciar la aplicación en modo producción
# CMD ["yarn", "start:prod"]

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición del proyecto
COPY package.json yarn.lock ./

# Instala Yarn globalmente (aunque probablemente ya esté incluido en la imagen de Node)
# Instala solo las dependencias de producción
RUN yarn install --production

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Como no quieres que se ejecute, simplemente establecemos un comando que mantenga el contenedor en funcionamiento
CMD ["tail", "-f", "/dev/null"]