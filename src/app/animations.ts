import { AnimationEntryMetadata, trigger, state, style, transition, animate } from "@angular/core";

export const routerAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        display: 'block',
        position: 'absolute',
        transform: 'translateX(-20%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition(':leave', [
      animate('0.1s ease-out', style({
        opacity: 0,
        transform: 'translateX(50%)'
      }))
    ])
  ]);