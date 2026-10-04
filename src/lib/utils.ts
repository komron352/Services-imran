export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: string | Date) {
  const d = new Date(date)
  return d.toLocaleDateString('tg-TJ', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat('tg-TJ', { style: 'currency', currency: 'TJS', maximumFractionDigits: 0 }).format(amount)
}

export function formatPhone(phone: string) {
  return phone
}
