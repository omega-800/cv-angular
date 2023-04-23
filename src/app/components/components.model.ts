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
    image:ImageComponent,
    prefix:string
}

export interface LinkTypes {
    GITHUB:LinkType,
    MAIL:LinkType,
    PHONE:LinkType,
    URL:LinkType,
    OTHER:LinkType,
}
