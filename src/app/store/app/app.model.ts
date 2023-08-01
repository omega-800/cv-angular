import { codeIcon, globeIcon, heartIcon, paintIcon, smileIcon } from "src/app/components/components.constants"
import { ImageComp } from "src/app/components/components.model"

export enum Interest {
    IT = 'it',
    ART = 'art',
    HEALTH = 'health',
    EDUCATION = 'education',
    GENERAL = 'general'
}

export interface InterestType {
    type: Interest,
    name: string,
    icon: ImageComp
}

export const interestTypes: Readonly<InterestType[]> = [
    {
        type: Interest.IT,
        name: 'Informatik',
        icon: codeIcon
    },
    {
        type: Interest.ART,
        name: 'Kunst',
        icon: paintIcon
    },
    {
        type: Interest.HEALTH,
        name: 'Gesundheit',
        icon: smileIcon
    },
    {
        type: Interest.EDUCATION,
        name: 'Pädagogik',
        icon: heartIcon
    },
    {
        type: Interest.GENERAL,
        name: 'Allgemein',
        icon: globeIcon
    }
]

export enum Language {
    RU = 'ru',
    DE = 'de',
    EN = 'en',
    FR = 'fr',
}