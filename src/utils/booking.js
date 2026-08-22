export function getNextDays(count = 5) {
  const days = [];
  let offset = 0;
  while (days.length < count) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    offset += 1;
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    days.push({
      value: date.toISOString().split('T')[0],
      day: offset === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
    });
  }
  return days;
}

export function openWhatsAppAppointment({ whatsapp, name, phone, service, date, time }) {
  void whatsapp;
  void name;
  void phone;
  void service;
  void date;
  void time;
  window.open('https://www.zocdoc.com/practice/new-york-dental-office-28903', '_blank', 'noopener,noreferrer');
}
