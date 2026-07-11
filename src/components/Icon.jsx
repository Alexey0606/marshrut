import {
  Shield, Users, Briefcase, FileText, Star, Plane,
  Compass, Globe, Headphones, Search, Layout, Heart, Eye,
} from 'lucide-react'

const MAP = {
  shield: Shield,
  users: Users,
  briefcase: Briefcase,
  'file-text': FileText,
  star: Star,
  plane: Plane,
  compass: Compass,
  globe: Globe,
  headphones: Headphones,
  search: Search,
  layout: Layout,
  heart: Heart,
  eye: Eye,
  handshake: ({ size, color, strokeWidth }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l1.06 1.06L12 21.23l7.36-7.94 1.06-1.06a5.4 5.4 0 0 0 0-7.65z"/>
      <path d="M8 12h8"/>
      <path d="M9 9l3 3-3 3"/>
    </svg>
  ),
}

export default function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 1.75 }) {
  const Comp = MAP[name]
  if (!Comp) return null
  return <Comp size={size} color={color} strokeWidth={strokeWidth} />
}
