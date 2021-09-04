export const basePath = '/calendar';
export const calendarPath = `${basePath}/:viewType/:year/:month/:day`;
export const yearPath = `${basePath}/year/:year/:month/:day`;
export const halfPath = `${basePath}/half/:year/:month/:day`;
export const quarterPath = `${basePath}/quarter/:year/:month/:day`;
export const monthPath = `${basePath}/month/:year/:month/:day`;
export const weekPath = `${basePath}/week/:year/:month/:day`;
export const dayPath = `${basePath}/day/:year/:month/:day`;

export function makePathParams(viewType, dj) {
  return {
    day: dj.date(),
    month: dj.month() + 1,
    viewType: viewType.toLowerCase(),
    year: dj.year(),
  };
}
