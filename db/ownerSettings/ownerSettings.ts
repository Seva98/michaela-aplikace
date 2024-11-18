type Theme = 'default';
export type OwnerMenuItem = { title: string; href: string };

export type OwnerSettings = {
  owner_id: number;
  title?: string;
  menu?: OwnerMenuItem[];
  theme?: Theme;
  logo?: string;
};
