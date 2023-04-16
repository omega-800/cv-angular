export interface LinkType {
    name:string,
    image:string,
    prefix:string
}

export interface LinkTypes {
    GITHUB:LinkType,
    MAIL:LinkType,
    PHONE:LinkType,
    URL:LinkType,
}

export const linkTypes:Readonly<LinkTypes> = {
    GITHUB: {
        name:"github",
        image:"assets/img/github.svg", 
        prefix:""
    },
    MAIL: {
        name:"mail", 
        image:"assets/img/mail.svg", 
        prefix:"mailto:"
    },
    PHONE: {
        name:"phone", 
        image:"assets/img/phone.svg", 
        prefix:"tel:"
    },
    URL: {
        name:"url", 
        image:"assets/img/url.svg", 
        prefix:""
    }
} as const;