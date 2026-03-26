<json_ld_schemas>

## Purpose

Ready-to-use JSON-LD structured data templates for Schema.org markup. Used by `tasks/seo.md` and `tasks/geo.md` to recommend and generate structured data. Each template includes required fields (marked with `*`) and high-impact optional fields for GEO.

## 1. Organization

Best for: company websites, brands, agencies.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{organization-name}",
  "url": "{website-url}",
  "logo": "{logo-url}",
  "description": "{one-line-description}",
  "foundingDate": "{YYYY}",
  "founder": {
    "@type": "Person",
    "name": "{founder-name}"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "{phone}",
    "contactType": "customer service",
    "email": "{email}"
  },
  "sameAs": [
    "{linkedin-url}",
    "{twitter-url}",
    "{facebook-url}",
    "{youtube-url}",
    "{github-url}",
    "{crunchbase-url}"
  ]
}
```

**Required fields:** `name`*, `url`*, `logo`*
**GEO impact fields:** `sameAs` (critical for brand authority signals — list ALL platform profiles), `description`, `foundingDate`

## 2. LocalBusiness

Best for: businesses with physical locations, service areas.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{business-name}",
  "url": "{website-url}",
  "image": "{image-url}",
  "description": "{description}",
  "telephone": "{phone}",
  "email": "{email}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{street}",
    "addressLocality": "{city}",
    "addressRegion": "{state}",
    "postalCode": "{zip}",
    "addressCountry": "{country-code}"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{lat}",
    "longitude": "{lng}"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "{price-range}",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{rating}",
    "reviewCount": "{count}"
  },
  "sameAs": ["{platform-urls}"]
}
```

**Required fields:** `name`*, `address`*, `telephone`*
**GEO impact fields:** `aggregateRating` (trust signal), `sameAs`, `geo` coordinates, `openingHoursSpecification`

## 3. Article + Person (E-E-A-T)

Best for: blog posts, articles, content sites. Person schema builds author authority.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{article-title}",
  "description": "{meta-description}",
  "image": "{featured-image-url}",
  "datePublished": "{YYYY-MM-DD}",
  "dateModified": "{YYYY-MM-DD}",
  "author": {
    "@type": "Person",
    "name": "{author-name}",
    "url": "{author-page-url}",
    "jobTitle": "{job-title}",
    "description": "{author-bio}",
    "sameAs": [
      "{author-linkedin}",
      "{author-twitter}",
      "{author-github}"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "{publisher-name}",
    "logo": {
      "@type": "ImageObject",
      "url": "{publisher-logo-url}"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{article-url}"
  },
  "wordCount": "{word-count}",
  "keywords": ["{keyword-1}", "{keyword-2}", "{keyword-3}"]
}
```

**Required fields:** `headline`*, `author`*, `datePublished`*, `publisher`*
**GEO impact fields:** `author.sameAs` (E-E-A-T signal), `author.jobTitle`, `dateModified` (freshness), `wordCount`

## 4. SoftwareApplication (SaaS)

Best for: SaaS products, apps, developer tools.

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{app-name}",
  "url": "{app-url}",
  "description": "{description}",
  "applicationCategory": "{category}",
  "operatingSystem": "{os}",
  "offers": {
    "@type": "Offer",
    "price": "{price}",
    "priceCurrency": "{currency}",
    "priceValidUntil": "{YYYY-MM-DD}"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{rating}",
    "reviewCount": "{count}",
    "bestRating": "5"
  },
  "author": {
    "@type": "Organization",
    "name": "{company-name}",
    "url": "{company-url}"
  },
  "screenshot": "{screenshot-url}",
  "featureList": "{feature-1}, {feature-2}, {feature-3}"
}
```

**Required fields:** `name`*, `applicationCategory`*, `offers`*
**GEO impact fields:** `aggregateRating`, `featureList` (AI systems extract features for comparisons)

## 5. Product with Offers (E-commerce)

Best for: product pages, e-commerce stores.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{product-name}",
  "image": ["{image-1}", "{image-2}", "{image-3}"],
  "description": "{product-description}",
  "sku": "{sku}",
  "brand": {
    "@type": "Brand",
    "name": "{brand-name}"
  },
  "offers": {
    "@type": "Offer",
    "url": "{product-url}",
    "priceCurrency": "{currency}",
    "price": "{price}",
    "priceValidUntil": "{YYYY-MM-DD}",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "{seller-name}"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{rating}",
    "reviewCount": "{count}"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "{reviewer-name}"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "{rating}"
      },
      "reviewBody": "{review-text}"
    }
  ]
}
```

**Required fields:** `name`*, `image`*, `offers`*
**GEO impact fields:** `aggregateRating` (AI systems cite ratings), `review` (social proof for AI answers), `brand`

## 6. WebSite + SearchAction

Best for: site-wide schema, enables sitelinks search box in Google.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{site-name}",
  "url": "{site-url}",
  "description": "{site-description}",
  "publisher": {
    "@type": "Organization",
    "name": "{org-name}",
    "logo": "{logo-url}"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "{site-url}/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "{language-code}"
}
```

**Required fields:** `name`*, `url`*
**GEO impact fields:** `potentialAction` (enables rich search features), `inLanguage`

## Validation

All generated schema should be tested with:
- Google Rich Results Test: validates Google-specific requirements
- Schema.org Validator: validates general compliance
- No errors allowed — warnings are acceptable but should be addressed

## Anti-Patterns

| Anti-Pattern | Fix |
|-------------|-----|
| Empty or placeholder values in production | Remove optional fields rather than leaving them empty |
| `sameAs` with broken links | Verify all URLs resolve before deploying |
| Missing `dateModified` on articles | Always include — signals freshness to AI systems |
| Using generic `Thing` type | Use the most specific type available |
| Multiple conflicting schemas on one page | One primary schema per page, nested related entities |

</json_ld_schemas>
