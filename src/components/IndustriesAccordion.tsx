import { useState } from 'react';
import {
  School,
  Hospital,
  Home,
  Building2,
  Puzzle,
  Truck,
  Wrench,
} from 'lucide-react';

const iconMap = {
  School,
  Hospital,
  Home,
  Building2,
  Puzzle,
  Truck,
  Wrench,
};

type IconName = keyof typeof iconMap;

interface Industry {
  icon: IconName;
  title: string;
  items: string[];
}

const industries: Industry[] = [
  {
    icon: 'School',
    title: 'Childcare Centers',
    items: [
      'Reliable staff payroll and state subsidy management',
      'Clear cash flow visibility across multiple locations',
    ],
  },
  {
    icon: 'Hospital',
    title: 'Skilled Nursing Facilities',
    items: [
      'Insurance and government payer reconciliation',
      'Compliance-ready financial reporting',
    ],
  },
  {
    icon: 'Home',
    title: 'Assisted Living Communities',
    items: [
      'Resident billing and private pay management',
      'Predictable operational financials',
    ],
  },
  {
    icon: 'Building2',
    title: 'Management Companies',
    items: [
      'Multi-entity accounting and owner reporting',
      'Contract-based revenue tracking and vendor payroll',
    ],
  },
  {
    icon: 'Puzzle',
    title: 'ABA Companies',
    items: [
      'Insurance claim management and AR optimization',
      'Multi-location staff payroll accuracy',
    ],
  },
  {
    icon: 'Truck',
    title: 'Junk Removal Companies',
    items: [
      'Field operations invoice management',
      'Same-day and recurring revenue tracking',
    ],
  },
  {
    icon: 'Wrench',
    title: 'Plumbing & Trades',
    items: [
      'Project-based accounting and job costing',
      'Equipment and inventory management',
    ],
  },
];

// Split industries into separate columns
const col1 = industries.filter((_, i) => i % 3 === 0);
const col2 = industries.filter((_, i) => i % 3 === 1);
const col3 = industries.filter((_, i) => i % 3 === 2);

function IndustryCard({
  industry,
  index,
  openIndex,
  toggle,
}: {
  industry: Industry;
  index: number;
  openIndex: number | null;
  toggle: (i: number) => void;
}) {
  const Icon = iconMap[industry.icon];
  const isOpen = openIndex === index;

  return (
    <div
      className={`bg-white border rounded-xl transition-all duration-300 overflow-hidden shadow-[0_1px_3px_rgba(26,31,46,0.04)] card-glow ${
        isOpen
          ? 'border-[#B8943F]/50 shadow-[0_4px_20px_rgba(26,31,46,0.08)]'
          : 'border-[#E8E6E1] hover:border-[#B8943F]/30 hover:-translate-y-0.5'
      }`}
    >
      <button
        onClick={() => toggle(index)}
        className="w-full flex items-center gap-3 p-6 text-left group"
      >
        <span
          className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-[#B8943F] shadow-[0_0_12px_rgba(184,148,63,0.4)]'
              : 'bg-[rgba(184,148,63,0.10)] group-hover:bg-[rgba(184,148,63,0.18)]'
          }`}
        >
          <Icon
            size={20}
            className={`transition-colors duration-300 ${
              isOpen ? 'text-white' : 'text-[#B8943F]'
            }`}
          />
        </span>
        <h3
          className={`text-lg font-bold transition-colors duration-300 ${
            isOpen ? 'text-[#B8943F]' : 'text-[#1A1F2E] group-hover:text-[#B8943F]'
          }`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {industry.title}
        </h3>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-6 pb-6 pt-0">
          {industry.items.map((item) => (
            <li
              key={item}
              className="text-[0.95rem] text-[#5A6070] pl-[22px] relative leading-relaxed py-1"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              <span className="absolute left-0 top-[13px] w-1.5 h-1.5 bg-[#B8943F] rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function IndustriesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Mobile: single column with all items
  // Desktop: 3 independent flex columns
  return (
    <>
      {/* Mobile: single column */}
      <div className="flex flex-col gap-5 lg:hidden">
        {industries.map((industry, i) => (
          <IndustryCard
            key={industry.title}
            industry={industry}
            index={i}
            openIndex={openIndex}
            toggle={toggle}
          />
        ))}
      </div>

      {/* Desktop: 3 independent columns */}
      <div className="hidden lg:flex gap-5 items-start">
        <div className="flex-1 flex flex-col gap-5">
          {col1.map((industry) => {
            const i = industries.indexOf(industry);
            return (
              <IndustryCard
                key={industry.title}
                industry={industry}
                index={i}
                openIndex={openIndex}
                toggle={toggle}
              />
            );
          })}
        </div>
        <div className="flex-1 flex flex-col gap-5">
          {col2.map((industry) => {
            const i = industries.indexOf(industry);
            return (
              <IndustryCard
                key={industry.title}
                industry={industry}
                index={i}
                openIndex={openIndex}
                toggle={toggle}
              />
            );
          })}
        </div>
        <div className="flex-1 flex flex-col gap-5">
          {col3.map((industry) => {
            const i = industries.indexOf(industry);
            return (
              <IndustryCard
                key={industry.title}
                industry={industry}
                index={i}
                openIndex={openIndex}
                toggle={toggle}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
