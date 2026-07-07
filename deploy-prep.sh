#!/usr/bin/env bash
set -e

rustup default stable

cargo install cobalt-bin

cobalt build