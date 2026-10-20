# DNS for datafore.ca

Every DNS record for `datafore.ca`, what it does, and whether it is safe to change. Records live in **AWS Route 53
→ Hosted zones → datafore.ca**. The domain's nameservers are the four `awsdns` servers below; the registrar is not
covered here.

_Last verified against public DNS (Google `8.8.8.8` and Cloudflare `1.1.1.1`): 20 October 2026._

## Current records

| Name | Type | Value | Purpose | Safe to change? |
|---|---|---|---|---|
| `datafore.ca` | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | Website → GitHub Pages | Only to move hosting. See [CUTOVER.md](./CUTOVER.md). |
| `datafore.ca` | AAAA | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` | Website over IPv6 → GitHub Pages | Same as A. Change both together. |
| `www.datafore.ca` | CNAME | `sandy4243.github.io.` | `www` → GitHub Pages, which redirects it to the apex | Same as A. |
| `_github-pages-challenge-sandy4243.datafore.ca` | TXT | `"5fab14e4c7aedbc8fbd84e0e21c618"` | Proves to GitHub that the `sandy4243` account owns the domain, so no one else can attach it to their Pages site | **Keep.** Removing it lets the verification lapse. |
| `datafore.ca` | MX | `1 aspmx.l.google.com.` · `5 alt1.aspmx.l.google.com.` · `5 alt2.aspmx.l.google.com.` · `10 alt3.aspmx.l.google.com.` · `10 alt4.aspmx.l.google.com.` | Incoming mail → Google Workspace | **No.** Changing these stops email. |
| `datafore.ca` | TXT | `"v=spf1 include:_spf.google.com ~all"` | **SPF**: servers allowed to send as @datafore.ca. See [EMAIL.md](./EMAIL.md). | Only to add a new sending service. |
| `datafore.ca` | TXT | `"MS=A1462839608D30D84785746F76296ACBA9182C39"` | Old Microsoft 365 domain verification, unused | Harmless. Leave it, or delete it if you are sure Microsoft 365 is not in use. |
| `google._domainkey.datafore.ca` | TXT | `"v=DKIM1; k=rsa; p=MIIBIjAN…IDAQAB"` (2048-bit, stored as two quoted strings) | **DKIM**: public key that verifies Google Workspace's signature on outgoing mail | Only when rotating the key from the Google Admin console. |
| `_dmarc.datafore.ca` | TXT | `"v=DMARC1; p=none; rua=mailto:info@datafore.ca"` | **DMARC**: policy for mail that fails SPF/DKIM, plus where reports go | Yes, to tighten the policy. See the plan in [EMAIL.md](./EMAIL.md). |
| `datafore.ca` | NS | `ns-246.awsdns-30.com.` · `ns-949.awsdns-54.net.` · `ns-1203.awsdns-22.org.` · `ns-1845.awsdns-38.co.uk.` | Route 53 is authoritative for the zone | **No.** |
| `datafore.ca` | SOA | Route 53 default | Zone metadata | **No.** |

All records use a 300-second TTL (NS: 21600), so a change reaches most resolvers within about five minutes.
There is no CAA record, so any certificate authority (including GitHub's) may issue certificates.

**Pending:** a `google-site-verification=…` value for Google Search Console goes into the apex TXT record (as a
third line, see below). See [OPERATIONS.md](./OPERATIONS.md#google-search-console).

## Route 53 rules that catch people out

1. **One TXT record per name.** Route 53 holds every TXT value for a name in a single record set. To add a value
   at the apex (Search Console, a new service's verification), **edit** the existing blank-name TXT record and
   add a new line. Creating a second record fails with "already exists". Never delete the existing lines.
2. **Each value in double quotes, one per line:**
   ```
   "MS=A1462839608D30D84785746F76296ACBA9182C39"
   "v=spf1 include:_spf.google.com ~all"
   "google-site-verification=…"
   ```
3. **255 characters per quoted string.** Longer values (such as a 2048-bit DKIM key) must be split into several
   quoted strings **on the same line**, separated by a space: `"v=DKIM1; k=rsa; p=MIIB…first part" "…rest"`.
   Receivers join them back together. If Route 53 shows `CharacterStringTooLong`, the split is missing.
4. **Only one SPF record.** Every sending service is added to the one `v=spf1` line with another `include:`.
   Two `v=spf1` lines make SPF fail for all mail.
5. **Edit, don't delete and recreate.** Editing keeps the change atomic; delete-then-create leaves a gap.

## Checking records from anywhere

Without installing anything, Google's DNS-over-HTTPS API shows what the world sees:

```bash
curl -s "https://dns.google/resolve?name=datafore.ca&type=TXT"
curl -s "https://dns.google/resolve?name=_dmarc.datafore.ca&type=TXT"
curl -s "https://dns.google/resolve?name=google._domainkey.datafore.ca&type=TXT"
curl -s "https://dns.google/resolve?name=datafore.ca&type=MX"
```

Or, with `dig`: `dig +short TXT datafore.ca`, and so on.

## Change log

| Date | Change |
|---|---|
| Oct 2026 | Website moved from Dorik to GitHub Pages: apex A `18.119.18.18` → four GitHub Pages IPs, AAAA added, `www` CNAME `datafore.ca.` → `sandy4243.github.io.`, GitHub verification TXT added. See [CUTOVER.md](./CUTOVER.md). |
| 20 Oct 2026 | Email authentication added: SPF (apex TXT), DKIM (`google._domainkey`), DMARC `p=none` (`_dmarc`). Verified passing. See [EMAIL.md](./EMAIL.md). |

Add a row whenever a record changes.
