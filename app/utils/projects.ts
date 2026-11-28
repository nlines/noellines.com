export interface Project {
  /** Shown on the Projects page and, when `featured`, on the Home teaser. */
  title: string
  /** When the work took place. The list runs most recent first. */
  period: string
  summary: string
  tags: string[]
  featured?: boolean
}

// Described generically on purpose: no employer product names and no client
// names. The list runs most recent first, and `featured` marks the three shown
// on Home, in the same order.
export const projects: Project[] = [
  {
    title: 'AI security remediation agents',
    period: '2026–Present',
    summary: 'AI agents that find security vulnerabilities, propose the fixes as merge requests and raise the tickets and alerts, ranked by risk and closed automatically when the fix lands.',
    tags: ['GitLab CI', 'Claude', 'Jira'],
    featured: true,
  },
  {
    title: 'Internal developer platform',
    period: '2025–2026',
    summary: 'Infrastructure as code for a developer portal, plus contributions to its service catalog, the CLI around it and asynchronous publishing.',
    tags: ['Backstage', 'Terraform', 'AWS', 'Lambda'],
  },
  {
    title: 'Major client integration',
    period: '2021–2024',
    summary: 'A three-year integration for a large institutional investment consultant: partner-database performance, client onboarding, datafeed imports and data-integrity fixes.',
    tags: [],
  },
  {
    title: 'Quantitative analytics features',
    period: '2021–2022',
    summary: 'Factor scoring, historical tilts and Excel export for a quantitative analytics product.',
    tags: ['C#', '.NET'],
  },
  {
    title: 'Client analytics dashboard',
    period: '2020–2022',
    summary: 'A client-facing analytics dashboard for asset managers: Vue UI components on a C# data layer with optimistic concurrency.',
    tags: ['Vue', 'C#', 'DynamoDB'],
    featured: true,
  },
  {
    title: 'Feature-flag service',
    period: '2019–2020',
    summary: 'The API layer of a feature-flag service that let a monolith be cut over to microservices a step at a time.',
    tags: ['.NET', 'AWS SSM'],
  },
  {
    title: 'Search services upgrade',
    period: '2018–2019',
    summary: 'Production search services migrated to Elasticsearch 6, with contributions to rebuilt document storage and token-based authentication.',
    tags: ['Elasticsearch', 'S3', 'DynamoDB', 'JWT'],
  },
  {
    title: 'Mobile app backend',
    period: '2017–2018',
    summary: 'The REST API and video-transcoding pipeline for a social video-sharing iOS app, plus its cloud hosting.',
    tags: ['REST API', 'Azure Media Services', 'Azure'],
  },
  {
    title: 'Commercial site redesign',
    period: '2016–2017',
    summary: 'Service-oriented Web APIs and a redesign of a commercial product-data website, with Elasticsearch-backed product search.',
    tags: ['.NET MVC', 'AngularJS', 'Elasticsearch'],
    featured: true,
  },
  {
    title: 'Delivery pipelines and legacy data migration',
    period: '2015–2016',
    summary: 'Automated multi-environment deployments, and an ETL process that moved legacy data into a new service-oriented architecture.',
    tags: ['TeamCity', 'Octopus Deploy', 'ETL'],
  },
]
