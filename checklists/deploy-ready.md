# Deploy Ready Checklist

Master pre-deployment validation. Blocks deploy if any CRITICAL item fails.

## Environment (CRITICAL)

- [ ] All variables from `.env.example` are set in target environment
- [ ] No `localhost`, `127.0.0.1`, or `0.0.0.0` hardcoded in production config
- [ ] NODE_ENV / APP_ENV / RAILS_ENV set to `production`
- [ ] Debug mode / verbose logging disabled
- [ ] All feature flags set to intended production state

## Database (CRITICAL)

- [ ] All migrations have been run successfully
- [ ] No pending or unapplied migrations exist
- [ ] Database backup exists from within the last 24 hours
- [ ] Connection string points to production database (not staging/dev)
- [ ] Connection pooling configured appropriately

## Build (CRITICAL)

- [ ] Build completes with zero errors
- [ ] No critical warnings in build output
- [ ] Bundle size within project limits (documented threshold)
- [ ] All static assets compiled, minified, and fingerprinted
- [ ] Source maps generated but not publicly accessible

## Tests (CRITICAL)

- [ ] Full test suite passes (zero failures)
- [ ] Test coverage has not decreased from previous release
- [ ] No tests marked as `.skip` or `.only` in committed code
- [ ] Integration tests pass against staging environment

## Security (CRITICAL)

- [ ] No secrets, API keys, or credentials in committed code
- [ ] `npm audit` / `pip audit` shows zero CRITICAL vulnerabilities
- [ ] Authentication endpoints have rate limiting enabled
- [ ] HTTPS enforced (HSTS header present)
- [ ] CORS configured for production domains only

## Health

- [ ] Health check endpoint (`/health` or equivalent) responds 200
- [ ] Logging level set to `info` or `warn` (not `debug`)
- [ ] Error tracking service (Sentry, Datadog, etc.) is connected and receiving events
- [ ] Monitoring alerts configured for key metrics

## Rollback

- [ ] Previous version is tagged and available for redeployment
- [ ] Rollback procedure is documented and tested
- [ ] Database migrations are reversible (if applicable)
- [ ] Team knows who to contact if rollback is needed

## Deploy Gate

**PASS:** All CRITICAL items checked. Deploy is approved.
**FAIL:** Any CRITICAL item unchecked. Deploy is BLOCKED until resolved.

Non-critical items (Health, Rollback) should be addressed but do not block deployment.

## Scoring

| Score | Rating | Action |
|-------|--------|--------|
| 100% | Ship it | Deploy approved |
| CRITICAL items 100%, rest < 100% | Conditional | Deploy with known non-critical gaps |
| Any CRITICAL item fails | BLOCKED | Fix all CRITICAL items before deploying |
