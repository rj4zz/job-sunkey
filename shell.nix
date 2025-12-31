{ pkgs ? import <nixpkgs> {} }:

let
  nixDir = toString ./.nix;
  binDir = "${nixDir}/bin";
in
pkgs.mkShell {
  buildInputs = [ pkgs.nodejs_20 ];

  shellHook = ''
    # 1. Path Setup
    export NIX_DATA_DIR="${nixDir}"
    export PROJECT_ROOT=$(pwd)
    export XDG_CACHE_HOME="$NIX_DATA_DIR/cache"
    export XDG_CONFIG_HOME="$NIX_DATA_DIR/config"
    export NPM_CONFIG_PREFIX="$NIX_DATA_DIR/node_modules_bin"
    export NPM_CONFIG_CACHE="$XDG_CACHE_HOME/npm"
    
    mkdir -p "$XDG_CACHE_HOME" "$XDG_CONFIG_HOME" "$NPM_CONFIG_PREFIX" "${binDir}"

    # 2. Update PATH
    export PATH="${binDir}:$PROJECT_ROOT/node_modules/.bin:$NPM_CONFIG_PREFIX/bin:$PATH"

    # 3. Create Persistent Commands
    # 'dev' command
    echo '#!/bin/sh' > "${binDir}/dev"
    echo 'DEBUG=vite:* npm run dev "$@"' >> "${binDir}/dev"
    chmod +x "${binDir}/dev"

    # 'clean' command
    # Wipes the local .nix folder and node_modules, then exits the shell
    echo '#!/bin/sh' > "${binDir}/clean"
    echo 'echo "⚠️  Cleaning project environment..."' >> "${binDir}/clean"
    echo 'rm -rf "$PROJECT_ROOT/node_modules" "$PROJECT_ROOT/.nix"' >> "${binDir}/clean"
    echo 'echo "✅ Done. Please exit and re-enter the directory to rebuild."' >> "${binDir}/clean"
    chmod +x "${binDir}/clean"

    # 4. Automation for Clones
    if [ ! -d "node_modules" ]; then
      echo "📦 New project detected. Installing dependencies..."
      npm install
    fi

    echo "--- ❄️  Pragmatic Nix Shell ❄️  ---"
    echo "Node: $(node -v) | NPM: $(npm -v)"
    echo "🛠️  Commands: 'dev' (debug server), 'clean' (wipe cache)"
  '';
}