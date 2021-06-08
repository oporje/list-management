import { ListItemConfig } from './list-item';

export interface SectionConfig {
  name: string;
  tplName: string;
  id: string;
  type: string;
  data: Array<ListItemConfig>
}
