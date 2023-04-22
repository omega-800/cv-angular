import { Entity } from "../services/entities.model";

export interface Component {
    id: string,
    name: string,
    entities?: Entity[]
}

export interface ContentComponent extends Component {
    title: string,
    description: string,
    images?: ImageComponent[],
    skills?: ButtonComponent[],
    links?: ButtonComponent[]
}

export interface ButtonComponent extends Component {
    onClick: Function,
    type: LinkType
}

export interface TagComponent extends ButtonComponent {
    selected: boolean
}

export interface ImageComponent extends Component {
    path: string,
    alt: string,
    previewPath?: string
}

export interface LinkType extends Component {
    image:string,
    prefix:string
}

export interface LinkTypes {
    GITHUB:LinkType,
    MAIL:LinkType,
    PHONE:LinkType,
    URL:LinkType,
    OTHER:LinkType,
}

export const linkTypes:Readonly<LinkTypes> = {
    GITHUB: {
        id:"linkType_github",
        name:"github",
        image:"assets/img/github.svg", 
        prefix:""
    },
    MAIL: {
        id:"linkType_mail",
        name:"mail", 
        image:"assets/img/mail.svg", 
        prefix:"mailto:"
    },
    PHONE: {
        id:"linkType_phone",
        name:"phone", 
        image:"assets/img/phone.svg", 
        prefix:"tel:"
    },
    URL: {
        id:"linkType_url",
        name:"url", 
        image:"assets/img/url.svg", 
        prefix:""
    },
    OTHER: {
        id:"linkType_other",
        name:"other", 
        image:"", 
        prefix:""
    }
} as const;