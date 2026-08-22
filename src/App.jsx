import { useEffect, useState } from 'react';
import { clinic, services } from './data/clinicData';
import { theme, applyTheme } from './theme/theme';
import DesktopSite from './components/DesktopSite';
import MobileSite from './components/MobileSite';
import { ServicesOverlay, TeamOverlay, TreatmentSheet } from './components/Overlays';
import './styles/base.css';
import './styles/desktop.css';
import './styles/mobile.css';
import './styles/components.css';
import './styles/react-adjustments.css';

export default function App() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [treatmentState, setTreatmentState] = useState(null);
  const [selectedService, setSelectedService] = useState(services[0].name);

  useEffect(() => applyTheme(theme), []);
  useEffect(() => {
    const handleBrowserBack = () => {
      setServicesOpen(false);
      setTeamOpen(false);
      setTreatmentState(null);
    };
    window.addEventListener('popstate', handleBrowserBack);
    return () => window.removeEventListener('popstate', handleBrowserBack);
  }, []);
  useEffect(() => {
    const overlayOpen = servicesOpen || teamOpen || Boolean(treatmentState);
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [servicesOpen, teamOpen, treatmentState]);

  const openOverlay = (name, open) => {
    window.history.pushState({ ...(window.history.state ?? {}), clinicOverlay: name }, '');
    open();
  };

  const closeOverlay = (name, close) => {
    if (window.history.state?.clinicOverlay === name) {
      window.history.back();
      return;
    }
    close();
  };

  const bookFromCatalogue = (service) => {
    setSelectedService(service);
    const target = window.innerWidth <= 768 ? 'm-booking' : 'd-booking';
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return <>
    <DesktopSite clinic={clinic} selectedService={selectedService} setSelectedService={setSelectedService} openServices={() => openOverlay('services', () => setServicesOpen(true))} />
    <MobileSite clinic={clinic} openServices={() => openOverlay('services', () => setServicesOpen(true))} openTeam={() => openOverlay('team', () => setTeamOpen(true))} openTreatments={(state) => openOverlay('treatment', () => setTreatmentState(state))} selectedService={selectedService} setSelectedService={setSelectedService} />
    <TreatmentSheet open={Boolean(treatmentState)} onClose={() => closeOverlay('treatment', () => setTreatmentState(null))} value={treatmentState?.service} onSelect={(service) => {
      treatmentState?.setService(service);
      setTreatmentState((current) => current ? { ...current, service } : current);
    }} />
    <TeamOverlay open={teamOpen} onClose={() => closeOverlay('team', () => setTeamOpen(false))} />
    <ServicesOverlay open={servicesOpen} onClose={() => closeOverlay('services', () => setServicesOpen(false))} onBook={bookFromCatalogue} />
  </>;
}

