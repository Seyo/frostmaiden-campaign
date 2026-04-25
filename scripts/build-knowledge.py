#!/usr/bin/env python3
"""Builds quartz/static/campaign-knowledge.json from content/**/*.md."""

import json
import re
import sys
from pathlib import Path

CONTENT_DIR = Path("content")
OUTPUT_FILE = Path("quartz/static/campaign-knowledge.json")

TYPE_MAP = {
    "Sessions": "session",
    "Karaktärer": "character",
    "NPC": "npc",
    "Platser": "location",
    "Fraktioner": "faction",
    "Uppdrag & rykten": "quest",
    "Händelser": "event",
    "Kartor": "map",
}

WIKILINK_RE = re.compile(r'\[\[([^\|\]#]+)(?:\|[^\]]+)?\]\]')


def get_type(rel_path: Path) -> str:
    parts = rel_path.parts
    return TYPE_MAP.get(parts[0], "other") if parts else "other"


def extract_wikilinks(text: str) -> list[str]:
    return list(dict.fromkeys(m.strip() for m in WIKILINK_RE.findall(text)))


def main() -> None:
    if not CONTENT_DIR.exists():
        print(f"ERROR: {CONTENT_DIR} not found", file=sys.stderr)
        sys.exit(1)

    entries = []
    for md_file in sorted(CONTENT_DIR.rglob("*.md")):
        if md_file.name == "index.md":
            continue
        rel = md_file.relative_to(CONTENT_DIR)
        content = md_file.read_text(encoding="utf-8")
        entries.append({
            "type": get_type(rel),
            "title": md_file.stem,
            "path": str(rel).replace("\\", "/"),
            "content": content,
            "wikilinks": extract_wikilinks(content),
        })

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(
        json.dumps(entries, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    print(f"campaign-knowledge.json: {len(entries)} entries, {OUTPUT_FILE.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
