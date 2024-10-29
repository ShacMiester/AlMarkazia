import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpInterceptorFn, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
const appInterceptors: HttpInterceptorFn[] = [];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideClientHydration(), provideHttpClient(withFetch(), withInterceptorsFromDi(), withInterceptors(appInterceptors)),]
};


