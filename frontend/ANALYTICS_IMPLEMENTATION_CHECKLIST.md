# Analytics Implementation Checklist

Use this checklist to track the implementation of analytics in your Mister DJ application.

## Phase 1: Setup & Configuration

- [ ] Review `/srv/apps/mr-djv1/frontend/ANALYTICS_SETUP_SUMMARY.md` for complete overview
- [ ] Set up PostHog account and get API key
- [ ] Set up Google Analytics 4 and get measurement ID
- [ ] Set up Google Tag Manager and get container ID
- [ ] Set up Meta Pixel and get pixel ID
- [ ] Configure `.env.local` with all analytics credentials:
  ```bash
  VITE_POSTHOG_API_KEY=phc_your_key
  VITE_POSTHOG_API_HOST=https://app.posthog.com
  VITE_GA4_MEASUREMENT_ID=G-XXXXX
  VITE_GTM_ID=GTM-XXXXX
  VITE_META_PIXEL_ID=123456789
  ```

## Phase 2: Root Component Integration

- [ ] Update `src/App.tsx` to include:
  ```typescript
  import AnalyticsProvider from './components/providers/AnalyticsProvider';
  import UserBehaviorTracker from './components/analytics/UserBehaviorTracker';

  function App() {
    return (
      <AnalyticsProvider>
        <UserBehaviorTracker />
        {/* Rest of app */}
      </AnalyticsProvider>
    );
  }
  ```
- [ ] Test automatic tracking in development mode
- [ ] Verify console logs appear for tracking events

## Phase 3: Verify Automatic Tracking

- [ ] Open browser DevTools
- [ ] Test button clicks - should see events logged
- [ ] Submit a form - should see form submission event
- [ ] Scroll the page - should see scroll milestone events at 25%, 50%, 75%
- [ ] Check `window.dataLayer` in console - should see events pushed
- [ ] Check PostHog dashboard - should see events arriving

## Phase 4: Component Integration

### Booking Components
- [ ] Update `QuickBookingForm` component:
  - [ ] Import `trackBookingStarted`, `trackServiceViewed`, `trackFormFieldEngagement`
  - [ ] Track service selection on change
  - [ ] Track form field engagement on focus
  - [ ] Track form submission/booking start

- [ ] Update `EventTypeSelector` component:
  - [ ] Import `trackServiceViewed`
  - [ ] Track when user selects event type

- [ ] Create or update booking confirmation page:
  - [ ] Import `trackBookingLead`
  - [ ] Track successful booking with all details

### Service Components
- [ ] Update `ServiceCard` component:
  - [ ] Import `trackServiceViewed`, `trackPackageSelected`
  - [ ] Track service view on mount
  - [ ] Track package selection on button click

- [ ] Update `PricingTables` component:
  - [ ] Import `trackPackageSelected`
  - [ ] Track package selection on click

### Contact Components
- [ ] Update contact buttons/links:
  - [ ] Import `trackContactChannelClick`
  - [ ] Track phone button clicks
  - [ ] Track email button clicks
  - [ ] Track WhatsApp button clicks
  - [ ] Track Instagram/social media clicks

### UI Components
- [ ] Update primary CTA buttons:
  - [ ] Import `trackButtonClick` if manual tracking needed
  - [ ] Add descriptive `analyticsId` prop to custom Button component
  - [ ] Verify buttons are tracked automatically via UserBehaviorTracker

### Media Components
- [ ] Update testimonial/video components:
  - [ ] Import `trackMediaEngagement`
  - [ ] Track video plays
  - [ ] Track video completion

## Phase 5: Testing & Verification

### Development Testing
- [ ] Enable dev console logs
- [ ] Verify all tracking functions work without errors
- [ ] Check no sensitive data is being tracked
- [ ] Verify event structure matches documentation

### PostHog Testing
- [ ] Log in to PostHog dashboard
- [ ] Go to Events section
- [ ] Verify events are arriving:
  - [ ] `page_view` events
  - [ ] `booking_started` events
  - [ ] `service_viewed` events
  - [ ] `package_selected` events
  - [ ] `contact_channel_click` events
  - [ ] `user_click` events
  - [ ] `form_submitted` events
  - [ ] `scroll_milestone` events

### GA4 Testing
- [ ] Log in to GA4 property
- [ ] Go to Real-time > Events
- [ ] Verify events are arriving:
  - [ ] `page_view` events
  - [ ] `begin_checkout` events
  - [ ] `view_item` events
  - [ ] `select_item` events
  - [ ] Custom events

### GTM DataLayer Testing
- [ ] Open browser console
- [ ] Type `window.dataLayer` to view all events
- [ ] Filter by specific event: `window.dataLayer.filter(e => e.event === 'booking_started')`
- [ ] Verify event structure and parameters

## Phase 6: Advanced Features

### User Identification
- [ ] When user submits booking form:
  - [ ] Import `identifyUser` from `@/lib/analytics/posthog`
  - [ ] Call `identifyUser(userId, { email, phone, name, ... })`

- [ ] On logout:
  - [ ] Import `resetUserIdentification`
  - [ ] Call `resetUserIdentification()`

### Error Tracking
- [ ] Create error boundary or error handler:
  - [ ] Import `trackError`
  - [ ] Call `trackError(name, message, location)` on errors

- [ ] Test error tracking:
  - [ ] Trigger a form validation error
  - [ ] Verify error appears in PostHog

### Performance Monitoring
- [ ] Monitor scroll tracking performance
- [ ] Check for throttling is working (1-second intervals)
- [ ] Verify no performance degradation from tracking

## Phase 7: Documentation & Handoff

- [ ] Read and understand:
  - [ ] `src/lib/analytics/README.md` - Full documentation
  - [ ] `src/lib/analytics/INTEGRATION_GUIDE.md` - Component examples
  - [ ] `src/lib/analytics/QUICK_REFERENCE.md` - Quick lookup

- [ ] Document custom tracking in your codebase:
  - [ ] Add comments for non-obvious tracking calls
  - [ ] Link to QUICK_REFERENCE.md in code comments

- [ ] Create team documentation:
  - [ ] Share ANALYTICS_SETUP_SUMMARY.md with team
  - [ ] Create internal tracking guidelines
  - [ ] Document which events to expect

## Phase 8: Production Deployment

- [ ] Verify environment variables are set in production
- [ ] Test in staging environment first
- [ ] Verify all events are working in staging
- [ ] Deploy to production
- [ ] Monitor analytics in production for 24 hours
- [ ] Create PostHog/GA4 dashboards for key metrics
- [ ] Set up alerts for anomalies

## Phase 9: Ongoing Monitoring

- [ ] Weekly review of analytics dashboards
- [ ] Check for any tracking errors in console
- [ ] Monitor conversion funnel
- [ ] Identify drop-off points
- [ ] Optimize based on user behavior data
- [ ] A/B test improvements

## Optional: Advanced Setup

- [ ] Create PostHog user cohorts:
  - [ ] Power users (high engagement)
  - [ ] Converters (completed booking)
  - [ ] At-risk users (viewed but didn't book)

- [ ] Set up retention tracking:
  - [ ] Track returning users
  - [ ] Analyze user retention curves

- [ ] Create GA4 custom funnels:
  - [ ] Booking funnel (view service → select package → submit)
  - [ ] Conversion funnel

- [ ] Set up attribution tracking:
  - [ ] Track which channel users came from
  - [ ] Analyze booking source attribution

## File References

### Core Implementation Files
- **PostHog Integration**: `/srv/apps/mr-djv1/frontend/src/lib/analytics/posthog.ts` (181 lines)
- **GA4 Integration**: `/srv/apps/mr-djv1/frontend/src/lib/analytics/ga4.ts` (106 lines)
- **Business Events**: `/srv/apps/mr-djv1/frontend/src/lib/analytics/events.ts` (234 lines)
- **Tracking Utilities**: `/srv/apps/mr-djv1/frontend/src/lib/analytics/trackingUtils.ts` (371 lines)
- **Analytics Provider**: `/srv/apps/mr-djv1/frontend/src/components/providers/AnalyticsProvider.tsx` (51 lines)
- **User Behavior Tracker**: `/srv/apps/mr-djv1/frontend/src/components/analytics/UserBehaviorTracker.tsx` (151 lines)

### Documentation Files
- **Setup Summary**: `/srv/apps/mr-djv1/frontend/ANALYTICS_SETUP_SUMMARY.md` (495 lines)
- **Full Documentation**: `/srv/apps/mr-djv1/frontend/src/lib/analytics/README.md` (504 lines)
- **Integration Guide**: `/srv/apps/mr-djv1/frontend/src/lib/analytics/INTEGRATION_GUIDE.md` (570 lines)
- **Quick Reference**: `/srv/apps/mr-djv1/frontend/src/lib/analytics/QUICK_REFERENCE.md` (290 lines)
- **This Checklist**: `/srv/apps/mr-djv1/frontend/ANALYTICS_IMPLEMENTATION_CHECKLIST.md`

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Events not in PostHog | Check API key format (phc_*), verify initialization |
| Events not in GA4 | Check GTM ID, verify dataLayer exists |
| No automatic button tracking | Ensure UserBehaviorTracker is mounted |
| Scroll not tracking | Check page is scrollable (content > viewport) |
| Sensitive data tracked | Review trackingUtils.ts for data handling |
| Performance issues | Scroll tracking already throttled, check for other listeners |
| Development logs not showing | Check import.meta.env.MODE === 'development' |

## Quick Test Scenarios

### Scenario 1: Complete Booking Journey
1. [ ] Visit landing page
2. [ ] See page view event tracked
3. [ ] Click "Mijn DJ Boeken" button
4. [ ] See button click event
5. [ ] Select event type (e.g., Wedding DJ)
6. [ ] See service view event
7. [ ] Select a package
8. [ ] See package selection event
9. [ ] Fill booking form
10. [ ] See form field engagement events
11. [ ] Submit form
12. [ ] See booking started event
13. [ ] Complete booking
14. [ ] See booking lead event with booking ID

### Scenario 2: Contact Channel
1. [ ] Scroll to contact section
2. [ ] Click phone button
3. [ ] See contact channel click event with phone channel
4. [ ] Click email button
5. [ ] See contact channel click event with email channel

### Scenario 3: Scroll Depth
1. [ ] Open page
2. [ ] See page view
3. [ ] Scroll to 25% down page
4. [ ] See scroll milestone event (25%)
5. [ ] Continue scrolling to 50%
6. [ ] See scroll milestone event (50%)
7. [ ] Continue to 75% and 100%
8. [ ] See corresponding milestone events

## Sign-Off

| Role | Name | Date | Notes |
|------|------|------|-------|
| Developer | _____ | _____ | Implementation complete |
| QA | _____ | _____ | Testing verified |
| Team Lead | _____ | _____ | Approved for production |
| Product | _____ | _____ | Metrics defined |

## Notes

Use this space for any additional notes or customizations:

```
[Your notes here]
```

## Support

For questions or issues:
1. Check QUICK_REFERENCE.md for quick lookup
2. Check INTEGRATION_GUIDE.md for examples
3. Check README.md for detailed documentation
4. Review troubleshooting section in README.md
