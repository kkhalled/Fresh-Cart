import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faRotateLeft,
  faShieldHalved,
  faHeadset,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface FeatureItem {
  id: number;
  icon: IconDefinition;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    icon: faTruck,
    title: 'Free Delivery',
    description: 'Orders $50 or more',
  },
  {
    id: 2,
    icon: faRotateLeft,
    title: '30 Days Return',
    description: 'Satisfaction guaranteed',
  },
  {
    id: 3,
    icon: faShieldHalved,
    title: 'Secure Payment',
    description: '100% protected checkout',
  },
  {
    id: 4,
    icon: faHeadset,
    title: '24/7 Support',
    description: 'Ready to help anytime',
  },
];

function FeatureCard({ icon, title, description }: Omit<FeatureItem, 'id'>) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 lg:px-5 lg:py-4 transition-shadow duration-300 hover:shadow-md shrink-0 min-w-50 sm:min-w-0">
      <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-full bg-green-100">
        <FontAwesomeIcon icon={icon} className="text-green-600 text-base lg:text-lg" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-gray-800 text-xs lg:text-sm">{title}</p>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
    </div>
  );
}

export default function FeatureHighlights() {
  return (
    <section className="w-full bg-gray-50 py-4 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: horizontal scroll strip */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:hidden">
          {features.map(({ id, ...props }) => (
            <FeatureCard key={id} {...props} />
          ))}
        </div>
        {/* Tablet+: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ id, ...props }) => (
            <FeatureCard key={id} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
