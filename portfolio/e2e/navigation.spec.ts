import { test, expect, type Page } from '@playwright/test'

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Navigate to a page and wait for it to be ready */
async function gotoPage(page: Page, url: string) {
  await page.goto(url)
  await page.waitForLoadState('domcontentloaded')
}

/** Get the desktop navbar (visible on md+) */
function desktopNav(page: Page) {
  return page.locator('nav .hidden.md\\:flex, nav div:not(.md\\:hidden)').filter({ has: page.locator('a[href]') }).first()
}

// ─── Navigation ──────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  test('should have a working Navbar with all links', async ({ page }) => {
    await gotoPage(page, '/')

    const nav = page.locator('nav')
    await expect(nav).toBeVisible()

    const links = ['Home', 'About', 'Skills', 'Projects', 'Resume', 'Contact']
    for (const label of links) {
      await expect(nav.getByRole('link', { name: label }).first()).toBeVisible()
    }
  })

  test('should navigate to About page via Navbar', async ({ page }) => {
    await gotoPage(page, '/')
    await page.getByRole('link', { name: 'About' }).first().click()
    await page.waitForURL('**/about')
    await expect(page.locator('h2')).toContainText('About Me')
  })

  test('should navigate to Skills page via Navbar', async ({ page }) => {
    await gotoPage(page, '/')
    await page.getByRole('link', { name: 'Skills' }).first().click()
    await page.waitForURL('**/skills')
    await expect(page.locator('h2')).toContainText('Skills')
  })

  test('should navigate to Projects page via Navbar', async ({ page }) => {
    await gotoPage(page, '/')
    await page.getByRole('link', { name: 'Projects' }).first().click()
    await page.waitForURL('**/projects')
    await expect(page.locator('h2')).toContainText('Projects')
  })

  test('should navigate to Resume page via Navbar', async ({ page }) => {
    await gotoPage(page, '/')
    await page.getByRole('link', { name: 'Resume' }).first().click()
    await page.waitForURL('**/resume')
    await expect(page.locator('h1')).toContainText('Resume')
  })

  test('should navigate to Contact page via Navbar', async ({ page }) => {
    await gotoPage(page, '/')
    await page.getByRole('link', { name: 'Contact' }).first().click()
    await page.waitForURL('**/contact')
    await expect(page.locator('h2')).toContainText('Get In Touch')
  })

  test('Navbar should highlight the active page', async ({ page }) => {
    await gotoPage(page, '/about')
    await expect(page.getByRole('link', { name: 'About' }).first()).toHaveClass(/text-accent/)
  })

  test('mobile hamburger menu button should be visible on small viewports', async ({ page }) => {
    await gotoPage(page, '/')
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    // The hamburger button has class md:hidden (hidden on desktop)
    const hamburger = page.locator('nav button.md\\:hidden').first()
    await expect(hamburger).toBeVisible()
  })
})

// ─── Home Page ───────────────────────────────────────────────────────────────

test.describe('Home Page', () => {
  test('should display the Hero section with key elements', async ({ page }) => {
    await gotoPage(page, '/')

    const hero = page.locator('#home')
    await expect(hero).toBeVisible()

    // Check name/title - Typewriter animation produces "Hemanth"
    await expect(hero.locator('h1')).toContainText('Hemanth')

    // Check subtitle
    await expect(hero.getByText('Student Developer & Tech Enthusiast')).toBeVisible()

    // Check CTA buttons
    await expect(hero.getByRole('link', { name: 'View Projects' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'View Resume' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'Get in Touch' })).toBeVisible()

    // Check profile image in the hero section
    await expect(hero.locator('img[alt="Hemanth Kumar S"]')).toBeVisible()

    // Check social icons
    await expect(hero.locator('a[title="GitHub"]')).toBeVisible()
    await expect(hero.locator('a[title="LinkedIn"]')).toBeVisible()

    // Check scroll indicator
    await expect(hero.getByText('Scroll down')).toBeVisible()
  })

  test('should display the Stats section with key metrics', async ({ page }) => {
    await gotoPage(page, '/')

    const statsSection = page.locator('#stats')
    await expect(statsSection).toBeVisible()

    // Check stat values using more specific selectors to avoid strict mode
    await expect(statsSection.locator('.text-4xl').filter({ hasText: '17+' })).toBeVisible()
    await expect(statsSection.getByText('Featured Projects')).toBeVisible()
    await expect(statsSection.getByText('GitHub Repositories')).toBeVisible()
  })

  test('should display the What I Do / Areas of Expertise section', async ({ page }) => {
    await gotoPage(page, '/')

    // Wait for the Typewriter animation on this section to finish
    await expect(page.locator('section').filter({ hasText: 'Areas of Expertise' }).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Who I am').first()).toBeVisible()
    await expect(page.getByText('Web Development').first()).toBeVisible()
    await expect(page.getByText('Mobile Apps').first()).toBeVisible()
  })
})

// ─── About Page ──────────────────────────────────────────────────────────────

test.describe('About Page', () => {
  test('should display About Me content', async ({ page }) => {
    await gotoPage(page, '/about')

    await expect(page.locator('h2')).toContainText('About Me')
    await expect(page.getByText('Bachelor of Engineering')).toBeVisible()
    await expect(page.getByText('JSS Academy of Technical Education').first()).toBeVisible()
    await expect(page.getByText('Full Stack Developer').first()).toBeVisible()
  })

  test('should display education section', async ({ page }) => {
    await gotoPage(page, '/about')
    await expect(page.getByText('Education').first()).toBeVisible()
    await expect(page.getByText('Student').first()).toBeVisible()
  })
})

// ─── Skills Page ─────────────────────────────────────────────────────────────

test.describe('Skills Page', () => {
  test('should display all skill categories', async ({ page }) => {
    await gotoPage(page, '/skills')

    await expect(page.locator('h2')).toContainText('Skills')

    // Check category headings using scoped selectors
    const skillsSection = page.locator('#skills').first()
    const categories = ['Languages', 'Frontend', 'Backend', 'Mobile', 'Tools', 'AI/ML']
    for (const cat of categories) {
      await expect(skillsSection.getByText(cat).first()).toBeVisible()
    }
  })

  test('should display skill items for each category', async ({ page }) => {
    await gotoPage(page, '/skills')

    const skills = ['JavaScript', 'React', 'Node.js', 'Android Studio', 'Git', 'Gemini AI']
    for (const skill of skills) {
      // Each skill is rendered inside a span.rounded-full element
      await expect(page.locator('span.rounded-full').filter({ hasText: skill }).first()).toBeVisible()
    }
  })

  test('should display Core Competencies section with progress bars', async ({ page }) => {
    await gotoPage(page, '/skills')

    await expect(page.getByText('Core Competencies').first()).toBeVisible()
    await expect(page.getByText('Technical Proficiency').first()).toBeVisible()
    await expect(page.getByText('Full Stack Development').first()).toBeVisible()
    await expect(page.getByText('Mobile Development').first()).toBeVisible()
    await expect(page.getByText('Frontend Design').first()).toBeVisible()
    await expect(page.getByText('Backend Architecture').first()).toBeVisible()
    await expect(page.getByText('Database Management').first()).toBeVisible()
  })
})

// ─── Projects Page ───────────────────────────────────────────────────────────

test.describe('Projects Page', () => {
  test('should display Featured Projects section', async ({ page }) => {
    await gotoPage(page, '/projects')

    await expect(page.locator('h2')).toContainText('Featured Projects')
  })

  test('should display all project cards', async ({ page }) => {
    await gotoPage(page, '/projects')

    const projects = [
      'GramaYatri',
      'Sante Price Index',
      'AI Based Mock Interview Platform',
      'Mini Social Media Platform',
      'VogueAI',
      'AI Interior Design Consultant',
    ]
    for (const project of projects) {
      // Each project title is in an h3 element
      await expect(page.locator('h3').filter({ hasText: project }).first()).toBeVisible()
    }
  })

  test('GramaYatri should display sub-app links', async ({ page }) => {
    await gotoPage(page, '/projects')

    // GramaYatri has app links with specific names
    await expect(page.getByText('GramaYatri User').first()).toBeVisible()
    await expect(page.getByText('GramaYatri Driver').first()).toBeVisible()
    await expect(page.getByText('GramaYatri Ticketing').first()).toBeVisible()
  })

  test('should have a View All Projects on GitHub button', async ({ page }) => {
    await gotoPage(page, '/projects')

    const githubBtn = page.getByText('View All Projects on GitHub')
    await expect(githubBtn).toBeVisible()
    await expect(githubBtn).toHaveAttribute('href', 'https://github.com/Hemanthkumar25s')
  })
})

// ─── Resume Page ─────────────────────────────────────────────────────────────

test.describe('Resume Page', () => {
  test('should display Resume section', async ({ page }) => {
    await gotoPage(page, '/resume')

    await expect(page.locator('h1')).toContainText('Resume')
  })

  test('should have a Download Resume button', async ({ page }) => {
    await gotoPage(page, '/resume')

    const downloadBtn = page.getByText('Download Resume')
    await expect(downloadBtn).toBeVisible()
    await expect(downloadBtn).toHaveAttribute('href', '/resume.pdf')
    await expect(downloadBtn).toHaveAttribute('download')
  })

  test('should have a Contact Me button', async ({ page }) => {
    await gotoPage(page, '/resume')

    const contactBtn = page.getByText('Contact Me')
    await expect(contactBtn).toBeVisible()
    await expect(contactBtn).toHaveAttribute('href', 'mailto:hemanthkumar.s3125@gmail.com')
  })

  test('should embed a resume iframe', async ({ page }) => {
    await gotoPage(page, '/resume')

    const iframe = page.locator('iframe[title="Resume"]')
    await expect(iframe).toBeVisible()
    await expect(iframe).toHaveAttribute('src', '/resume.pdf')
  })
})

// ─── Contact Page ────────────────────────────────────────────────────────────

test.describe('Contact Page', () => {
  test('should display Get In Touch section', async ({ page }) => {
    await gotoPage(page, '/contact')

    await expect(page.locator('h2')).toContainText('Get In Touch')
  })

  test('should display contact information cards', async ({ page }) => {
    await gotoPage(page, '/contact')

    await expect(page.getByText('hemanthkumar.s3125@gmail.com').first()).toBeVisible()
    await expect(page.getByText('Bangalore, Karnataka, India').first()).toBeVisible()
    await expect(page.getByText('github.com/Hemanthkumar25s').first()).toBeVisible()
    await expect(page.getByText('linkedin.com/in/hemanthkumars25').first()).toBeVisible()
  })

  test('should have a working contact form with all fields', async ({ page }) => {
    await gotoPage(page, '/contact')

    // Form fields
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()

    // Submit button
    const submitBtn = page.locator('button[type="submit"]')
    await expect(submitBtn).toBeVisible()
    await expect(submitBtn).toContainText('Send Message')
  })

  test('contact form should show sending state on submit', async ({ page }) => {
    await gotoPage(page, '/contact')

    // Fill the form
    await page.locator('input[name="name"]').fill('Test User')
    await page.locator('input[name="email"]').fill('test@example.com')
    await page.locator('textarea[name="message"]').fill('This is a test message.')

    // Submit
    await page.locator('button[type="submit"]').click()

    // Should show sending state (API will fail without Formspree endpoint)
    await expect(page.locator('button[type="submit"]')).toContainText('Sending')
  })

  test('should have social links section at the bottom', async ({ page }) => {
    await gotoPage(page, '/contact')

    await expect(page.getByText('Connect With Me').first()).toBeVisible()
    // Last occurrence of these links (the social section at the bottom)
    await expect(page.locator('a[title="GitHub"]').last()).toBeVisible()
    await expect(page.locator('a[title="LinkedIn"]').last()).toBeVisible()
    await expect(page.locator('a[title="Gmail"]').first()).toBeVisible()
  })

  test('privacy notice should be visible', async ({ page }) => {
    await gotoPage(page, '/contact')

    await expect(page.getByText(/Privacy notice/)).toBeVisible()
  })
})

// ─── Footer ──────────────────────────────────────────────────────────────────

test.describe('Footer', () => {
  test('should display footer with brand and links on home page', async ({ page }) => {
    await gotoPage(page, '/')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    // Brand name - use the footer's scoped selector
    await expect(footer.locator('div').filter({ hasText: 'Hemanth Kumar S' }).first()).toBeVisible()
    await expect(footer.getByText('Quick Links')).toBeVisible()
    await expect(footer.getByText('Follow Me')).toBeVisible()
  })

  test('footer should have social links', async ({ page }) => {
    await gotoPage(page, '/about')

    const footer = page.locator('footer')
    await expect(footer.locator('a[title="GitHub"]')).toBeVisible()
    await expect(footer.locator('a[title="LinkedIn"]')).toBeVisible()
    await expect(footer.locator('a[title="Email"]')).toBeVisible()
  })

  test('footer should display copyright', async ({ page }) => {
    await gotoPage(page, '/')

    await expect(page.locator('footer').getByText(/All rights reserved/)).toBeVisible()
  })
})

// ─── Cross-Page Consistency ──────────────────────────────────────────────────

test.describe('Cross-Page Consistency', () => {
  test('page title should contain name on home', async ({ page }) => {
    await gotoPage(page, '/')
    await expect(page).toHaveTitle(/Hemanth Kumar S/)
  })

  test('photo logo should be visible on all pages', async ({ page }) => {
    const urls = ['/', '/about', '/skills', '/projects', '/resume', '/contact']
    for (const url of urls) {
      await gotoPage(page, url)
      await expect(page.locator('nav img[alt="Hemanth Kumar S"]')).toBeVisible()
    }
  })

  test('Footer should be present on all pages', async ({ page }) => {
    const urls = ['/', '/about', '/skills', '/projects', '/resume', '/contact']
    for (const url of urls) {
      await gotoPage(page, url)
      await expect(page.locator('footer')).toBeVisible()
    }
  })

  test('CursorPet should be present on all pages', async ({ page }) => {
    const urls = ['/', '/about', '/skills', '/projects', '/resume', '/contact']
    for (const url of urls) {
      await gotoPage(page, url)
      // CursorPet is in a fixed-position div at bottom-left with z-40
      await expect(page.locator('.fixed.bottom-5.left-5.z-40')).toBeAttached()
    }
  })
})

// ─── 404 Page ────────────────────────────────────────────────────────────────

test.describe('404 Page Handling', () => {
  test('should show Next.js 404 for unknown routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist', { waitUntil: 'domcontentloaded' })
    // Next.js returns 404 status code
    expect(response?.status()).toBe(404)
    // The page title typically has "404" in Next.js
    const title = await page.title()
    expect(title).toContain('404')
  })
})
