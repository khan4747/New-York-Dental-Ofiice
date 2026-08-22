import { doctors, reasons, reviews, services, smileGallery } from '../data/clinicData';
import AppointmentForm from './AppointmentForm';
import Icon from './Icon';

export default function DesktopSite({ clinic, selectedService, setSelectedService, openServices }) {
  const featuredCategories = ['Diagnostics', 'Cosmetic', 'Implants', 'Endodontics', 'Surgery', 'Aesthetics'];
  const bookService = (service) => {
    setSelectedService(service);
    document.getElementById('d-booking')?.scrollIntoView({ behavior: 'smooth' });
  };
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const whatsappUrl = `tel:${clinic.phone}`;

  return (
    <div className="desktop-web-wrapper">
      <a href={whatsappUrl} className="wa-float" aria-label="Call New York Dental Office"><Icon name="phone" size={28} /></a>
      <div className="hero-wrapper">
        <nav className="navbar"><div className="container nav-content">
          <a href="#d-home" className="brand-logo">{clinic.namePrefix}<span>{clinic.nameAccent}</span></a>
          <ul className="nav-links">{[['Home','d-home'],['Services','d-services'],['Our Team','d-team'],['Gallery','d-gallery'],['Why Choose Us','d-why'],['Book','d-booking'],['Reviews','d-reviews']].map(([label,id]) => <li key={id}><a href={`#${id}`} className="nav-link">{label}</a></li>)}</ul>
          <a href="#d-booking" className="btn-primary"><Icon name="calendar" size={15} /> Book Appointment</a>
        </div></nav>
        <section className="hero" id="d-home"><div className="container">
          <div className="hero-announcement"><span className="phc-badge-pill">SINCE 1971</span><span>{clinic.hours}</span></div>
          <h1 className="hero-title">Gentle, Advanced Dental Care In <span>New York City</span></h1>
          <p className="hero-desc">{clinic.hero.description}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}><a href="#d-booking" className="btn-glow">Book Appointment <Icon name="arrow-right" size={16} /></a><a href={`tel:${clinic.phone}`} className="btn-outline-dark"><Icon name="phone-call" size={16} /> Direct Call</a></div>
          <div className="hero-stats-card">{clinic.stats.map((stat, index) => <div className="stat-item" key={stat.label} style={index ? { borderLeft: '1px solid rgba(255,255,255,.2)', paddingLeft: 20 } : undefined}><h3>{stat.value}</h3><p>{stat.label}</p></div>)}</div>
        </div></section>
      </div>

      <section className="section" id="d-services"><div className="container">
        <div className="section-header"><span className="section-subtitle">Our Capabilities</span><h2 className="section-title">Featured Dental Treatments</h2></div>
        <div className="web-services-grid">{services.slice(0,6).map((service,index) => <div className="web-service-card" key={service.name}><div><div className="service-card-top"><div className="web-service-icon"><Icon name={service.icon} size={22} /></div><span className="service-category-badge">{featuredCategories[index]}</span></div><h3>{service.displayName}</h3><p>{service.description}</p></div><button className="web-service-book-btn" onClick={() => bookService(service.name)}>Book <Icon name="arrow-right" size={12} /></button></div>)}</div>
        <div style={{ textAlign: 'center', marginTop: 35 }}><button onClick={openServices} className="btn-primary" style={{ padding: '12px 26px', fontSize: '.95rem' }}>View All 16 Services In Catalogue <Icon name="arrow-right" size={16} /></button></div>
      </div></section>

      <section className="section" id="d-team" style={{ background: '#fff' }}><div className="container"><div className="section-header"><span className="section-subtitle">Clinical Leadership</span><h2 className="section-title">Meet Our Specialists</h2></div><div className="web-team-marquee-container"><div className="web-team-marquee-track">{[...doctors,...doctors].map((doctor,index) => <div className="web-team-card" key={`${doctor.name}-${index}`}><div className="web-team-img-wrapper"><img src={doctor.image} alt={doctor.name} /></div><div className="web-team-info"><span style={{ color: 'var(--teal)', fontWeight: 600, fontSize: '.78rem' }}>{doctor.role.toUpperCase()}</span><h3 style={{ marginTop: 3 }}>{doctor.name}</h3><p style={{ fontSize: '.82rem', color: 'var(--text-sub)', marginTop: 4 }}>{doctor.description}</p></div></div>)}</div></div></div></section>

      <section className="section" id="d-why"><div className="container"><div className="section-header"><span className="section-subtitle">The Practice Advantage</span><h2 className="section-title">Why Choose New York Dental Office</h2></div><div className="why-grid">{reasons.map((reason) => <div className="why-card" key={reason.title}><h3>{reason.title}</h3><p>{reason.desktopDescription}</p></div>)}</div></div></section>

      <section className="section gallery-section" id="d-gallery"><div className="container"><div className="section-header"><span className="section-subtitle">Inside The Practice</span><h2 className="section-title">Our Practice Gallery</h2><p className="section-lead">Meet the team and explore the established Upper East Side practice.</p></div><div className="smile-gallery-grid">{smileGallery.map((item) => <figure className="smile-gallery-card" key={item.label}><img className="practice-gallery-image" src={item.image} alt={item.label} /><figcaption>{item.label}</figcaption></figure>)}</div></div></section>

      <section className="section" id="d-booking"><div className="container"><div className="booking-card"><div><span style={{ color: '#fff', fontWeight: 700, textTransform: 'uppercase', fontSize: '.82rem', letterSpacing: '.5px' }}>Appointment Request</span><h2 style={{ fontSize: '2.1rem', color: '#fff', margin: '6px 0 14px' }}>Request Your Appointment Today</h2><p style={{ color: '#CBD5E1', marginBottom: 20, lineHeight: 1.5, fontSize: '.9rem' }}>Select a service and preferred time, then contact the office to confirm availability.</p><div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#E2E8F0', fontSize: '.88rem' }}>{['Call (212) 548-3261 to confirm','Flexible weekday and Saturday hours','Modern digital technology'].map((text) => <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="check-circle" size={16} style={{ color: 'var(--teal-accent)' }} /> {text}</div>)}</div></div><AppointmentForm key={selectedService} clinic={clinic} initialService={selectedService} /></div></div></section>

      <section className="section" id="d-reviews" style={{ background: '#fff' }}><div className="container"><div className="section-header"><span className="section-subtitle">Testimonials</span><h2 className="section-title">What Our Patients Say</h2></div><div className="reviews-grid">{reviews.map((review) => <div className="review-card" key={review.name}><div className="review-author"><div className="author-avatar" aria-hidden="true">{review.initials}</div><div><h4 style={{ fontSize: '.9rem' }}>{review.name}</h4><span style={{ fontSize: '.74rem', color: 'var(--text-sub)' }}>Google reviewer</span></div></div><div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div><p className="review-text">“{review.text}”</p></div>)}</div></div></section>

      <footer className="footer" id="d-contact"><div className="container"><div className="footer-grid"><div><h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: 10, fontWeight: 800 }}>{clinic.namePrefix} <span style={{ color: 'var(--teal-accent)' }}>{clinic.nameAccent}</span></h3><p className="footer-brand-desc">Family, cosmetic, restorative, implant, and emergency dental care on Manhattan's Upper East Side.</p><p className="footer-address"><Icon name="map-pin" size={15} style={{ color: 'var(--teal-accent)' }} /> {clinic.address}</p><p className="footer-address"><Icon name="clock" size={15} style={{ color: 'var(--teal-accent)' }} /> {clinic.hours}</p><div className="social-links">{Object.entries(clinic.social).map(([network,url]) => url && <a key={network} href={url} target="_blank" rel="noreferrer">{network}</a>)}</div></div><div><h4>Quick Links</h4><ul className="footer-links"><li><a href="#d-home">Home</a></li><li><button onClick={openServices}>16 Services</button></li><li><a href="#d-team">Our Team</a></li><li><a href="#d-gallery">Practice Gallery</a></li><li><a href="#d-booking">Request Appointment</a></li><li><a href="#d-reviews">Reviews</a></li></ul></div><div><h4>Top Treatments</h4><ul className="footer-links">{services.slice(1,5).map((service) => <li key={service.name}><a href="#d-services">{service.displayName}</a></li>)}</ul></div><div><h4>Office Location</h4><div className="map-card-container"><iframe title="Office location" className="map-frame" src={mapUrl} allowFullScreen loading="lazy" /><div className="map-badge-overlay"><Icon name="navigation" size={13} style={{ color: '#fff' }} /><span style={{ color: '#fff' }}>{clinic.address}</span></div></div></div></div><div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 18, textAlign: 'center', fontSize: '.78rem', color: '#94A3B8' }}>Redesign concept prepared for New York Dental Office using publicly available business information.</div></div></footer>
    </div>
  );
}
