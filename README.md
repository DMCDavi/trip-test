# React + TypeScript + Vite

## Project Purpose

This is a testing project created to validate AI capabilities in producing long and complex code. The app focuses on organizing things related to travel, and the MVP is a single page to organize luggage for a trip.

## MVP Scope

- Single page UI that lets users add items, choose a category, and assign them to one of three buckets: keep, give away, take away.
- No external API; all data lives in local state.

## TDD Notes

- Behavior is driven by tests under `src/__tests__/`.
- Run `npm run test` for the watch runner or `npm run test:coverage` for coverage checks.

## MVP Implementation Map

- Page: `src/pages/LuggagePage.tsx`
- Packing module: `src/modules/packing/`
- State store: `src/modules/packing/stores/packing.store.ts`

## Tech Stack

- React 18
- TypeScript
- Vite
- Style: Tailwind, Radix UI, Material UI, Lucide React
- Routing: React Router Dom 
- API: Axios, TanStack Query
- Store: Zustand
- Database: SQLite
- Testing: Vitest, React Testing Library
- Linting: ESLint, Prettier
- Git Hooks: Husky (pre-commit, pre-push)

## Folder structure and responsibilities

```text
move-center-app/
├── templates/
└── src/
    ├── __tests__/
    │   ├── unit/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── modules/
    │   │   └── utils/
    │   ├── integration/
    │   └── e2e/
    ├── assets/
    │   ├── fonts/
    │   └── images/
    ├── config/
    │   ├── environment.ts
    │   └── maintenance.ts
    ├── pages/
    │   └── ExamplePage.tsx
    ├── modules/
    │   └── first-module/
    │       ├── api/
    │       ├── components/
    │       │   ├── atoms/
    │       │   ├── molecules/
    │       │   └── organisms/
    │       ├── hooks/
    │       ├── models/
    │       ├── stores/
    │       └── utils/
    └── shared/
        ├── components/
        │   ├── atoms/
        │   ├── molecules/
        │   └── organisms/
        ├── constants.ts
        ├── context/
        ├── hooks/
        ├── lib/
        ├── models/
        │   ├── enums/
        │   ├── payloads/
        │   ├── proxies/
        │   └── types/
        ├── routes/
        ├── stores/
        └── utils/
```

### Top-level folders

- templates/
  - Folder templates to generate modules using a script.

- src/
  - Application source code root. Everything below follows a modular approach with a shared design system.

### Testing (__tests__/)

Centralized test directory mirroring the source structure.

- __tests__/unit/
  - Unit tests for isolated functions, hooks, and components.
  - Organized by category: components/, hooks/, modules/, utils/.
  - Each test file should be named `*.test.ts` or `*.test.tsx`.

- __tests__/integration/
  - Integration tests that verify multiple units working together.
  - Test service interactions, store integrations, and component compositions.

- __tests__/e2e/
  - End-to-end tests simulating real user flows.
  - Use Playwright or Cypress for browser-based testing.

### Configuration (config/)

- config/environment.ts
  - Typed accessors for environment variables (Vite import.meta.env).

- config/maintenance.ts
  - Maintenance mode flags and configuration.

### Pages (pages/)

- Route-level components that compose modules and shared components.
- A page can import from multiple modules, acting as the orchestration layer.
- Examples: DashboardPage.tsx, UserProfilePage.tsx, SettingsPage.tsx.
- Pages should be thin: delegate logic to modules, hooks, and services.

### Modules (modules/)

Feature domain modules. Each module owns its UI components, state, and logic, minimizing cross-module coupling. Modules are imported by pages and can use shared components.

- modules/first-module/
  - A concrete example of a feature module.

  - api/
    - Module-specific API functions (CRUD operations, data fetching).
    - Internally call the global shared/lib/api layer.
    - Example: firstModule.api.ts

  - components/
    - UI parts specific to this module, following atomic design.

    - components/atoms/
      - Module-specific atomic components (specialized buttons, inputs, badges).

    - components/molecules/
      - Module-specific compositions of atoms (form fields, action bars).

    - components/organisms/
      - Module-specific complex compositions (forms, panels, cards).

  - hooks/
    - React hooks encapsulating module-specific behavior.
    - Example: useFirstModule.ts, useFirstModuleList.ts, useCreateFirstModuleItem.ts.

  - stores/
    - State management for the module (Zustand stores).
    - Keep module-specific state isolated here.
    - Example: firstModule.store.ts

  - models/
    - TypeScript types, interfaces, proxies, and payloads specific to the module.
    - Example: firstModule.proxy.ts, create-first-module.payload.ts

  - utils/
    - Utility functions specific to this module.
    - Example: firstModule.utils.ts

### Assets (assets/)

Static files that are bundled or referenced by the app.

- assets/fonts/
  - Custom font files and related declarations.

- assets/images/
  - Static images, icons, and illustrations.

### Shared (shared/)

Everything that is reusable across modules and pages. This is the app-wide library.

- shared/components/
  - Shared, app-wide UI library following Atomic Design.

  - shared/components/atoms/
    - Small, reusable, and presentation-only building blocks (buttons, inputs, badges, icons).
    - No business logic; accept props; style via CSS/Tailwind as preferred.

  - shared/components/molecules/
    - Compositions of atoms that encapsulate a small piece of behavior (input + label + error, dropdown with search).
    - Still generic enough to be reused across modules.

  - shared/components/organisms/
    - Higher-level compositions of molecules/atoms that form meaningful sections (headers, footers, navigation bars).

- shared/constants.ts
  - Application-wide constants.
  - Includes primitive constants, and freeze-safe objects (date formats, timeouts, route names).

- shared/context/
  - Global React Context providers and consumers.
  - For app-wide state that needs to be shared (auth, theme, notifications).

- shared/hooks/
  - Global React hooks that are reusable across the application.
  - Examples: useDebounce.ts, useLocalStorage.ts, useMediaQuery.ts.

- shared/lib/
  - Third-party library wrappers and configurations.
  - Custom utilities that wrap external dependencies.
  - Examples: axios instance setup, date-fns helpers, validation schemas.

- shared/models/
  - Shared domain modeling, DTO mapping layer, enums, and type definitions.

  - shared/models/enums/
    - Enum-like constructs and TypeScript enums for well-known sets (roles, statuses, feature flags).

  - shared/models/payloads/
    - Request TypeScript types that match backend contracts (DTOs).

  - shared/models/proxies/
    - Response TypeScript types that match backend contracts (DTOs).

  - shared/models/types/
    - Shared TypeScript types and interfaces used across multiple modules or app-wide.
    - Include utility types, common interfaces, and type definitions not tied to backend contracts.

- shared/routes/
  - Route definitions and navigation utilities.
  - Centralized route constants and route configuration.
  - Example: routes.ts with all route paths, RouteGuard.tsx for protected routes.

- shared/lib/api
  - Low-level HTTP layer and API clients.
  - Axios/fetch setup, interceptors, request factories.

- shared/stores/
  - Global state management (Zustand stores).
  - App-wide stores that are shared across modules (user store, settings store).

- shared/utils/
  - Global, pure utility functions not tied to any domain (dates, numbers, strings, general-purpose helpers).
  - If a util is domain- or module-specific, keep it inside that module instead.

### Atomic Design Hierarchy

```
Atoms → Molecules → Organisms → Pages
```

### API & Data Layer Architecture

The most scalable pattern is:

```
UI → Hooks → Service Layer → API
```

### Recommended Architecture Blueprint

```
                   +-----------------------+
                   |       UI Layer        |
                   |  Components / Pages   |
                   +-----------+-----------+
                               |
                               v
                    +---------------------+
                    |     Hooks Layer     |
                    | (useAuth, useUser)  |
                    +-----------+---------+
                                |
                                v
                   +------------------------+
                   |   Service Layer        |
                   | API calls, Business    |
                   |     logic              |
                   +-----------+------------+
                               |
                               v
                     +-------------------+
                     |  Data Layer       |
                     | React Query/Redux |
                     +-------------------+
```

### Application Flow

![Application Flow](./assets/images/application-flow.png)

The diagram above illustrates how the application is structured:

- **shared/** - Contains reusable building blocks (components, hooks, lib, types, utils) that are consumed by the entire application
- **modules/** (features) - Domain-specific modules (e.g., comments, discussions, teams) that use shared resources
- **application** - The main app that composes modules and shared resources together

### Performance Architecture

Include:

- `React.memo()` - Prevent unnecessary re-renders
- `useMemo()` and `useCallback()` - Memoize expensive computations and callbacks
- Lazy loading - Load components on demand
- Code splitting - Split bundles for faster initial load
- List virtualization - Efficiently render large lists

### State Management Decision Rule

| Scenario | Solution |
|----------|----------|
| Many components need the data | Global state (Zustand) |
| Only one component needs the data | Local state |
| Data comes from API | TanStack Query, not Redux |

### Architecture Enforcement (ESLint)

The architecture is enforced via ESLint `import/no-restricted-paths` rule:

```
pages ──────► modules ──────► shared
  │              │               │
  │              │               ▼
  │              │           (independent)
  │              ▼
  │          can import from shared
  ▼
can import from modules & shared
```

**Rules:**
- `modules/` cannot import from `pages/`
- `shared/` cannot import from `modules/` or `pages/`
- `pages/` can import from both `modules/` and `shared/`
- `modules/` can import from `shared/`

### How layers interact (at a glance)

- Pages orchestrate modules, composing them together to create full views.
- Modules contain domain-specific logic, components (following atomic design), hooks, services, and stores.
- Shared provides the foundational building blocks: components, services, hooks, stores, and utilities.
- UI builds up from atoms → molecules → organisms, both in shared and within modules.
- Module hooks call shared/lib/api for HTTP communication; they map transport payloads using shared/models/.
- config/ provides environment and maintenance settings, while shared/ provides all cross-cutting concerns.

### When to put things where

- Pages that compose multiple modules: pages/.
- Shared presentational UI: shared/components/atoms, shared/components/molecules, shared/components/organisms.
- Domain-specific UI: modules/<module>/components/atoms, molecules, organisms.
- Domain-specific logic/state: modules/<module> (api/, hooks/, models/, stores/, utils/).
- HTTP layer and API setup: shared/lib/api.
- Third-party wrappers: shared/lib/.
- Transport and mapping: shared/models/payloads (request DTOs), shared/models/proxies (response DTOs).
- App-wide configuration: config/.
- App-wide constants: shared/constants.ts.
- Global hooks: shared/hooks/.
- Global stores: shared/stores/.
- Global context: shared/context/.
- Route definitions: shared/routes/.
- Truly generic helpers: shared/utils/.
- Shared types not tied to backend contracts: shared/models/types/.
- Tests: __tests__/unit, __tests__/integration, __tests__/e2e.

## Testing Architecture

### Test Organization

Tests are organized in the `__tests__/` directory, mirroring the source structure:

```text
__tests__/
├── unit/
│   ├── components/
│   │   └── Button.test.tsx
│   ├── hooks/
│   │   └── useDebounce.test.ts
│   ├── modules/
│   │   └── first-module/
│   │       └── services.test.ts
│   └── utils/
│       └── formatDate.test.ts
├── integration/
│   └── UserFlow.test.tsx
└── e2e/
    └── login.spec.ts
```

### Testing Guidelines

**Unit Tests:**
- Test components in isolation using React Testing Library.
- Test hooks using `@testing-library/react-hooks` or `renderHook`.
- Test utility functions with pure input/output assertions.
- Mock external dependencies (API calls, stores).

**Integration Tests:**
- Test multiple units working together.
- Verify store updates trigger correct component re-renders.
- Test service interactions with mocked API responses.

**E2E Tests:**
- Simulate real user journeys.
- Test critical paths: authentication, main workflows.
- Run against a test environment or mock server.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## Naming Conventions & Coding Standards

Consistency matters.

### Naming

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | useCamelCase | `useUserProfile.ts` |
| Functions | camelCase | `formatDate()` |
| Global state slices | camelCase | `userStore.ts` |
| Files | Match exported component | `UserProfile.tsx` exports `UserProfile` |
| Directories | kebab-case | `user-profile/` |
| Types/Interfaces | PascalCase | `User`, `AuthResponse` |
| Enums | PascalCase with UPPER_CASE members | `UserRole.ADMIN` |
| Module store | camelCase with suffix | `userProfile.store.ts` |

## Template Usage

### Generate a New Module

```bash
# Generate a complete module
npm run generate

# Select 'module' when prompted
# Enter the module name (e.g., "user-profile", "dashboard-analytics")
```

**Module template includes:**
- `api/` - API functions (CRUD operations)
- `hooks/` - TanStack Query hooks for data fetching
- `models/` - TypeScript interfaces (proxy, payloads)
- `components/` - Atomic design folders (atoms, molecules, organisms)
- `stores/` - Zustand stores
- `utils/` - Utility functions

### Generate a Page

```bash
npm run generate
# Select 'page' template
# Enter the page name (e.g., "user-profile")
```

**Page template includes:**
- List view with table
- Loading and error states
- Delete functionality
- Basic CRUD UI structure

### Variable Substitution

The templates use the following variable transformations:

- `%name%` - kebab-case module name (e.g., "user-profile")
- `%name.pascalCase%` - PascalCase for components (e.g., "UserProfile")
- `%name.camelCase%` - camelCase for variables (e.g., "userProfile")
- `%name.capitalCase%` - Title case for display (e.g., "User Profile")
- `%name.plural%` - Plural form (e.g., "user-profiles")
- `%name.pascalCase.plural%` - Plural PascalCase (e.g., "UserProfiles")

### Examples

#### Generate a User Management Module

```bash
npm run generate
# Template: module
# Name: user-management
```

This creates:

```
src/modules/user-management/
├── api/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── hooks/
├── models/
├── stores/
└── utils/
```

Remember to create the corresponding page in `src/pages/` and add the route in `shared/routes/`.

## Code Quality & Git Hooks

### Pre-commit Hooks

This project uses Husky + lint-staged to enforce code quality before commits.

**What runs on pre-commit:**

- ESLint (auto-fix)
- Prettier (auto-format)
- Only on staged files

**What runs on pre-push:**

- All tests (Vitest)

### Setup

Git hooks are automatically installed when you run `npm install` (via the `prepare` script).

### Manual Commands

```bash
# Format all files
npm run format

# Check formatting without fixing
npm run format:check

# Run linting
npm run lint

# Run tests
npm run test
```

### Bypass Hooks (Emergency Only)

```bash
# Skip pre-commit hook
git commit --no-verify

# Skip pre-push hook
git push --no-verify
```

**Note:** Avoid bypassing hooks. They ensure code quality and prevent broken code from reaching the repository.
