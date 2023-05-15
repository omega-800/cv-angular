export interface Entity {
    id: string;
    name: string;
}

export interface NamedEntity extends Entity {
    name_e: string,
    name_r: string,
    description: string,
    description_e: string,
    description_r: string
}
export interface ImageEntity extends Entity {
    image: string,
    thumbnail: string
}

export interface LinkEntity extends Entity {
    url: string
}

export interface ContentEntity extends NamedEntity, ImageEntity, LinkEntity { }