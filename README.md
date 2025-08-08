# 📚 Node API

Bem-vindo à **Node API**, uma aplicação desenvolvida para gerenciar usuários e compromissos, utilizando tecnologias modernas como **Fastify**, **TypeScript**, e **PostgreSQL**.

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
- **PostgreSQL**: Banco de dados relacional utilizado para persistência.
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
