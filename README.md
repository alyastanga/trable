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

### 7. Developing

We have a local server. To connect to it, we need to do some things first.

1. Install adb
    - For Linux

    ```bash
    sudo apt install adb
    ```

    - For Windows
        1. **Download ADB**
            - Go to the official [Android SDK Platform Tools](https://developer.android.com/studio/releases/platform-tools) page.
            - Download the **ZIP for Windows**.
        2. **Extract Files**
            - Extract the `platform-tools` folder to a convenient location (e.g., `C:\platform-tools`).

        3. **Add to PATH (optional, for easier access)**
            - Press `Win + R`, type `sysdm.cpl`, and hit Enter.
            - Go to **Advanced → Environment Variables**.
            - Under **System variables**, find `Path` and click **Edit**.
            - Add the path to your extracted folder, e.g.:

            ```bash
            C:\platform-tools
            ```

        4. **Verify Installation**
            - Open **Command Prompt** and run:

                ```bash
                adb version
                ```

            - You should see the installed ADB version.

    - For MacOS
        1. **Install via Homebrew (Recommended)**
            - If you have [Homebrew](https://brew.sh/) installed, run:

            ```sh
            brew install android-platform-tools
            ```

        2. **Or Download Manually**
            - Get the **macOS ZIP** from [Android SDK Platform Tools](https://developer.android.com/studio/releases/platform-tools).
            - Extract the `platform-tools` folder to a location like `~/platform-tools`.
        3. **Add to PATH (optional)**
            - Open your shell config file (`~/.zshrc` or `~/.bashrc`) and add:

                ```bash
                export PATH=$PATH:$HOME/platform-tools
                ```

            - Reload:

                ```bash
                source ~/.zshrc
                ```

                or

                ```bash
                source ~/.bashrc
                ```

        4. **Verify Installation**

        ```bash
        adb version
        ```

2. As you run `pnpm dev` and attach your phone, go to a separate terminal.
3. Run these commands

```bash
adb devices
```

You should see something like this:

```bash
List of devices attached
2f6c9234        device
```

Get the hash, like so:

```bash
adb -s 2f6c9234 reverse tcp:backend_port tcp:backend_port
```

backend_port is the PORT used by the local server. In our case, it should be **3000**

[Check the guide at StackOverflow](https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api)
