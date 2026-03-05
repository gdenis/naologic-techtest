import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NaologicDs } from 'naologic-ds';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NaologicDs],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('naologic-techtest');
}
