# IMRAN SERVICE CRM

CRM-и пурра барои идоракунии мизоҷон, хизматрасониҳо, вохӯриҳо ва SMS огоҳиномаҳо.

## Хусусиятҳо
- Auth бо Supabase
- Мизоҷон CRUD + ҷустуҷӯ
- Хизматрасониҳо бо нарх ва давомнокӣ
- Тақвим ва вохӯриҳо
- Dashboard бо статистика
- SMS Logs + Edge Functions (Twilio)
- Reminder Cron (фардо вохӯриҳо)
- Dark premium UI #08080a + gold #d4a017

## Насб
```bash
npm install
npm run dev
```

## Муҳити зист
Нусхаи .env.example ба .env:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

## Supabase
1. schema.sql-ро дар SQL Editor иҷро кунед
2. Auth > Users > корбар созед
3. Edge Functions deploy кунед:
   - supabase/functions/send-sms
   - supabase/functions/reminder-cron

## Build
npm run build  # tsc -b && vite build

## Deploy Vercel
vercel.json аллакай танзим шудааст.
