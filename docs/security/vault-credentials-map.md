# Mr. DJ Vault Credentials Map

**Last Updated**: 2025-12-03
**Vault Address**: `http://127.0.0.1:8200`
**KV Version**: v2

## 🔐 Stored Credentials Overview

All marketing and service credentials for mr-dj.nl are securely stored in OpenBao vault.

### Access Pattern

```bash
export VAULT_ADDR="http://127.0.0.1:8200"

# Read a secret
vault kv get secret/misterdj/google/analytics

# List all secrets in a path
vault kv list secret/misterdj/google/
```

---

## 📊 Google Services

### 1. Google Analytics 4 (GA4)
**Path**: `secret/misterdj/google/analytics`
**Priority**: Week 1 - CRITICAL
**Fields**:
- `email`: Login email
- `password`: Account password
- `property_id`: GA4 Property ID (TBD)
- `measurement_id`: G-TXJLD3H2C8
- `service`: Google Analytics 4 (GA4)
- `notes`: Nodig voor tracking & conversies

**Access**:
```bash
vault kv get secret/misterdj/google/analytics
```

---

### 2. Google Tag Manager (GTM)
**Path**: `secret/misterdj/google/tag-manager`
**Priority**: Week 1 - CRITICAL
**Fields**:
- `email`: Admin email
- `password`: Account password
- `container_id`: GTM-NST23HJX
- `service`: Google Tag Manager
- `notes`: Voor event tracking & pixels

**Access**:
```bash
vault kv get secret/misterdj/google/tag-manager
```

---

### 3. Google Search Console
**Path**: `secret/misterdj/google/search-console`
**Priority**: Week 1 - HIGH
**Fields**:
- `email`: Owner email
- `password`: Account password
- `service`: Google Search Console
- `notes`: Voor SEO monitoring

**Access**:
```bash
vault kv get secret/misterdj/google/search-console
```

---

### 4. Google Ads
**Path**: `secret/misterdj/google/ads`
**Priority**: Week 2 - MEDIUM
**Fields**:
- `email`: Admin email
- `password`: Account password
- `customer_id`: Google Ads Customer ID (TBD)
- `budget`: €0-150/month
- `service`: Google Ads
- `notes`: Voor SEA campagnes

**Access**:
```bash
vault kv get secret/misterdj/google/ads
```

---

### 5. Google Business Profile (GBP)
**Path**: `secret/misterdj/google/business-profile`
**Priority**: Week 1 - CRITICAL 🔴
**Fields**:
- `email`: Manager email
- `password`: Account password
- `business_id`: GBP Business ID (TBD)
- `priority`: CRITICAL
- `service`: Google Business Profile
- `notes`: KRITIEK voor local SEO!

**Access**:
```bash
vault kv get secret/misterdj/google/business-profile
```

---

## 🪟 Microsoft Services

### 6. Bing Webmaster Tools
**Path**: `secret/misterdj/microsoft/webmaster-tools`
**Priority**: Week 2 - MEDIUM
**Fields**:
- `email`: Admin email
- `password`: Google login (SSO)
- `service`: Bing Webmaster Tools
- `notes`: Voor Bing SEO

**Access**:
```bash
vault kv get secret/misterdj/microsoft/webmaster-tools
```

---

### 7. Office 365 (OneDrive/SharePoint)
**Path**: `secret/misterdj/microsoft/office365`
**Priority**: Week 1 - HIGH
**Fields**:
- `email`: Admin email
- `password`: Account password
- `service`: Office 365
- `notes`: Voor media opslag & samenwerking

**Access**:
```bash
vault kv get secret/misterdj/microsoft/office365
```

---

## 📱 Social Media

### 8. Facebook Business Manager
**Path**: `secret/misterdj/social/facebook`
**Priority**: Week 2 - MEDIUM
**Fields**:
- `email`: Admin email
- `password`: Account password
- `page_id`: Facebook Page ID (TBD)
- `pixel_id`: 987654321012345
- `service`: Facebook Business Manager
- `notes`: Voor social media marketing

**Access**:
```bash
vault kv get secret/misterdj/social/facebook
```

---

### 9. Instagram Business Account
**Path**: `secret/misterdj/social/instagram`
**Priority**: Week 2 - MEDIUM
**Fields**:
- `username`: mr_dj.nl
- `password`: Account password
- `service`: Instagram Business Account
- `notes`: Voor content & engagement - Gekoppeld aan Facebook

**Access**:
```bash
vault kv get secret/misterdj/social/instagram
```

---

## 🛠️ Tools & Services

### 10. Invoice Ninja
**Path**: `secret/misterdj/tools/invoice-ninja`
**Priority**: Week 1 - HIGH
**Fields**:
- `email`: Admin email
- `password`: Account password
- `api_token`: API token (TBD)
- `webhook_url`: Webhook URL (TBD)
- `service`: Invoice Ninja
- `notes`: Voor facturatie integratie

**Access**:
```bash
vault kv get secret/misterdj/tools/invoice-ninja
```

---

## 🔍 Quick Reference

### List All Mr. DJ Secrets
```bash
export VAULT_ADDR="http://127.0.0.1:8200"

# Google services
vault kv list secret/misterdj/google/

# Microsoft services
vault kv list secret/misterdj/microsoft/

# Social media
vault kv list secret/misterdj/social/

# Tools
vault kv list secret/misterdj/tools/
```

### Retrieve Specific Credential
```bash
# Get full secret
vault kv get secret/misterdj/google/analytics

# Get specific field only
vault kv get -field=email secret/misterdj/google/analytics
vault kv get -field=password secret/misterdj/google/analytics
```

### Update a Secret
```bash
# Update specific fields (merges with existing)
vault kv patch secret/misterdj/google/analytics \
  property_id="GA4-XXXXXX" \
  measurement_id="G-NEWIDHERE"

# Replace entire secret
vault kv put secret/misterdj/google/analytics \
  email="newemail@mr-dj.nl" \
  password="newpassword" \
  property_id="GA4-123456" \
  measurement_id="G-ABCDEFG"
```

---

## 📋 Priority Action Items

### Week 1 (URGENT)
- [ ] **Google Analytics 4**: Set up tracking, get Property ID
- [ ] **Google Tag Manager**: Configure container, install on site
- [ ] **Google Search Console**: Verify property, submit sitemap
- [ ] **Google Business Profile**: Complete profile, add photos, get reviews
- [ ] **Invoice Ninja**: Configure API integration with booking system
- [ ] **Office 365**: Set up shared folders for media assets

### Week 2 (HIGH)
- [ ] **Google Ads**: Create first campaign (€50-150/month budget)
- [ ] **Facebook Business**: Set up Business Manager, install Pixel
- [ ] **Instagram**: Link to Facebook, start content calendar
- [ ] **Bing Webmaster**: Verify site, submit sitemap

### Optional/Later
- [ ] **Bing Ads**: Evaluate after Google Ads performance
- [ ] **LinkedIn**: If B2B marketing expands

---

## 🔒 Security Best Practices

1. **Never commit credentials to git**
   - Use vault for all secrets
   - Use environment variables in code

2. **Rotate passwords quarterly**
   - Update in vault
   - Document rotation date

3. **Use service accounts where possible**
   - Google Cloud service accounts for API access
   - OAuth for user-based access

4. **Audit access logs**
   - Check vault audit logs monthly
   - Review who accessed which secrets

5. **Backup vault data**
   - Vault backups run daily
   - Unseal keys stored securely offline

---

## 🚨 Emergency Access

If vault is sealed and you need to unseal:

```bash
export VAULT_ADDR="http://127.0.0.1:8200"

# Check seal status
vault status

# Unseal (requires 2 of 3 keys)
vault operator unseal <KEY_1>
vault operator unseal <KEY_2>

# Verify unsealed
vault status | grep "Sealed"
# Should show: Sealed: false
```

**Unseal Keys Location**: Securely stored with system administrator

---

## 📞 Support Contacts

- **Vault Admin**: Chris (system administrator)
- **Marketing Lead**: (manages Google/Meta accounts)
- **Technical Issues**: Create issue in project repo

---

**End of Vault Credentials Map**
