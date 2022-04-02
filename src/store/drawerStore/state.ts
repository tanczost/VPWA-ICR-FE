export interface DrawerStateInterface {
  leftDrawerOpened: boolean;
  rightDrawerOpened: boolean;
}

function state(): DrawerStateInterface {
  return {
    leftDrawerOpened: false,
    rightDrawerOpened: false,
  };
}

export default state;
