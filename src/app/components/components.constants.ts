import { LinkTypes, ImageComp } from "./components.model";

export const contactIcon: Readonly<ImageComp> = {
    id: 'icon_contact',
    name: 'Contact',
    path: 'assets/img/contact.svg',
    alt: 'Contact icon'
};

export const addressIcon: Readonly<ImageComp> = {
    id: 'icon_address',
    name: 'Address',
    path: 'assets/img/location.svg',
    alt: 'Address icon'
};

export const githubIcon: Readonly<ImageComp> = {
    id: 'icon_github',
    name: 'Github',
    path: 'assets/img/github.svg',
    alt: 'Github icon'
};

export const mailIcon: Readonly<ImageComp> = {
    id: 'icon_mail',
    name: 'Email',
    path: 'assets/img/mail.svg',
    alt: 'Email icon'
};

export const phoneIcon: Readonly<ImageComp> = {
    id: 'icon_phone',
    name: 'Phone',
    path: 'assets/img/phone.svg',
    alt: 'Phone icon'
};

export const urlIcon: Readonly<ImageComp> = {
    id: 'icon_url',
    name: 'URL',
    path: 'assets/img/url.svg',
    alt: 'URL icon'
};

export const arrowIcon: Readonly<ImageComp> = {
    id: 'icon_arrow',
    name: 'Arrow',
    path: 'assets/img/arrow.svg',
    alt: 'Arrow icon'
};

export const personIcon: Readonly<ImageComp> = {
    id: 'icon_person',
    name: 'Person',
    path: 'assets/img/profile.svg',
    alt: 'Person icon'
};

export const workIcon: Readonly<ImageComp> = {
    id: 'icon_work',
    name: 'Workplace',
    path: 'assets/img/work.svg',
    alt: 'Workplace icon'
};

export const schoolIcon: Readonly<ImageComp> = {
    id: 'icon_school',
    name: 'School',
    path: 'assets/img/school.svg',
    alt: 'School icon'
};

export const heartIcon: Readonly<ImageComp> = {
    id: 'icon_heart',
    name: 'Heart',
    path: 'assets/img/heart.svg',
    alt: 'Heart icon'
};

export const globeIcon: Readonly<ImageComp> = {
    id: 'icon_globe',
    name: 'Globe',
    path: 'assets/img/globe.svg',
    alt: 'Globe icon'
};

export const imageIcon: Readonly<ImageComp> = {
    id: 'icon_image',
    name: 'Image',
    path: 'assets/img/image.svg',
    alt: 'Image icon'
};

export const paintIcon: Readonly<ImageComp> = {
    id: 'icon_paint',
    name: 'Paint',
    path: 'assets/img/paint.svg',
    alt: 'Paint icon'
};

export const smileIcon: Readonly<ImageComp> = {
    id: 'icon_smile',
    name: 'Smile',
    path: 'assets/img/smile.svg',
    alt: 'Smile icon'
};

export const codeIcon: Readonly<ImageComp> = {
    id: 'icon_code',
    name: 'Code',
    path: 'assets/img/code.svg',
    alt: 'Code icon'
};


export const linkTypes: Readonly<LinkTypes> = {
    GITHUB: {
        id: "linkType_github",
        name: "github",
        image: githubIcon,
        prefix: ""
    },
    MAIL: {
        id: "linkType_mail",
        name: "mail",
        image: mailIcon,
        prefix: "mailto:"
    },
    PHONE: {
        id: "linkType_phone",
        name: "phone",
        image: phoneIcon,
        prefix: "tel:"
    },
    URL: {
        id: "linkType_url",
        name: "url",
        image: urlIcon,
        prefix: ""
    },
    PERSON: {
        id: "linkType_person",
        name: "person",
        image: personIcon,
        prefix: ""
    },
    MAP: {
        id: "linkType_map",
        name: "map",
        image: addressIcon,
        prefix: "https://www.google.com/maps/search/?api=1&query="
    },
    OTHER: {
        id: "linkType_other",
        name: "other",
        image: urlIcon,
        prefix: ""
    }
} as const;
