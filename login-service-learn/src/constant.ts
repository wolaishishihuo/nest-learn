export const role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;
export type Role = (typeof role)[keyof typeof role];
export const roleList = Object.values(role);
