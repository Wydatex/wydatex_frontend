import {
  animate,
  style,
  transition,
  trigger,
  sequence,
  state,
  animation,
  useAnimation,
  query,
  animateChild,
  group
} from '@angular/animations';

export enum SidebarState {
  Docked = 'docked',
  Hidden = 'hidden',
  Over = 'over'
}

const slideIn = animation(animate('0.3s ease-out'));
const slideOut = animation(animate('0.3s ease-in'));

export const sidebarAnimations = trigger('sidebarToggle', [
  state(
    SidebarState.Docked,
    style({
      transform: 'translateX(0)'
    })
  ),
  state(
    SidebarState.Hidden,
    style({
      transform: 'translateX(-100%)'
    })
  ),
  state(
    SidebarState.Over,
    style({
      transform: 'translateX(0)'
    })
  ),
  transition(`* => ${SidebarState.Hidden}`, useAnimation(slideOut)),
  transition(`${SidebarState.Hidden} => *`, useAnimation(slideIn))
]);

export const mainContentAnimations = trigger('mainContentToggle', [
  state(
    SidebarState.Docked,
    style({
      marginLeft: 'var(--sidebar-width)'
    })
  ),
  state(
    SidebarState.Hidden,
    style({
      marginLeft: 0
    })
  ),
  state(
    SidebarState.Over,
    style({
      marginLeft: 0
    })
  ),
  transition(`${SidebarState.Docked} => *`, useAnimation(slideOut)),
  transition(`* => ${SidebarState.Docked}`, useAnimation(slideIn))
]);

export const headerAnimations = trigger('headerToggle', [
  state(
    'true',
    style({
      height: 'var(--header-height-small)'
    })
  ),
  state(
    'false',
    style({
      height: 'var(--header-height-large)'
    })
  ),
  transition('* => *', group([query('@fadeToggle', animateChild()), animate('0.1s 0.3s ease')]))
]);

const defaultFadeParams = {
  delay: '0s',
  display: 'block'
};

export const fadeAnimation = trigger('fadeToggle', [
  state(
    'true',
    style({
      opacity: '1',
      display: '{{display}}'
    }),
    {
      params: defaultFadeParams
    }
  ),
  state(
    'false',
    style({
      opacity: 0,
      display: 'none'
    })
  ),
  transition(
    'false => true',
    sequence([animate('0s {{delay}}', style({display: '{{display}}'})), animate('0.2s ease-in', style({opacity: '1'}))]),
    {
      params: defaultFadeParams
    }
  ),
  transition('true => false', sequence([animate('0.2s {{delay}} ease-out', style({opacity: 0})), style({display: '{{display}}'})]), {
    params: defaultFadeParams
  })
]);
