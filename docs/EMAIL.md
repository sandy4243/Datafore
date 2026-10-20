# Email for datafore.ca

Mail for `@datafore.ca` runs on **Google Workspace** (admin console: admin.google.com). `info@datafore.ca` reaches
Sandeep; the website contact form delivers there too.

This page covers email **authentication**: SPF, DKIM and DMARC, the three DNS records that let receiving mail
servers confirm a message claiming to be from @datafore.ca really is. Without them, Gmail, Outlook and Yahoo
increasingly send mail to spam, and anyone can send mail that appears to come from the domain. The record values
themselves are listed in [DNS.md](./DNS.md).

## Status

**All passing, verified 20 October 2026.** A test from `sandeep@datafore.ca` to Port25's verifier returned:

| Check | Result |
|---|---|
| SPF | pass, `smtp.mailfrom=sandeep@datafore.ca` |
| DKIM | pass, `header.d=datafore.ca`, selector `google`, 2048-bit key; matches the From address |
| DMARC | pass, aligned through both SPF and DKIM |

## What each record does

- **SPF** (`datafore.ca` TXT, `v=spf1 include:_spf.google.com ~all`): lists the servers allowed to send as
  @datafore.ca. Today that is Google only. `~all` means "treat anything else as suspicious".
- **DKIM** (`google._domainkey.datafore.ca` TXT): the public half of a key Google uses to sign every outgoing
  message. Unlike SPF, a DKIM signature survives forwarding. Signing is switched on in **Admin console → Apps →
  Google Workspace → Gmail → Authenticate email**, where the status reads "Authenticating email with DKIM".
- **DMARC** (`_dmarc.datafore.ca` TXT): tells receivers what to do when a message fails both checks, and asks
  them to send aggregate reports to `info@datafore.ca`. Currently `p=none`: monitor only, nothing is blocked.

## DMARC plan

`p=none` is a starting point, not the end state. Once the reports show that all legitimate mail passes, tighten it
so nobody can spoof @datafore.ca, which matters for phishing protection once bids and contracts are in play.

| When | `_dmarc` value | Effect |
|---|---|---|
| Now (since 20 Oct 2026) | `"v=DMARC1; p=none; rua=mailto:info@datafore.ca"` | Monitor; reports only |
| After 2 to 4 weeks of clean reports | `"v=DMARC1; p=quarantine; rua=mailto:info@datafore.ca"` | Failing mail goes to spam |
| After another 2 to 4 clean weeks | `"v=DMARC1; p=reject; rua=mailto:info@datafore.ca"` | Failing mail is refused |

Before each step, check the reports for any legitimate sender that is failing (see below). Roll back by setting
the value back to `p=none`.

**Reports:** Google, Microsoft, Yahoo and others email daily XML reports to info@datafore.ca, with subjects like
"Report domain: datafore.ca". A Gmail filter on that subject (skip inbox, apply a label) keeps them out of the way.
A free viewer such as dmarcian's XML-to-human converter makes them readable.

## Adding a service that sends as @datafore.ca

Any tool that sends mail **as** an @datafore.ca address (HubSpot sequences, a newsletter platform, a billing
system) must be authenticated **before** DMARC is tightened, or its mail will be quarantined or rejected.

1. **SPF:** add its `include:` to the existing SPF line; never create a second SPF record. For example:
   `"v=spf1 include:_spf.google.com include:<service's SPF domain> ~all"`. Keep the total under 10 DNS lookups;
   today it uses 1.
2. **DKIM:** add the CNAME or TXT records the service gives you (each service uses its own selector, so it does
   not clash with `google._domainkey`).
3. Send a test (below) and confirm DKIM shows `header.d=datafore.ca`.

Services that send **on their own domain** need nothing here: FormSubmit (`submissions@formsubmit.co`) and
Calendly notifications are already fine.

## Testing

Send any message from an @datafore.ca account to `check-auth@verifier.port25.com`. Within a minute an
"Authentication Report" comes back to the sender with SPF, DKIM and iprev results. Check that DKIM shows
`header.d=datafore.ca`; if it shows `…gappssmtp.com`, Google's default signature is in use and DKIM signing is not
switched on in the Admin console.

Alternatively, email a personal Gmail address, open the message, and choose **⋮ → Show original**: SPF, DKIM and
DMARC should each read PASS.

## Rotating the DKIM key

Optional, perhaps yearly. In the Admin console, generate a new record with a **new selector** (e.g. `google2`), add
it to DNS as `google2._domainkey`, wait for it to propagate, switch signing to it, then delete the old record a
week later. Using a new selector means mail in transit never fails.
