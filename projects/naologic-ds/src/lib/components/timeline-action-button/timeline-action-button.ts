import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'nao-timeline-action-button',
  standalone: true,
  templateUrl: './timeline-action-button.html',
  styleUrl: './timeline-action-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.disabled]': 'disabled() || null',
    '(keydown.enter)': 'handleKeyDown($event)',
    '(keydown.space)': 'handleKeyDown($event)',
    '(click)': 'handleClick()',
    'role': 'button',
    'tabindex': '0',
  },
})
export class TimelineActionButton {
  // Inputs
  variant = input<ButtonVariant>('primary');
  disabled = input<boolean>(false);
  label = input.required<string>();
  ariaLabel = input<string>();

  // Outputs
  clicked = output<void>();

  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }

  handleKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if ((keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') && !this.disabled()) {
      event.preventDefault();
      this.clicked.emit();
    }
  }
}
