import {CommonActions, NavigationState} from '@react-navigation/native';

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
