# Kohler Posts – Gerador de Posts de Perfumes

## Como fazer deploy na Vercel

### Opção 1 – Via GitHub (recomendado)
1. Cria uma conta em github.com
2. Cria um repositório novo chamado `kohler-posts`
3. Faz upload de todos estes ficheiros para o repositório
4. Vai a vercel.com e cria uma conta
5. Clica em "Add New Project"
6. Importa o repositório do GitHub
7. Clica em "Deploy" — pronto!

### Opção 2 – Via Vercel CLI (directo)
1. Instala o Node.js em nodejs.org
2. Abre o terminal na pasta do projecto
3. Executa: `npm install`
4. Executa: `npx vercel`
5. Segue as instruções no terminal

## Estrutura do projecto
```
kohler-posts/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.jsx
├── package.json
├── vercel.json
└── README.md
```

## Nota importante
A app usa a API da Anthropic. Para funcionar em produção,
precisas de configurar a variável de ambiente:
- `REACT_APP_ANTHROPIC_KEY` = a tua chave API

Obtém a chave em: console.anthropic.com
