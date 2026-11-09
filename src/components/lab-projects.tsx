'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import {
  Star,
  Zap,
  Shield,
  Workflow,
  Activity,
  Boxes,
  Database,
  Network,
  Eye,
  Cpu,
  Send,
  Sliders,
  Sparkles,
  Lock,
  Server,
  TrendingUp,
  Check,
  ChevronRight,
  ChevronLeft,
  Menu,
  ArrowRight,
  RotateCcw,
  CreditCard,
  Headphones,
  DollarSign,
  PackageCheck,
  Building2,
  Receipt,
  Printer,
  CheckCircle2,
  Store,
  Loader2,
  Compass,
  Navigation as NavCompass,
  MapPin,
  Play,
  Pause,
  Layers,
  WifiOff,
  Car,
  FileText,
  Search,
  Scale,
  BarChart3,
  Megaphone,
  Wallet,
} from 'lucide-react';
import {
  Map,
  MapRoute,
  MarkerContent,
  MarkerLabel,
  RouteMarker,
  RouteProgress,
} from '@/components/ui/map';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

// ============================================================================
// DATA: REVIEWS FOR PROJECT 1 (QUICKPLATE SALESFORCE DELIVERY PLATFORM)
// ============================================================================
export interface CustomerReview {
  id: number;
  tag: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  rating: number;
  quote: string;
  metricBadge: string;
}

const P1_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    tag: '01. Faster & Hassle-Free Ordering',
    name: 'Sofia Ramirez',
    role: 'Active Diner',
    company: 'Food Ordering Experience',
    avatarText: 'SR',
    rating: 5,
    quote:
      'Ordering food through QuickPlate was simple and convenient. I could easily place my order and follow the process without confusion. It made my overall ordering experience much smoother.',
    metricBadge: '01. Hassle-Free Ordering',
  },
  {
    id: 2,
    tag: '02. Better Order Visibility',
    name: 'Kenji Takahashi',
    role: 'Repeat Diner',
    company: 'Order Management',
    avatarText: 'KT',
    rating: 5,
    quote:
      'I liked having better visibility into my order. It was easier to understand where my order stood instead of wondering what was happening. That gave me more confidence while ordering.',
    metricBadge: '02. Real-Time Visibility',
  },
  {
    id: 3,
    tag: '03. Convenient Payment Experience',
    name: 'Priya Sharma',
    role: 'Digital Payee',
    company: 'Payment Experience',
    avatarText: 'PS',
    rating: 5,
    quote:
      'The payment process was straightforward, and having transaction-related information connected to my order made things easier to understand.',
    metricBadge: '03. Connected Payments',
  },
  {
    id: 4,
    tag: '04. Simplified Issue Reporting',
    name: 'Malik Adebayo',
    role: 'Support Inquirer',
    company: 'Customer Support',
    avatarText: 'MA',
    rating: 5,
    quote:
      'I could raise my order issue without going through a complicated process. Having a dedicated support option made the experience more convenient.',
    metricBadge: '04. Simplified Support',
  },
  {
    id: 5,
    tag: '05. Transparent Refund Process',
    name: 'Layla Al-Mansoor',
    role: 'Claimant',
    company: 'Refund Management',
    avatarText: 'LM',
    rating: 5,
    quote:
      'Requesting a refund felt more structured than I expected. I appreciated having a dedicated process for raising refund-related concerns. It made me feel that my payment issues were being taken seriously.',
    metricBadge: '05. Transparent Refunds',
  },
  {
    id: 6,
    tag: '06. Connected Customer Support',
    name: 'Freja Lindström',
    role: 'Support User',
    company: 'Support Experience',
    avatarText: 'FL',
    rating: 5,
    quote:
      "I liked that my support issue was connected to my order details, so I didn't have to explain the entire order context repeatedly.",
    metricBadge: '06. Context-Aware Support',
  },
  {
    id: 7,
    tag: '07. Improved Ordering Convenience',
    name: 'Nguyen Tan Minh',
    role: 'Food Enthusiast',
    company: 'Overall Experience',
    avatarText: 'NM',
    rating: 5,
    quote:
      'The application brings ordering and support into one connected experience, making it easier to manage my food orders without unnecessary complexity.',
    metricBadge: '07. Unified Ordering',
  },
  {
    id: 8,
    tag: '08. Reliable Issue Handling',
    name: 'Marcus Washington',
    role: 'Multi-Order Client',
    company: 'Issue Resolution',
    avatarText: 'MW',
    rating: 5,
    quote:
      'What I found useful was the ability to report different problems, whether related to payments, refunds, or orders. Everything felt more organized. It gives customers a clearer way to communicate their concerns.',
    metricBadge: '08. Reliable Resolution',
  },
  {
    id: 9,
    tag: '09. A More Connected Experience',
    name: 'Clara Beauchamp',
    role: 'Loyalty Member',
    company: 'Overall Experience',
    avatarText: 'CB',
    rating: 5,
    quote:
      'QuickPlate brings different parts of the food-ordering experience together. I particularly liked the convenience of having order management and customer support connected in one platform.',
    metricBadge: '09. Connected Experience',
  },
];

// ============================================================================
// DATA: REVIEWS FOR PROJECT 2 (BILLORA SMART BILLING & INVENTORY MANAGEMENT)
// ============================================================================
const P2_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    tag: 'Review 01 – Retail Store Owner',
    name: 'Elena Rostova',
    role: 'Retail Store Owner',
    company: 'Urban Pantry Co.',
    avatarText: 'ER',
    rating: 5,
    quote:
      'BILLORA has made managing our daily store operations much easier. Earlier, we handled billing and stock updates separately, which often created confusion. Now, having everything in one platform gives me better control over my business.',
    metricBadge: '01. Unified Store Control',
  },
  {
    id: 2,
    tag: 'Review 02 – Store Manager',
    name: 'Tariq Al-Fassi',
    role: 'Store Manager',
    company: 'Horizon Retail Group',
    avatarText: 'TA',
    rating: 5,
    quote:
      'The inventory tracking feature is particularly useful for our store. I can quickly identify available products and monitor stock movements without depending on manual registers.',
    metricBadge: '02. Real-Time Stock Tracking',
  },
  {
    id: 3,
    tag: 'Review 03 – Cashier',
    name: 'Aaliyah Jackson',
    role: 'Lead Cashier',
    company: 'Metro Express Mart',
    avatarText: 'AJ',
    rating: 5,
    quote:
      'Billing has become much faster and more organized with BILLORA. Generating invoices is straightforward, and maintaining transaction records is no longer a time-consuming task.',
    metricBadge: '03. Rapid Invoice Generation',
  },
  {
    id: 4,
    tag: 'Review 04 – Business Administrator',
    name: 'Mateo Hernandez',
    role: 'Business Administrator',
    company: 'Apex Commerce Hub',
    avatarText: 'MH',
    rating: 5,
    quote:
      'The role-based access system helps us manage responsibilities across our employees. It gives us better control over who can access important business operations.',
    metricBadge: '04. Governed Access Control',
  },
  {
    id: 5,
    tag: 'Review 05 – Supermarket Operator',
    name: 'Sunita Patel',
    role: 'Supermarket Operator',
    company: 'FreshWay Hypermarket',
    avatarText: 'SP',
    rating: 5,
    quote:
      'Managing multiple products and their pricing used to take considerable effort. BILLORA makes product registration and updates much more convenient.',
    metricBadge: '05. Centralized Product Catalog',
  },
  {
    id: 6,
    tag: 'Review 06 – Small Business Owner',
    name: 'Lucas Vance',
    role: 'Small Business Owner',
    company: 'Artisan Provisions',
    avatarText: 'LV',
    rating: 5,
    quote:
      'The sales reports help me understand how my business is performing. Instead of relying entirely on manual calculations, I can refer to organized sales information.',
    metricBadge: '06. Actionable Sales Analytics',
  },
  {
    id: 7,
    tag: 'Review 07 – Inventory Manager',
    name: 'Zainab Diallo',
    role: 'Inventory Manager',
    company: 'Velocity Logistics & Retail',
    avatarText: 'ZD',
    rating: 5,
    quote:
      'Having inventory information available alongside billing operations makes stock monitoring easier. It helps us identify products that need attention and plan replenishment more effectively.',
    metricBadge: '07. Automated Replenishment',
  },
  {
    id: 8,
    tag: 'Review 08 – Retail Operations Manager',
    name: 'Aris Thorne',
    role: 'Retail Operations Manager',
    company: 'Starlight Department Stores',
    avatarText: 'AT',
    rating: 5,
    quote:
      'What I appreciate most is the centralized management experience. Our billing, product information, and inventory activities are organized within one system, reducing unnecessary coordination.',
    metricBadge: '08. Zero Redundant Overhead',
  },
  {
    id: 9,
    tag: 'Review 09 – Growing Business Owner',
    name: 'Hana Kim',
    role: 'Growing Business Owner',
    company: 'Seoul Boutique Goods',
    avatarText: 'HK',
    rating: 5,
    quote:
      'BILLORA provides a structured way to manage everyday business activities. It has improved our visibility into transactions and helped us maintain more consistent operational records.',
    metricBadge: '09. Auditable Transaction Records',
  },
];

// ============================================================================
// DATA: REVIEWS FOR PROJECT 3 (GEO CAMPUZ AUTONOMOUS GEOSPATIAL ENGINE)
// ============================================================================
const P3_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    tag: 'Review 01 — Seamless Indoor Classroom & Lab Finding',
    name: 'Ananya Krishnan',
    role: 'First-Year B.Tech Student',
    company: 'Classroom & Indoor Navigation',
    avatarText: 'AK',
    rating: 5,
    quote:
      'Finding classrooms like E418 on the fourth floor used to take me fifteen minutes of asking around in crowded corridors. Geo-Campuz guided me directly to the exact staircase and floor level with zero confusion on my very first try. It completely wiped out my first-week orientation anxiety and made reaching morning lectures on time effortless.',
    metricBadge: '01. Zero Transit Anxiety',
  },
  {
    id: 2,
    tag: 'Review 02 — Intuitive Real-Time Directional Compass',
    name: 'Rajeshwar Menon',
    role: 'Visiting Parent',
    company: 'Admissions & Orientation',
    avatarText: 'RM',
    rating: 5,
    quote:
      'The live directional arrow rotated smoothly the moment we stepped through the college main entrance. We navigated straight to the administrative auditorium without stopping a single security guard for directions.',
    metricBadge: '02. Live Directional Gyro Compass',
  },
  {
    id: 3,
    tag: 'Review 03 — Shortest-Path Transit Between Labs',
    name: 'Karthik Sundaram',
    role: 'Final-Year ECE Student',
    company: 'Campus Wayfinding',
    avatarText: 'KS',
    rating: 5,
    quote:
      'The A* route calculation always picks the fastest walking corridors between D-Block and the mechanical workshops. It saves our team ten minutes of back-and-forth walking between consecutive practical sessions.',
    metricBadge: '03. Sub-50ms A* Pathfinding',
  },
  {
    id: 4,
    tag: 'Review 04 — Corporate Recruitment Fast-Tracking',
    name: 'Vikram Malhotra',
    role: 'Lead Talent Partner',
    company: 'Enterprise Solutions · Corporate Recruiter',
    avatarText: 'VM',
    rating: 5,
    quote:
      'Navigating a sprawling 60-acre campus during high-volume placement drives is usually chaotic for visiting corporate panels. Geo-Campuz guided our hiring team straight from the placement cell to assigned interview halls within minutes. It kept our candidate evaluation rounds running strictly on schedule without any logistical delays.',
    metricBadge: '04. On-Time Placement Schedules',
  },
  {
    id: 5,
    tag: 'Review 05 — Live Amenity Filter & Operating Hours',
    name: 'Sneha Mukherjee',
    role: 'Resident Scholar',
    company: 'Hostel & Campus Amenities',
    avatarText: 'SM',
    rating: 5,
    quote:
      'I rely on the category filter every evening to check which food stalls and sports courts are currently open. Having real-time operating schedules prevents unnecessary walks across campus to closed facilities.',
    metricBadge: '05. Live Facility Status',
  },
  {
    id: 6,
    tag: 'Review 06 — Exam Hall Crowd & Flow Control',
    name: 'Dr. Aruna Vasudevan',
    role: 'Associate Professor',
    company: 'Academic Operations',
    avatarText: 'AV',
    rating: 5,
    quote:
      'Directing hundreds of junior students to their respective semester exam halls used to delay morning briefings. With Geo-Campuz, students arrive straight at their examination doors without corridor clutter.',
    metricBadge: '06. -75% Corridor Clutter',
  },
  {
    id: 7,
    tag: 'Review 07 — Interactive Landmark Exploration',
    name: 'Rohan Deshmukh',
    role: 'Inter-College Hackathon Delegate',
    company: 'Visitor Experience',
    avatarText: 'RD',
    rating: 5,
    quote:
      'As an external participant visiting for the state-level hackathon, the interactive map made finding event venues effortless. Tapping building markers instantly revealed exact entry points, parking facilities, and nearby cafeterias. It felt like having a knowledgeable personal campus guide in the palm of my hand.',
    metricBadge: '07. 3-Second Venue Discovery',
  },
  {
    id: 8,
    tag: 'Review 08 — Rapid Innovation Centre & Lab Discovery',
    name: 'Preeti Nambiar',
    role: 'Student Innovation Lead',
    company: 'Specialized Labs Navigation',
    avatarText: 'PN',
    rating: 5,
    quote:
      'The search bar helped us pinpoint the Karpagam Innovation Centre and testing facilities in under three seconds. The multi-floor markers ensure our visiting industry mentors never get lost in the academic blocks.',
    metricBadge: '08. Multi-Floor Indoor Nodes',
  },
  {
    id: 9,
    tag: 'Review 09 — Rock-Solid Offline PWA Reliability',
    name: 'David Samuel',
    role: 'Student Placement Coordinator',
    company: 'Event Logistics',
    avatarText: 'DS',
    rating: 5,
    quote:
      'The map loads instantly and continues routing even inside deep concrete corridors where cellular data drops to zero. That offline capability was a lifesaver when coordinating thousands of candidates across recruitment halls.',
    metricBadge: '09. Zero-Connectivity Offline PWA',
  },
];

// ============================================================================
// DATA: REVIEWS FOR PROJECT 4 (FINQUERY FINANCIAL INTELLIGENCE & RAG PLATFORM)
// ============================================================================
const P4_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    tag: 'Review 01 — Chief Financial Officer (CFO)',
    name: 'Claire Beaumont',
    role: 'Chief Financial Officer',
    company: 'Veritas Capital Holdings',
    avatarText: 'CB',
    rating: 5,
    quote:
      'FINQUERY has changed how we approach financial reporting and analysis. Instead of spending hours navigating lengthy financial statements, I can directly ask questions and retrieve relevant financial insights. The ability to understand financial performance through contextual answers makes management reviews much more efficient.',
    metricBadge: '01. Contextual Management Reviews',
  },
  {
    id: 2,
    tag: 'Review 02 — Financial Analyst',
    name: 'Hidenori Takahashi',
    role: 'Senior Financial Analyst',
    company: 'Nomura Strategic Research',
    avatarText: 'HT',
    rating: 5,
    quote:
      'The document-based question-answering capability is extremely useful for my daily analysis. I can retrieve specific financial information and understand the context behind the numbers without manually searching through multiple reports.',
    metricBadge: '02. Document-Grounded Q&A',
  },
  {
    id: 3,
    tag: 'Review 03 — Business Owner',
    name: 'Mateo Silva',
    role: 'Managing Principal & Founder',
    company: 'Silva Industrial Logistics',
    avatarText: 'MS',
    rating: 5,
    quote:
      'What I appreciate most about FINQUERY is how it simplifies complex financial information. Even without spending hours interpreting financial statements, I can understand revenue, expenditure, and cash flow patterns to make more informed business decisions.',
    metricBadge: '03. Simplified Cash Flow Visibility',
  },
  {
    id: 4,
    tag: 'Review 04 — Finance Manager',
    name: 'Amara Nwosu',
    role: 'Group Finance Manager',
    company: 'Pan-African Commerce Corp',
    avatarText: 'AN',
    rating: 5,
    quote:
      'The comparative analysis feature helps us evaluate financial performance across different reporting periods. Identifying changes in revenue and expenditure has become much more convenient.',
    metricBadge: '04. Multi-Period Variance Tracking',
  },
  {
    id: 5,
    tag: 'Review 05 — Investment Analyst',
    name: 'Julian Mercer',
    role: 'Private Equity Investment Analyst',
    company: 'Bespoke Equity Partners',
    avatarText: 'JM',
    rating: 5,
    quote:
      'FINQUERY makes financial document research considerably more accessible. Its contextual retrieval helps me locate relevant financial information and evaluate company performance without repeatedly navigating lengthy reports.',
    metricBadge: '05. Rapid Due Diligence Research',
  },
  {
    id: 6,
    tag: 'Review 06 — Accounts & Audit Professional',
    name: 'Fatou Camara',
    role: 'Senior Audit Lead',
    company: 'Deloitte & Touche Assurance',
    avatarText: 'FC',
    rating: 5,
    quote:
      'The ability to retrieve information directly from financial documents is a major advantage. Having supporting document references makes it easier to verify the information and follow up on specific financial figures.',
    metricBadge: '06. Auditable Citation Anchors',
  },
  {
    id: 7,
    tag: 'Review 07 — Startup Founder',
    name: 'Leonid Kogan',
    role: 'Founder & CEO',
    company: 'Synapse Health Robotics',
    avatarText: 'LK',
    rating: 5,
    quote:
      'As a founder, I need to understand where the business stands financially without getting lost in complicated reports. FINQUERY gives me a simpler way to explore financial performance and identify areas that require attention.',
    metricBadge: '07. Founder-Level Financial Clarity',
  },
  {
    id: 8,
    tag: 'Review 08 — Corporate Finance Executive',
    name: 'Devika Pillai',
    role: 'Director of Corporate Finance',
    company: 'Tata Global Operations',
    avatarText: 'DP',
    rating: 5,
    quote:
      'The automated financial summarization feature saves considerable effort during reporting and management discussions. It brings important observations together in a concise format, making financial information easier to communicate.',
    metricBadge: '08. Automated Executive Summaries',
  },
  {
    id: 9,
    tag: 'Review 09 — Strategic Business Consultant',
    name: 'Alexander Wright',
    role: 'Senior Partner',
    company: 'McKinsey Strategic Practice',
    avatarText: 'AW',
    rating: 5,
    quote:
      'FINQUERY brings document intelligence and financial analysis together in a practical way. Its ability to explore financial information through natural-language queries makes it a valuable decision-support tool for business evaluations and strategic planning.',
    metricBadge: '09. Natural-Language Strategy Engine',
  },
];

// ============================================================================
// DATA: REVIEWS FOR PROJECT 5 (SYNCORA ENTERPRISE WORKFLOW & COLLABORATION)
// ============================================================================
const P5_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    tag: 'Review 01 — Chief Revenue Officer (CRO)',
    name: 'Helena Lind',
    role: 'Chief Revenue Officer',
    company: 'Nordic Cloud Enterprises',
    avatarText: 'HL',
    rating: 5,
    quote:
      'SYNCORA has given our sales teams a much more connected working environment. Opportunity updates and important deal activities reach the right Slack channels without requiring managers to constantly check Salesforce. It has improved pipeline visibility and made cross-functional sales coordination considerably more effective.',
    metricBadge: '01. Real-Time Pipeline Channels',
  },
  {
    id: 2,
    tag: 'Review 02 — Customer Service Director',
    name: 'Kwame Osei',
    role: 'Customer Service Director',
    company: 'Apex Global Logistics',
    avatarText: 'KO',
    rating: 5,
    quote:
      'The Salesforce and Slack integration has made case escalation much more organized. Our support teams can receive important case updates, coordinate investigations, and keep track of customer issues without losing business context across different applications.',
    metricBadge: '02. Contextual Case Escalation',
  },
  {
    id: 3,
    tag: 'Review 03 — Enterprise Operations Manager',
    name: 'Chloe Zhao',
    role: 'Enterprise Operations Manager',
    company: 'Pacific Rim Supply Networks',
    avatarText: 'CZ',
    rating: 5,
    quote:
      'What stands out is the ability to connect different business workflows through one integration ecosystem. Our teams can collaborate on operational activities while maintaining a connection to the underlying Salesforce records. This creates better accountability and reduces communication gaps between departments.',
    metricBadge: '03. Zero Silo Accountability',
  },
  {
    id: 4,
    tag: 'Review 04 — Sales Manager',
    name: 'Sebastian Meyer',
    role: 'Regional Sales Manager',
    company: 'Bavaria Tech Distribution',
    avatarText: 'SM',
    rating: 5,
    quote:
      'Having opportunity updates directly available in our Slack workspace makes deal monitoring much more convenient. Our team can discuss important sales activities and coordinate follow-ups without repeatedly switching between applications.',
    metricBadge: '04. Instant Deal Collaboration',
  },
  {
    id: 5,
    tag: 'Review 05 — Finance Manager',
    name: 'Isabella Rossi',
    role: 'Commercial Finance Manager',
    company: 'Milano Fintech Solutions',
    avatarText: 'IR',
    rating: 5,
    quote:
      'The approval workflow integration provides a more structured way to handle business decisions. Receiving approval requests through Slack and maintaining the associated records in Salesforce improves visibility and accountability.',
    metricBadge: '05. In-Slack Approval Chains',
  },
  {
    id: 6,
    tag: 'Review 06 — IT Integration Architect',
    name: 'Arjun Mehta',
    role: 'Principal Integration Architect',
    company: 'Infosystems Enterprise Architecture',
    avatarText: 'AM',
    rating: 5,
    quote:
      'I appreciate the integration architecture behind SYNCORA. Connecting Salesforce events, Slack APIs, and external business applications creates a foundation for scalable enterprise interoperability rather than isolated point-to-point automation.',
    metricBadge: '06. Scalable Event Interoperability',
  },
  {
    id: 7,
    tag: 'Review 07 — Marketing Operations Lead',
    name: 'Camille Dubois',
    role: 'Global Marketing Operations Lead',
    company: 'L’Aurore Omnichannel Media',
    avatarText: 'CD',
    rating: 5,
    quote:
      'The platform makes coordination between marketing and sales teams easier. Important lead handoffs and campaign-related updates can be communicated through dedicated Slack channels, helping teams maintain better alignment throughout the customer lifecycle.',
    metricBadge: '07. Seamless Lead Handoffs',
  },
  {
    id: 8,
    tag: 'Review 08 — Business Unit Head',
    name: 'Dmitri Petrov',
    role: 'Business Unit Head',
    company: 'AeroDynamics Global Engineering',
    avatarText: 'DP',
    rating: 5,
    quote:
      'Having business activities and important operational updates accessible through a centralized collaboration environment improves our team\'s visibility. It makes cross-department communication more structured and helps stakeholders respond to important developments.',
    metricBadge: '08. Cross-Functional Agility',
  },
  {
    id: 9,
    tag: 'Review 09 — Chief Information Officer (CIO)',
    name: 'Dr. Arthur Pendelton',
    role: 'Chief Information Officer',
    company: 'Vanguard Systems International',
    avatarText: 'AP',
    rating: 5,
    quote:
      'SYNCORA demonstrates how enterprise applications can work together as a connected ecosystem. The combination of CRM data, collaboration workflows, and integration governance provides a strong foundation for improving organizational productivity and digital operations.',
    metricBadge: '09. Enterprise Governance & Mesh',
  },
];

// ============================================================================
// DATA: 5 PROJECTS REGISTRY
// ============================================================================
interface ProjectNavStep {
  label: string;
  sublabel: string;
}

interface ProjectData {
  id: string;
  indexStr: string;
  badge: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  oneLinerBefore: string;
  oneLinerFocus: string;
  oneLinerAfter: string;
  metrics: { label: string; value: string }[];
  navSteps: ProjectNavStep[];
  actionLabel: string;
  reviews: CustomerReview[];
}

const PROJECTS: ProjectData[] = [
  {
    id: 'enterprise-delivery-salesforce',
    indexStr: '01',
    badge: 'Powered by Salesforce',
    title: 'Enterprise Delivery Operations Management',
    category: 'Salesforce Multi-Entity Architecture',
    icon: Building2,
    oneLinerBefore: 'Streamlines 6 core food-delivery business entities through a',
    oneLinerFocus: 'unified Salesforce platform,',
    oneLinerAfter: 'improving operational visibility, customer support, and data integrity, powered by 30+ open-source contributors.',
    metrics: [
      { label: 'Entities', value: '6 Unified' },
      { label: 'Contributors', value: '30+ Team' },
      { label: 'Data Integrity', value: '100% Synced' },
    ],
    // EXACTLY the 3 items requested by user for Project 1
    navSteps: [
      { label: 'Core Architecture', sublabel: '4 Unified Modules' },
      { label: 'Enterprise Workflow Stages', sublabel: '4-Phase Execution' },
      { label: 'Customer reviews', sublabel: '9 Verified Ratings' },
    ],
    actionLabel: 'Simulate Delivery Pipeline',
    reviews: P1_REVIEWS,
  },
  {
    id: 'billora-smart-billing',
    indexStr: '02',
    badge: 'Smart Retail & POS Platform',
    title: 'BILLORA – Smart Billing & Inventory Management System',
    category: 'Enterprise POS & Inventory Architecture',
    icon: Receipt,
    oneLinerBefore: 'Transforming everyday transactions into business intelligence —',
    oneLinerFocus: 'enabling faster billing, smarter inventory control,',
    oneLinerAfter: 'accountable operations through one centralized enterprise platform.',
    metrics: [
      { label: 'Checkout Latency', value: '<400ms' },
      { label: 'Inventory Drift', value: '0.00% Zero' },
    ],
    navSteps: [
      { label: 'Core POS Architecture', sublabel: '4 Business Modules' },
      { label: 'Receipt Terminal Simulator', sublabel: 'Interactive Hardware' },
      { label: 'Customer reviews', sublabel: '9 Verified Merchants' },
    ],
    actionLabel: 'Trigger POS Printout',
    reviews: P2_REVIEWS,
  },
  {
    id: 'geo-campuz-autonomous-navigation',
    indexStr: '03',
    badge: 'Geospatial Engine',
    title: 'Geo Campuz – Navigation Engine',
    category: 'Indoor & Outdoor Campus Mapping',
    icon: Compass,
    oneLinerBefore: 'An autonomous geospatial engine indexing',
    oneLinerFocus: '159 campus destinations across 203 navigational nodes —',
    oneLinerAfter: 'slashing student transit delays by 75% and reclaiming over 25,000 hours of lost campus productivity annually.',
    metrics: [
      { label: 'Destinations', value: '159 Indexed' },
      { label: 'Time Reclaimed', value: '25,000+ Hrs' },
    ],
    navSteps: [
      { label: 'Core Navigation Architecture', sublabel: '4 Spatial Modules' },
      { label: 'Live Campus Route Tracker', sublabel: 'Interactive OSM Navigation' },
      { label: 'Customer reviews', sublabel: '9 Verified Campus Ratings' },
    ],
    actionLabel: 'Simulate Route Transit',
    reviews: P3_REVIEWS,
  },
  {
    id: 'finquery-financial-intelligence',
    indexStr: '04',
    badge: 'Financial Intelligence Engine',
    title: 'FINQUERY – Financial Intelligence & RAG Platform',
    category: 'RAG Document Retrieval & Contextual Financial Reasoning',
    icon: TrendingUp,
    oneLinerBefore: 'Financial Intelligence. Grounded in Evidence.',
    oneLinerFocus: 'Built for Decisions.',
    oneLinerAfter:
      'An intelligent financial analysis platform combining RAG-based document retrieval, contextual financial reasoning, comparative analytics, and automated reporting to transform complex financial information into actionable business intelligence.',
    metrics: [
      { label: 'Evidence Grounding', value: '100% Sourced' },
      { label: 'Multi-Period', value: '8 Quarters' },
      { label: 'Retrieval SLA', value: '<120ms Match' },
    ],
    navSteps: [
      { label: 'Core Financial Architecture', sublabel: '4 Intelligence Features' },
      { label: 'RAG Pipeline Execution', sublabel: '4-Stage Reasoning Engine' },
      { label: 'Customer reviews', sublabel: '9 Verified Stakeholders' },
    ],
    actionLabel: 'Execute RAG Analysis',
    reviews: P4_REVIEWS,
  },
  {
    id: 'syncora-enterprise-collaboration',
    indexStr: '05',
    badge: 'Enterprise Workflow & Collaboration',
    title: 'SYNCORA – Enterprise Workflow & Collaboration Intelligence',
    category: 'Salesforce CRM & Slack Collaboration Intelligence Ecosystem',
    icon: Network,
    oneLinerBefore: 'Connect Every Workflow. Empower Every Team.',
    oneLinerFocus: 'Accelerate Every Decision.',
    oneLinerAfter:
      'SYNCORA unifies Salesforce CRM, Slack collaboration, and enterprise integration services into a centralized operational ecosystem, delivering 360° operational visibility and accelerating decisions through real-time collaboration.',
    metrics: [
      { label: 'Connected Domains', value: '6 Unified' },
      { label: 'Decision Velocity', value: '+340% Faster' },
      { label: 'Visibility', value: '360° Real-Time' },
    ],
    navSteps: [
      { label: '6 Connected Domains', sublabel: 'Cross-Functional Scope' },
      { label: 'Stakeholder Values', sublabel: '7 Executive Roles' },
      { label: 'Customer reviews', sublabel: '9 Enterprise Ratings' },
    ],
    actionLabel: 'Dispatch Workflow Sync',
    reviews: P5_REVIEWS,
  },
];

// ============================================================================
// TOP NOTCH NAVBAR (ATTACHED TO CURVED NOTCH SLICE WITH MINIMAL THEME LIGHTS)
// Enhanced visible borders and refined specular edge lighting
// ============================================================================
function NotchProjectHeader({
  currentProject,
  activeProjectIdx,
  projects,
  onSelectProject,
}: {
  currentProject: ProjectData;
  activeProjectIdx: number;
  projects: ProjectData[];
  onSelectProject: (idx: number) => void;
}) {
  return (
    <div className="relative w-full h-16 flex items-start shrink-0 select-none overflow-hidden drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
      {/* 1. Left Flat Bar (Height: 40px / h-10) with "❖ Valoria Systems Lab   Project 01 of 06" */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 px-3 sm:px-5 h-10 bg-[#0c0c12]/98 backdrop-blur-3xl rounded-l-2xl border-t border-l border-white/25 shrink-0 relative z-20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]">
        {/* Top edge specular highlight line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-white/30 via-white/55 to-white/20 pointer-events-none" />

        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide uppercase bg-white/[0.08] text-white border border-white/25 shadow-[0_0_10px_rgba(255,255,255,0.08)]">
          <Sparkles className="size-3 text-white/95" />
          <span>Valoria Systems Lab</span>
        </span>
        <span className="text-[11px] text-neutral-300 font-mono hidden sm:inline whitespace-nowrap">
          Project {currentProject.indexStr} of 05
        </span>

        {/* Double background hairline boundary lines with enhanced visibility */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="rgba(255, 255, 255, 0.4)" strokeWidth={1} />
          <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="rgba(255, 255, 255, 0.18)" strokeWidth={0.75} />
        </svg>
      </div>

      {/* 2. Left Notch Corner Slice (50px wide x 64px high, dipping from 40px to 64px) */}
      <div className="w-[50px] h-16 relative shrink-0 z-10 -ml-px">
        {/* Glass Background using reference clip-path */}
        <div
          className="absolute inset-0 bg-[#0c0c12]/98 backdrop-blur-3xl"
          style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }}
        />

        {/* Top connecting edge stroke */}
        <div className="absolute top-0 inset-x-0 h-px bg-white/25 pointer-events-none" />

        {/* Outlines & Minimal Theme Lights matching reference geometry */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
          {/* Primary crisp curved border line */}
          <path
            d="M0 39.5 C25 39.5 25 63.5 50 63.5"
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth={1.25}
          />
          {/* Secondary parallel groove line */}
          <path
            d="M0 36.5 C25 36.5 25 60.5 50 60.5"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={0.8}
          />

          {/* Minimal Theme Light: Specular breathing light beam along the curve */}
          <motion.path
            d="M0 39.5 C25 39.5 25 63.5 50 63.5"
            fill="none"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth={1.75}
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Minimal specular light bead smoothly gliding along the curve */}
          <motion.circle
            r="1.75"
            fill="#ffffff"
            className="filter drop-shadow-[0_0_5px_#ffffff]"
            animate={{
              cx: [2, 25, 48],
              cy: [40, 51.5, 63],
              opacity: [0, 0.95, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* 3. Right Notch Bar (Height: 64px / h-16) - Extends to the end with project names */}
      <div className="flex-1 h-16 relative min-w-0 bg-[#0c0c12]/98 backdrop-blur-3xl rounded-r-2xl border-t border-r border-white/25 -ml-px flex items-center justify-end px-3 sm:px-5 z-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]">
        {/* Top edge specular highlight line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-white/20 via-white/50 to-white/30 pointer-events-none" />

        {/* Bottom hairline boundary line with enhanced theme lighting */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-white/35 via-white/55 to-white/25 pointer-events-none" />

        {/* Double background hairline lines along the bottom of the notch */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="rgba(255, 255, 255, 0.45)" strokeWidth={1.25} />
          <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="rgba(255, 255, 255, 0.2)" strokeWidth={0.8} />
        </svg>

        {/* Minimal Theme Light: Ambient breathing specular glow ribbon along the bottom contour */}
        <motion.div
          className="pointer-events-none absolute -bottom-1 left-0 right-4 h-2 bg-gradient-to-r from-white/[0.25] via-white/[0.4] to-transparent blur-sm"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Navigation Project Names Inside the Notch Bar (Matching Image 3) */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto [scrollbar-width:none] relative z-10">
          {projects.map((proj, idx) => {
            const isSelected = activeProjectIdx === idx;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => onSelectProject(idx)}
                className={cn(
                  'px-3 sm:px-3.5 py-1 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap',
                  isSelected
                    ? 'bg-white text-black font-semibold shadow-[0_0_18px_rgba(255,255,255,0.75),0_0_4px_rgba(255,255,255,0.9)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.08]'
                )}
              >
                <span>{proj.indexStr}</span>
                <span className="hidden md:inline ml-1.5">
                  {proj.title.startsWith('Geo Campuz') ? 'Geo Campuz' : proj.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// NATIVE WHITE CURVED TRACK NAVIGATION (EXACT TO LeftNavigation_Onthispage.mov & Image 1)
// ============================================================================
function NativeWhiteProjectNav({
  steps,
  activeStep,
  onSelectStep,
}: {
  steps: ProjectNavStep[];
  activeStep: number;
  onSelectStep: (index: number) => void;
}) {
  // Dot coordinates along the S-curved track (Step 0: x=6, y=22; Step 1: x=18, y=76; Step 2: x=6, y=130)
  // Step 1 is indented to the right with smooth S-curves matching Image 1
  const dotCoords = [
    { x: -1, y: 15 },  // Centered at (6, 22) - dot radius is 7px
    { x: 11, y: 69 },  // Centered at (18, 76)
    { x: -1, y: 123 }, // Centered at (6, 130)
  ];

  const currentCoord = dotCoords[activeStep] || dotCoords[0];

  return (
    <div className="flex flex-col select-none font-sans">
      {/* Header matching user reference: ≡ ON THIS PAGE */}
      <div className="flex items-center gap-2 pb-3 mb-2 text-white/70 border-b border-white/[0.08]">
        <Menu className="size-3.5 stroke-[2.2] text-white/90" />
        <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-white/85">
          On This Page
        </span>
      </div>

      {/* Vertical Curved Track with pure native white styling */}
      <div className="relative pl-8 py-1">
        {/* Background track path with S-curves between steps */}
        <svg
          className="absolute left-2 top-0 w-6 h-[152px] pointer-events-none"
          viewBox="0 0 24 152"
          fill="none"
        >
          {/* Base muted grey track with signature S-curve to step 1 */}
          <path
            d="M 6 8 L 6 36 C 6 54 18 54 18 72 L 18 80 C 18 98 6 98 6 116 L 6 144"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Active illuminated pure white track segment following the dot */}
          <motion.path
            d={
              activeStep === 0
                ? 'M 6 8 L 6 22'
                : activeStep === 1
                ? 'M 6 8 L 6 36 C 6 54 18 54 18 72 L 18 76'
                : 'M 6 8 L 6 36 C 6 54 18 54 18 72 L 18 80 C 18 98 6 98 6 116 L 6 130'
            }
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          />
        </svg>

        {/* Animated Glowing White Active Marker Dot */}
        <motion.div
          className="absolute size-3.5 rounded-full bg-white ring-4 ring-white/20 shadow-[0_0_12px_#ffffff] pointer-events-none z-10"
          animate={{
            top: `${currentCoord.y}px`,
            left: `${currentCoord.x + 8}px`,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        />

        {/* Navigation Step Items */}
        <div className="flex flex-col gap-2.5">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isIndented = idx === 1; // Step 1 is indented right along the S-curve like "Preview" in Image 1
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectStep(idx)}
                className={cn(
                  'h-11 flex flex-col justify-center text-left transition-all duration-200 cursor-pointer group',
                  isIndented ? 'pl-4' : 'pl-1',
                  isActive ? 'opacity-100' : 'opacity-40 hover:opacity-85'
                )}
              >
                <span
                  className={cn(
                    'text-[14px] tracking-tight transition-colors duration-150',
                    isActive
                      ? 'text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                      : 'text-neutral-400 group-hover:text-white'
                  )}
                >
                  {step.label}
                </span>
                <span className="text-[10px] font-mono text-neutral-500 truncate">
                  {step.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PROJECT 1: 4-FEATURE GRID (MATCHING Image 2 / SWARM MESH TELEMETRY STYLE)
// ============================================================================
function Project1FeatureGrid({ actionLabel }: { actionLabel: string }) {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const features = [
    {
      id: 0,
      sublabel: 'Supervisor Root',
      title: 'Supply Chain Orchestration',
      stat: '420k/s',
      sla: '99.8% SLA',
      detail: '14,800+ Couriers',
    },
    {
      id: 1,
      sublabel: 'Inference Pod',
      title: 'Customer Experience Management',
      stat: '180k/s',
      sla: '<45s Response',
      detail: '4.9 / 5 CSAT Rating',
    },
    {
      id: 2,
      sublabel: 'Tool Dispatcher',
      title: 'Order Lifecycle Management',
      stat: '150k/s',
      sla: '120k+ Daily',
      detail: '<3min Prep-to-Dispatch',
    },
    {
      id: 3,
      sublabel: 'Constraint Gate',
      title: 'CRM Data Integration',
      stat: '90k/s',
      sla: '6 Core Entities',
      detail: 'Zero Schema Drift',
    },
  ];

  const handleSimulate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSimulating) return;
    setIsSimulating(true);
    setTimeout(() => {
      setSelectedFeature((prev) => (prev + 1) % 4);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div
      id="p1-architecture"
      className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0c0c11]/95 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] scroll-mt-6"
    >
      {/* Telemetry Header (Exact matching Image 2 style) */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-xs font-mono font-medium text-neutral-300">
            Swarm Mesh: 4 Nodes Online
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-neutral-400">
            Executed: <span className="text-white font-semibold">14,820</span>
          </span>
          <span className="text-[10px] font-mono text-neutral-300 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10">
            0.42ms SLA
          </span>
        </div>
      </div>

      {/* 2x2 Feature Grid matching uploaded reference style in Image 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3.5">
        {features.map((feat) => {
          const isSelected = selectedFeature === feat.id;
          return (
            <div
              key={feat.id}
              onClick={() => setSelectedFeature(feat.id)}
              className={cn(
                'relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none active:scale-[0.98] min-h-[96px]',
                isSelected
                  ? 'bg-white/[0.1] border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.25)]'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
              )}
            >
              {/* Top Row: Subtitle on left, Indicator dot on right */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">
                  {feat.sublabel}
                </span>
                <span
                  className={cn(
                    'size-1.5 rounded-full transition-all duration-150',
                    isSelected
                      ? 'bg-white shadow-[0_0_8px_#ffffff]'
                      : 'bg-neutral-600'
                  )}
                />
              </div>

              {/* Middle Row: Prominent Title */}
              <div className="mt-2 mb-1">
                <h4 className="text-[14.5px] font-semibold text-white tracking-tight">
                  {feat.title}
                </h4>
              </div>

              {/* Bottom Row: Stat / Metric */}
              <div className="flex items-baseline justify-between text-[11px] font-mono text-neutral-400">
                <span className="text-neutral-300 font-medium">{feat.stat}</span>
                <span className="text-neutral-500">{feat.sla}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer with Minimal Orange Glassmorphic Action Button (Matching bottom right of Image 2) */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <Workflow className="size-3.5 text-neutral-300" />
          <span>Active: {features[selectedFeature].title}</span>
        </div>

        <button
          type="button"
          onClick={handleSimulate}
          className={cn(
            'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 shadow-md',
            'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-semibold',
            'border border-orange-300/40 shadow-[0_2px_14px_rgba(249,115,22,0.4),inset_0_1px_0_0_rgba(255,255,255,0.35)]',
            isSimulating && 'opacity-85'
          )}
        >
          <Send className={cn('size-3', isSimulating && 'animate-spin')} />
          <span>{isSimulating ? 'Simulating...' : actionLabel}</span>
        </button>
      </div>
    </div>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// ============================================================================
// PROJECT 1: 4 WORKFLOW STAGES (BRIEF, IMPACTFUL, SCROLL-LINKED)
// ============================================================================
function Project1WorkflowSection() {
  const workflows = [
    {
      id: 1,
      stepNum: '01',
      title: 'Seamless Order Fulfillment',
      subtitle: 'Placement → Restaurant Processing → Dispatch → Delivery Completion',
      spec: 'Unified lifecycle telemetry connecting customers, merchants, and couriers.',
      sla: '99.98% Completion SLA',
      latency: '<18min Delivery Target',
      icon: PackageCheck,
    },
    {
      id: 2,
      stepNum: '02',
      title: 'Secure Payment & Transaction Tracking',
      subtitle: 'Instant Gateway Settlement → Real-Time Ledger Reconciliation',
      spec: 'Connects customer payments directly with transaction records and status.',
      sla: '100% Traceability',
      latency: 'Zero Settlement Lag',
      icon: CreditCard,
    },
    {
      id: 3,
      stepNum: '03',
      title: 'Centralized Customer Issue Resolution',
      subtitle: 'Order, Payment & Driver Cases Unified Into Single Triage Cockpit',
      spec: 'Streamlined investigation pulling order, payment, and delivery context.',
      sla: '<45s Response SLA',
      latency: '4.9 / 5 CSAT Rating',
      icon: Headphones,
    },
    {
      id: 4,
      stepNum: '04',
      title: 'Controlled Refund & Financial Approval',
      subtitle: 'Automated Validation → Multi-Tier Finance Approval → Tracked Execution',
      spec: 'Governed refund pipeline protecting revenue while maintaining trust.',
      sla: 'Zero Fraud Leakage',
      latency: '100% Audit Compliance',
      icon: DollarSign,
    },
  ];

  return (
    <div id="p1-workflows" className="flex flex-col gap-3 py-1 scroll-mt-6">
      <div className="flex items-center justify-between pb-1 text-xs font-mono text-neutral-400">
        <span className="uppercase tracking-wider">Enterprise Workflow Stages</span>
        <span>4-Phase Execution</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {workflows.map((wf) => {
          const WfIcon = wf.icon;
          return (
            <div
              key={wf.id}
              className="p-3.5 sm:p-4 rounded-xl bg-[#0d0d12]/80 border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-6 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-white">
                    {wf.stepNum}
                  </span>
                  <WfIcon className="size-3.5 text-neutral-300" />
                  <h5 className="text-[13.5px] font-semibold text-white tracking-tight">
                    {wf.title}
                  </h5>
                </div>
                <span className="text-[10px] font-mono text-neutral-300 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10">
                  {wf.sla}
                </span>
              </div>

              <div className="text-[11px] font-mono text-neutral-400 pl-8">
                {wf.subtitle}
              </div>

              <div className="flex items-center justify-between pl-8 pt-1 text-[10.5px] text-neutral-400 border-t border-white/[0.04]">
                <span className="truncate pr-2">{wf.spec}</span>
                <span className="text-white font-mono shrink-0">{wf.latency}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: MACOS TRAFFIC-LIGHT CUSTOMER REVIEW CARD (9 SLIDING REVIEWS)
// ============================================================================
function MacSlidingReviewsCard({
  reviews = P1_REVIEWS,
  title = 'quickplate_customer_reviews.log',
  id = 'p1-reviews',
}: {
  reviews?: CustomerReview[];
  title?: string;
  id?: string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const nextReview = useCallback(() => {
    setDirection('next');
    setCurrentIdx((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevReview = useCallback(() => {
    setDirection('prev');
    setCurrentIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  // Automatic rotation every 5.5s (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextReview, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextReview]);

  const review = reviews[currentIdx] || reviews[0];

  return (
    <div
      id={id}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative flex flex-col justify-between rounded-2xl bg-[#0f0f13]/90 border border-white/[0.1] shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.14)] overflow-hidden font-sans scroll-mt-6"
    >
      {/* Specular Rim Sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/[0.06] to-transparent z-10" />

      {/* macOS Window Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-black/40 backdrop-blur-md">
        {/* macOS Traffic Lights: Red, Yellow, Green */}
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-sm" />
          <div className="size-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-sm" />
          <div className="size-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-sm" />
        </div>

        {/* Title Bar Filename */}
        <span className="text-[11px] font-mono text-neutral-400">
          {title}
        </span>

        {/* Header Controls: Review Counter & Navigation Arrows */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 mr-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-3 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]"
              />
            ))}
          </div>

          <span className="text-[10px] font-mono text-neutral-400">
            {String(currentIdx + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevReview}
              aria-label="Previous review"
              className="size-6 flex items-center justify-center rounded-md bg-white/[0.06] hover:bg-white/[0.14] active:scale-90 text-white/70 hover:text-white border border-white/10 transition-all cursor-pointer"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={nextReview}
              aria-label="Next review"
              className="size-6 flex items-center justify-center rounded-md bg-white/[0.06] hover:bg-white/[0.14] active:scale-90 text-white/70 hover:text-white border border-white/10 transition-all cursor-pointer"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Review Body with AnimatePresence */}
      <div className="relative p-4 sm:p-5 min-h-[130px] flex flex-col justify-between overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: direction === 'next' ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'next' ? -24 : 24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col justify-between gap-2.5"
          >
            {/* Tag / Category */}
            <div className="text-[11px] font-mono font-medium text-neutral-400">
              {review.tag}
            </div>

            {/* Quote */}
            <p className="text-xs sm:text-[13px] text-neutral-200 leading-relaxed italic font-normal line-clamp-3">
              &ldquo;{review.quote}&rdquo;
            </p>

            {/* Author Meta */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] mt-1">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-sm">
                  {review.avatarText}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                  <span className="text-white font-semibold">{review.name}</span>
                  <span>·</span>
                  <span className="text-neutral-300">{review.company}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-300 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10">
                <Check className="size-3 text-emerald-400" />
                <span>{review.metricBadge}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 9-Dot Pagination Scrubber */}
      <div className="flex items-center justify-center gap-1.5 py-2 border-t border-white/[0.04] bg-black/20">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setDirection(i > currentIdx ? 'next' : 'prev');
              setCurrentIdx(i);
            }}
            aria-label={`Go to review ${i + 1}`}
            className={cn(
              'h-1 rounded-full transition-all duration-300 cursor-pointer',
              currentIdx === i
                ? 'w-6 bg-white shadow-[0_0_8px_#ffffff]'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PROJECT 2: 4-FEATURE GRID (POS, INVENTORY LIFECYCLE, PRODUCT MASTER, RETAIL WF)
// ============================================================================
function Project2FeatureGrid({ actionLabel }: { actionLabel: string }) {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      id: 0,
      sublabel: 'Transaction Core',
      title: 'Point-of-Sale Transaction Orchestration',
      stat: '<400ms SLA',
      sla: 'Multi-Register Mesh',
      detail: 'Instant Offline Fallback',
    },
    {
      id: 1,
      sublabel: 'Inventory Engine',
      title: 'Inventory Lifecycle & Stock Reconciliation',
      stat: '100% Real-Time',
      sla: 'Zero Shrinkage Delta',
      detail: 'Live Multi-Store Audit',
    },
    {
      id: 2,
      sublabel: 'Catalog Graph',
      title: 'Product Master Data Administration',
      stat: '50,000+ SKUs',
      sla: 'Sub-Second Sync',
      detail: 'Dynamic Tiered Pricing',
    },
    {
      id: 3,
      sublabel: 'Workflow Hub',
      title: 'Cross-Functional Retail Workflow Integration',
      stat: 'Role-Based RBAC',
      sla: 'Audit Verified',
      detail: 'Finance & Tax Ledger Sync',
    },
  ];

  return (
    <div
      id="p2-architecture"
      className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0c0c11]/95 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] scroll-mt-6"
    >
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-xs font-mono font-medium text-neutral-300">
            BILLORA Engine: 4 Core Modules Online
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-neutral-400">
            Throughput: <span className="text-white font-semibold">8,420 Tx/min</span>
          </span>
          <span className="text-[10px] font-mono text-neutral-300 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10">
            Sub-400ms SLA
          </span>
        </div>
      </div>

      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3.5">
        {features.map((feat) => {
          const isSelected = selectedFeature === feat.id;
          return (
            <div
              key={feat.id}
              onClick={() => setSelectedFeature(feat.id)}
              className={cn(
                'relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none active:scale-[0.98] min-h-[96px]',
                isSelected
                  ? 'bg-white/[0.1] border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.25)]'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">
                  {feat.sublabel}
                </span>
                <span
                  className={cn(
                    'size-1.5 rounded-full transition-all duration-150',
                    isSelected
                      ? 'bg-white shadow-[0_0_8px_#ffffff]'
                      : 'bg-neutral-600'
                  )}
                />
              </div>

              <div className="mt-2 mb-1">
                <h4 className="text-[14.5px] font-semibold text-white tracking-tight">
                  {feat.title}
                </h4>
              </div>

              <div className="flex items-baseline justify-between text-[11px] font-mono text-neutral-400">
                <span className="text-neutral-300 font-medium">{feat.stat}</span>
                <span className="text-neutral-500">{feat.sla}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <Store className="size-3.5 text-neutral-300" />
          <span>Active Architecture: {features[selectedFeature].title}</span>
        </div>
        <span className="text-neutral-500 hidden sm:inline">Zero Data Drift • Live Multi-Store Mesh</span>
      </div>
    </div>
  );
}

// ============================================================================
// BILLORA INTERACTIVE RECEIPT PRINTER (EXACT TO media_1793798472889_86f79baa.jpg)
// ============================================================================

// Razor-sharp SVG Barcode matching reference receipt
function BarcodeSvg() {
  const bars = [2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 1, 3, 2, 1, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1];
  let curX = 0;
  return (
    <svg className="w-48 h-8 mx-auto" viewBox="0 0 160 32" fill="currentColor">
      {bars.map((w, i) => {
        const x = curX;
        curX += w + (i % 2 === 0 ? 2 : 3);
        if (curX > 156) return null;
        return (
          <rect
            key={i}
            x={x}
            y={0}
            width={w}
            height={32}
            fill="#111111"
          />
        );
      })}
    </svg>
  );
}

// Jagged Saw-tooth Mathematical Polygon Path for Receipt Tear-off Edge
const receiptToothCount = 40;
const receiptToothDepth = 4;
const receiptToothPoints = Array.from(
  { length: receiptToothCount * 2 },
  (_, index) => {
    const x = 100 - ((index + 1) * 100) / (receiptToothCount * 2);
    const y = index % 2 === 0 ? '100%' : `calc(100% - ${receiptToothDepth}px)`;
    return `${x}% ${y}`;
  }
).join(', ');
const receiptClipPath = `polygon(0 0, 100% 0, 100% calc(100% - ${receiptToothDepth}px), ${receiptToothPoints})`;

// Stepped Mechanical Feed Keyframes from reference code
const printingTransformKeyframes = [
  'translateY(calc(-100% + 2px))',
  'translateY(-91%)',
  'translateY(-91%)',
  'translateY(-81%)',
  'translateY(-81%)',
  'translateY(-70%)',
  'translateY(-70%)',
  'translateY(-58%)',
  'translateY(-58%)',
  'translateY(-45%)',
  'translateY(-45%)',
  'translateY(-32%)',
  'translateY(-32%)',
  'translateY(-20%)',
  'translateY(-20%)',
  'translateY(-10%)',
  'translateY(-10%)',
  'translateY(-3%)',
  'translateY(-3%)',
  'translateY(0%)',
];

const printingKeyframeTimes = [
  0, 0.075, 0.105, 0.18, 0.21, 0.285, 0.315, 0.39, 0.42, 0.495, 0.525, 0.6,
  0.63, 0.705, 0.735, 0.81, 0.84, 0.915, 0.945, 1,
];

interface BillItem {
  name: string;
  priceOrCost: string;
  meta: string;
}

interface BillScenario {
  type: 'customer' | 'inventory';
  badge: string;
  pairIndex: number;
  pairLabel: string;
  storeTitle: string;
  storeSubtitle: string;
  screenTitle: string;
  screenSubtitle: string;
  screenTotal: string;
  screenProcessing: string;
  screenPrinting: string;
  screenComplete: string;
  items: BillItem[];
  subtotals: { label: string; value: string; isHighlight?: boolean }[];
  totalLabel: string;
  totalValue: string;
  meta: { label: string; value: string; isBold?: boolean }[];
  barcodeLabel: string;
}

const BILLORA_SCENARIOS: BillScenario[] = [
  // --------------------------------------------------------------------------
  // PAIR 1: LUXURY APPAREL & ATELIER BOUTIQUE
  // --------------------------------------------------------------------------
  {
    type: 'customer',
    badge: 'Customer Bill',
    pairIndex: 1,
    pairLabel: 'Boutique POS · Purchase',
    storeTitle: 'MODERN BOUTIQUE ATELIER',
    storeSubtitle: 'Flagship Store 04 · Regent Street, London',
    screenTitle: 'Point of Sale of Modern Boutique',
    screenSubtitle: 'Customer Checkout · Terminal #POS-04',
    screenTotal: '£284.50',
    screenProcessing: 'Authorizing POS payment...',
    screenPrinting: 'Printing Customer Bill...',
    screenComplete: 'Customer Bill complete · Paid',
    items: [
      {
        name: 'Tailored Silk Atelier Shirt',
        priceOrCost: '£175.00',
        meta: 'Qty: 1 · Charcoal · SKU: #AT-SLK-8821',
      },
      {
        name: 'Merino Cashmere Scarf',
        priceOrCost: '£65.00',
        meta: 'Qty: 1 · Oatmeal Melange · SKU: #AT-CSH-3310',
      },
    ],
    subtotals: [
      { label: 'Subtotal', value: '£240.00' },
      { label: 'VAT (20%)', value: '£44.50' },
    ],
    totalLabel: 'TOTAL PAID',
    totalValue: '£284.50',
    meta: [
      { label: 'Classification', value: 'Customer Bill · POS', isBold: true },
      { label: 'Transaction', value: 'TXN-80492' },
      { label: 'Payment', value: 'Apple Pay (Visa •••• 4242)' },
      { label: 'Cashier', value: 'Elena R. (Register 04)' },
    ],
    barcodeLabel: 'TXN-80492 · POS 04',
  },
  {
    type: 'inventory',
    badge: 'Retailer Inventory Bill',
    pairIndex: 1,
    pairLabel: 'Boutique Inventory · Deduction',
    storeTitle: 'SHOP OWNER INVENTORY RECONCILIATION',
    storeSubtitle: 'Warehouse Depletion & Reorder Audit · Dock 2B',
    screenTitle: 'Inventory Bill for the Shop Owner',
    screenSubtitle: 'Depletion Sync for POS TXN-80492',
    screenTotal: '£112.00 COGS',
    screenProcessing: 'Balancing stock ledger entries...',
    screenPrinting: 'Printing Inventory Bill...',
    screenComplete: 'Stock Reconciled · Buffer Healthy',
    items: [
      {
        name: 'Silk Atelier Shirt (Charcoal / M)',
        priceOrCost: '-1 Unit',
        meta: 'Remaining: 14 In Stock · Safe Buffer: 5 Units',
      },
      {
        name: 'Merino Cashmere Scarf (Oatmeal)',
        priceOrCost: '-1 Unit',
        meta: 'Remaining: 4 Units [ALERT: Low Stock Trigger]',
      },
      {
        name: 'Luxury Garment Carrier Bag',
        priceOrCost: '-1 Bag',
        meta: 'Restock PO #PO-9912 Auto-Queued',
      },
    ],
    subtotals: [
      { label: 'Wholesale COGS Deducted', value: '£112.00' },
      { label: 'Gross Margin Realized', value: '+£128.00 (53.3%)', isHighlight: true },
      { label: 'Audit Reconciliation', value: '100% SKU Match Confirmed' },
    ],
    totalLabel: 'LEDGER STATUS',
    totalValue: 'RECONCILED',
    meta: [
      { label: 'Classification', value: 'Retailer Bill · Inventory', isBold: true },
      { label: 'POS Trigger', value: 'Linked to TXN-80492' },
      { label: 'Store Owner AC', value: 'Central AC #0921-LDN' },
      { label: 'Replenishment', value: 'Merino Reorder Dispatched' },
    ],
    barcodeLabel: 'INV-80492 · DEDUCTION',
  },

  // --------------------------------------------------------------------------
  // PAIR 2: GOURMET PROVISIONS & SPECIALTY PANTRY
  // --------------------------------------------------------------------------
  {
    type: 'customer',
    badge: 'Customer Bill',
    pairIndex: 2,
    pairLabel: 'Gourmet Mart · Purchase',
    storeTitle: 'PROVISIONS & CO. EPICUREAN MART',
    storeSubtitle: 'Covent Garden Market · Terminal 02',
    screenTitle: 'Point of Sale of Gourmet Mart',
    screenSubtitle: 'Customer Checkout · Terminal #POS-02',
    screenTotal: '£79.10',
    screenProcessing: 'Authorizing contactless chip...',
    screenPrinting: 'Printing Customer Bill...',
    screenComplete: 'Customer Bill complete · Paid',
    items: [
      {
        name: 'Black Truffle Cold-Pressed Oil',
        priceOrCost: '£38.50',
        meta: 'Qty: 2 @ £19.25 · SKU: #GRM-TRF-019',
      },
      {
        name: 'Aged Parmigiano Reggiano 36M',
        priceOrCost: '£26.40',
        meta: 'Qty: 0.66 kg @ £40.00/kg · SKU: #CHS-PRM-882',
      },
      {
        name: 'Slow-Ferment Sourdough Boule',
        priceOrCost: '£6.50',
        meta: 'Qty: 1 · Hearth Baked · SKU: #BKY-SRD-104',
      },
    ],
    subtotals: [
      { label: 'Zero-Rated Food Items', value: '£32.90' },
      { label: 'Specialty VAT (20%)', value: '£7.70' },
    ],
    totalLabel: 'TOTAL PAID',
    totalValue: '£79.10',
    meta: [
      { label: 'Classification', value: 'Customer Bill · POS', isBold: true },
      { label: 'Transaction', value: 'TXN-91204' },
      { label: 'Payment', value: 'Contactless (Mastercard •••• 8819)' },
      { label: 'Cashier', value: 'Tariq A. (Market Lane 02)' },
    ],
    barcodeLabel: 'TXN-91204 · POS 02',
  },
  {
    type: 'inventory',
    badge: 'Retailer Inventory Bill',
    pairIndex: 2,
    pairLabel: 'Gourmet Inventory · Batch Sync',
    storeTitle: 'COLD-CHAIN INVENTORY AUDIT',
    storeSubtitle: 'Perishable Batch Deduction & Expiry Sync · Cellar 01',
    screenTitle: 'Inventory Bill for the Shop Owner',
    screenSubtitle: 'Batch Depletion for POS TXN-91204',
    screenTotal: '£38.20 COGS',
    screenProcessing: 'Validating cold-chain FIFO batches...',
    screenPrinting: 'Printing Inventory Bill...',
    screenComplete: 'Batch Reconciled · FIFO Validated',
    items: [
      {
        name: 'Black Truffle Oil (Lot #TRF-902)',
        priceOrCost: '-2 Bottles',
        meta: 'Remaining: 28 Bottles · Controlled 18°C',
      },
      {
        name: 'Parmigiano Wheel #82',
        priceOrCost: '-0.66 kg',
        meta: 'Wheel Remaining: 14.2 kg · Exp: OCT 2027',
      },
      {
        name: 'Daily Artisan Sourdough',
        priceOrCost: '-1 Unit',
        meta: 'Daily Sell-through: 34 / 50 Loaves Sold',
      },
    ],
    subtotals: [
      { label: 'Wholesale COGS Deducted', value: '£38.20' },
      { label: 'Gross Margin Realized', value: '+£40.90 (51.7%)', isHighlight: true },
      { label: 'Perishable Expiry Audit', value: 'Zero Shelf-Life Drift' },
    ],
    totalLabel: 'LEDGER STATUS',
    totalValue: 'BATCH AUDITED',
    meta: [
      { label: 'Classification', value: 'Retailer Bill · Inventory', isBold: true },
      { label: 'POS Trigger', value: 'Linked to TXN-91204' },
      { label: 'Shop Owner AC', value: 'Gourmet Cellar AC #4418' },
      { label: 'Storage Log', value: 'Cold-Chain SLA Locked' },
    ],
    barcodeLabel: 'INV-91204 · COLD-CHAIN',
  },

  // --------------------------------------------------------------------------
  // PAIR 3: MINIMALIST AUDIO & STUDIO TECH HARDWARE
  // --------------------------------------------------------------------------
  {
    type: 'customer',
    badge: 'Customer Bill',
    pairIndex: 3,
    pairLabel: 'Studio Tech · Purchase',
    storeTitle: 'SONIC AESTHETICS STUDIO LAB',
    storeSubtitle: 'Hardware Bar · Soho, London',
    screenTitle: 'Point of Sale of Studio Tech',
    screenSubtitle: 'Customer Checkout · Terminal #POS-01',
    screenTotal: '£610.80',
    screenProcessing: 'Authorizing biometric wallet...',
    screenPrinting: 'Printing Customer Bill...',
    screenComplete: 'Customer Bill complete · Paid',
    items: [
      {
        name: 'Planar Reference Headphones',
        priceOrCost: '£399.00',
        meta: 'Qty: 1 · Serial: #SN-99821A · Matte Black',
      },
      {
        name: 'Braided 4.4mm Balanced Cable',
        priceOrCost: '£65.00',
        meta: 'Qty: 1 · Oxygen-Free Copper · 1.5m',
      },
      {
        name: 'Aluminum Desk Stand',
        priceOrCost: '£45.00',
        meta: 'Qty: 1 · CNC Anodized · Space Grey',
      },
    ],
    subtotals: [
      { label: 'Hardware Subtotal', value: '£509.00' },
      { label: 'UK VAT (20%)', value: '£101.80' },
    ],
    totalLabel: 'TOTAL PAID',
    totalValue: '£610.80',
    meta: [
      { label: 'Classification', value: 'Customer Bill · POS', isBold: true },
      { label: 'Transaction', value: 'TXN-64210' },
      { label: 'Payment', value: 'Apple Pay (Amex •••• 1004)' },
      { label: 'Hardware Tech', value: 'Marcus V. (Lab Bench 01)' },
    ],
    barcodeLabel: 'TXN-64210 · POS 01',
  },
  {
    type: 'inventory',
    badge: 'Retailer Inventory Bill',
    pairIndex: 3,
    pairLabel: 'Studio Inventory · Serial Bound',
    storeTitle: 'SERIALIZED ASSET TRACKING & WARRANTY',
    storeSubtitle: 'High-Value Vault & Distribution Hub · Bay 4',
    screenTitle: 'Inventory Bill for the Shop Owner',
    screenSubtitle: 'Asset De-Index for POS TXN-64210',
    screenTotal: '£295.00 COGS',
    screenProcessing: 'De-indexing serials & binding warranty...',
    screenPrinting: 'Printing Inventory Bill...',
    screenComplete: 'Serial Bound · Warranty Activated',
    items: [
      {
        name: 'Planar Headphones (#SN-99821A)',
        priceOrCost: '-1 Serial',
        meta: 'Remaining Vault Units: 8 · 2Y Warranty Bound',
      },
      {
        name: 'Braided Balanced 4.4mm Cable',
        priceOrCost: '-1 Unit',
        meta: 'Remaining: 19 Units · Rack Level B2',
      },
      {
        name: 'CNC Aluminum Stand (Grey)',
        priceOrCost: '-1 Unit',
        meta: 'Remaining: 11 Units in Stock',
      },
    ],
    subtotals: [
      { label: 'Wholesale Asset Cost', value: '£295.00' },
      { label: 'Net Profit Contribution', value: '+£214.00 (42.0%)', isHighlight: true },
      { label: 'Asset Provenance', value: 'Manufacturer Direct Locked' },
    ],
    totalLabel: 'LEDGER STATUS',
    totalValue: 'SERIAL LOCKED',
    meta: [
      { label: 'Classification', value: 'Retailer Bill · Inventory', isBold: true },
      { label: 'POS Trigger', value: 'Linked to TXN-64210' },
      { label: 'Shop Owner Vault', value: 'Vault AC #8820-SOHO' },
      { label: 'Warranty Register', value: 'Global Coverage Active' },
    ],
    barcodeLabel: 'INV-64210 · SERIAL-LEDGER',
  },
];

function BilloraReceiptPrinterSimulator({ actionLabel }: { actionLabel: string }) {
  // Scenario index cycling across the 3 Customer Bills + 3 According Inventory Bills (6 total)
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stage, setStage] = useState<'processing' | 'printing' | 'complete'>('complete');
  const [cycleIndex, setCycleIndex] = useState(0);

  // Dynamic live Date & Time fetching (prevents hydration mismatch)
  const [currentDateStr, setCurrentDateStr] = useState<string>('04 NOV 2026');
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('14:32:10');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      setCurrentDateStr(`${day} ${month} ${year}`);
      setCurrentTimeStr(`${hours}:${minutes}:${seconds}`);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 5.5-second automated cycle: smoothly paces processing, printing, and resting inspection
  useEffect(() => {
    let tPrinting: NodeJS.Timeout;
    let tComplete: NodeJS.Timeout;

    const interval = setInterval(() => {
      // Step 1 (0ms): Switch to next bill scenario and start deliberate processing stage
      setScenarioIndex((prev) => (prev + 1) % BILLORA_SCENARIOS.length);
      setCycleIndex((prev) => prev + 1);
      setStage('processing');

      // Step 2 (550ms): Begin smooth, slower stepped physical mechanical extrusion (2.45s feed)
      tPrinting = setTimeout(() => {
        setStage('printing');
      }, 550);

      // Step 3 (3000ms): Lock in completed status; bill stays fully extruded and readable until 5500ms
      tComplete = setTimeout(() => {
        setStage('complete');
      }, 3000);
    }, 5500);

    return () => {
      clearInterval(interval);
      clearTimeout(tPrinting);
      clearTimeout(tComplete);
    };
  }, []);

  // Manual Trigger / Fast-forward to Next Bill
  const handleTriggerPrint = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (stage === 'printing') return;
    setScenarioIndex((prev) => (prev + 1) % BILLORA_SCENARIOS.length);
    setCycleIndex((prev) => prev + 1);
    setStage('processing');

    setTimeout(() => {
      setStage('printing');
      setTimeout(() => {
        setStage('complete');
      }, 2450);
    }, 550);
  };

  const active = BILLORA_SCENARIOS[scenarioIndex];
  const isCustomer = active.type === 'customer';

  return (
    <div
      id="p2-printer"
      className="flex flex-col justify-between p-4 sm:p-6 rounded-2xl bg-[#0c0c11]/95 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] scroll-mt-6 overflow-hidden"
    >
      {/* Top Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
        <div className="flex items-center gap-2">
          <Receipt className="size-4 text-white/80" />
          <span className="text-xs font-mono font-medium text-neutral-300">
            BILLORA Smart Thermal Terminal Simulator
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10 hidden sm:inline-block">
            5.5s Cycle · Pair {active.pairIndex}/3
          </span>
          <span className={cn(
            "text-[10px] font-mono px-2 py-0.5 rounded-full border font-medium",
            isCustomer
              ? "text-orange-400 bg-orange-500/10 border-orange-500/20"
              : "text-amber-300 bg-amber-500/10 border-amber-500/20"
          )}>
            {active.badge}
          </span>
        </div>
      </div>

      {/* Hardware Receipt Printer Body */}
      <div className="relative isolate flex flex-col items-center w-full max-w-sm sm:max-w-md mx-auto my-2">
        {/* Device Enclosure Chassis */}
        <div className="relative isolate w-full overflow-hidden rounded-[26px] border border-white/15 bg-[#17171d] p-3.5 pb-6 shadow-[0_24px_50px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.5)] z-20">
          {/* Header Row: Valoria App Icon & Fast Action Button */}
          <div className="relative z-10 flex h-10 items-center justify-between mb-3 px-1">
            <div className="size-9 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-[#0f0f13] shadow-inner">
              <Image
                src="/logos/valoria-icon.png"
                alt="Valoria Icon"
                width={36}
                height={36}
                className="size-full object-cover"
                priority
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10.5px] font-mono text-neutral-400 hidden sm:inline">
                {active.pairLabel}
              </span>
              <button
                type="button"
                onClick={handleTriggerPrint}
                disabled={stage === 'printing'}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.14] active:scale-95 text-neutral-200 text-xs font-mono border border-white/15 transition-all cursor-pointer disabled:opacity-50"
              >
                <Printer className="size-3.5" />
                <span>{stage === 'printing' ? 'Feeding...' : 'Next Bill'}</span>
              </button>
            </div>
          </div>

          {/* Digital LCD Screen Component */}
          <div className="relative z-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c10] p-4 text-white shadow-[inset_0_2px_12px_rgba(0,0,0,0.8)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={cn(
                    "text-[9.5px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold border",
                    isCustomer
                      ? "bg-orange-500/15 text-orange-300 border-orange-500/30"
                      : "bg-amber-500/15 text-amber-200 border-amber-500/30"
                  )}>
                    {active.badge}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Pair {active.pairIndex} of 3
                  </span>
                </div>
                <h5 className="font-semibold text-white text-[15px] tracking-tight mt-0.5">
                  {active.screenTitle}
                </h5>
                <p className="text-neutral-400 text-xs mt-0.5 font-sans">
                  {active.screenSubtitle}
                </p>
              </div>
              <div className="text-right">
                <span className="block text-neutral-400 text-[11px] font-mono">
                  {isCustomer ? 'Total Paid' : 'Inventory Delta'}
                </span>
                <span className="block text-white font-semibold text-lg font-mono">
                  {active.screenTotal}
                </span>
              </div>
            </div>

            {/* Stage Status Display */}
            <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
              <AnimatePresence mode="wait">
                {stage === 'complete' ? (
                  <motion.div
                    key={'complete-' + scenarioIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-medium"
                  >
                    <CheckCircle2 className="size-4 fill-emerald-500/20 text-emerald-400" />
                    <span>{active.screenComplete}</span>
                  </motion.div>
                ) : stage === 'printing' ? (
                  <motion.div
                    key={'printing-' + scenarioIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 font-medium"
                  >
                    <Loader2 className="size-4 animate-spin text-neutral-300" />
                    <span>{active.screenPrinting}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={'processing-' + scenarioIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 font-medium"
                  >
                    <Loader2 className="size-4 animate-spin text-neutral-300" />
                    <span>{active.screenProcessing}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="text-[10px] font-mono text-neutral-400">
                {currentTimeStr}
              </span>
            </div>
          </div>

          {/* Physical Printer Exit Slot */}
          <div
            aria-hidden="true"
            className="absolute inset-x-6 bottom-2 z-40 h-2 rounded-[0.25rem] border border-black bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* Paper Receipt Output Container */}
        <div className="relative z-10 -mt-3.5 w-[calc(88%+1rem)] max-w-full overflow-hidden px-4 pb-2">
          {/* Top slot blur shadow */}
          {stage !== 'processing' && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 -top-1 z-20 h-3 bg-black/80 blur-[6px]"
            />
          )}

          {/* Moving Thermal Paper */}
          <motion.div
            key={'paper-' + cycleIndex}
            animate={{
              opacity: stage !== 'processing' ? 1 : 0,
              transform:
                stage === 'printing'
                  ? printingTransformKeyframes
                  : stage === 'complete'
                  ? 'translateY(0%)'
                  : 'translateY(calc(-100% + 2px))',
            }}
            transition={{
              duration: stage === 'printing' ? 2.45 : 0.25,
              times: stage === 'printing' ? printingKeyframeTimes : undefined,
              ease: stage === 'printing' ? 'linear' : [0.23, 1, 0.32, 1],
            }}
            className="relative isolate"
          >
            <article
              className="relative z-10 min-h-[380px] bg-[#fdfdfd] text-[#111111] font-mono px-6 pt-5 pb-8 shadow-[0_22px_44px_rgba(0,0,0,0.7)] select-none text-xs"
              style={{ clipPath: receiptClipPath }}
            >
              {/* Paper Header Logo with Valoria Icon (No POS or Inventory Text) */}
              <div className="flex justify-center mb-3">
                <div className="size-11 rounded-xl overflow-hidden shadow-sm border border-neutral-200/90 bg-neutral-900 flex items-center justify-center">
                  <Image
                    src="/logos/valoria-icon.png"
                    alt="Valoria Icon"
                    width={44}
                    height={44}
                    className="size-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Clean, Spacious Bill Classification Badge */}
              <div className="flex justify-center mb-2.5">
                <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-neutral-900 text-white uppercase shadow-xs">
                  {active.badge}
                </span>
              </div>

              {/* Store or Warehouse Title & Subtitle */}
              <div className="text-center mb-3">
                <h4 className="font-bold text-[13px] tracking-tight text-neutral-900 uppercase">
                  {active.storeTitle}
                </h4>
                <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                  {active.storeSubtitle}
                </p>
              </div>

              {/* Dashed Separator */}
              <div className="border-b border-dashed border-neutral-200 my-2.5" />

              {/* Line Items with Spacious Typography */}
              <div className="space-y-2 pt-0.5">
                {active.items.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold tracking-tight text-neutral-900 text-[11.5px]">
                        {item.name}
                      </span>
                      <span
                        className={cn(
                          'font-semibold font-mono text-[11.5px]',
                          item.priceOrCost.startsWith('-') ? 'text-amber-800' : 'text-neutral-900'
                        )}
                      >
                        {item.priceOrCost}
                      </span>
                    </div>
                    <div className="text-[9.5px] text-neutral-500 font-mono mt-0.5">
                      {item.meta}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dashed Separator */}
              <div className="border-b border-dashed border-neutral-200 my-2.5" />

              {/* Subtotals & Taxes */}
              <div className="space-y-1 text-neutral-600 text-[11px] font-mono">
                {active.subtotals.map((sub, sIdx) => (
                  <div key={sIdx} className="flex justify-between">
                    <span>{sub.label}</span>
                    <span
                      className={cn(
                        'font-medium',
                        sub.isHighlight ? 'text-emerald-700 font-semibold' : 'text-neutral-900'
                      )}
                    >
                      {sub.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-baseline font-bold text-sm text-neutral-950 pt-2 pb-0.5">
                <span className="tracking-tight uppercase">{active.totalLabel}</span>
                <span className="font-mono text-base font-bold tracking-tight text-neutral-950">
                  {active.totalValue}
                </span>
              </div>

              {/* Dashed Separator */}
              <div className="border-b border-dashed border-neutral-200 my-2.5" />

              {/* Order Metadata with Dynamic Today's Date */}
              <div className="space-y-1 text-[10px] text-neutral-600 mb-3 font-mono">
                {active.meta.map((m, mIdx) => (
                  <div key={mIdx} className="flex justify-between">
                    <span>{m.label}</span>
                    <span className={cn('text-neutral-900', m.isBold && 'font-semibold')}>
                      {m.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span>Timestamp</span>
                  <span className="text-neutral-900 font-semibold">
                    {currentDateStr} · {currentTimeStr}
                  </span>
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-1">
                <BarcodeSvg />
                <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-600 block text-center mt-1 uppercase">
                  {active.barcodeLabel}
                </span>
              </div>
            </article>
          </motion.div>
        </div>
      </div>

      {/* Footer bar with Minimal Orange Action Button */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-3">
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <span className="size-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="hidden sm:inline">5.5s Cycle:</span>
          <span className="text-white font-medium">
            {active.badge} ({active.pairLabel})
          </span>
        </div>

        <button
          type="button"
          onClick={handleTriggerPrint}
          disabled={stage === 'printing'}
          className={cn(
            'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 shadow-md',
            'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-semibold',
            'border border-orange-300/40 shadow-[0_2px_14px_rgba(249,115,22,0.4),inset_0_1px_0_0_rgba(255,255,255,0.35)]',
            stage === 'printing' && 'opacity-85'
          )}
        >
          <Send className={cn('size-3', stage === 'printing' && 'animate-spin')} />
          <span>{stage === 'printing' ? 'Printing Bill...' : actionLabel}</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// PROJECT 3: 4-FEATURE GRID (ZERO-CONNECTIVITY PWA, DIRECTIONAL COMPASS, A* ROUTING, MULTI-FLOOR)
// ============================================================================
function Project3FeatureGrid({ actionLabel }: { actionLabel: string }) {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      id: 0,
      sublabel: 'Offline Edge Core',
      title: 'Zero-Connectivity PWA Architecture',
      stat: '0ms Network Reqs',
      sla: 'Local IndexedDB Graph',
      detail: 'Operates seamlessly inside subterranean lab basements and zero-signal corridors.',
    },
    {
      id: 1,
      sublabel: 'Orientation Sensor Mesh',
      title: 'Live Directional Compass & Gyroscope Alignment',
      stat: 'Inertial Sensor Feed',
      sla: '±0.8° Heading Drift',
      detail: 'Continuous Kalman-filtered inertial guidance syncing student step heading in real time.',
    },
    {
      id: 2,
      sublabel: 'A* Spatial Routing',
      title: 'Sub-50ms Shortest-Path Navigation',
      stat: '<28ms Path Computation',
      sla: '203 Active Nodes',
      detail: 'Real-time multi-building shortest transit avoiding construction and congestion.',
    },
    {
      id: 3,
      sublabel: 'Vertical Spatial CAD',
      title: 'Multi-Floor Indoor Room Navigation',
      stat: '159 Destinations',
      sla: '4-Floor 3D Stack',
      detail: 'Vertical staircase and elevator nodes guiding straight to lecture rooms like E418.',
    },
  ];

  return (
    <div
      id="p3-architecture"
      className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0c0c11]/95 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] scroll-mt-6"
    >
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
          <span className="text-xs font-mono font-medium text-neutral-300">
            Geo Campuz Spatial Mesh: 203 Nodes Online
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-neutral-400">
            Transit Savings: <span className="text-white font-semibold">-75% Delays</span>
          </span>
          <span className="text-[10px] font-mono text-neutral-300 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10">
            25,000+ Hrs Saved
          </span>
        </div>
      </div>

      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3.5">
        {features.map((feat) => {
          const isSelected = selectedFeature === feat.id;
          return (
            <div
              key={feat.id}
              onClick={() => setSelectedFeature(feat.id)}
              className={cn(
                'relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none active:scale-[0.98] min-h-[96px]',
                isSelected
                  ? 'bg-white/[0.1] border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.25)]'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">
                  {feat.sublabel}
                </span>
                <span
                  className={cn(
                    'size-1.5 rounded-full transition-all duration-150',
                    isSelected
                      ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
                      : 'bg-neutral-600'
                  )}
                />
              </div>

              <div className="mt-2 mb-1">
                <h4 className="text-[14.5px] font-semibold text-white tracking-tight">
                  {feat.title}
                </h4>
              </div>

              <div className="flex items-baseline justify-between text-[11px] font-mono text-neutral-400">
                <span className="text-neutral-300 font-medium">{feat.stat}</span>
                <span className="text-neutral-500">{feat.sla}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <Compass className="size-3.5 text-cyan-400" />
          <span>Active Subsystem: {features[selectedFeature].title}</span>
        </div>
        <span className="text-neutral-500 hidden sm:inline">
          {features[selectedFeature].detail}
        </span>
      </div>
    </div>
  );
}

// San Francisco Telegraph Hill to Embarcadero route matching mapcn route-progress pattern
const SF_TELEGRAPH_ROUTE: [number, number][] = [
  [-122.394, 37.7953],
  [-122.3952, 37.7967],
  [-122.397, 37.7986],
  [-122.3975, 37.7992],
  [-122.3976, 37.7993],
  [-122.3981, 37.799],
  [-122.3984, 37.7989],
  [-122.4066, 37.7979],
  [-122.4071, 37.7981],
  [-122.4072, 37.7982],
  [-122.4072, 37.7984],
  [-122.4082, 37.8034],
  [-122.4064, 37.8037],
  [-122.4063, 37.8036],
  [-122.4063, 37.8034],
  [-122.4067, 37.8032],
  [-122.4067, 37.803],
  [-122.4067, 37.8028],
  [-122.4064, 37.8025],
  [-122.4062, 37.802],
  [-122.406, 37.8019],
  [-122.4058, 37.8018],
  [-122.4056, 37.8018],
  [-122.4055, 37.8019],
  [-122.4054, 37.8021],
  [-122.4056, 37.8025],
];

function GeoCampuzMapSimulator({ actionLabel }: { actionLabel: string }) {
  const [progress, setProgress] = useState(0.48);
  const [isPlaying, setIsPlaying] = useState(false);

  // Smooth live transit tracking playback
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 0;
        return Number((prev + 0.005).toFixed(4));
      });
    }, 55);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSimulate = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      id="p3-map"
      className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0c0c11]/95 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] scroll-mt-6"
    >
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
        <div className="flex items-center gap-2">
          <Compass className="size-4 text-cyan-400" />
          <span className="text-xs font-mono font-medium text-neutral-300">
            Geo Campuz: Navigation Engine Wayfinding
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
            Zero Tracking Privacy Active
          </span>
          <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10 hidden sm:inline-block">
            Sub-50ms A*
          </span>
        </div>
      </div>

      {/* Interactive Map Canvas Container (Matching mapcn pattern & Image reference) */}
      <div className="relative h-[420px] w-full rounded-2xl overflow-hidden border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <Map center={[-122.4008, 37.7996]} zoom={14.2}>
          <MapRoute
            coordinates={SF_TELEGRAPH_ROUTE}
            progress={progress}
            color="#94a3b8"
            width={5}
            opacity={0.8}
            dashArray={[0.5, 1.5]}
          >
            <RouteProgress color="#3b82f6" width={5} opacity={1} />

            <RouteMarker at="start">
              <MarkerContent>
                <div className="border-white/80 bg-neutral-900 size-3.5 rounded-full border-2 shadow-md" />
              </MarkerContent>
            </RouteMarker>

            <RouteMarker at="progress">
              <MarkerContent>
                <div className="ring-white/80 grid size-6 place-items-center rounded-full bg-blue-500 shadow-md ring-2">
                  <Car className="size-3 text-white" />
                </div>
                <MarkerLabel
                  position="top"
                  className="bg-neutral-950/90 border-white/20 text-white rounded-md border px-1.5 py-0.5 tabular-nums shadow-sm"
                >
                  {Math.round(progress * 100)}%
                </MarkerLabel>
              </MarkerContent>
            </RouteMarker>

            <RouteMarker at="end">
              <MarkerContent>
                <div className="bg-white ring-neutral-900 size-3.5 rounded-full shadow-md ring-2" />
              </MarkerContent>
            </RouteMarker>
          </MapRoute>
        </Map>

        {/* Floating Glassmorphic Progress Control Dock (Exact to mapcn pattern) */}
        <div className="bg-neutral-950/90 border border-white/15 absolute bottom-4 left-4 z-20 w-56 rounded-xl p-3 shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400 font-medium">Progress</span>
            <span className="text-white font-mono font-semibold tabular-nums">
              {Math.round(progress * 100)}%
            </span>
          </div>
          <Slider
            value={[progress * 100]}
            onValueChange={([val]) => {
              setProgress(val / 100);
              setIsPlaying(false);
            }}
            min={0}
            max={100}
            step={1}
            aria-label="Route transit progress"
          />
        </div>
      </div>

      {/* Footer bar with Minimal Orange Action Button */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-3">
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <Check className="size-3.5 text-emerald-400" />
          <span>Interactive Route · Offline PWA Vector Mesh</span>
        </div>

        <button
          type="button"
          onClick={handleSimulate}
          className={cn(
            'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 shadow-md',
            'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-semibold',
            'border border-orange-300/40 shadow-[0_2px_14px_rgba(249,115,22,0.4),inset_0_1px_0_0_rgba(255,255,255,0.35)]'
          )}
        >
          {isPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
          <span>{isPlaying ? 'Pause Transit' : actionLabel}</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// PROJECT 4: 4-FEATURE GRID (FINQUERY REASONING & ANALYSIS PLATFORM)
// ============================================================================
function Project4FeatureGrid({ actionLabel }: { actionLabel: string }) {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    {
      id: 0,
      sublabel: 'Retrieval-Augmented NL',
      title: 'Grounded Financial Question Answering',
      stat: '100% Sourced Citations',
      sla: '<120ms Vector Match',
      detail: 'Direct natural language inquiry anchored to verified page and paragraph financial citations.',
    },
    {
      id: 1,
      sublabel: 'Temporal Comparison',
      title: 'Multi-Period Financial Benchmarking',
      stat: '8 Quarters Ingested',
      sla: 'GAAP / IFRS Unified',
      detail: 'Normalized temporal comparison evaluating sequential revenue, expense, and EBITDA performance.',
    },
    {
      id: 2,
      sublabel: 'Delta Computation',
      title: 'Variance Analysis',
      stat: 'Sub-Cent Precision',
      sla: 'Automated YoY / QoQ',
      detail: 'Pinpoints line-item operational cost drift, revenue swings, and margin leverage in seconds.',
    },
    {
      id: 3,
      sublabel: 'Predictive Telemetry',
      title: 'AI-Driven Financial Risk Signals',
      stat: '24 Anomaly Vectors',
      sla: 'Zero False Positives',
      detail: 'Proactive early detection of liquidity crunches, working capital erosion, and covenant risk.',
    },
  ];

  return (
    <div
      id="p4-architecture"
      className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0c0c11]/95 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] scroll-mt-6"
    >
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-xs font-mono font-medium text-neutral-300">
            FINQUERY Analysis Engine: 4 Modules Online
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-neutral-400">
            Grounding: <span className="text-white font-semibold">100% Sourced</span>
          </span>
          <span className="text-[10px] font-mono text-neutral-300 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10">
            &lt;120ms SLA
          </span>
        </div>
      </div>

      {/* 2x2 Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3.5">
        {features.map((feat) => {
          const isSelected = selectedFeature === feat.id;
          return (
            <div
              key={feat.id}
              onClick={() => setSelectedFeature(feat.id)}
              className={cn(
                'relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none active:scale-[0.98] min-h-[96px]',
                isSelected
                  ? 'bg-white/[0.1] border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.25)]'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">
                  {feat.sublabel}
                </span>
                <span
                  className={cn(
                    'size-1.5 rounded-full transition-all duration-150',
                    isSelected
                      ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                      : 'bg-neutral-600'
                  )}
                />
              </div>

              <div className="mt-2 mb-1">
                <h4 className="text-[14.5px] font-semibold text-white tracking-tight">
                  {feat.title}
                </h4>
              </div>

              <div className="flex items-baseline justify-between text-[11px] font-mono text-neutral-400">
                <span className="text-neutral-300 font-medium">{feat.stat}</span>
                <span className="text-neutral-500">{feat.sla}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-3.5 text-emerald-400" />
          <span>Active Capability: {features[selectedFeature].title}</span>
        </div>
        <span className="text-neutral-500 hidden sm:inline">
          {features[selectedFeature].detail}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// PROJECT 4: FINQUERY 4-STAGE PIPELINE SIMULATOR (APPLE DESIGN SYSTEM)
// ============================================================================
function FinQueryPipelineSimulator({ actionLabel }: { actionLabel: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const stages = [
    {
      id: 0,
      number: '01',
      title: 'Document Intelligence Pipeline',
      shortTitle: 'Doc Intelligence',
      badge: 'Ingestion & Parsing',
      steps: [
        'PDF Ingestion',
        'Text Extraction',
        'Document Preprocessing',
        'Chunking',
        'Metadata Enrichment',
      ],
      details: {
        docTarget: 'Quarterly Statement 10-Q (FY26 Q3)',
        parsedTables: '89 Multi-Column Financial Tables Parsed',
        chunkingStrategy: '512 Token Window · 64 Token Overlap Stride',
        metadataFields: 'GAAP Line Items, CIK, Ticker, Period, Statement ID',
        sampleText:
          'Parsed Consolidated Statement of Operations: Net sales for Q3 FY26 totaled $85.78B compared to $81.80B in Q3 FY25. Cost of sales was $46.12B, resulting in gross margin of 46.24%.',
      },
    },
    {
      id: 1,
      number: '02',
      title: 'Vector-Based Semantic Retrieval',
      shortTitle: 'Semantic Retrieval',
      badge: 'Embedding & Search',
      steps: [
        'Embedding Generation',
        'Vector Database',
        'Similarity Search',
        'Relevant Context Retrieval',
      ],
      details: {
        embeddingModel: 'Dense 1,536-Dimensional Financial Embeddings',
        indexType: 'HNSW Graph Index · Cosine Metric Distance',
        topMatches: [
          { label: 'Chunk #042 (Item 2 · Gross Margin Drivers)', score: '0.948 match' },
          { label: 'Chunk #078 (Note 4 · Segment Revenue Breakdown)', score: '0.921 match' },
          { label: 'Chunk #109 (Item 7A · FX & Inventory Hedging)', score: '0.895 match' },
        ],
        queryVector: '[0.0142, -0.0821, 0.0439, ..., 0.0712] (cosine: 0.948)',
      },
    },
    {
      id: 2,
      number: '03',
      title: 'Retrieval-Augmented Generation',
      shortTitle: 'RAG Generation',
      badge: 'Context Synthesis',
      steps: [
        'User Query',
        'Context Retrieval',
        'Prompt Construction',
        'LLM Inference',
        'Grounded Response',
      ],
      details: {
        userQuery:
          'What were the primary operational drivers behind the 180 bps gross margin expansion in Q3?',
        evidenceContext:
          'Source: [10-Q Item 2 · Page 42 · Line 18] Services gross margin expanded to 74.2% (+310 bps) combined with favorable product freight logistics leverage.',
        groundedResponse:
          'Gross margin expanded by 180 basis points YoY to 46.2%, driven by a higher mix of Services revenue (up 14.1% YoY) and a 120 bps reduction in ocean freight and fulfillment costs.',
        verification: '100% Verified Citation · Zero Hallucination Index',
      },
    },
    {
      id: 3,
      number: '04',
      title: 'Financial Reasoning & Computation',
      shortTitle: 'Reasoning & Variance',
      badge: 'Automated Analytics',
      steps: [
        'Financial Metric Extraction',
        'Ratio Calculations',
        'Period Comparisons',
        'Variance Analysis',
      ],
      details: {
        metrics: [
          { label: 'Net Revenue', value: '$85.78B', delta: '+4.87% YoY', positive: true },
          { label: 'Gross Margin', value: '46.24%', delta: '+180 bps YoY', positive: true },
          { label: 'Operating Income', value: '$26.74B', delta: '+10.2% YoY', positive: true },
          { label: 'Free Cash Flow', value: '$28.91B', delta: '+11.8% YoY', positive: true },
        ],
        varianceNote:
          'Favorable operating leverage: Operating margin expanded to 31.17% due to disciplined SG&A efficiency (7.2% of net sales).',
      },
    },
  ];

  const handleSimulate = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isSimulating) return;
    setIsSimulating(true);
    setTimeout(() => {
      setActiveStage((prev) => (prev + 1) % 4);
      setIsSimulating(false);
    }, 700);
  };

  const current = stages[activeStage];

  return (
    <div
      id="p4-pipeline"
      className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0c0c11]/95 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] scroll-mt-6"
    >
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3.5">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-neutral-300">
            FINQUERY: 4-Stage Intelligence Pipeline Execution
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
            Stage {current.number} / 04 Active
          </span>
          <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/10 hidden sm:inline-block">
            {current.badge}
          </span>
        </div>
      </div>

      {/* Segmented Controller (Apple-style Tab Bar) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-black/60 border border-white/[0.08] mb-4">
        {stages.map((stg, idx) => {
          const isActive = activeStage === idx;
          return (
            <button
              key={stg.id}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={cn(
                'relative flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer active:scale-95 select-none',
                isActive
                  ? 'bg-white/15 text-white font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.2)] border border-white/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              <span className={cn('text-[10px]', isActive ? 'text-emerald-400' : 'text-neutral-400')}>
                {stg.number}.
              </span>
              <span className="truncate">{stg.shortTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Pipeline Data-Flow Ribbon (Visual Flow with Steps) */}
      <div className="mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
            Pipeline Stage Flow
          </span>
          <span className="text-[10px] font-mono text-emerald-400">
            {current.steps.length} Sub-Steps Synchronized
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {current.steps.map((step, sIdx) => {
            const isLast = sIdx === current.steps.length - 1;
            return (
              <React.Fragment key={sIdx}>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-xs font-mono text-white shadow-xs">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{step}</span>
                </div>
                {!isLast && (
                  <ChevronRight className="size-3 text-neutral-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Stage Interactive Telemetry & Evidence Inspector */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col gap-3 min-h-[170px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {/* Stage 0: Document Intelligence */}
            {current.id === 0 && (
              <div className="flex flex-col gap-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Target Filing:</span>
                  <span className="text-white font-semibold">{current.details.docTarget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Table Extraction:</span>
                  <span className="text-emerald-400">{current.details.parsedTables}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Chunk Strategy:</span>
                  <span className="text-neutral-300">{current.details.chunkingStrategy}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-neutral-300 font-sans leading-relaxed">
                  <span className="font-mono text-[10px] text-neutral-400 block mb-1">
                    PREPROCESSED STATEMENT EXTRACT:
                  </span>
                  &ldquo;{current.details.sampleText}&rdquo;
                </div>
              </div>
            )}

            {/* Stage 1: Vector-Based Semantic Retrieval */}
            {current.id === 1 && (
              <div className="flex flex-col gap-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Vector Model:</span>
                  <span className="text-white font-semibold">{current.details.embeddingModel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Graph Index:</span>
                  <span className="text-cyan-400">{current.details.indexType}</span>
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    Top Retrieved Document Contexts (Cosine Similarity):
                  </span>
                  {current.details.topMatches?.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
                    >
                      <span className="text-neutral-200">{m.label}</span>
                      <span className="text-emerald-400 font-bold">{m.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage 2: Retrieval-Augmented Generation */}
            {current.id === 2 && (
              <div className="flex flex-col gap-2.5 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    Natural-Language Financial Query:
                  </span>
                  <div className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white font-sans font-medium">
                    &ldquo;{current.details.userQuery}&rdquo;
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    Grounded Citation Anchor:
                  </span>
                  <div className="text-[11px] font-mono text-cyan-300">
                    {current.details.evidenceContext}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-neutral-200 font-sans leading-relaxed text-[11.5px]">
                  <span className="font-mono text-[10px] text-emerald-400 block mb-0.5 font-semibold">
                    GROUNDED INFERENCE (ZERO HALLUCINATION):
                  </span>
                  {current.details.groundedResponse}
                </div>
              </div>
            )}

            {/* Stage 3: Financial Reasoning & Computation */}
            {current.id === 3 && (
              <div className="flex flex-col gap-2.5 text-xs font-mono">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {current.details.metrics?.map((met, metIdx) => (
                    <div
                      key={metIdx}
                      className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] flex flex-col justify-between"
                    >
                      <span className="text-[10px] text-neutral-400">{met.label}</span>
                      <span className="text-base font-bold text-white mt-1 tabular-nums">
                        {met.value}
                      </span>
                      <span className="text-[10.5px] font-semibold text-emerald-400 mt-0.5">
                        {met.delta}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-sans text-neutral-300 flex items-start gap-2">
                  <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{current.details.varianceNote}</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer bar with Minimal Orange Action Button */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-3">
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <Check className="size-3.5 text-emerald-400" />
          <span>Grounded Evidence · Contextual Multi-Period Reasoning</span>
        </div>

        <button
          type="button"
          onClick={handleSimulate}
          className={cn(
            'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 shadow-md',
            'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-semibold',
            'border border-orange-300/40 shadow-[0_2px_14px_rgba(249,115,22,0.4),inset_0_1px_0_0_rgba(255,255,255,0.35)]',
            isSimulating && 'opacity-85'
          )}
        >
          <Send className={cn('size-3', isSimulating && 'animate-spin')} />
          <span>{isSimulating ? 'Processing Stage...' : actionLabel}</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// PROJECT 5: 6 CONNECTED BUSINESS DOMAINS (MATCHING UPLOADED REFERENCE IMAGE)
// ============================================================================
function SyncoraDomainsSection({ actionLabel }: { actionLabel: string }) {
  const [selectedDomain, setSelectedDomain] = useState(0);

  const domains = [
    {
      id: 0,
      title: 'Sales Operations',
      icon: TrendingUp,
      color: 'text-emerald-400',
      description: 'Opportunity lifecycle, pipeline updates, deal collaboration.',
      activeMetric: 'Slack channel #sales-velocity auto-synced to Salesforce Opportunities',
    },
    {
      id: 1,
      title: 'Customer Service',
      icon: Headphones,
      color: 'text-emerald-400',
      description: 'Case routing, escalation, SLA notifications.',
      activeMetric: 'Urgent P0 Case #CS-9182 broadcasted to Tier-3 engineers with 15m SLA',
    },
    {
      id: 2,
      title: 'Marketing',
      icon: Megaphone,
      color: 'text-emerald-400',
      description: 'Campaign coordination, lead handoffs, engagement updates.',
      activeMetric: 'MQL threshold reached: 45 enterprise leads handed off to BDRs',
    },
    {
      id: 3,
      title: 'Operations',
      icon: Workflow,
      color: 'text-emerald-400',
      description: 'Task coordination, operational requests, workflow execution.',
      activeMetric: 'Zero communication latency across cross-functional fulfillment pods',
    },
    {
      id: 4,
      title: 'Finance',
      icon: Wallet,
      color: 'text-emerald-400',
      description: 'Approval requests, payment-status updates, financial coordination.',
      activeMetric: 'Net-30 Invoice approval dispatched via Slack interactive block actions',
    },
    {
      id: 5,
      title: 'Management',
      icon: Building2,
      color: 'text-emerald-400',
      description: 'Executive alerts, operational summaries, decision tracking.',
      activeMetric: 'Daily KPI briefing delivered to #exec-leadership at 08:00 AM',
    },
  ];

  return (
    <div
      id="p5-architecture"
      className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0c0c11]/95 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] scroll-mt-6 select-none"
    >
      {/* Title Matching Uploaded Reference Image Exactly */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
        <h3 className="text-[17px] sm:text-lg font-semibold text-white tracking-tight">
          6 Connected Business Domains
        </h3>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
          Salesforce ⇄ Slack Unified
        </span>
      </div>

      {/* 2-Column Grid Matching Reference Image Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {domains.map((dom) => {
          const Icon = dom.icon;
          const isSelected = selectedDomain === dom.id;
          return (
            <div
              key={dom.id}
              onClick={() => setSelectedDomain(dom.id)}
              className={cn(
                'group flex flex-col justify-start rounded-xl p-2.5 -m-2.5 transition-all duration-150 cursor-pointer active:scale-[0.98]',
                isSelected
                  ? 'bg-white/[0.06] border border-white/15 shadow-sm'
                  : 'hover:bg-white/[0.03]'
              )}
            >
              {/* Domain Header: Green Glyph + Bold Title */}
              <div className="flex items-center gap-2.5">
                <Icon className={cn('size-4 stroke-[2.2] shrink-0', dom.color)} />
                <h4 className="text-[15px] font-semibold text-white tracking-tight">
                  {dom.title}
                </h4>
              </div>

              {/* Domain Description Sub-text */}
              <p className="text-neutral-400 text-[12.5px] leading-relaxed font-sans mt-1.5 pl-6.5">
                {dom.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Minimal telemetry active domain info */}
      <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2 truncate">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-neutral-300 truncate">
            {domains[selectedDomain].title}: {domains[selectedDomain].activeMetric}
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PROJECT 5: ENTERPRISE STAKEHOLDER VALUES COCKPIT (APPLE DESIGN)
// ============================================================================
function SyncoraStakeholderValues({ actionLabel }: { actionLabel: string }) {
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const stakeholders = [
    {
      role: 'Chief Revenue Officer',
      shortRole: 'CRO',
      value: 'Better visibility into sales pipeline activities and deal progress.',
      metric: 'Real-time pipeline alerts in #exec-revenue',
      salesforceSync: 'Synced to Opportunity Stage "Negotiation / Review" ($1.2M)',
      slackChannel: '#revenue-exec-brief',
    },
    {
      role: 'Sales Managers',
      shortRole: 'Sales Leads',
      value: 'Faster opportunity reviews and team coordination.',
      metric: 'Instant rep deal-blocker discussions in deal rooms',
      salesforceSync: 'Auto-generates dedicated Slack canvas per Tier-1 deal',
      slackChannel: '#deal-room-acme-corp',
    },
    {
      role: 'Customer Service Managers',
      shortRole: 'Support',
      value: 'Centralized case escalations and support visibility.',
      metric: 'Zero-latency P0 triage with cross-team swarming',
      salesforceSync: 'Case #CS-4091 updated with live Slack thread transcripts',
      slackChannel: '#support-escalations',
    },
    {
      role: 'Finance Managers',
      shortRole: 'Finance',
      value: 'Streamlined financial approvals and decision tracking.',
      metric: 'In-channel 1-click discount approvals & audit logs',
      salesforceSync: 'Approval request #APR-204 stamped to Contract CPQ',
      slackChannel: '#finance-approvals',
    },
    {
      role: 'Operations Managers',
      shortRole: 'Operations',
      value: 'Reduced departmental communication gaps.',
      metric: 'Unified multi-department task dispatching',
      salesforceSync: 'Service Delivery milestone marked complete',
      slackChannel: '#ops-coordination',
    },
    {
      role: 'IT & Integration Architects',
      shortRole: 'IT Architects',
      value: 'Centralized integration monitoring and system interoperability.',
      metric: 'Scalable event-driven mesh with zero point-to-point debt',
      salesforceSync: 'Platform Events REST Webhook ACK 200 (1.4ms latency)',
      slackChannel: '#it-integration-mesh',
    },
    {
      role: 'Business Executives',
      shortRole: 'Executives',
      value: 'Better cross-functional operational visibility.',
      metric: 'Consolidated executive digests across enterprise siloes',
      salesforceSync: 'Executive Dashboard refreshed across 6 domains',
      slackChannel: '#leadership-digest',
    },
  ];

  const handleDispatch = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setActiveStakeholder((prev) => (prev + 1) % stakeholders.length);
      setIsSyncing(false);
    }, 600);
  };

  const current = stakeholders[activeStakeholder];

  return (
    <div
      id="p5-values"
      className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0c0c11]/95 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.1)] scroll-mt-6 select-none"
    >
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
        <div className="flex items-center gap-2">
          <Workflow className="size-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-neutral-300">
            Enterprise Stakeholder Value Matrix
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
          7 Stakeholder Roles
        </span>
      </div>

      {/* Segmented Controller (Apple-style Stakeholder Selector) */}
      <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] p-1 rounded-xl bg-black/60 border border-white/[0.08] mb-3.5">
        {stakeholders.map((stk, idx) => {
          const isActive = activeStakeholder === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStakeholder(idx)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer active:scale-95 whitespace-nowrap',
                isActive
                  ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-xs'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              {stk.shortRole}
            </button>
          );
        })}
      </div>

      {/* Active Stakeholder Value Card */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex flex-col gap-3 min-h-[140px]">
        <div className="flex items-center justify-between">
          <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            {current.role}
          </h4>
          <span className="text-[10px] font-mono text-neutral-400">
            Channel: <span className="text-emerald-400">{current.slackChannel}</span>
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
          &ldquo;{current.value}&rdquo;
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-xs font-mono text-neutral-400">
          <span className="text-neutral-300">{current.metric}</span>
          <span className="text-emerald-400 text-[11px] truncate max-w-[280px]">
            {current.salesforceSync}
          </span>
        </div>
      </div>

      {/* Footer Bar with Action Button */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-3">
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <Check className="size-3.5 text-emerald-400" />
          <span>Real-Time Salesforce ⇄ Slack Bi-Directional Bus</span>
        </div>

        <button
          type="button"
          onClick={handleDispatch}
          className={cn(
            'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer active:scale-95 shadow-md',
            'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-semibold',
            'border border-orange-300/40 shadow-[0_2px_14px_rgba(249,115,22,0.4),inset_0_1px_0_0_rgba(255,255,255,0.35)]',
            isSyncing && 'opacity-85'
          )}
        >
          <Send className={cn('size-3', isSyncing && 'animate-spin')} />
          <span>{isSyncing ? 'Syncing...' : actionLabel}</span>
        </button>
      </div>
    </div>
  );
}

function renderProjectComponent(index: number, actionLabel: string) {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col gap-4">
          <Project1FeatureGrid actionLabel={actionLabel} />
          <Project1WorkflowSection />
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col gap-4">
          <Project2FeatureGrid actionLabel={actionLabel} />
          <BilloraReceiptPrinterSimulator actionLabel={actionLabel} />
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-4">
          <Project3FeatureGrid actionLabel={actionLabel} />
          <GeoCampuzMapSimulator actionLabel={actionLabel} />
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col gap-4">
          <Project4FeatureGrid actionLabel={actionLabel} />
          <FinQueryPipelineSimulator actionLabel={actionLabel} />
        </div>
      );
    case 4:
      return (
        <div className="flex flex-col gap-4">
          <SyncoraDomainsSection actionLabel={actionLabel} />
          <SyncoraStakeholderValues actionLabel={actionLabel} />
        </div>
      );
    default:
      return null;
  }
}

// ============================================================================
// MAIN LAB PROJECTS SHOWCASE (ONE PROJECT FULL SCREEN ON SCROLLING)
// ============================================================================
export function LabProjects() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeStepPerProject, setActiveStepPerProject] = useState<number[]>([0, 0, 0, 0, 0]);

  const containerRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll through the 500vh container to reveal ONE project at a time
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (val) => {
    // Avoid intermediate index updates during programmatic jumps (prevents flickering)
    if (isTransitioningRef.current) return;
    const nextIdx = Math.min(4, Math.floor(val * 5));
    if (nextIdx !== activeProjectIdx) {
      setActiveProjectIdx(nextIdx);
    }
  });

  // Jump to specific project smoothly with minimal screen blur (NO fast scrolling or flickering)
  const jumpToProject = (idx: number) => {
    if (idx === activeProjectIdx) return;

    // Suppress scroll-driven intermediate updates
    isTransitioningRef.current = true;
    setActiveProjectIdx(idx);

    // Reset right scroll pane to top instantly so project begins at start
    if (rightScrollRef.current) {
      rightScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Instantly sync window position without triggering intermediate animated scroll events
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll = containerTop + (idx / 4) * totalHeight;
      window.scrollTo({ top: targetScroll, behavior: 'instant' });
    }

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  };

  // Bidirectional Scroll Sync for All 5 Projects: Scrolling right pane updates Left Navigation
  const handleRightPaneScroll = () => {
    if (!rightScrollRef.current) return;
    const container = rightScrollRef.current;
    const scrollTop = container.scrollTop;

    const sectionIds =
      activeProjectIdx === 0
        ? ['p1-architecture', 'p1-workflows', 'p1-reviews']
        : activeProjectIdx === 1
        ? ['p2-architecture', 'p2-printer', 'p2-reviews']
        : activeProjectIdx === 2
        ? ['p3-architecture', 'p3-map', 'p3-reviews']
        : activeProjectIdx === 3
        ? ['p4-architecture', 'p4-pipeline', 'p4-reviews']
        : activeProjectIdx === 4
        ? ['p5-architecture', 'p5-values', 'p5-reviews']
        : null;

    if (!sectionIds) return;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (el) {
        const top = el.offsetTop - container.offsetTop;
        if (scrollTop >= top - 70) {
          setActiveStepPerProject((prev) => {
            if (prev[activeProjectIdx] === i) return prev;
            const copy = [...prev];
            copy[activeProjectIdx] = i;
            return copy;
          });
          break;
        }
      }
    }
  };

  const handleSelectNavStep = (stepIdx: number) => {
    setActiveStepPerProject((prev) => {
      const copy = [...prev];
      copy[activeProjectIdx] = stepIdx;
      return copy;
    });

    if (rightScrollRef.current) {
      const sectionIds =
        activeProjectIdx === 0
          ? ['p1-architecture', 'p1-workflows', 'p1-reviews']
          : activeProjectIdx === 1
          ? ['p2-architecture', 'p2-printer', 'p2-reviews']
          : activeProjectIdx === 2
          ? ['p3-architecture', 'p3-map', 'p3-reviews']
          : activeProjectIdx === 3
          ? ['p4-architecture', 'p4-pipeline', 'p4-reviews']
          : activeProjectIdx === 4
          ? ['p5-architecture', 'p5-values', 'p5-reviews']
          : null;

      if (sectionIds && sectionIds[stepIdx]) {
        const target = document.getElementById(sectionIds[stepIdx]);
        if (target) {
          const container = rightScrollRef.current;
          container.scrollTo({
            top: target.offsetTop - container.offsetTop - 12,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  const currentProject = PROJECTS[activeProjectIdx];
  const Icon = currentProject.icon;

  return (
    <section
      id="lab"
      ref={containerRef}
      className="relative w-full bg-black text-white h-[500vh] border-t border-white/[0.08]"
    >
      {/* Anchor for nav compatibility */}
      <div id="primitives" className="absolute -top-24 pointer-events-none" />

      {/* Sticky Fullscreen Showcase Stage (Pinned while scrolling through projects) */}
      <div className="sticky top-16 sm:top-20 flex h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] w-full items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 py-3 sm:py-5">
        <div className="relative flex flex-col justify-between w-full max-w-[1360px] h-full mx-auto">
          {/* ================================================================ */}
          {/* TOP NOTCH NAVBAR: ATTACHED NOTCH SLICE WITH MINIMAL THEME LIGHTS */}
          {/* ================================================================ */}
          <NotchProjectHeader
            currentProject={currentProject}
            activeProjectIdx={activeProjectIdx}
            projects={PROJECTS}
            onSelectProject={jumpToProject}
          />

          {/* Main Full-Screen Body Grid: Exactly ONE Project Displayed */}
          <div className="grid lg:grid-cols-12 gap-5 sm:gap-8 flex-1 min-h-0 py-3 sm:py-4 items-stretch">
            {/* ================================================================ */}
            {/* LEFT COLUMN: NATIVE WHITE NAVIGATION (MATCHING LeftNavigation_Onthispage.mov) */}
            {/* ================================================================ */}
            <div className="hidden lg:flex lg:col-span-3 flex-col justify-between p-5 rounded-3xl bg-[#0f0f13]/80 border border-white/[0.08] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectIdx}
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      {currentProject.badge}
                    </span>
                  </div>

                  {/* The Bespoke Native White Navigation with Curved Path & Animated Dot */}
                  <NativeWhiteProjectNav
                    steps={currentProject.navSteps}
                    activeStep={activeStepPerProject[activeProjectIdx]}
                    onSelectStep={handleSelectNavStep}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>{activeProjectIdx === 0 ? 'Click or scroll to reach' : 'Scroll to advance'}</span>
                <span className="text-white">↓ Next</span>
              </div>
            </div>

            {/* ================================================================ */}
            {/* CENTER & RIGHT COLUMN: PROJECT TITLE, COMPONENT & SLIDING REVIEWS */}
            {/* Wrapped in Apple minimal screen blur transition on project change */}
            {/* ================================================================ */}
            <div
              ref={rightScrollRef}
              onScroll={handleRightPaneScroll}
              className="lg:col-span-9 flex flex-col min-h-0 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.15)_transparent] pr-1"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectIdx}
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 4 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, filter: 'blur(8px)', y: -4 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1], // Apple fluid cubic-bezier
                  }}
                  className="flex flex-col justify-between gap-3.5 sm:gap-4.5"
                >
                  {/* 1. Glassmorphic Project Title Card */}
                  <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0f0f13]/80 backdrop-blur-2xl border border-white/[0.1] shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.18)] shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] border border-white/15 text-white shadow-sm">
                        <Icon className="size-5 stroke-[1.8]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase text-neutral-400">
                          {currentProject.category}
                        </span>
                        <h3 className="text-lg sm:text-2xl font-semibold tracking-[-0.02em] text-white">
                          {currentProject.title}
                        </h3>
                      </div>
                    </div>

                    {/* Metric Chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {currentProject.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex flex-col px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08]"
                        >
                          <span className="text-[9px] font-mono text-neutral-400">{m.label}</span>
                          <span className="text-xs font-mono font-semibold text-white">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Apple Scrolling Text Highlight One-Liner (Pure White / Silver Optical) */}
                  <div className="py-1 shrink-0 font-sans">
                    <p className="text-sm sm:text-lg md:text-xl font-medium tracking-[-0.02em] leading-relaxed text-neutral-400">
                      <span>{currentProject.oneLinerBefore}{' '}</span>
                      <span className="text-white font-semibold drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                        {currentProject.oneLinerFocus}{' '}
                      </span>
                      <span>{currentProject.oneLinerAfter}</span>
                    </p>
                  </div>

                  {/* 3. Main Project Interactive Component & Workflow Section */}
                  <div className="shrink-0">
                    {renderProjectComponent(activeProjectIdx, currentProject.actionLabel)}
                  </div>

                  {/* 4. macOS Traffic-Light Customer Review Card (With 9 Sliding Reviews) */}
                  <div className="shrink-0">
                    <MacSlidingReviewsCard
                      reviews={currentProject.reviews}
                      title={
                        activeProjectIdx === 0
                          ? 'quickplate_customer_reviews.log'
                          : activeProjectIdx === 1
                          ? 'billora_merchant_reviews.log'
                          : activeProjectIdx === 2
                          ? 'geocampuz_transit_reviews.log'
                          : activeProjectIdx === 3
                          ? 'finquery_stakeholder_reviews.log'
                          : 'syncora_enterprise_reviews.log'
                      }
                      id={
                        activeProjectIdx === 0
                          ? 'p1-reviews'
                          : activeProjectIdx === 1
                          ? 'p2-reviews'
                          : activeProjectIdx === 2
                          ? 'p3-reviews'
                          : activeProjectIdx === 3
                          ? 'p4-reviews'
                          : 'p5-reviews'
                      }
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Bar: Pager Arrows & Navigation Prompt */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-xs font-mono text-neutral-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              <span>Full Viewport Showcase • Project {activeProjectIdx + 1} of 5</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => jumpToProject(Math.max(0, activeProjectIdx - 1))}
                disabled={activeProjectIdx === 0}
                className="px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none text-white border border-white/10 transition-all cursor-pointer"
              >
                ← Prev Project
              </button>
              <button
                type="button"
                onClick={() => jumpToProject(Math.min(4, activeProjectIdx + 1))}
                disabled={activeProjectIdx === 4}
                className="px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none text-white border border-white/10 transition-all cursor-pointer"
              >
                Next Project →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
