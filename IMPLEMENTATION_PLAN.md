# SOBA Calgary Website Implementation Plan

## Overview
Update the SOBA Ontario source code to create a professional, modern website for SOBA Calgary (Sasse Old Boys Association Network - Calgary).

## Current State Analysis

### Repository Structure
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Database: Drizzle ORM with Neon
- Authentication: NextAuth with Drizzle adapter
- Payment Processing: Stripe integration

### Current Branding (Ontario)
- **Colors**: Navy blue (#1e3a8a), red (#dc2626), white
- **Typography**: Inter font family
- **Logo**: SOBA Ontario branding
- **Tagline**: "Building stronger communities together"

## Implementation Plan

### Phase 1: Branding Updates

#### 1.1 Update Branding Elements
- **Logo**: Replace Ontario-specific logo with Calgary branding
- **Color Scheme**: Keep navy blue and red, but update to Calgary-specific palette
- **Tagline**: Update to "Serving Calgary with pride" or similar
- **Favicon**: Update to Calgary-specific icon

#### 1.2 Update Text Content
- Replace "Ontario" with "Calgary" throughout the site
- Update mission statement to focus on Calgary community
- Update about page with Calgary-specific history and information

### Phase 2: Navigation Structure

#### 2.1 Update Header Navigation
- Keep core navigation: Home, About, Membership, Events, Donate, News, Gallery, Contact
- Update links to Calgary-specific pages
- Add Calgary-specific menu items if needed

#### 2.2 Update Footer
- Update copyright to "© 2024 SOBA Calgary"
- Update address to Calgary location
- Update contact information to Calgary-specific details

### Phase 3: Content Updates

#### 3.1 Home Page
- Update hero section with Calgary imagery
- Update welcome message to Calgary community
- Update featured content to highlight Calgary initiatives

#### 3.2 About Page
- Rewrite history section for Calgary chapter
- Update leadership team to Calgary members
- Update organizational structure for Calgary

#### 3.3 Membership Page
- Update membership benefits for Calgary members
- Update pricing (if different from Ontario)
- Update registration form for Calgary-specific fields

#### 3.4 Events Page
- Update events calendar to show Calgary events
- Update event categories to Calgary-specific types
- Update event registration for Calgary location

#### 3.5 Donation Page
- Update donation amounts to Calgary recommendations
- Update donation impact statements for Calgary programs
- Update tax receipt information for Calgary

#### 3.6 News Page
- Update news feed to show Calgary-specific news
- Update news categories to Calgary topics

#### 3.7 Gallery Page
- Update photo gallery with Calgary images
- Update gallery categories to Calgary events

#### 3.8 Contact Page
- Update contact form for Calgary inquiries
- Update address to Calgary location
- Update map to show Calgary location

### Phase 4: Technical Updates

#### 4.1 Configuration Files
- Update site metadata in layout files
- Update SEO tags for Calgary-specific keywords
- Update environment variables for Calgary settings

#### 4.2 Database Schema
- Review if any Calgary-specific data fields are needed
- Update any location-based fields

#### 4.3 API Endpoints
- Update any location-specific API logic
- Update geolocation services if used

### Phase 5: Testing and Validation

#### 5.1 Functional Testing
- Test all navigation links
- Test membership registration flow
- Test donation process
- Test event registration
- Test contact form submission

#### 5.2 Content Review
- Review all text for accuracy
- Review all images for Calgary relevance
- Review all links for correctness

#### 5.3 Responsive Testing
- Test on mobile devices
- Test on tablet devices
- Test on desktop browsers

### Phase 6: Deployment

#### 6.1 Git Workflow
- Commit all changes with clear messages
- Push to GitHub repository
- Create pull request for review

#### 6.2 Production Deployment
- Deploy to production environment
- Monitor for any issues
- Perform final validation

## Files to Modify

### Critical Files
1. `app/layout.tsx` - Site metadata and structure
2. `app/page.tsx` - Home page content
3. `components/Header.tsx` - Navigation and branding
4. `components/Footer.tsx` - Footer information
5. `components/Features.tsx` - Focus areas
6. `components/Hero.tsx` - Hero section
7. `components/AboutSection.tsx` - About content
8. `components/ContactForm.tsx` - Contact form
9. `components/MembershipForm.tsx` - Membership registration
10. `components/DonationForm.tsx` - Donation process

### Configuration Files
1. `lib/constants.ts` - Site constants and configuration
2. `lib/utils.ts` - Utility functions
3. `.env.local` - Environment variables
4. `next.config.js` - Next.js configuration

### Content Files
1. `content/about.md` - About page content
2. `content/membership.md` - Membership content
3. `content/events.md` - Events content
4. `content/news.md` - News content
5. `content/gallery.md` - Gallery content

## Branding Guidelines for Calgary

### Colors
- **Primary Navy**: #1e3a8a (keep same)
- **Primary Red**: #dc2626 (keep same)
- **Secondary Blue**: #3b82f6 (Calgary-specific)
- **Accent Green**: #10b981 (Calgary-specific)

### Typography
- **Font Family**: Inter (keep same)
- **Headings**: Bold, Calgary-specific styling
- **Body**: Clean, readable typography

### Imagery
- Use Calgary landmarks and community scenes
- Use diverse Calgary community members
- Use professional photography style

### Messaging
- Focus on Calgary community needs
- Highlight local impact and programs
- Use inclusive, welcoming language

## Implementation Timeline

### Week 1: Branding and Content Updates
- Update all branding elements
- Update all text content
- Update all images and media

### Week 2: Technical Implementation
- Update configuration files
- Update database schema if needed
- Update API endpoints if needed

### Week 3: Testing and Validation
- Perform functional testing
- Perform content review
- Perform responsive testing

### Week 4: Deployment
- Commit and push changes
- Deploy to production
- Monitor and validate

## Risk Assessment

### Potential Risks
1. **Content Accuracy**: Ensuring all Calgary-specific information is correct
2. **Branding Consistency**: Maintaining consistent Calgary branding throughout
3. **Functionality Issues**: Ensuring all features work correctly with Calgary data
4. **SEO Impact**: Managing SEO changes during transition

### Mitigation Strategies
1. **Content Review**: Have Calgary team review all content before launch
2. **Branding Guidelines**: Create and follow Calgary-specific branding guidelines
3. **Testing**: Comprehensive testing before deployment
4. **SEO Plan**: Implement 301 redirects and update sitemap

## Success Criteria

### Primary Success Metrics
1. All pages display Calgary-specific content correctly
2. All functionality works as expected
3. Branding is consistent throughout the site
4. Site is responsive on all devices
5. Content is accurate and up-to-date

### Secondary Success Metrics
1. Positive feedback from Calgary team
2. Increased engagement from Calgary community
3. Successful membership registrations
4. Successful donation processing
5. Successful event registrations

## Next Steps

1. Review this plan with the Calgary team
2. Get approval on branding guidelines
3. Begin implementation with Phase 1
4. Schedule regular check-ins with Calgary team
5. Plan for testing and validation
