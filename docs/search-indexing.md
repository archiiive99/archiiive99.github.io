# Google Search Indexing

The public homepage returned HTTP 200 on 2026-09-21. No HTTP X-Robots-Tag or
HTML noindex directive was found. A search did not return the profile, but
that does not establish its Google index status or exclusion reason.

The site now provides a sitemap, robots.txt sitemap discovery and ProfilePage
structured data. Absence of a sitemap or robots.txt was not itself a crawl ban.
These additions neither guarantee indexing nor control Google's timetable.

Owner action:

The owner supplied an HTML verification tag on 2026-09-21; it is now included in
the homepage head. The owner still needs to press Verify in Search Console.
Publishing the tag does not itself complete Google account verification.

1. Open https://search.google.com/search-console/.
2. Add the URL-prefix property `https://archiiive99.github.io/`.
3. Verify ownership using Google's HTML file or meta tag. Add the exact provided
   file/tag to this repository; no verification token has been invented here.
4. Inspect the homepage URL, run the live test and request indexing.
5. Submit `https://archiiive99.github.io/sitemap.xml` under Sitemaps.

Official guidance: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
Google says crawling can take days to weeks and a request does not guarantee indexing.

# Favicon Source

`assets/favicon.svg` is an original hand-authored grayscale liquid-chrome pattern,
with no external artwork, letters or logo source. The 32px PNG and 180px Apple
touch icon are rasterizations of that same SVG. The source and both raster sizes
are declared in the homepage head.
