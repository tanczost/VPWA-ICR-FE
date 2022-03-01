export interface CountStateInterface {
  count: number;
}

function state(): CountStateInterface {
  return {
    count: 0,
  };
}

export default state;
