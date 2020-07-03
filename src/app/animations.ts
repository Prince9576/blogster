import { trigger, transition, style, query, animateChild, group, animate } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
      transition('* <=> *', [
          query(':enter, :leave', [
              style({
                  position: 'absolute',
                  left: '-100%',
                  width: '100%',
                  opacity: 0,
              })
          ], { optional: true }),
          query(':enter', [
              animate('600ms ease', 
                style({
                    opacity: 1, left: 0
                })
              )
          ], { optional: true })
      ])
  ])