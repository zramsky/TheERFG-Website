import {
  School,
  Hospital,
  Home,
  Building2,
  Puzzle,
  Truck,
  Wrench,
  BarChart3,
  Clock,
  TrendingUp,
  Handshake,
  Mail,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  Users,
  BookOpen,
  Shield,
  Droplets,
  Settings,
  Package,
  Star,
  Crosshair,
  type LucideProps,
} from 'lucide-react';

const iconMap = {
  School,
  Hospital,
  Home,
  Building2,
  Puzzle,
  Truck,
  Wrench,
  BarChart3,
  Clock,
  TrendingUp,
  Handshake,
  Mail,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  Users,
  BookOpen,
  Shield,
  Droplets,
  Settings,
  Package,
  Star,
  Crosshair,
} as const;

type IconName = keyof typeof iconMap;

interface Props extends LucideProps {
  name: IconName;
}

export default function LucideIcon({ name, ...props }: Props) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
