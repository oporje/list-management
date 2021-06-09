import { ListItemConfig } from './list-item';
import { ListActions } from './list-action';
export interface SectionConfig {
  name: string;
  tplName: string;
  id: string | number;
  type: string;
  data: Array<ListItemConfig> | Array<ListActions>;
}
