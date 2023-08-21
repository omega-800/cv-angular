import { LinkTypes } from './components.model';
import { githubIcon, mailIcon, phoneIcon, urlIcon, personIcon, addressIcon } from './icons.constants';

export const loginMessage =
  'Dieser Inhalt ist nur für eingeloggte User sichtbar';
export const authMessage = 'Verifiziere deine Email um diesen Inhalt zu sehen';

export enum Direction {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export interface ScreenVars {
  [name: string]: {
    breakpoint: number;
    wrapper: number;
    tooltipWidth: number;
  }
}

export const screenVariables: ScreenVars = {
  mobile: {
    breakpoint: 480,
    wrapper: 90,
    tooltipWidth: 80
  },
  tablet: {
    breakpoint: 768,
    wrapper: 90 / 1.2,
    tooltipWidth: 70
  },
  laptop: {
    breakpoint: 1024,
    wrapper: 90 / 1.3,
    tooltipWidth: 60
  },
  desktop: {
    breakpoint: 1200,
    wrapper: 90 / 1.5,
    tooltipWidth: 50
  },
  large: {
    breakpoint: 99999,
    wrapper: 90 / 1.7,
    tooltipWidth: 30
  },
} as const

export const linkTypes: Readonly<LinkTypes> = {
  GITHUB: {
    id: 'linkType_github',
    name: 'github',
    image: githubIcon,
    prefix: '',
  },
  MAIL: {
    id: 'linkType_mail',
    name: 'mail',
    image: mailIcon,
    prefix: 'mailto:',
  },
  PHONE: {
    id: 'linkType_phone',
    name: 'phone',
    image: phoneIcon,
    prefix: 'tel:',
  },
  URL: {
    id: 'linkType_url',
    name: 'url',
    image: urlIcon,
    prefix: '',
  },
  PERSON: {
    id: 'linkType_person',
    name: 'person',
    image: personIcon,
    prefix: '',
  },
  MAP: {
    id: 'linkType_map',
    name: 'map',
    image: addressIcon,
    prefix: 'https://www.google.com/maps/search/?api=1&query=',
  },
  OTHER: {
    id: 'linkType_other',
    name: 'other',
    image: urlIcon,
    prefix: '',
  },
} as const;
