import { useEffect, useState } from 'react';
import { doctors, reasons, reviews, services, smileGallery } from '../data/clinicData';
import AppointmentForm from './AppointmentForm';
import Icon from './Icon';

export default function MobileSite({ clinic, openServices, openTeam, openTreatments, selectedService, setSelectedService }) {
  const [activeTab, setActiveTab] = useState('m-home');
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const whatsappUrl = `tel:${clinic.phone}`;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActiveTab(entry.target.id)), { threshold: 0.3 });
    document.querySelectorAll('.app-body [id^="m-"]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const bookService = (name) => {
    setSelectedService(name);
    document.getElementById('m-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const mobileServiceCopy = ['Routine preventive care','Personalized cosmetic care','Modern tooth replacement','Focused tooth-preserving care'];
  const mobileServiceNames = ['Checkup & Cleaning','Dental Veneers','Dental Implants','Root Canal Treatment'];
  const tabs = [['home','Home','m-home'],['stethoscope','Services','m-services'],['users','Team','m-team'],['calendar','Book','m-booking'],['star','Reviews','m-reviews']];

  return (
    <div className="mobile-app-wrapper"><div className="app-shell">
      <a href={whatsappUrl} className="app-fab" aria-label="Call New York Dental Office"><Icon name="phone" size={22} /></a>
      <header className="app-header"><div className="app-brand-wrapper"><div className="app-brand">{clinic.namePrefix}<span>{clinic.nameAccent}</span></div><div className="app-brand-sub"><span className="status-dot-pulse" /> Upper East Side • NYC</div></div><div className="phc-pill-styled"><Icon name="shield-check" size={13} /> Since 1971</div></header>
      <main className="app-body">
        <div className="hero-app-card" id="m-home"><span className="hero-tag">• Upper East Side, New York</span><h1 className="hero-title">Advanced Dental Care For <span>Your Family</span></h1><p className="hero-subtitle">Comprehensive family, cosmetic, restorative, and emergency care in a modern practice.</p><a href="#m-booking" className="btn-app-submit">Request Appointment <Icon name="arrow-right" size={16} /></a></div>
        <div className="quick-actions">{[['calendar','Book','#m-booking'],['phone-call','Call Us',`tel:${clinic.phone}`],['stethoscope','Services','#m-services'],['users','Doctors','#m-team']].map(([icon,label,href]) => <a key={label} href={href} className="action-item"><div className="action-icon"><Icon name={icon} size={20} /></div><span className="action-label">{label}</span></a>)}</div>
        <div className="app-section"><div className="mobile-stat-grid"><div className="stat-chip"><h3>Since 1971</h3><p>NYC Care</p></div><div className="stat-chip"><h3>4.9★</h3><p>Rating</p></div><div className="stat-chip"><h3>500+</h3><p>Reviews</p></div></div></div>

        <div className="app-section" id="m-services"><div className="app-section-title">Popular Services <button onClick={openServices}>View All <Icon name="chevron-right" size={13} /></button></div><div className="mobile-services-container"><div className="services-app-list">{services.slice(0,4).map((service,index) => <div className="service-app-card" key={service.name}><div className="service-card-left"><div className="service-app-icon"><Icon name={service.icon} size={18} /></div><div className="service-app-info"><h4>{mobileServiceNames[index]}</h4><p>{mobileServiceCopy[index]}</p></div></div><button className="service-book-btn" onClick={() => bookService(service.name)}>Book</button></div>)}</div></div></div>

        <div className="app-section" id="m-team"><div className="app-section-title">Our Specialists <button onClick={openTeam}>View All <Icon name="chevron-right" size={13} /></button></div><div className="mobile-doctor-marquee-container"><div className="mobile-doctor-marquee-track">{[...doctors,...doctors].map((doctor,index) => <div className="doctor-app-card" key={`${doctor.name}-${index}`}><img src={doctor.image.replace('w=800','w=500')} className="doctor-app-img" alt={doctor.name} /><div className="doctor-app-info"><span className="doctor-app-role">{doctor.shortRole}</span><h4 className="doctor-app-name">{doctor.name}</h4><p className="doctor-app-desc">{doctor.shortDescription}</p></div></div>)}</div></div></div>

        <div className="app-section" id="m-why"><div className="app-section-title">Why Choose Us?</div><div className="services-app-list">{reasons.map((reason) => <div className="service-app-card" key={reason.title} style={{ borderLeft: '4px solid var(--teal)' }}><div className="service-card-left"><div className="service-app-icon"><Icon name={reason.icon} size={18} /></div><div className="service-app-info"><h4>{reason.title}</h4><p>{reason.description}</p></div></div></div>)}</div></div>

        <div className="app-section practice-gallery-section" id="m-gallery"><div className="app-section-title">Our Practice Gallery</div><div className="mobile-smile-gallery">{smileGallery.map((item) => <figure key={item.label}><img src={item.image} alt={item.label} /><figcaption>{item.label}</figcaption></figure>)}</div></div>

        <div className="app-section" id="m-booking"><div className="app-section-title">Book An Appointment</div><div className="booking-app-card"><AppointmentForm key={selectedService} clinic={clinic} mobile initialService={selectedService} onOpenTreatments={openTreatments} /></div></div>

        <div className="app-section" id="m-reviews"><div className="app-section-title">Patient Reviews <span>4.9★ Google</span></div><div className="horizontal-scroll">{reviews.map((review) => <div className="review-app-card" key={review.name}><div className="review-app-author"><div className="author-avatar" aria-hidden="true">{review.initials}</div><div><strong>{review.name}</strong><span>Google reviewer</span></div></div><div className="review-app-stars" aria-label="5 out of 5 stars">★★★★★</div><p>“{review.mobileText}”</p></div>)}</div></div>

        <footer className="mobile-footer" id="m-contact"><h3>{clinic.namePrefix} <span style={{ color: 'var(--teal-accent)' }}>{clinic.nameAccent}</span></h3><div className="footer-mobile-row"><div className="footer-mobile-info"><div className="footer-info-item"><Icon name="map-pin" size={14} /><span>{clinic.address}</span></div><div className="footer-info-item"><Icon name="phone" size={14} /><a href={`tel:${clinic.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>{clinic.phoneDisplay}</a></div><div className="footer-info-item"><Icon name="clock" size={14} /><span>{clinic.hours}</span></div></div><div className="map-card-mobile-side"><iframe title="Office location" src={mapUrl} allowFullScreen loading="lazy" /><div className="map-card-overlay-side"><a href={`https://maps.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}`} target="_blank" rel="noreferrer" style={{ color: '#fff', fontWeight: 700, fontSize: '.68rem', textDecoration: 'none' }}>Open Map</a></div></div></div><div className="social-links mobile-social-links">{Object.entries(clinic.social).map(([network,url]) => url && <a key={network} href={url} target="_blank" rel="noreferrer">{network}</a>)}</div><p style={{ fontSize: '.7rem', color: '#94A3B8', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 12 }}>Redesign concept using publicly available clinic information.</p></footer>
      </main>
      <nav className="app-tab-bar">{tabs.map(([icon,label,target]) => <a key={target} href={`#${target}`} className={`tab-item ${activeTab === target ? 'active' : ''}`}><Icon name={icon} size={18} /><span>{label}</span></a>)}</nav>
    </div></div>
  );
}

