# Use a imagem oficial do Node.js
FROM node:20-alpine AS base

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instale o gerenciador de pacotes PNPM globalmente
RUN npm install -g pnpm

# Instale as dependências
RUN pnpm install --no-frozen-lockfile

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta do frontend
EXPOSE 3000

# Comando para iniciar o frontend
CMD ["pnpm", "dev"]