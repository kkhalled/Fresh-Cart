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
    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-full bg-green-100">
        <FontAwesomeIcon icon={icon} className="text-green-600 text-lg" />
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default function FeatureHighlights() {
  return (
    <section className="w-full py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ id, ...props }) => (
            <FeatureCard key={id} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
