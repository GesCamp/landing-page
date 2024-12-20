import { inject, Injectable } from '@angular/core';

import { SnackBarsColors } from './enums';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarInfoDto } from './dtos';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  show({
    body,
    color = SnackBarsColors.SUCCESS,
    delay = 5000,
  }: SnackBarInfoDto) {
    this.snackBar.open(body, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [color, 'mat-snack-bar-container'],
      duration: delay,
    });
  }

  clear() {
    this.snackBar.dismiss();
  }
}
