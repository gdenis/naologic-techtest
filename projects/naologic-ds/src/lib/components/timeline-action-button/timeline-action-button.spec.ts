import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineActionButton } from './timeline-action-button';

/// <reference types="@angular/localize" />

describe('TimelineActionButton', () => {
  let component: TimelineActionButton;
  let fixture: ComponentFixture<TimelineActionButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineActionButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineActionButton);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Button'); // Set required input
  });

  // describe('initialization', () => {
  //   it('should create', () => {
  //     expect(component).toBeTruthy();
  //   });
  // });

  describe('inputs', () => {
    it('should have default variant as primary', () => {
      expect(component.variant()).toBe('primary');
    });

    it('should have default disabled as false', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should accept variant input', async () => {
      fixture.componentRef.setInput('variant', 'secondary');
      await fixture.whenStable();
      expect(component.variant()).toBe('secondary');
    });

    it('should accept disabled input', async () => {
      fixture.componentRef.setInput('disabled', true);
      await fixture.whenStable();
      expect(component.disabled()).toBe(true);
    });

    it('should accept label input', async () => {
      fixture.componentRef.setInput('label', 'Test Button');
      await fixture.whenStable();
      expect(component.label()).toBe('Test Button');
    });

    it('should accept ariaLabel input', async () => {
      fixture.componentRef.setInput('ariaLabel', 'Test aria label');
      await fixture.whenStable();
      expect(component.ariaLabel()).toBe('Test aria label');
    });
  });

  describe('outputs', () => {
    it('should emit clicked when handleClick is called and not disabled', async () => {
      vi.spyOn(component.clicked, 'emit');
      fixture.componentRef.setInput('disabled', false);
      await fixture.whenStable();
      component.handleClick();
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it('should not emit clicked when handleClick is called and disabled', async () => {
      vi.spyOn(component.clicked, 'emit');
      fixture.componentRef.setInput('disabled', true);
      await fixture.whenStable();
      component.handleClick();
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });

    it('should emit clicked when Enter key is pressed and not disabled', async () => {
      vi.spyOn(component.clicked, 'emit');

      fixture.componentRef.setInput('disabled', false);
      await fixture.whenStable();
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeyDown(event);
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it('should emit clicked when Space key is pressed and not disabled', async () => {
      vi.spyOn(component.clicked, 'emit');
      fixture.componentRef.setInput('disabled', false);
      await fixture.whenStable();
      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.handleKeyDown(event);
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it('should not emit clicked when Enter key is pressed and disabled', async () => {
      vi.spyOn(component.clicked, 'emit');
      fixture.componentRef.setInput('disabled', true);
      await fixture.whenStable();
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeyDown(event);
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });

    it('should prevent default on Enter key', async () => {
      fixture.componentRef.setInput('disabled', false);
      await fixture.whenStable();
      const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
      vi.spyOn(event, 'preventDefault');
      component.handleKeyDown(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should prevent default on Space key', async () => {
      fixture.componentRef.setInput('disabled', false);
      await fixture.whenStable();
      const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true });
      vi.spyOn(event, 'preventDefault');
      component.handleKeyDown(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('host bindings', () => {
    it('should set aria-label when ariaLabel is provided', async () => {
      fixture.componentRef.setInput('ariaLabel', 'Test aria label');
      await fixture.whenStable();
      const element = fixture.nativeElement;
      expect(element.getAttribute('aria-label')).toBe('Test aria label');
    });

    it('should set disabled attribute when disabled is true', async () => {
      fixture.componentRef.setInput('disabled', true);
      await fixture.whenStable();
      const element = fixture.nativeElement;
      expect(element.getAttribute('disabled')).toBe('true');
    });

    it('should not set disabled attribute when disabled is false', async () => {
      fixture.componentRef.setInput('disabled', false);
      await fixture.whenStable();
      const element = fixture.nativeElement;
      expect(element.getAttribute('disabled')).toBeNull();
    });

    it('should have role button', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.getAttribute('role')).toBe('button');
    });

    it('should have tabindex 0', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement;
      expect(element.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('template', () => {
    it('should display the label text', async () => {
      fixture.componentRef.setInput('label', 'Test Button');
      await fixture.whenStable();
      const element = fixture.nativeElement;
      expect(element.textContent.trim()).toBe('Test Button');
    });
  });
});
