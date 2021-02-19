import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Service to show notification.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public constructor(
    private readonly snackBar: MatSnackBar,
  ) {
  }

  /**
   * Show notification message
   * @param message text of the notification
   */
  public showMessage(message: string): void {
    this.snackBar.open(message, 'Close');
  }
}
