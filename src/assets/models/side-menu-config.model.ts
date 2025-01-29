export interface SideMenuConfigModel {
  title: string;
  links: link[];
}

interface link {
  icon: string;
  title: string;
  miniTitles: string[];
}
