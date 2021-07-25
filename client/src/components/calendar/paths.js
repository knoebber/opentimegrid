export const basePath = '/calendar';
export const yearPath = `${basePath}/year/:year/:month/:day`;
export const monthPath = `${basePath}/month/:year/:month/:day`;
export const weekPath = `${basePath}/week/:year/:month/:day`;
export const dayPath = `${basePath}/day/:year/:month/:day`;

export function makePathParams(dj) {
  return {
    year: dj.year(),
    month: dj.month() + 1,
    day: dj.date(),
  };
}
