FROM mcr.microsoft.com/devcontainers/rust:1-ubuntu-22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install common build dependencies and OpenSSL headers
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    build-essential \
    pkg-config \
    libssl-dev \
    ca-certificates \
    curl \
    git \
  && rm -rf /var/lib/apt/lists/*

# Install Cobalt to /usr/local via cargo (may be cached in image)
RUN cargo install --locked cobalt-bin --root /usr/local || true

# Ensure /usr/local/bin is on PATH
ENV PATH="/usr/local/bin:${PATH}"

WORKDIR /workspace
