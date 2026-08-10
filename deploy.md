# Deploy — EAS Submit to Google Play Store

## 1. Google Cloud Console — criar o projeto e service account

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um novo projeto (ou use um existente)
3. No menu lateral: **APIs & Services → Enable APIs** → ative a **Google Play Android Developer API**
4. Vá em **IAM & Admin → Service Accounts → Create Service Account**
5. Dê um nome (ex: `eas-submit`) e clique em **Create and Continue**
6. Em **Role**, adicione **Service Account User** (o mínimo necessário; o Play Console vai conceder as permissões específicas)
7. Clique em **Done**
8. Clique no service account criado → aba **Keys → Add Key → Create new key → JSON**
9. Baixe o arquivo `.json` — guarde com segurança, você vai precisar dele

---

## 2. Google Play Console — vincular o projeto GCP

1. Acesse [play.google.com/console](https://play.google.com/console)
2. **Setup → API access**
3. Se aparecer um botão **Link** para o projeto GCP que você criou, clique para vincular
4. Isso conecta o service account do GCP ao Play Console

---

## 3. Google Play Console — conceder permissão ao service account

1. **Setup → Users and permissions → Invite new users**
2. No campo de email, coloque o email do service account (ex: `eas-submit@seu-projeto.iam.gserviceaccount.com`)
3. Na aba **App permissions**, clique em **Add app** e selecione seu app
4. Conceda pelo menos: **Releases → Release to testing tracks**
5. Clique em **Send invite**

> ⚠️ **Ponto que costuma travar:** o service account precisa ser convidado no Play Console com permissão explícita para o app, mesmo que ele já exista no GCP.

---

## 4. EAS — fazer upload do JSON key

```bash
eas credentials --platform android
```

Quando perguntado:

- **Which build profile?** → `production`
- **What do you want to do?** → `Google Service Account > Upload a Google Service Account Key`
- Informe o caminho para o arquivo `.json` baixado no passo 1

Ou pelo dashboard: **expo.dev → seu projeto → Credentials → Android → Service Credentials → Add a Google Service Account Key**

---

## 5. `eas.json` — configurar o perfil de submit

```json
{
  "submit": {
    "production": {
      "android": {
        "track": "internal"
      }
    }
  }
}
```

`track` pode ser: `internal`, `alpha`, `beta` ou `production`.

---

## 6. Submeter

```bash
# Build + submit em um comando
eas build --profile production --platform android --auto-submit

# Ou separado
eas build --profile production --platform android
eas submit --platform android --profile production
```

---

## Resumo do fluxo de permissões

```
GCP Project
  └── Service Account (email)
        └── JSON Key → upload no EAS
              └── Play Console (Users and permissions)
                    └── App permissions → Release to testing tracks
```