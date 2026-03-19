export interface LearningResource {
  title: string;
  summary: string;
  externalUrl?: string;
}

export interface ResourceCategory {
  category: string;
  icon: string;
  description: string;
  resources: LearningResource[];
}

export const learningResources: ResourceCategory[] = [
  {
    category: 'Patent Application Process',
    icon: '📋',
    description: 'Step-by-step guidance on filing a patent application with the USPTO.',
    resources: [
      {
        title: 'Understanding the Patent Application Process',
        summary: 'A comprehensive overview of the steps involved in filing a patent, from initial idea documentation through examination and grant. Covers provisional and non-provisional applications.',
      },
      {
        title: 'Provisional Patent Applications',
        summary: 'Learn how to file a provisional patent application to establish an early filing date while giving you 12 months to file a complete non-provisional application. Cost-effective first step for inventors.',
      },
      {
        title: 'Non-Provisional Patent Applications',
        summary: 'Detailed guide to preparing and filing a complete non-provisional patent application, including required sections: specification, claims, abstract, and drawings.',
      },
      {
        title: 'Patent Examination and Office Actions',
        summary: 'What to expect during the USPTO examination process, how to respond to office actions, and strategies for overcoming rejections to achieve patent grant.',
      },
      {
        title: 'Patent Prosecution Timeline',
        summary: 'Typical timelines for patent prosecution from filing to grant, including average pendency periods, accelerated examination options, and Track One prioritized examination.',
      },
    ],
  },
  {
    category: 'Types of Patents',
    icon: '🏷️',
    description: 'Learn about the different types of patents and which is right for your invention.',
    resources: [
      {
        title: 'Utility Patents',
        summary: 'The most common type of patent, protecting the functional aspects of an invention. Covers processes, machines, manufactures, and compositions of matter. Valid for 20 years from filing date.',
      },
      {
        title: 'Design Patents',
        summary: 'Protect the ornamental or aesthetic appearance of a functional item. Covers the unique visual characteristics of a product. Valid for 15 years from grant date.',
      },
      {
        title: 'Plant Patents',
        summary: 'Protect new and distinct varieties of asexually reproduced plants. Covers invented or discovered plant varieties that can be reproduced asexually. Valid for 20 years from filing.',
      },
      {
        title: 'Provisional vs. Non-Provisional: Which to File First?',
        summary: 'A comparison of provisional and non-provisional patent applications, helping inventors decide which filing strategy best fits their timeline, budget, and commercialization goals.',
      },
      {
        title: 'International Patent Protection (PCT)',
        summary: 'Overview of the Patent Cooperation Treaty (PCT) process for seeking patent protection in multiple countries simultaneously. Covers national phase entry and international search reports.',
      },
    ],
  },
  {
    category: 'Prior Art Search',
    icon: '🔍',
    description: 'How to research existing patents and publications to assess your invention\'s novelty.',
    resources: [
      {
        title: 'What is Prior Art?',
        summary: 'Prior art includes any evidence that your invention is already known. This guide explains what counts as prior art, why it matters for patentability, and how it affects your claims.',
      },
      {
        title: 'How to Search USPTO Patent Databases',
        summary: 'Step-by-step instructions for using USPTO\'s Patent Full-Text and Image Database (PatFT) and Patent Application Full-Text and Image Database (AppFT) to search for existing patents.',
      },
      {
        title: 'Using Google Patents for Prior Art Research',
        summary: 'Google Patents provides a free, searchable database of patents from multiple countries. Learn effective search strategies, keyword selection, and how to interpret search results.',
      },
      {
        title: 'Non-Patent Literature as Prior Art',
        summary: 'Scientific papers, conference proceedings, product manuals, and websites can all constitute prior art. Learn how to search academic databases and evaluate non-patent literature.',
      },
      {
        title: 'Interpreting Prior Art Search Results',
        summary: 'How to analyze prior art search results to assess novelty and non-obviousness, identify claim differentiation opportunities, and determine the scope of available patent protection.',
      },
    ],
  },
  {
    category: 'Working with a Patent Attorney',
    icon: '⚖️',
    description: 'Guidance on finding, hiring, and collaborating with a patent attorney or agent.',
    resources: [
      {
        title: 'When Do You Need a Patent Attorney?',
        summary: 'While inventors can file patents pro se (without an attorney), complex inventions benefit from professional legal counsel. This guide helps you decide when to hire a patent attorney.',
      },
      {
        title: 'Patent Attorney vs. Patent Agent: What\'s the Difference?',
        summary: 'Both patent attorneys and patent agents are registered to practice before the USPTO, but attorneys also have law degrees. Learn the differences and which professional suits your needs.',
      },
      {
        title: 'How to Find a Registered Patent Attorney',
        summary: 'Resources for finding USPTO-registered patent practitioners, including the USPTO\'s online directory, state bar referrals, and inventor organizations that provide referrals.',
      },
      {
        title: 'Preparing for Your First Meeting with a Patent Attorney',
        summary: 'What to bring to your initial consultation: invention disclosure documents, prior art search results, prototype documentation, and business goals. How to make the most of your consultation.',
      },
      {
        title: 'Understanding Patent Attorney Fees',
        summary: 'Overview of typical patent attorney fees for different services: prior art searches, provisional applications, non-provisional applications, and office action responses. Budgeting for patent prosecution.',
      },
      {
        title: 'Inventor-Attorney Confidentiality and Assignments',
        summary: 'Understanding attorney-client privilege in patent matters, invention assignment agreements, and how to protect your rights when working with employers, universities, or investors.',
      },
    ],
  },
];
