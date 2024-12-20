import { SnackBarsColors } from '../enums';

export type SnackBarInfoDto = Readonly<{
  body: string;
  delay?: number;
  color?: SnackBarsColors;
}>;
