# ToDoList

Aplicativo de lista de tarefas (to-do list) construído com Next.js, TypeScript e Prisma, com persistência em banco de dados PostgreSQL.

## Funcionalidades

- Criação, atualização, conclusão e exclusão de tarefas via Server Actions do Next.js.
- Confirmação de ações destrutivas (como limpar todas as tarefas) com diálogos de alerta (Radix UI).
- Notificações (toasts) de feedback para o usuário com Sonner.
- Suporte a tema claro/escuro via next-themes.
- Interface construída com componentes reutilizáveis no estilo shadcn, estilizados com Tailwind CSS.

## Stack tecnológica

- **Framework:** Next.js (App Router) + React
- **Linguagem:** TypeScript
- **Banco de dados / ORM:** PostgreSQL + Prisma
- **UI:** Tailwind CSS, Radix UI (Dialog, Alert Dialog), lucide-react, Sonner

## Estrutura do projeto

- `actions/` — server actions para criação, atualização e remoção de tarefas
- `app/` — rotas e páginas da aplicação
- `components/` — componentes de UI reutilizáveis
- `lib/` — utilitários e configuração do Prisma Client
- `utils/` — funções auxiliares
- `prisma/` — schema do banco de dados (model Tasks)

## Como começar

Clone o repositório e instale as dependências:

```
npm install
```

Configure a variável de ambiente `DATABASE_URL` com a string de conexão do PostgreSQL.

Execute as migrações do Prisma:

```
npx prisma migrate dev
```

Inicie o servidor de desenvolvimento:

```
npm run dev
```

Abra http://localhost:3000 no seu navegador.

## Status

Projeto finalizado e funcional.
