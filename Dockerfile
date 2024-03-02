# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias, incluyendo nodemon para el desarrollo
RUN npm install

# Copia el resto de los archivos de tu aplicación
COPY . .

# Expone el puerto que tu aplicación utilizará
EXPOSE 3000

# Inicia la aplicación usando nodemon
CMD ["npx", "nodemon", "index.js"]
