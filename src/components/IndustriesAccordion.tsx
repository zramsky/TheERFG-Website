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
    title: 'Senior Living Facilities',
    items: [
      'Multi-level care billing and accounting',
      'Transparent financial operations',
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
      className={`bg-[#1e1e1e] border rounded-xl transition-all duration-300 overflow-hidden card-glow ${
        isOpen
          ? 'border-[#C87533]/50 shadow-[0_4px_20px_rgba(200,117,51,0.1)]'
          : 'border-[rgba(255,255,255,0.08)] hover:border-[#C87533]/30 hover:-translate-y-0.5'
      }`}
    >
      <button
        onClick={() => toggle(index)}
        className="w-full flex items-center gap-3 p-6 text-left group"
      >
        <span
          className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-[#C87533] shadow-[0_0_12px_rgba(200,117,51,0.4)]'
              : 'bg-[rgba(200,117,51,0.15)] group-hover:bg-[rgba(200,117,51,0.25)]'
          }`}
        >
          <Icon
            size={20}
            className={`transition-colors duration-300 ${
              isOpen ? 'text-white' : 'text-[#C87533]'
            }`}
          />
        </span>
        <h3
          className={`text-lg font-bold transition-colors duration-300 ${
            isOpen ? 'text-[#C87533]' : 'text-white group-hover:text-[#C87533]'
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
              className="text-[0.95rem] text-white/60 pl-[22px] relative leading-relaxed py-1"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              <span className="absolute left-0 top-[13px] w-1.5 h-1.5 bg-[#C87533] rounded-full" />
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
