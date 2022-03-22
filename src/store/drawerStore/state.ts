export interface DrawerStateInterface {
  leftDrawerOpened: boolean;
  rightDrawerOpened: boolean;
}

function state(): DrawerStateInterface {
  return {
    leftDrawerOpened: true,
    rightDrawerOpened: true,
  };
}

export default state;
