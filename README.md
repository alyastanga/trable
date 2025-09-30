# TRABLE

A 2nd year college project for the course, Mobile Computing. This is a mobile application.

## SETUP

Follow these steps to get your local environment ready.  
This project uses **pnpm** for package management and **Supabase local emulator** for backend.

---

### 1. Install Docker

We use Docker to run Supabase locally.

- Download and install Docker:
    - [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac)
    - [Docker Engine](https://docs.docker.com/engine/install/) (Linux)

- Make sure Docker is running:

    ```bash
    docker --version
    ```

### 2. Install pnpm

We use **pnpm** instead of npm or yarn.

- Install pnpm:

    ```bash
    npm i -g pnpm
    ```

- Verify Installation:

    ```bash
    pnpm --version
    ```

### 3. Install Dependencies

In the project root, run:

```bash
pnpm install
```

### 4. Run Supabase Locally

Start emulator:

```bash
pnpx supabase start
```

Stop it when you're done:

```bash
pnpx supabase stop
```

### 5. Run the Application on Development

This should start `mobile`, `server`, and `shared`.

```bash
pnpm dev
```

### 6. Approve Builds (Optional, for first time)

If you see a prompt about approving pnpm builds, type **Y** (yes).
