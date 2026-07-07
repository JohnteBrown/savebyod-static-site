#!/usr/bin/env bash

set -e

echo "==> Cobalt SSG Netlify Setup"
echo

command -v curl >/dev/null 2>&1 || {
    echo "curl is required. Install curl first."
    exit 1
}

if ! command -v rustc >/dev/null 2>&1; then
    echo "==> Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

    source "$HOME/.cargo/env"
else
    echo "==> Rust already installed"
fi

export PATH="$HOME/.cargo/bin:$PATH"

echo "==> Updating Rust toolchain..."
rustup update

if ! command -v cobalt >/dev/null 2>&1; then
    echo "==> Installing Cobalt SSG..."
    cargo install cobalt-bin
else
    echo "==> Cobalt already installed"
fi

if command -v npm >/dev/null 2>&1; then
    if ! command -v netlify >/dev/null 2>&1; then
        echo "==> Installing Netlify CLI..."
        npm install -g netlify-cli
    else
        echo "==> Netlify CLI already installed"
    fi
else
    echo "==> npm not found, skipping Netlify CLI"
fi

if [ ! -f netlify.toml ]; then

cat > netlify.toml <<EOF
[build]
command = "cobalt build"
publish = "_site"

[build.environment]
RUST_VERSION = "stable"
EOF

echo "==> Created netlify.toml"

else
    echo "==> netlify.toml already exists"
fi

if [ ! -f cobalt.yml ]; then
    echo "==> No cobalt.yml found"
    echo "Run:"
    echo "  cobalt init"
else
    echo "==> Cobalt project detected"
fi


echo
echo "================================"
echo " Setup complete!"
echo
echo "Versions:"
rustc --version
cargo --version
cobalt --version || true
echo
echo "Next steps:"
echo "  cobalt init"
echo "  cobalt build"
echo "  netlify deploy"
echo "================================"