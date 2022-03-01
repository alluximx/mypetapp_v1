import {CommonActions, NavigationState} from '@react-navigation/native';
import _ from 'lodash';
import {VetSettings} from './types/models';

/**
 * Method used to add a screen before the current one.
 * If the screen already existed, before adding it, it
 * is removed from the stack.
 *
 * @param routeName Name of the route.
 * @param params Parameters of the route.
 * @returns CommonActions.Actiom
 */
export const insertBeforeLast = (routeName: string, params = {}) => (
  state: NavigationState,
) => {
  let existingScreenIndex = 0;
  // Check if the screen already exists and store it's position.
  const routeAlreadyExistsInNavigator = state.routes.some((route, index) => {
    const isTheSame = route.name === routeName;
    if (isTheSame) {
      existingScreenIndex = index;
    }
    return isTheSame;
  });

  const stackHistory = state.routes.slice(0, -1);

  // Remove the existing one.
  if (routeAlreadyExistsInNavigator) {
    stackHistory.splice(existingScreenIndex, 1);
  }
  // Add screen before the current one.
  const routes = [
    ...stackHistory,
    {name: routeName, params},
    state.routes[state.routes.length - 1],
  ];

  return CommonActions.reset({
    ...state,
    routes,
    index: routes.length - 1,
  });
};

export const checkIfDayIsEnabledInVetSettings = (
  index: number,
  settings: VetSettings,
): boolean => {
  if (!settings) {
    return false;
  }

  switch (index) {
    case 0:
      return settings.sunday;
    case 1:
      return settings.monday;
    case 2:
      return settings.tuesday;
    case 3:
      return settings.wednesday;
    case 4:
      return settings.thursday;
    case 5:
      return settings.friday;
    case 6:
      return settings.saturday;
    default:
      return false;
  }
};

export const formatPrice = (price: number): string => {
  return _.round(price, 2)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formats the services string to remove the price of the service.
 *
 * @param servicesString String with the list of services with
 * its price sepparated by a comma.
 * @returns Only the name of the services.
 */
export const formatServices = (servicesString: string): string => {
  return servicesString
    .split(/ - \$\S*/)
    .filter(Boolean)
    .join(', ');
};

/**
 * Removes a screen from the stack if already exists and then
 * navigates to it.
 *
 * @param routeName Name of the route.
 * @param params Parameters of the route.
 */
export const removeBeforeNavigation = (
  navigation,
  routeName: string,
  params: any,
) => {
  navigation.dispatch((state) => {
    // Remove the vet date route from the stack if already existed
    const routes = state.routes.filter((r) => r.name !== 'VetDate');

    return CommonActions.reset({
      ...state,
      routes: [
        ...routes,
        {
          name: routeName,
          params,
        },
      ],
      index: routes.length - 1,
    });
  });
};
