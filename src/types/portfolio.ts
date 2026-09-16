export interface Profile {
  name: string
  title: string
  experienceLabel: string
  location: string
  summary: string
  email: string
  githubUrl: string
}

export interface ProofPoint {
  id: string
  label: string
  detail: string
  href: string
}

export interface ExperienceProject {
  id: string
  name: string
  role: string
  description: string
  achievements: readonly string[]
  image?: ProjectImage
  publicUrl?: string
}

export interface ExperienceItem {
  id: string
  title: string
  company: string
  period: string
  description: string
  achievements?: readonly string[]
  projects?: readonly ExperienceProject[]
}

export interface SkillGroup {
  id: string
  category: string
  items: readonly string[]
}

export type ProjectAccent = 'blue' | 'green' | 'orange' | 'purple'

export interface ProjectImage {
  src: string
  alt: string
  position?: string
  fit?: 'cover' | 'contain'
}

interface ProjectBase {
  id: string
  title: string
  description: string
  technologies: readonly string[]
  accent: ProjectAccent
  image?: ProjectImage
}

export interface DemoProject extends ProjectBase {
  kind: 'demo'
  liveUrl: string
  repositoryUrl: string
}

export interface PackageLink {
  id: string
  name: string
  url: string
  description: string
}

export interface PackageProject extends ProjectBase {
  kind: 'packages'
  repositoryUrl: string
  packages: readonly PackageLink[]
}

export interface RepositoryProject extends ProjectBase {
  kind: 'repository'
  repositoryUrl: string
}

export type PortfolioProject = DemoProject | PackageProject | RepositoryProject
