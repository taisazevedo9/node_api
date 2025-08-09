# 📚 Node API com Frontend Next.js e Docker

Bem-vindo à **Node API**, uma aplicação desenvolvida para gerenciar usuários e compromissos, utilizando tecnologias modernas como **Fastify**, **TypeScript**, **Next.js**, e **PostgreSQL**. O projeto está totalmente containerizado com **Docker** para facilitar a execução e o desenvolvimento.

---

## 🚀 Funcionalidades

### 🧑‍💻 Gerenciamento de Usuários

- **Listar usuários**: Obtenha uma lista de todos os usuários cadastrados.
- **Criar usuário**: Adicione novos usuários com informações como nome, e-mail, senha, idade e status de administrador.
- **Atualizar usuário**: Edite informações de um usuário existente.
- **Deletar usuário**: Remova usuários do sistema.

### 📅 Gerenciamento de Compromissos

- **Criar compromissos**: Agende compromissos com validação de sobreposição de datas.
- **Validação de datas**: Garante que a data de início seja no futuro e que a data de término seja posterior à data de início.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no servidor.
- **Fastify**: Framework web rápido e eficiente.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Next.js**: Framework React para o frontend.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência.
- **Docker**: Containerização para facilitar o desenvolvimento e a execução.
- **Vitest**: Framework de testes para garantir a qualidade do código.
- **dotenv**: Gerenciamento de variáveis de ambiente.

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── database/
│   ├── database-postgres.ts   # Implementação do banco de dados PostgreSQL
│   ├── db.ts                  # Configuração da conexão com o banco
│   └── dotenv/
│       └── config.ts          # Configuração do dotenv
├── entities/
│   └── appointment.ts         # Entidade de Compromisso
├── repositories/
│   ├── appointments-repository.ts       # Interface do repositório de compromissos
│   └── in-memory/
│       └── in-memory-appointments-repository.ts # Repositório em memória
├── services/
│   ├── create-appointment.ts  # Serviço para criação de compromissos
│   └── create-appointment.spec.ts # Testes do serviço de criação de compromissos
├── tests/
│   └── utils/
│       └── get-future-date.ts # Função utilitária para manipulação de datas
├── routes.ts                  # Rotas da aplicação
└── server.ts                  # Configuração do servidor Fastify
```

---

## 🐳 Configuração com Docker

O projeto utiliza **Docker Compose** para orquestrar os serviços do backend, frontend e banco de dados.

### Serviços configurados:

- **Backend**: API desenvolvida com Node.js e Fastify, rodando na porta `3333`.
- **Frontend**: Aplicação Next.js para consumir a API, rodando na porta `3000`.
- **PostgreSQL**: Banco de dados relacional, rodando na porta `5433`.

### Como rodar o projeto com Docker:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd node_api
   ```

2. **Suba os containers com Docker Compose:**
   ```bash
   cd backend
   docker-compose up --build
   ```
   Aqui está uma versão atualizada do seu

README.md

, levando em consideração as mudanças feitas no projeto, como a integração do frontend com Next.js, a configuração com Docker e a listagem de usuários:

---

````markdown
# 📚 Node API com Frontend Next.js e Docker

Bem-vindo à **Node API**, uma aplicação desenvolvida para gerenciar usuários e compromissos, utilizando tecnologias modernas como **Fastify**, **TypeScript**, **Next.js**, e **PostgreSQL**. O projeto está totalmente containerizado com **Docker** para facilitar a execução e o desenvolvimento.

---

## 🚀 Funcionalidades

### 🧑‍💻 Gerenciamento de Usuários

- **Listar usuários**: Obtenha uma lista de todos os usuários cadastrados.
- **Criar usuário**: Adicione novos usuários com informações como nome, e-mail, senha, idade e status de administrador.
- **Atualizar usuário**: Edite informações de um usuário existente.
- **Deletar usuário**: Remova usuários do sistema.

### 📅 Gerenciamento de Compromissos

- **Criar compromissos**: Agende compromissos com validação de sobreposição de datas.
- **Validação de datas**: Garante que a data de início seja no futuro e que a data de término seja posterior à data de início.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no servidor.
- **Fastify**: Framework web rápido e eficiente.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Next.js**: Framework React para o frontend.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência.
- **Docker**: Containerização para facilitar o desenvolvimento e a execução.
- **Vitest**: Framework de testes para garantir a qualidade do código.
- **dotenv**: Gerenciamento de variáveis de ambiente.

---

## 🐳 Configuração com Docker

O projeto utiliza **Docker Compose** para orquestrar os serviços do backend, frontend e banco de dados.

### Serviços configurados:

- **Backend**: API desenvolvida com Node.js e Fastify, rodando na porta `3333`.
- **Frontend**: Aplicação Next.js para consumir a API, rodando na porta `3000`.
- **PostgreSQL**: Banco de dados relacional, rodando na porta `5433`.

### Como rodar o projeto com Docker:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd node_api
   ```
````

2. **Suba os containers com Docker Compose:**

   ```bash
   docker-compose up --build
   ```

3. **Acesse os serviços:**
   - **Backend:** `http://localhost:3333`
   - **Frontend:** `http://localhost:3000`

---

## 🗂️ Endpoints da API

### **GET /users**

Retorna uma lista de usuários.

**Exemplo de resposta:**

```json
[
  { "id": 1, "name": "User1" },
  { "id": 2, "name": "User2" }
]
```

---

## 🖥️ Funcionalidades do Frontend

- Exibe uma lista de usuários consumida do backend.
- Página de dashboard acessível em `http://localhost:3000`.

---

## 🛠️ Desenvolvimento Local

### Rodar o backend localmente

1. Entre na pasta

backend

:

```bash
cd backend
```

2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o servidor:
   ```bash
   pnpm dev
   ```

### Rodar o frontend localmente

1. Entre na pasta

frontend

:

```bash
cd frontend
```

2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o servidor:
   ```bash
   pnpm dev
   ```

---

## 🐛 Solução de Problemas

### Container do backend caindo

- Verifique os logs do container:
  ```bash
  docker logs node_api-backend-1
  ```
- Certifique-se de que o banco de dados está rodando corretamente.

### Erro de CORS

- Certifique-se de que o CORS está configurado no backend:
  ```typescript
  app.register(cors, { origin: "http://localhost:3000" });
  ```

---

## 📜 Licença

Este projeto está sob a licença **MIT**. Sinta-se à vontade para usá-lo e modificá-lo.

---

## 📞 Contato

Se você tiver dúvidas ou sugestões, entre em contato:

- **Email:** seu-email@exemplo.com
- **GitHub:** [seu-usuario](https://github.com/seu-usuario)

```

---

### O que foi atualizado:
1. **Adicionado o Frontend (Next.js):**
   - Explicação sobre como o frontend consome a API do backend.
   - Detalhes sobre a funcionalidade de exibição de usuários.

2. **Configuração com Docker:**
   - Instruções para rodar o projeto com Docker Compose.
   - Detalhes sobre os serviços configurados (backend, frontend e banco de dados).

3. **Endpoints da API:**
   - Adicionado exemplo de resposta para o endpoint `/users`.

4. **Solução de problemas:**
   - Adicionado seção para ajudar a resolver problemas comuns, como containers caindo e erros de CORS.

5. **Contato:**
   - Adicionado uma seção para contato (opcional).

Essa versão do `README.md` reflete as atualizações feitas no projeto e fornece instruções claras para rodar e entender o sistema.
---

### O que foi atualizado:
1. **Adicionado o Frontend (Next.js):**
   - Explicação sobre como o frontend consome a API do backend.
   - Detalhes sobre a funcionalidade de exibição de usuários.

2. **Configuração com Docker:**
   - Instruções para rodar o projeto com Docker Compose.
   - Detalhes sobre os serviços configurados (backend, frontend e banco de dados).

3. **Endpoints da API:**
   - Adicionado exemplo de resposta para o endpoint `/users`.

4. **Solução de problemas:**
   - Adicionado seção para ajudar a resolver problemas comuns, como containers caindo e erros de CORS.

5. **Contato:**
   - Adicionado uma seção para contato (opcional).

Essa versão do `README.md` reflete as atualizações feitas no projeto e fornece instruções claras para rodar e entender o sistema.
```
