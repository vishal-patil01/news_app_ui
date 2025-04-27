import 'zone.js'; // Import Zone.js
import 'zone.js/testing'; // Import Zone.js testing utilities
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Load all the .spec.ts files for the tests.
declare const require: any;
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
