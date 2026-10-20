# Visitor counter migration

New page views use [Hits Counter](https://github.com/donaldzou/hits-counter) through its JSON API, with `tz=Asia/Seoul`. The site key is exactly `https://archiiive99.github.io/`. `visitor-counter.json` records the migration time and previous counter endpoint.

The displayed Total is always **raw new-provider total + legacy total**. Today counts visits received by the new provider since KST midnight; on the migration day it covers only visits after the switch. Neither provider measures authenticated unique people.

The previous CounterAPI receives **read-only** requests and no new increments. While the previous API is unavailable, Total shows new-provider visits; its tooltip explains that earlier visits are pending recovery. A cached old total, when available, remains visible. The footer stays present even when a service fails.

When the previous API recovers, each page can immediately read its stored total and add it as a separate baseline. That baseline and the new provider's raw counts are cached separately. Repeated reads replace the baseline; they never repeatedly add it or increment the old counter.

To preserve the recovered baseline in the repository for every browser, run:

```sh
node scripts/recover-visitor-count.cjs
```

The script reads the previous API without incrementing it and writes `legacy.total` and `legacy.recoveredAt` in `visitor-counter.json`. Commit and deploy that file. Running it again leaves an already imported baseline unchanged. A failed or invalid response leaves the file unchanged. Once the baseline is configured, browsers stop requesting the old API.

Old cached versions of the site can briefly continue using the previous provider after deployment. The recovery helper does not invent counts for the outage or subtract possible overlap from those old clients; inspect the recovered baseline before publishing it if exact migration-boundary accounting is required.

Validation: `node tests/visitor-counter.test.cjs`. No package installation or build is needed for this static site.
