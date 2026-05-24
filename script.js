const body = document.body

const themeName = document.getElementById('theme-name')
const themeOrigin = document.getElementById('theme-origin')
const lastUpdate = document.getElementById('last-update')

const lightBtn = document.getElementById('light-btn')
const darkBtn = document.getElementById('dark-btn')
const autoBtn = document.getElementById('auto-btn')

const buttons = {
    light: lightBtn,
    dark: darkBtn,
    auto: autoBtn
}

let currentMode = localStorage.getItem('mode') || 'auto'

function getSystemTheme() {

    const systemDark = window
        .matchMedia('(prefers-color-scheme: dark)')
        .matches

    return systemDark ? 'dark' : 'light'
}

function applyTheme(theme, origin) {

    body.classList.remove('light', 'dark')

    requestAnimationFrame(() => {
        body.classList.add(theme)
    })

    themeName.textContent =
        theme === 'dark'
            ? '🌙 Dark Mode'
            : '☀️ Light Mode'

    themeOrigin.textContent = `Origem do tema: ${origin}`

    lastUpdate.textContent =
        `Última alteração: ${new Date().toLocaleTimeString()}`

    Object.values(buttons).forEach(btn => btn.classList.remove('active'))
    buttons[currentMode].classList.add('active')
}

function updateTheme(mode) {

    currentMode = mode

    localStorage.setItem('mode', mode)

    let finalTheme

    if (mode === 'auto') {

        finalTheme = getSystemTheme()

        applyTheme(finalTheme, 'Sistema Operacional')

    } else {

        finalTheme = mode

        applyTheme(finalTheme, 'Usuário')
    }

    localStorage.setItem('theme', finalTheme)
}

/* BOTÕES */

lightBtn.addEventListener('click', () => {
    updateTheme('light')
})

darkBtn.addEventListener('click', () => {
    updateTheme('dark')
})

autoBtn.addEventListener('click', () => {
    updateTheme('auto')
})

/* INICIALIZAÇÃO */

updateTheme(currentMode)

/* ALTERAÇÃO DO SISTEMA */

window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {

        if (currentMode === 'auto') {

            updateTheme('auto')
        }
    })

/* SINCRONIZAÇÃO ENTRE ABAS */

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