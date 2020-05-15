import {BREAKPOINT, BreakPoint} from '@angular/flex-layout';

const MOBILE_BREAKPOINTS: BreakPoint[] = [
  {
    alias: 'mob',
    suffix: 'Mob',
    mediaQuery: 'screen and (max-width: 849px)',
    overlapping: false
  },
  {
    alias: 'gt-mob',
    suffix: 'GtMob',
    mediaQuery: 'screen and (min-width: 850px)',
    overlapping: false
  }
];

export const MobileBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: MOBILE_BREAKPOINTS,
  multi: true
};
