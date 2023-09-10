import { trigger, transition, style, query, group, animate, animateChild, sequence, stagger } from "@angular/animations";

const pxSize = '50px'
const slow = '0.5s';
const normal = '0.3s'
const faster = '0.25s'
const fast = '0.2s'

export const slideLeft = [
    query(':enter, :leave',
        style({ position: 'fixed' }),
        { optional: true }),
    group([
        query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate(`${slow} ease-in-out`,
                style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate(`${slow} ease-in-out`,
                style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
    ])
]

export const slideRight = [
    query(':enter, :leave',
        style({ position: 'fixed' }),
        { optional: true }),
    group([
        query(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate(`${slow} ease-in-out`,
                style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate(`${slow} ease-in-out`,
                style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
    ])
]

export const DropDownAnimation = trigger("dropDownMenu", [
    transition(":enter", [
        style({ height: 0, overflow: "hidden" }),
        query(".menu-item", [
            style({ opacity: 0, transform: `translateY(-${pxSize})` })
        ]),
        sequence([
            animate(faster, style({ height: "*" })),
            query(".menu-item", [
                stagger(-10, [
                    animate(`${normal} ease-in-out`, style({ opacity: 1, transform: "none" }))
                ])
            ])
        ])
    ]),

    transition(":leave", [
        style({ height: "*", overflow: "hidden" }),
        query(".menu-item", [style({ opacity: 1, transform: "none" })]),
        sequence([
            query(".menu-item", [
                stagger(5, [
                    animate(
                        `${fast} ease-in-out`,
                        style({ opacity: 0, transform: `translateY(-${pxSize})` })
                    )
                ])
            ]),
            animate(fast, style({ height: 0 }))
        ])
    ])
]);

export const LeftToRightAnimation = trigger("leftToRight", [
    transition(":enter", [
        style({ height: 0 }),
        query(".menu-item", [
            style({ opacity: 0, transform: 'translateX(-100%)' }),
        ]),
        sequence([
            animate(normal, style({ height: "*" })),
            query(".menu-item", [
                stagger(30, [
                    animate(`${normal} ease-in-out`, style({ opacity: 1, transform: 'translateX(0%)' }))
                ])
            ])
        ])
    ]),

    transition(":leave", [
        style({ height: "*" }),
        query(".menu-item", [style({ opacity: 1, transform: "none" })]),
        sequence([
            query(".menu-item", [
                stagger(-20, [
                    animate(
                        `${fast} ease-in-out`,
                        style({ opacity: 0, transform: "translateX(100%)" })
                    )
                ])
            ]),
            animate(fast, style({ height: 0 }))
        ])
    ])
]);

export const LeftToRightAnimationIncrement = trigger("leftToRightIncrement", [
    transition(":increment", [
        //style({ height: "*" }),
        query(":enter", [
            style({ opacity: 0, transform: 'translateX(-100%)' }),
        ]),
        sequence([
            //animate(fast, style({ height: "*" })),
            query(":enter", [
                stagger(10, [
                    animate(`${normal} ease-in-out`, style({ opacity: 1, transform: 'translateX(0%)' }))
                ])
            ])
        ])
    ]),

    transition(":decrement", [
        //style({ height: "*" }),
        query(":leave", [style({ opacity: 1, transform: "none" })]),
        sequence([
            query(":leave", [
                stagger(10, [
                    animate(
                        `${normal} ease-in-out`,
                        style({ opacity: 0, transform: "translateX(100%)" })
                    )
                ])
            ]),
            //animate(fast, style({ height: "*" }))
        ])
    ])
]);

export const SlideLeftAnimation = trigger('slideLeftAnimation', [
    transition(":enter", [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(`${slow} ease-in-out`, style({ opacity: 1, transform: 'translateX(0%)' }))
    ]),
    transition(":leave", [
        style({ opacity: 1, transform: "none" }),
        animate(`${slow} ease-in-out`, style({ opacity: 0, transform: "translateX(100%)" }))
    ])
])

export const FadeAnimation = trigger('fadeAnimation', [
    transition(":enter", [
        style({ opacity: 0 }),
        animate(`${fast} ease-in-out`, style({ opacity: 1 }))
    ]),
    transition(":leave", [
        style({ opacity: 1, transform: "none" }),
        animate(`${fast} ease-in-out`, style({ opacity: 0 }))
    ])
])

export const TooltipAnimation = trigger('tooltipAnimation', [
    transition("void => top", [
        style({ opacity: 0, height: 0, overflow: 'hidden', transform: `translateY(-${pxSize})` }),
        animate(`${normal} ease-in-out`, style({ opacity: 1, height: '*', transform: 'translateY(0%)' }))
    ]),
    transition("void => bottom", [
        style({ opacity: 0, height: 0, overflow: 'hidden', transform: `translateY(${pxSize})` }),
        animate(`${normal} ease-in-out`, style({ opacity: 1, height: '*', transform: 'translateY(0%)' }))
    ]),
    transition("void => left", [
        style({ opacity: 0, width: 0, overflow: 'hidden', transform: `translateX(-${pxSize})` }),
        animate(`${normal} ease-in-out`, style({ opacity: 1, width: '*', transform: "translateX(0%)" }))
    ]),
    transition("void => right", [
        style({ opacity: 0, width: 0, overflow: 'hidden', transform: `translateX(${pxSize})` }),
        animate(`${normal} ease-in-out`, style({ opacity: 1, width: '*', transform: "translateX(0%)" }))
    ]),
    transition("top => void", [
        style({ opacity: 1, overflow: 'hidden', height: "*", transform: 'translateY(0%)' }),
        animate(`${fast} ease-in-out`, style({ opacity: 0, height: 0, transform: `translateY(-${pxSize})` }))
    ]),
    transition("bottom => void", [
        style({ opacity: 1, overflow: 'hidden', height: "*", transform: 'translateY(0%)' }),
        animate(`${fast} ease-in-out`, style({ opacity: 0, height: 0, transform: `translateY(${pxSize})` }))
    ]),
    transition("left => void", [
        style({ opacity: 1, overflow: 'hidden', width: "*", transform: 'translateX(0%)' }),
        animate(`${fast} ease-in-out`, style({ opacity: 0, width: 0, transform: `translateX(-${pxSize})` }))
    ]),
    transition("right => void", [
        style({ opacity: 1, overflow: 'hidden', width: "*", transform: 'translateX(0%)' }),
        animate(`${fast} ease-in-out`, style({ opacity: 0, width: 0, transform: `translateX(${pxSize})` }))
    ]),
])

export const CarouselAnimation = trigger('carouselAnimation', [
    transition("void => left", [
        style({ opacity: 0, transform: `translateX(-100%)` }),
        animate(`${slow} ease-in-out`, style({ opacity: 1, transform: "translateX(0%)" }))
    ]),
    transition("void => right", [
        style({ opacity: 0, transform: `translateX(100%)` }),
        animate(`${slow} ease-in-out`, style({ opacity: 1, transform: "translateX(0%)" }))
    ]),
    transition("left => void", [
        style({ opacity: 1, transform: 'translateX(0%)' }),
        animate(`${slow} ease-in-out`, style({ opacity: 0, transform: `translateX(100%)` }))
    ]),
    transition("right => void", [
        style({ opacity: 1, transform: 'translateX(0%)' }),
        animate(`${slow} ease-in-out`, style({ opacity: 0, transform: `translateX(-100%)` }))
    ]),
])

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* => ProjectsPage', slideLeft),
        transition('* => HomePage', slideRight),
        transition('HomePage => *', slideLeft),
        transition('ProjectsPage => *', slideRight),
        transition('* => ErrorPage', DropDownAnimation)
    ]);