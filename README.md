# 🎨 Sistema de Temas — Dark/Light Mode

> Projeto prático de Experiência de Usuário com BOM e Persistência  
> Disciplina: Front-End: Tecnologias | Autor: Kaue Almeida, Luccas Eduardo e Philip Kazuhiro

---

## 📋 Sobre o projeto

Sistema de preferências de tema (Dark/Light Mode) que utiliza a **Browser Object Model (BOM)** e a **Web Storage API** para manter a escolha do usuário entre sessões, com transições suaves e sincronização automática entre abas abertas.

### Funcionalidades implementadas

- ✅ Persistência do tema escolhido via `localStorage` (mantido após fechar o navegador)
- ✅ Transições suaves de cores via CSS (`transition: background-color 0.5s ease`)
- ✅ Sincronização automática com o tema do sistema operacional (`prefers-color-scheme`)
- ✅ Sincronização em tempo real entre abas via evento `storage`
- ✅ Indicador visual do modo ativo (botão com outline)

---

## 🗂️ Estrutura do repositório

```
p1_frontend/
├── public/
│   ├── index.html      # Estrutura da interface
│   ├── script.js       # Lógica de tema, persistência e sincronização
│   └── style.css       # Estilos e transições
├── server.js           # Servidor HTTP local (Node.js)
├── package.json        # Configurações do projeto
├── screenshots/        # Evidências visuais das funcionalidades
│   ├── light-mode.png
│   ├── dark-mode.png
│   ├── localstorage-devtools.png
│   └── sync-abas.png
└── README.md
```

---

## ⚙️ Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 14 ou superior)

### Passos

```bash
# 1. Clone ou extraia o repositório
cd p1_frontend

# 2. Inicie o servidor
node server.js

# 3. Acesse no navegador
# http://localhost:3000
```

> Para desenvolvimento com reload automático:
> ```bash
> node --watch server.js
> ```

---

## 🧪 Guia de validação das funcionalidades

### 1. Persistência entre sessões

**O que testar:** o tema escolhido deve ser mantido mesmo após fechar e reabrir o navegador.

**Passos:**
1. Acesse `http://localhost:3000`
2. Clique em **🌙 Dark** para ativar o dark mode
3. Feche a aba ou o navegador completamente
4. Reabra `http://localhost:3000`
5. **Resultado esperado:** o dark mode deve estar ativo automaticamente

**Evidência no DevTools:**
1. Pressione `F12` → aba **Application**
2. No menu lateral: **Storage → Local Storage → http://localhost:3000**
3. Verifique as chaves gravadas:

| Chave | Valor esperado |
|-------|---------------|
| `mode` | `light`, `dark` ou `auto` |
| `theme` | `light` ou `dark` |

📸 *Screenshot sugerida: painel do DevTools com as chaves `mode` e `theme` visíveis*

![Local Storage no DevTools](localstorage-devtools.png)

---

### 2. Transições suaves de cores

**O que testar:** a mudança entre temas deve ser animada, sem troca abrupta.

**Passos:**
1. Acesse `http://localhost:3000`
2. Clique alternadamente entre **☀️ Light** e **🌙 Dark**
3. **Resultado esperado:** a cor de fundo e o texto transitam suavemente em 0,5s

**Trecho de código responsável (`style.css`):**
```css
body {
    transition:
        background-color 0.5s ease,
        color 0.5s ease;
}
```

📸 *Screenshots sugeridas: tela no estado Light e no estado Dark*

![Light Mode](light-mode.png)
![Dark Mode](dark-mode.png)

---

### 3. Sincronização com o tema do sistema operacional

**O que testar:** ao selecionar **💻 Auto**, o tema deve seguir a preferência do SO.

**Passos:**
1. Acesse `http://localhost:3000`
2. Clique em **💻 Auto**
3. Verifique que o tema exibido corresponde ao tema do seu sistema
4. Mude o tema do sistema (Windows: Configurações → Personalização → Cores / macOS: Preferências → Geral)
5. **Resultado esperado:** o tema da aplicação muda automaticamente, sem recarregar a página

**Trecho de código responsável (`script.js`):**
```js
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
        if (currentMode === 'auto') {
            updateTheme('auto')
        }
    })
```

---

### 4. Sincronização entre abas

**O que testar:** mudar o tema em uma aba deve refletir em todas as outras abas abertas.

**Passos:**
1. Abra `http://localhost:3000` em **duas abas** do navegador (ou duas janelas lado a lado)
2. Na **Aba 1**, clique em **🌙 Dark**
3. Observe a **Aba 2** sem clicar nada
4. **Resultado esperado:** a Aba 2 muda para dark mode automaticamente, exibindo "Origem do tema: Outra aba"

**Trecho de código responsável (`script.js`):**
```js
window.addEventListener('storage', (event) => {
    if (event.key === 'mode') {
        currentMode = event.newValue
        const theme = currentMode === 'auto'
            ? getSystemTheme()
            : currentMode
        const origin = currentMode === 'auto'
            ? 'Sistema Operacional'
            : 'Outra aba'
        applyTheme(theme, origin)
    }
})
```

> **Observação técnica:** o evento `storage` só dispara nas abas que **não** realizaram a escrita — nunca na aba de origem. Esse é o comportamento nativo do browser, e é exatamente o que garante a sincronização sem loop infinito.

📸 *Screenshot sugerida: duas janelas abertas lado a lado mostrando o tema sincronizado*

![Sincronização entre abas](sync-abas.png)

---

## 📚 Conceitos aplicados

| Conceito | Onde é usado |
|----------|-------------|
| **BOM — `window.matchMedia`** | Detecção do tema do sistema operacional |
| **BOM — `window.addEventListener('storage')`** | Sincronização entre abas |
| **Web Storage API — `localStorage`** | Persistência da preferência entre sessões |
| **Ciclo de vida da sessão** | Tema restaurado automaticamente ao reabrir o navegador |
| **CSS Transitions** | Animações suaves na troca de tema |
| **`requestAnimationFrame`** | Garante que a transição CSS dispara corretamente após o repaint |

---

## 🖥️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Node.js (servidor local)
