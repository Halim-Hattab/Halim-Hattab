import { Experience, Education, Certification, Language, SkillCategory, PersonalInfo, PortfolioItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Halim Hattab',
  title: 'Technical Advisor',
  email: 'halimalhattab@gmail.com',
  phone: '+216 99 752 033',
  linkedin: 'Halim Hattab'
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: '3D Printed Product Showcase',
    description: 'Custom-designed and 3D printed products for various clients, showcasing both FDM and resin printing capabilities.',
    type: 'image',
    url: 'https://images.pexels.com/photos/8885024/pexels-photo-8885024.jpeg',
    tags: ['3D Printing', 'Product Design', 'Custom Manufacturing']
  },
  {
    title: 'Legal Documentation System',
    description: 'Developed a streamlined system for managing legal documents and case files at STB Bank.',
    type: 'image',
    url: 'https://images.pexels.com/photos/5668869/pexels-photo-5668869.jpeg',
    tags: ['Legal Tech', 'Document Management', 'Process Optimization']
  },
  {
    title: 'Content Moderation Dashboard',
    description: 'User interface for content moderation showing key metrics and workflow management.',
    type: 'image',
    url: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg',
    tags: ['UI/UX', 'Content Moderation', 'Dashboard Design']
  }
];

export const experiences: Experience[] = [
  {
    title: 'Technical Advisor',
    company: 'VistaPrint',
    period: '08/2024 - Present',
    location: 'Tunis',
    tools: ['Salesforce', 'Looker', 'Jira', 'Slack', 'Confluence', 'Trek'],
    responsibilities: [
      'Managed 50+ customer interactions daily during peak seasons via calls, emails, and chat, maintaining an average handling time of under 10 minutes.',
      'Achieved a First Contact Resolution rate of 82%',
      'Assisted clients with website and domain-related issues, resolving over 100+ cases monthly tied to domain connections and subscription management.',
      'Offered design advice for personalized products, enhancing visual appeal and brand consistency for small business clients.',
      'Supported a UK / EU client base across B2B and B2C segments, tailoring solutions to a variety of technical proficiency levels.'
    ]
  },
  {
    title: 'Legal Intern',
    company: 'STB Bank',
    period: '03/2024 - 06/2024',
    location: 'Tunis',
    tools: ['Ibm Notes', 'Outlook', 'Doctrine.fr'],
    responsibilities: [
      'Contributed to legal research and analysis as part of a master\'s thesis on competition law in the Tunisian legal system, with a focus on anti-competitive practices and proposed regulatory solutions.',
      'Assisted in reviewing contractual clauses, internal compliance protocols, and case documentation related to market behavior.',
      'Applied academic findings to practical scenarios involving financial institutions and corporate clients.'
    ]
  },
  {
    title: 'Co-Founder',
    company: '3DEEZ',
    period: '08/2023 – Present',
    location: 'Tunis',
    tools: ['Blender', 'Fusion360', 'Voxel', 'Tango'],
    responsibilities: [
      'Launched and currently leads a thriving 3D printing business specializing in custom-made products and on-demand printing solutions for individual and commercial clients.',
      'Implemented both FDM (Fused Deposition Modeling) and resin printing (SLA/DLP) technologies to deliver high-precision, durable prototypes and end-use products.',
      'Oversaw the entire production pipeline, including 3D modeling (using Blender and Fusion 360), slicing (via Voxel Tango), post-processing, and quality assurance.',
      'Developed and maintained the brand\'s digital presence, handling social media outreach, e-commerce setup, and order management.'
    ]
  },
  {
    title: 'Content Moderator',
    company: 'Concentrix',
    period: '07/2022 - 08/2023',
    location: 'Tunis',
    tools: ['Tcs', 'Lark', 'Workday'],
    responsibilities: [
      'Collaborated with the customer support team to address user concerns and feedback, aiming to improve the overall customer experience and foster a positive online community.',
      'Moderated user-generated content to ensure adherence to community guidelines and policies.',
      'Identified and addressed inappropriate and offensive content on online platforms ensuring a safe and positive user experience'
    ]
  },
  {
    title: 'Internship in the judicial department',
    company: 'STB Bank',
    period: '09/2021 - 10/2021',
    location: 'Tunis',
    tools: ['Ibm Notes', 'Outlook', 'proprietary tools'],
    responsibilities: [
      'In charge of stop-seizure cases.',
      'Assisted in drafting contracts and making calls for tenders.',
      'Ensured a positive customer experience for clients in the judicial department through prompt and courteous assistance.'
    ]
  },
  {
    title: 'Internship in Marketing and Finance',
    company: 'Tunisie Numérique',
    period: '08/2020 - 09/2020',
    location: 'Tunis',
    tools: ['Wordpress', 'Google Workspace', 'Symfony'],
    responsibilities: [
      'Conducted a weekly website activity analysis, extracting valuable insights to optimize online presence and engagement.',
      'Devised and executed targeted marketing strategies tailored to the Young age group, increasing brand awareness and customer acquisition by 25%',
      'Collaborated with the finance team to analyze market trends and financial data.'
    ]
  }
];

export const education: Education[] = [
  {
    degree: 'Master\'s Degree in Business and Corporate law',
    institution: 'Université Centrale',
    period: '09/2022 – 10/2024',
    location: 'Tunis'
  },
  {
    degree: 'Bachelor\'s Degree in Private Law',
    institution: 'Université Centrale',
    period: '09/2019 – 06/2022',
    location: 'Tunis'
  },
  {
    degree: 'Baccalaureate in Science',
    institution: 'Ibn Abi Dhiaf School',
    period: '09/2018 – 06/2019',
    location: 'Tunis'
  }
];

export const certifications: Certification[] = [
  {
    name: 'APTIS CERTIFICATE',
    issuer: 'British Council',
    year: '2022'
  },
  {
    name: 'VOLTAIRE CERTIFICATE',
    issuer: 'Project Voltaire',
    year: '2022'
  },
  {
    name: 'Public Discourse & Debate',
    issuer: 'MUNATHARA INITIATIVE',
    year: '2022'
  }
];

export const languages: Language[] = [
  {
    name: 'English',
    level: 'C2 Certified',
    proficiency: 95
  },
  {
    name: 'French',
    level: 'C1 Certified',
    proficiency: 85
  },
  {
    name: 'Arabic',
    level: 'C2 Native',
    proficiency: 100
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Technical',
    skills: ['Salesforce', 'Looker', 'Jira', 'Slack', 'WordPress', 'Google Workspace', 'IBM Notes', 'Outlook', 'Doctrine.fr', 'Confluence', 'Blender', 'Fusion 360', 'Voxel Tango', 'TCS', 'Lark', 'Workday', 'Latex']
  },
  {
    name: 'Analytical',
    skills: ['Legal research', 'Market trend analysis', 'Contract review', 'Financial data interpretation']
  },
  {
    name: 'Creative',
    skills: ['3D modeling', 'UX feedback integration', 'Brand design consistency', 'Content moderation']
  },
  {
    name: 'Soft Skills',
    skills: ['Communication', 'Problem-solving', 'Time management', 'Team collaboration', 'Adaptability']
  }
];