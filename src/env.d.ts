/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    /** Set by the report page so figure components know which report's data to load. */
    report?: { id: string; source: string };
  }
}
