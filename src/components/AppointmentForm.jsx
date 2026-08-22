import { useState } from 'react';
import { services, timeSlots } from '../data/clinicData';
import { getNextDays, openWhatsAppAppointment } from '../utils/booking';
import Icon from './Icon';

export default function AppointmentForm({ clinic, mobile = false, initialService, onOpenTreatments }) {
  const days = getNextDays(7);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || services[0].name);
  const [date, setDate] = useState(days[0].value);
  const [time, setTime] = useState(timeSlots[0]);

  const submit = (event) => {
    event.preventDefault();
    if (!time) return window.alert('Please select a time slot.');
    openWhatsAppAppointment({ whatsapp: clinic.whatsapp, name, phone, service, date, time });
  };

  if (mobile) {
    return (
      <form onSubmit={submit}>
        <div className="booking-step-title"><Icon name="user" size={14} /> 1. Personal Details</div>
        <div className="input-group-modern"><label className="input-label">Full Name</label><input className="custom-input" placeholder="e.g. Muhammad Ali" value={name} onChange={(e) => setName(e.target.value)} required /></div>
        <div className="input-group-modern"><label className="input-label">Phone Number</label><input className="custom-input" type="tel" placeholder="(212) 555-0123" value={phone} onChange={(e) => setPhone(e.target.value)} required /></div>
        <div className="booking-step-title" style={{ marginTop: 16 }}><Icon name="stethoscope" size={14} /> 2. Select Treatment</div>
        <div className="input-group-modern">
          <button type="button" className="custom-select-trigger" onClick={() => onOpenTreatments?.({ service, setService })}>
            <span className="trigger-left"><Icon name="stethoscope" size={16} style={{ color: 'var(--teal-accent)' }} /><span className="trigger-text">{service}</span></span>
            <Icon name="chevron-down" size={16} style={{ color: 'var(--teal-accent)' }} />
          </button>
        </div>
        <div className="booking-step-title" style={{ marginTop: 16 }}><Icon name="calendar" size={14} /> 3. Select Day</div>
        <div className="date-picker-pills">
          {days.map((day) => <button type="button" key={day.value} className={`date-pill ${date === day.value ? 'selected' : ''}`} onClick={() => setDate(day.value)}><span className="day-name">{day.day === 'Today' ? new Date(`${day.value}T00:00:00`).toLocaleDateString('en-US', { weekday: 'short' }) : day.day}</span><span className="day-num">{day.date}</span></button>)}
          <label className={`date-pill date-more-pill ${days.some((day) => day.value === date) ? '' : 'selected'}`} aria-label="Choose another date"><Icon name="calendar-plus" size={20} /><span className="date-more-label">More</span><input type="date" min={days[0].value} value={date} onChange={(event) => setDate(event.target.value)} required /></label>
        </div>
        <div className="booking-step-title" style={{ marginTop: 16 }}><Icon name="clock" size={14} /> 4. Select Time</div>
        <div className="time-pill-grid">
          {timeSlots.map((slot) => <button type="button" key={slot} className={`time-pill ${time === slot ? 'selected' : ''}`} onClick={() => setTime(slot)}>{slot}</button>)}
        </div>
        <button type="submit" className="btn-app-submit">Confirm Appointment <Icon name="send" size={16} /></button>
      </form>
    );
  }

  return (
    <form onSubmit={submit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input className="form-control" placeholder="Your Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="form-control" type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <div>
          <span className="web-picker-label"><Icon name="stethoscope" size={14} /> Select Treatment (All 16 Available)</span>
          <div className="desktop-service-selector-grid">
            {services.map((item, index) => <button type="button" key={item.name} className={`desktop-service-chip ${service === item.name ? 'selected' : ''}`} onClick={() => setService(item.name)}><Icon name={item.icon} size={13} /> {index + 1}. {item.displayName}</button>)}
          </div>
        </div>
        <div><span className="web-picker-label"><Icon name="calendar" size={14} /> Preferred Date</span><input className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></div>
        <div>
          <span className="web-picker-label"><Icon name="clock" size={14} /> Preferred Slot</span>
          <div className="web-time-grid">{timeSlots.map((slot) => <button type="button" key={slot} className={`web-time-pill ${time === slot ? 'selected' : ''}`} onClick={() => setTime(slot)}>{slot}</button>)}</div>
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13, marginTop: 4 }}>Confirm Appointment <Icon name="send" size={16} /></button>
      </div>
    </form>
  );
}
