# Automação de Screenshots — Toki Pona

Geração automatizada e reproduzível de screenshots para a Google Play Store.

---

## Estrutura

```
automation/
├── screenshotConfig.js        # Constantes do Screenshot Mode
├── maestro/
│   └── flows/
│       ├── _set-language-*.yaml   # Setup de idioma (executado antes de cada bloco)
│       └── 01-home.yaml … 07-settings.yaml
├── screenshots/
│   ├── screens.js             # Fonte da verdade: telas e idiomas
│   └── playstore/             # Output gerado (gitignored)
│       ├── pt-BR/
│       ├── en-US/
│       └── es-ES/
└── scripts/
    └── generate-screenshots.js  # Orquestrador Node (npm run screenshots)
```

---

## 1. Instalar Maestro

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
maestro --version   # verificar instalação
```

---

## 2. Preparar o ambiente

Você precisa de um **development build** instalado no emulador (não Expo Go):

```bash
# Build de desenvolvimento (uma vez por versão)
cd toki-pona
eas build --profile development --platform android

# Instalar no emulador conectado
adb install path/to/build.apk
```

---

## 3. Gerar screenshots

```bash
# Terminal 1 — iniciar o servidor com Screenshot Mode ativado
cd toki-pona
EXPO_PUBLIC_SCREENSHOT_MODE=true npx expo start --android

# Terminal 2 — aguardar o app carregar, então rodar:
npm run screenshots
```

As imagens são salvas em:

```
automation/screenshots/playstore/
├── pt-BR/   01-home.png … 07-settings.png
├── en-US/   01-home.png … 07-settings.png
└── es-ES/   01-home.png … 07-settings.png
```

---

## 4. Rodar um flow individual

```bash
# Uma tela específica
maestro test automation/maestro/flows/01-home.yaml

# Só mudar o idioma
maestro test automation/maestro/flows/_set-language-en.yaml
```

---

## 5. Adicionar uma nova tela

1. Criar o flow em `automation/maestro/flows/08-minha-tela.yaml`
2. Adicionar uma entrada em `automation/screenshots/screens.js`:
   ```js
   { outputName: '08-minha-tela', flowFile: '08-minha-tela', label: 'Descrição' }
   ```
3. Rodar `npm run screenshots` — a nova tela é capturada automaticamente.

---

## 6. Adicionar um novo idioma

1. Criar `automation/maestro/flows/_set-language-XX.yaml` seguindo o padrão dos existentes.
2. Adicionar `'xx-XX'` ao array `LOCALES` em `automation/screenshots/screens.js`.
3. Adicionar `'xx-XX': '_set-language-XX'` ao mapa `LOCALE_FLOW` em `scripts/generate-screenshots.js`.

---

## 7. Screenshot Mode

Controlado por `EXPO_PUBLIC_SCREENSHOT_MODE=true` (variável de build-time do Metro).

| Efeito | Comportamento normal | Screenshot Mode |
|---|---|---|
| Delay de inicialização | 500 ms | Removido |
| Palavra do dia | Baseada em `Date.now()` | Fixada em `pona` |
| Score no Home/Quiz | Lido do AsyncStorage | Fixado em `1.250` |
| Streak no Home | Lido do AsyncStorage | Fixado em `5` |
| Questão do Quiz | `Math.random()` | Fixada em `toki` |

Em builds de produção (`expo build`) a variável nunca é definida → `SCREENSHOT_MODE = false` → nenhum comportamento alterado.

---

## 8. Futura integração com Fastlane

Quando quiser integrar, adicione um `Fastfile` na raiz do projeto com uma lane:

```ruby
lane :screenshots do
  sh "EXPO_PUBLIC_SCREENSHOT_MODE=true npx expo start --android &"
  sh "sleep 20"   # aguardar Metro + app carregar
  sh "npm run screenshots"
  sh "pkill -f 'expo start'"
end
```

Execute com:

```bash
fastlane screenshots
```

A estrutura `playstore/{locale}/` já é compatível com o padrão esperado pelo `supply` (Fastlane plugin para Play Store).
