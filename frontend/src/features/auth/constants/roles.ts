export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    AUTHORITY: 'authority',
    VERIFIED_USER: 'verified_user',
} as const;

export const ROLE_NAMES = Object.values(ROLES);

export type Roles = typeof ROLES[keyof typeof ROLES];