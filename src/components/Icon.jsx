import {
  Activity, ArrowLeft, ArrowRight, Award, Box, Calendar, CalendarPlus,
  Check, CheckCircle, ChevronDown, ChevronRight, Circle, Clock, Feather,
  Grid, Heart, Home, Layers, MapPin, MessageCircle, Moon, Navigation,
  Phone, PhoneCall, PlusCircle, RefreshCw, Send, Shield, ShieldAlert,
  ShieldCheck, Smile, Sparkles, Star, Stethoscope, User, Users, X, Zap,
} from 'lucide-react';

const icons = {
  activity: Activity, 'arrow-left': ArrowLeft, 'arrow-right': ArrowRight,
  award: Award, box: Box, calendar: Calendar, 'calendar-plus': CalendarPlus,
  check: Check, 'check-circle': CheckCircle, 'chevron-down': ChevronDown,
  'chevron-right': ChevronRight, clock: Clock, feather: Feather, grid: Grid,
  heart: Heart, home: Home, layers: Layers, 'map-pin': MapPin,
  'message-circle': MessageCircle, moon: Moon, navigation: Navigation,
  phone: Phone, 'phone-call': PhoneCall, 'plus-circle': PlusCircle,
  'refresh-cw': RefreshCw, send: Send, shield: Shield,
  'shield-alert': ShieldAlert, 'shield-check': ShieldCheck, smile: Smile,
  sparkles: Sparkles, star: Star, stethoscope: Stethoscope, user: User,
  users: Users, x: X, zap: Zap,
};

export default function Icon({ name, size = 18, ...props }) {
  const IconComponent = icons[name] || Circle;
  return <IconComponent size={size} aria-hidden="true" {...props} />;
}
