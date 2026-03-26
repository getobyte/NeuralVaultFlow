<nvc_tools>

## Purpose

Complete reference for NeuralVaultCore MCP tools used by NeuralVaultFlow. Every task in this skill reads and writes to NVC — this framework documents the exact tool signatures, key conventions, and token efficiency rules.

## Tool Signatures

### store_memory

```
store_memory(key, content, tags, title, namespace)
```

| Parameter | Required | Type | Purpose |
|-----------|----------|------|---------|
| `key` | Yes | string | Unique identifier within namespace |
| `content` | Yes | string | The data to store |
| `tags` | No | string | Comma-separated tags for search |
| `title` | No | string | Human-readable title |
| `namespace` | Yes | string | Isolation boundary (e.g., `project:my-app`) |

### retrieve_memory

```
retrieve_memory(key, namespace, view, max_chars)
```

| Parameter | Required | Type | Default | Purpose |
|-----------|----------|------|---------|---------|
| `key` | Yes | string | — | Key to retrieve |
| `namespace` | Yes | string | — | Namespace to look in |
| `view` | No | enum | `"full"` | `"head"`, `"tail"`, `"head_tail"`, `"full"` |
| `max_chars` | No | int | 2000 | Max characters to return |

### search_memories

```
search_memories(query, namespace, keys_only, limit)
```

| Parameter | Required | Type | Default | Purpose |
|-----------|----------|------|---------|---------|
| `query` | Yes | string | — | Search term |
| `namespace` | Yes | string | — | Namespace to search |
| `keys_only` | No | bool | `True` | Return only keys (saves tokens) |
| `limit` | No | int | 10 | Max results |

### list_all_memories

```
list_all_memories(namespace, limit, offset, keys_only)
```

| Parameter | Required | Type | Default | Purpose |
|-----------|----------|------|---------|---------|
| `namespace` | Yes | string | — | Namespace to list |
| `limit` | No | int | 10 | Max results |
| `offset` | No | int | 0 | Pagination offset |
| `keys_only` | No | bool | `True` | Return only keys |

### get_context

```
get_context(namespace, limit, keys_only)
```

| Parameter | Required | Type | Default | Purpose |
|-----------|----------|------|---------|---------|
| `namespace` | Yes | string | — | Namespace to scan |
| `limit` | No | int | 10 | Max recent items |
| `keys_only` | No | bool | `True` | Return only keys |

Use `get_context` at session start — it returns the most recent items, giving a quick snapshot of project state.

### delete_memory

```
delete_memory(key, namespace)
```

| Parameter | Required | Type | Purpose |
|-----------|----------|------|---------|
| `key` | Yes | string | Key to delete |
| `namespace` | Yes | string | Namespace containing the key |

### get_versions

```
get_versions(key, namespace)
```

Returns version history for a key. Useful for tracking plan evolution.

### restore_version

```
restore_version(key, namespace, version)
```

Restores a specific version. Use when a plan update was incorrect and needs rollback.

### get_stats

```
get_stats(verbose)
```

| Parameter | Required | Type | Default | Purpose |
|-----------|----------|------|---------|---------|
| `verbose` | No | bool | `False` | Include detailed breakdown |

## Key Conventions for NeuralVaultFlow

All keys follow the pattern `{project}:{type}` where `{project}` is the namespace-derived project name.

| Key Pattern | Written By | Contains |
|-------------|-----------|----------|
| `{project}:brainstorm` | brainstorm.md | Structured brainstorm output |
| `{project}:plan-{name}` | plan.md | Active plan with steps and AC |
| `{project}:progress` | execute.md | Overall project progress state |
| `{project}:audit-{date}` | audit.md | Audit report |
| `{project}:review-{date}` | review.md | Review findings |
| `{project}:seo-audit-{date}` | seo.md | SEO audit report |
| `{project}:geo-audit-{date}` | geo.md | GEO audit report |
| `{project}:deploy-check-{date}` | deploy-check.md | Deploy readiness result |

## Namespace Convention

At first invocation, detect the git root and pin:

```
namespace = "project:{repo-name}"
```

This namespace persists for the entire session. All reads and writes use it.

## Token Efficiency Rules

1. **Use `keys_only=True`** when scanning what exists — don't load full content just to check presence
2. **Use `view="head_tail"`** for previewing before committing to a full read
3. **Use `get_context`** at session start instead of `list_all_memories` — it's optimized for recent items
4. **Limit search results** — default `limit=10` is usually sufficient
5. **Don't re-read what you just wrote** — if you stored a plan, you already have it in context

## Never Store

- Secrets, API keys, credentials, passwords
- Full file contents (store paths and summaries instead)
- Temporary debug output
- Raw error stack traces (store the diagnosis, not the dump)

</nvc_tools>
