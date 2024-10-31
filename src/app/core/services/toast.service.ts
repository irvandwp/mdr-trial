import { Injectable } from '@angular/core';

interface Toast {
  message: string;
  type: 'success' | 'warning' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastContainer: HTMLElement;

  constructor() {
    this.toastContainer = document.createElement('div');
    this.toastContainer.className = 'toast-container';
    document.body.appendChild(this.toastContainer);
  }

  showToast(message: string, type: 'success' | 'warning' | 'error') {
    const toast: Toast = { message, type };
    this.createToast(toast);
  }

  private createToast(toast: Toast) {
    const toastElement = document.createElement('div');
    toastElement.className = `toast toast-${toast.type}`;
    toastElement.innerText = toast.message;

    this.toastContainer.appendChild(toastElement);

    setTimeout(() => {
      toastElement.remove();
    }, 3000);
  }
}
