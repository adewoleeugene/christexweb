#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/optimize-images.sh [directory] [max_dimension] [quality] [min_size_bytes]
# Example:
#   ./scripts/optimize-images.sh public/images/team 1600 78 700000
#
# Notes:
# - Requires `cwebp` for WebP output.
# - Re-encodes jpg/jpeg/png/webp files to WebP in-place if output is smaller.
# - Skips files below min_size_bytes.

TARGET_DIR="${1:-public/images/team}"
MAX_DIM="${2:-1600}"
QUALITY="${3:-78}"
MIN_BYTES="${4:-700000}"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp not found. Install libwebp tools first."
  exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: directory not found: $TARGET_DIR"
  exit 1
fi

optimized=0
skipped=0

while IFS= read -r -d '' file; do
  orig_size=$(stat -f "%z" "$file")
  if [ "$orig_size" -lt "$MIN_BYTES" ]; then
    skipped=$((skipped + 1))
    continue
  fi

  tmp="${file}.tmp.webp"
  cwebp -quiet -q "$QUALITY" -resize "$MAX_DIM" 0 "$file" -o "$tmp"
  new_size=$(stat -f "%z" "$tmp")

  if [ "$new_size" -lt "$orig_size" ]; then
    out="${file%.*}.webp"
    mv "$tmp" "$out"
    if [ "$out" != "$file" ]; then
      rm -f "$file"
    fi
    optimized=$((optimized + 1))
    echo "optimized: $(basename "$file") ${orig_size} -> ${new_size}"
  else
    rm -f "$tmp"
    skipped=$((skipped + 1))
    echo "skipped: $(basename "$file") (not smaller)"
  fi
done < <(find "$TARGET_DIR" -type f \( -iname "*.webp" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

echo "done: optimized=$optimized skipped=$skipped dir=$TARGET_DIR"
