import { Entity } from "../services/entities.model";

export interface Comp {
    id: string,
    name: string,
    entities?: Entity[]
}

export interface ContentComp extends Comp {
    title: string,
    description: string,
    images?: ImageComp[],
    skills?: ButtonComp[],
    links?: ButtonComp[]
}

export interface ButtonComp extends Comp {
    onClick: Function,
    type: LinkType
}

export interface TagComp extends ButtonComp {
    selected: boolean
}

export interface ImageComp extends Comp {
    path: string,
    alt: string,
    previewPath?: string
}

export interface LinkType extends Comp {
    image:ImageComp,
    prefix:string
}

export interface LinkTypes {
    GITHUB:LinkType,
    MAIL:LinkType,
    PHONE:LinkType,
    URL:LinkType,
    PERSON:LinkType,
    OTHER:LinkType,
}
