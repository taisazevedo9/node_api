# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instale as dependências
RUN npm install -g pnpm && pnpm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["pnpm", "dev"]