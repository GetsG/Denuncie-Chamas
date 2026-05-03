# 🔥 Denuncie Chamas - Frontend

Interface web do sistema **Denuncie Chamas**, responsável pela interação do usuário com a aplicação, permitindo o registro e acompanhamento de ocorrências de incêndios.

## 📌 Sobre o projeto

O frontend foi desenvolvido com **Next.js**, com foco em performance, organização e boa experiência do usuário.

A aplicação consome uma API REST desenvolvida em Spring Boot, sendo responsável pela exibição dos dados e envio das informações para o backend.

---

## 🚀 Tecnologias utilizadas

- Next.js
- React
- TypeScript
- React Hook Form
- CSS Modules

---

## 🧱 Estrutura do projeto

O projeto segue uma organização baseada em componentes e separação de responsabilidades:

- **pages / app** → Rotas da aplicação
- **components** → Componentes reutilizáveis
- **services** → Comunicação com a API
- **styles** → Estilização com CSS Modules

---

## ⚙️ Funcionalidades

- Tela de login e autenticação
- Cadastro de usuários
- Registro de ocorrências
- Listagem de dados
- Integração com backend via API REST

---

## 🔗 Integração com backend

A aplicação se comunica com o backend através de requisições HTTP (API REST), enviando e recebendo dados para:

- Autenticação
- Cadastro de usuários
- Registro e consulta de ocorrências

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passos

```bash id="cmd-run-frontend"
# Clonar o repositório
git clone https://github.com/GetsG/Denuncie-Chamas-FrontEnd

# Entrar na pasta
cd Denuncie-Chamas-FrontEnd

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
