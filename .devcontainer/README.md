Rust + Cobalt devcontainer

How to use
- Open this repository in VS Code and choose "Reopen in Container" (Remote - Containers).
- The container is built from `.devcontainer/Dockerfile` and runs `.devcontainer/post-create.sh` after creation.

Permissions
- Ensure the post-create script is executable before building the container.

Linux / WSL:
  chmod +x .devcontainer/post-create.sh

PowerShell (Windows):
  wsl chmod +x .devcontainer/post-create.sh

Notes
- The Dockerfile installs a Rust toolchain base and attempts to install `cobalt-bin` into the image. The post-create script ensures `cobalt` is available for the container user.
- To re-run the post-create script inside the container: `/bin/bash .devcontainer/post-create.sh`
