# FirstFM 🎵

> Uma aplicação moderna para visualizar e analisar seus hábitos musicais do Spotify

![License](https://img.shields.io/badge/licença-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Express](https://img.shields.io/badge/Express-4.21-green)

## 📸 Screenshots

### Página Inicial

![Homepage] (https://github.com/FelipeReis96/FirstFm/blob/main/paginaInicial.png)

### Perfil do Usuário

![User Profile] https://github.com/FelipeReis96/FirstFm/blob/main/perfil.png

### Autenticação com a API Spotify
![Analytics] https://github.com/FelipeReis96/FirstFm/blob/main/perfil.png

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#%EF%B8%8F-configuração)
- [Como Usar](#-como-usar)
- [Documentação da API](#-documentação-da-api)
- [Arquitetura](#-arquitetura)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

**FirstFM** é uma aplicação web full-stack que se conecta à sua conta do Spotify para fornecer insights detalhados sobre seus padrões de audição musical. Com uma interface moderna e intuitiva, você pode acompanhar suas músicas e artistas mais tocados, histórico de reprodução recente e interagir com outros amantes de música.

### Por que FirstFM?

- 📊 **Análise Detalhada**: Visualize estatísticas completas do seu comportamento musical
- 🎨 **Interface Moderna**: Design responsivo com tema dark elegante
- 👥 **Recursos Sociais**: Siga amigos e descubra o que eles estão ouvindo
- 🔒 **Seguro**: Autenticação JWT e armazenamento seguro de dados
- ⚡ **Rápido**: Built com Next.js 15 e otimizações de performance

---

## ✨ Funcionalidades

### 🎵 Integração com Spotify
- Autenticação OAuth 2.0 com Spotify
- Sincronização automática de dados musicais
- Acesso a estatísticas em tempo real

### 📊 Análise Musical
- **Top Artistas**: Veja seus artistas mais ouvidos (curto, médio e longo prazo)
- **Top Músicas**: Descubra suas faixas favoritas com rankings detalhados
- **Músicas Recentes**: Histórico completo das últimas reproduções
- **Estatísticas Personalizadas**: Dados filtrados por períodos de tempo

### 👥 Recursos Sociais
- Sistema de seguidores e seguindo
- Visualize perfis de outros usuários
- Pesquisa de usuários por nome
- Timeline social (em desenvolvimento)

### 🎨 Personalização
- Upload de foto de perfil personalizada
- Armazenamento de imagens via Supabase Storage
- Interface responsiva para todos os dispositivos

### 🔐 Segurança e Administração
- Controle de acesso baseado em funções (Admin/Usuário)
- Painel administrativo para gerenciamento de usuários
- Proteção de rotas e middlewares de autenticação

---

## 🛠 Tecnologias Utilizadas

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Next.js](https://nextjs.org/) | 15.5.0 | Framework React com App Router |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Superset tipado de JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Framework CSS utilitário |
| [Jotai](https://jotai.org/) | 2.10.3 | Gerenciamento de estado primitivo e flexível |
| [Radix UI](https://www.radix-ui.com/) | - | Componentes acessíveis e não estilizados |
| [Lucide React](https://lucide.dev/) | - | Ícones SVG modernos |
| [Sonner](https://sonner.emilkowal.ski/) | - | Sistema de notificações toast |

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Express](https://expressjs.com/) | 4.21.2 | Framework web minimalista |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipagem estática |
| [PostgreSQL](https://www.postgresql.org/) | - | Banco de dados relacional |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | 9.0.2 | Autenticação JWT |
| [Multer](https://github.com/expressjs/multer) | 1.4.5-lts.1 | Upload de arquivos |
| [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) | 5.0.2 | Cliente Node.js para Spotify API |

### Infraestrutura
- **Banco de Dados**: Supabase PostgreSQL
- **Storage**: Supabase Storage para avatares
- **Ambiente de Desenvolvimento**: Docker (pgAdmin)
- **Hospedagem**: (Configurar conforme necessário)

---

## 📁 Estrutura do Projeto

```
FirstFm/
│
├── 📂 front/                        # Aplicação Frontend (Next.js)
│   ├── 📂 src/
│   │   ├── 📂 app/                  # App Router do Next.js 15
│   │   │   ├── 📄 layout.tsx        # Layout raiz da aplicação
│   │   │   ├── 📄 page.tsx          # Página inicial
│   │   │   ├── 📄 providers.tsx     # Providers de contexto
│   │   │   ├── 📄 globals.css       # Estilos globais
│   │   │   │
│   │   │   ├── 📂 admin/            # Painel administrativo
│   │   │   │   ├── 📄 page.tsx      # Dashboard admin
│   │   │   │   └── 📄 createUser.tsx
│   │   │   │
│   │   │   ├── 📂 login/            # Autenticação
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📄 login-form.tsx
│   │   │   │
│   │   │   ├── 📂 register/         # Registro de usuários
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📄 register-form.tsx
│   │   │   │
│   │   │   ├── 📂 user/[userId]/    # Perfis de usuário (rotas dinâmicas)
│   │   │   │   ├── 📄 page.tsx      # Página de perfil
│   │   │   │   └── 📂 following/
│   │   │   │       └── 📄 page.tsx  # Lista de seguindo
│   │   │   │
│   │   │   ├── 📂 settings/         # Configurações do usuário
│   │   │   ├── 📂 components/       # Componentes reutilizáveis
│   │   │   │   ├── 📄 avatar.tsx
│   │   │   │   ├── 📄 follows.tsx
│   │   │   │   ├── 📄 recent-tracks.tsx
│   │   │   │   ├── 📄 top-artists.tsx
│   │   │   │   ├── 📄 top-tracks.tsx
│   │   │   │   └── 📂 ui/           # Componentes UI base
│   │   │   │
│   │   │   ├── 📂 atoms/            # Atoms do Jotai (estado global)
│   │   │   │   └── 📄 user.atoms.tsx
│   │   │   │
│   │   │   ├── 📂 header/           # Componente de cabeçalho
│   │   │   ├── 📂 hero/             # Seções hero da landing page
│   │   │   └── 📂 assets/           # Recursos estáticos
│   │   │
│   │   ├── 📂 services/             # Camada de serviços API
│   │   │   └── 📄 authService.ts    # Serviço de autenticação
│   │   │
│   │   └── 📂 lib/                  # Utilitários
│   │       └── 📄 utils.ts
│   │
│   ├── 📂 public/                   # Assets públicos estáticos
│   ├── 📄 next.config.ts            # Configuração do Next.js
│   ├── 📄 tailwind.config.ts        # Configuração do Tailwind
│   ├── 📄 tsconfig.json             # Configuração TypeScript
│   └── 📄 package.json
│
├── 📂 back/                         # Backend API (Express + TypeScript)
│   ├── 📂 src/
│   │   ├── 📄 index.ts              # Ponto de entrada da aplicação
│   │   ├── 📄 supabase.ts           # Cliente Supabase
│   │   ├── 📄 authRequestInterface.ts # Interfaces de autenticação
│   │   │
│   │   ├── 📂 config/               # Configurações
│   │   │   ├── 📄 database-connection.ts
│   │   │   └── 📄 spotify-config.ts
│   │   │
│   │   ├── 📂 controllers/          # Controladores de rotas
│   │   │   ├── 📄 adminController.ts
│   │   │   ├── 📄 followController.ts
│   │   │   ├── 📄 spotifyController.ts
│   │   │   └── 📄 userController.ts
│   │   │
│   │   ├── 📂 middleware/           # Middlewares
│   │   │   └── 📄 jwtAuth.ts        # Autenticação JWT
│   │   │
│   │   ├── 📂 routes/               # Definição de rotas
│   │   │   ├── 📄 adminRoutes.ts
│   │   │   ├── 📄 authRoutes.ts
│   │   │   ├── 📄 followsRouter.ts
│   │   │   ├── 📄 spotifyRoutes.ts
│   │   │   └── 📄 userRoutes.ts
│   │   │
│   │   └── 📂 services/             # Lógica de negócio
│   │       ├── 📄 adminServices.ts
│   │       ├── 📄 followServices.ts
│   │       ├── 📄 profileStorage.ts
│   │       ├── 📄 userServices.ts
│   │       └── 📂 spotifyServices/   # Serviços do Spotify
│   │           ├── 📄 spotifyBaseService.ts
│   │           ├── 📄 spotifyService.ts
│   │           ├── 📄 spotifyArtistService.ts
│   │           ├── 📄 spotifyTrackService.ts
│   │           └── 📄 spotifyUserService.ts
│   │
│   ├── 📄 tsconfig.json
│   └── 📄 package.json
│
├── 📂 database/                     # Scripts de banco de dados
│   └── 📂 init/                     # Scripts de inicialização
│
├── 📄 compose.yaml                  # Docker Compose config
├── 📄 package.json                  # Root package.json
├── 📄 README.md                     # Este arquivo
└── 📄 LICENSE                       # Licença MIT

```

---

## 🎬 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 20.x ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** - Gerenciador de pacotes
- **Git** - [Download](https://git-scm.com/)
- **Conta Supabase** - [Criar conta](https://supabase.com/)
- **Conta Spotify Developer** - [Criar app](https://developer.spotify.com/dashboard)

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/FelipeReis96/FirstFm.git
cd FirstFm
```

### 2. Instale as dependências

```bash
# Instalar dependências raiz (se houver)
npm install

# Instalar dependências do frontend
cd front
npm install

# Instalar dependências do backend
cd ../back
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto **back/** com as seguintes variáveis:

```env
# ==========================================
# CONFIGURAÇÕES DO BANCO DE DADOS
# ==========================================
DATABASE_URL=postgresql://usuario:senha@host:porta/database

# ==========================================
# CONFIGURAÇÕES DO SUPABASE
# ==========================================
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_KEY=sua_service_key_aqui
SUPABASE_ANON_KEY=sua_anon_key_aqui

# ==========================================
# SPOTIFY API
# ==========================================
SPOTIFY_CLIENT_ID=seu_spotify_client_id
SPOTIFY_CLIENT_SECRET=seu_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:4000/api/spotify/callback

# ==========================================
# AUTENTICAÇÃO JWT
# ==========================================
JWT_SECRET=seu_segredo_jwt_super_seguro_aqui

# ==========================================
# CONFIGURAÇÕES DO SERVIDOR
# ==========================================
PORT=4000
NODE_ENV=development
```

### 4. Configure o banco de dados

1. Crie um projeto no [Supabase](https://supabase.com/)
2. Execute os scripts SQL da pasta `database/init/` no SQL Editor do Supabase
3. Crie um bucket de storage chamado `images` para os avatares dos usuários

### 5. Configure a aplicação Spotify

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crie uma nova aplicação
3. Em **Settings**, adicione a seguinte Redirect URI:
   ```
   http://localhost:4000/api/spotify/callback
   ```
4. Copie o **Client ID** e **Client Secret** para o arquivo `.env`

---

## ⚙️ Configuração

### Estrutura do Banco de Dados

O projeto utiliza PostgreSQL com as seguintes tabelas principais:

#### Tabela `fmuser`
```sql
- id (UUID, PK)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hash bcrypt)
- role (VARCHAR, 'user' | 'admin')
- spotify_access_token (VARCHAR)
- spotify_refresh_token (VARCHAR)
- token_expiry (TIMESTAMP)
- profile_image_url (VARCHAR)
- created_at (TIMESTAMP)
```

#### Tabela `follows`
```sql
- follower_id (UUID, FK -> fmuser.id)
- following_id (UUID, FK -> fmuser.id)
- created_at (TIMESTAMP)
- PRIMARY KEY (follower_id, following_id)
```

### Configuração do Supabase Storage

1. No painel do Supabase, vá para **Storage**
2. Crie um novo bucket chamado `images`
3. Configure as políticas de acesso:
   - Permitir upload autenticado
   - Permitir leitura pública

---

## 💻 Como Usar

### Desenvolvimento

#### Executar Frontend e Backend simultaneamente

```bash
# A partir da raiz do projeto
npm run dev
```

#### Executar separadamente

**Backend:**
```bash
cd back
npm run dev
# Servidor rodando em http://localhost:4000
```

**Frontend:**
```bash
cd front
npm run dev
# Aplicação rodando em http://localhost:3000
```

### Produção

#### Build

```bash
# Frontend
cd front
npm run build
npm start

# Backend
cd back
npm run build
npm start
```

### Acessar a aplicação

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:4000](http://localhost:4000)

---

## 📡 Documentação da API

### Base URL
```
http://localhost:4000/api
```

### Autenticação

#### Registrar Usuário
```http
POST /auth/register
Content-Type: application/json

{
  "username": "exemplo",
  "email": "exemplo@email.com",
  "password": "senha123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "exemplo@email.com",
  "password": "senha123"
}

# Resposta
{
  "token": "jwt_token_aqui",
  "user": {
    "id": "uuid",
    "username": "exemplo",
    "email": "exemplo@email.com"
  }
}
```

---

### Spotify

#### Iniciar OAuth
```http
GET /spotify/login
```
Redireciona para a página de autenticação do Spotify.

#### Callback OAuth
```http
GET /spotify/callback?code={authorization_code}
```
Rota de callback após autenticação (automática).

#### Obter Músicas Recentes
```http
GET /spotify/recent-tracks/:username
Authorization: Bearer {token}

# Resposta
{
  "items": [
    {
      "track": {
        "name": "Nome da Música",
        "artists": [...],
        "album": {...}
      },
      "played_at": "2026-02-25T10:00:00Z"
    }
  ]
}
```

#### Obter Top Artistas
```http
GET /spotify/top-artists/:username
Authorization: Bearer {token}

# Parâmetros de query opcionais:
# ?time_range=short_term | medium_term | long_term
# ?limit=20
```

#### Obter Top Músicas
```http
GET /spotify/top-tracks/:username
Authorization: Bearer {token}

# Parâmetros de query opcionais:
# ?time_range=short_term | medium_term | long_term
# ?limit=20
```

---

### Usuários

#### Buscar Usuários
```http
GET /users/search?query={termo_busca}
Authorization: Bearer {token}
```

#### Obter Usuário Atual
```http
GET /users/me
Authorization: Bearer {token}
```

#### Upload de Avatar
```http
POST /users/avatar
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData:
  - avatar: File
```

#### Obter ID do Usuário por Username
```http
GET /users/getId/:username
Authorization: Bearer {token}
```

---

### Recursos Sociais

#### Seguir Usuário
```http
POST /follow
Authorization: Bearer {token}
Content-Type: application/json

{
  "followingId": "uuid_do_usuario"
}
```

#### Deixar de Seguir
```http
DELETE /unfollow
Authorization: Bearer {token}
Content-Type: application/json

{
  "followingId": "uuid_do_usuario"
}
```

#### Obter Lista de Seguindo
```http
GET /following
Authorization: Bearer {token}
```

#### Verificar Status de Seguimento
```http
GET /status/:username
Authorization: Bearer {token}

# Resposta
{
  "isFollowing": true
}
```

---

### Admin (Requer role: admin)

#### Listar Todos os Usuários
```http
GET /admin/users
Authorization: Bearer {token_admin}
```

#### Deletar Usuário
```http
DELETE /admin/user/:id
Authorization: Bearer {token_admin}
```

---

## 🏗 Arquitetura

### Fluxo de Autenticação

```
┌─────────┐      ┌──────────┐      ┌──────────┐      ┌─────────┐
│ Cliente │─────▶│ Frontend │─────▶│  Backend │─────▶│ Supabase│
└─────────┘      └──────────┘      └──────────┘      └─────────┘
                       │                  │
                       │                  │
                       ▼                  ▼
                  Jotai Atoms      JWT Middleware
```

### Fluxo de Integração Spotify

```
1. Usuário clica em "Conectar Spotify"
2. Redirecionamento para Spotify OAuth
3. Usuário autoriza a aplicação
4. Callback com authorization code
5. Backend troca code por access_token e refresh_token
6. Tokens salvos no banco de dados
7. Requisições subsequentes usam access_token
8. Refresh automático quando token expira
```

### Diagrama de Componentes

<!-- Adicione aqui um diagrama da arquitetura -->
![Architecture Diagram](docs/images/architecture.png)


