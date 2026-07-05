#!/usr/bin/env bash
set -euo pipefail

# Ensure cargo is available; install rustup if missing
if ! command -v cargo >/dev/null 2>&1; then
  echo "cargo not found — installing rustup for current user..."
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  export PATH="$HOME/.cargo/bin:$PATH"
fi

if ! command -v cargo >/dev/null 2>&1; then
  echo "cargo still not available; aborting." >&2
  exit 1
fi

# Install cobalt if missing
if ! command -v cobalt >/dev/null 2>&1; then
  echo "Installing cobalt via cargo..."
  cargo install --locked cobalt-bin || true
else
  echo "cobalt already installed: $(cobalt --version)"
fi

echo "post-create complete."
