import type PageContent from "../contents/PageContent";

export interface BookPageConfig {
    id: string,
    url: string,
    part?: number,
    headline?: string,
    page?: string,
    component?: PageContent
}

export interface CareerConfig {
    id: string,
    period: string,
    title: string,
    location: string,
    description: string,
    technologies: string[],
    bgImage?: string
    part?: number
}

export interface AppConfig {
    pages: BookPageConfig[],
    career: CareerConfig[]
}

export type PagePart = number | null;
export interface PageContentProps {
    headline: string | null
    pageNum: number,
    part: PagePart
}