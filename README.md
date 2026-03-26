# My Full-Stack Monorepo Template

A modern, TypeScript-first monorepo template using `pnpm` workspaces and Turborepo.

## Project Structure

- `packages/client`: React TypeScript frontend powered by Vite.
- `packages/backend`: Node.js & Express API (ESM).
- `packages/shared`: Shared TypeScript types and utility functions.

## Getting Started

1. **Install dependencies:**
   Ensure you have [pnpm](https://pnpm.io/) installed, then run:
   ```bash
   pnpm install

## File Structure 

my-monorepo/
├── package.json               # Root package file for workspace-level scripts
├── pnpm-workspace.yaml        # Tells pnpm where your packages are located
├── tsconfig.base.json         # Base TypeScript config (ESM strict) shared across all apps
└── packages/
    ├── client/                # Your frontend application (e.g., React via Vite)
    │   ├── package.json       # Client-specific dependencies
    │   ├── tsconfig.json      # Extends tsconfig.base.json
    │   └── src/               # .ts and .tsx files
    │
    ├── backend/               # Your backend server (e.g., Node.js + Express)
    │   ├── package.json       # Backend-specific dependencies
    │   ├── tsconfig.json      # Extends tsconfig.base.json
    │   └── src/               # .ts files (using ES Module syntax)
    │
    └── shared/                # Code shared between client and backend
        ├── package.json       # Defines this as an internal package
        ├── tsconfig.json      # Extends tsconfig.base.json
        └── src/               # Shared interfaces, types, and utility functions
            └── index.ts       # Main export file for the shared module