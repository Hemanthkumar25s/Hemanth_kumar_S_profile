import { test, expect, type Page } from '@playwright/test'

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Open the assistant panel and wait for the welcome greeting to render */
async function openAssistant(page: Page) {
  // Retry clicking if React hasn't hydrated yet (common on first test run)
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.locator('[data-testid="assistant-toggle"]').click()
    try {
      await expect(page.locator('[data-testid="assistant-panel"]')).toBeVisible({ timeout: 6000 })
      break
    } catch {
      if (attempt < 2) {
        await page.waitForTimeout(500)
      } else {
        throw new Error('Assistant panel did not appear after 3 click attempts')
      }
    }
  }
  // Wait for the welcome greeting to fully render before any sendMessage calls
  // so that countBefore captures the greeting message
  await expect(
    page.locator('[data-testid="assistant-panel"] .justify-start > div')
  ).toHaveCount(1, { timeout: 10000 })
}

/** Get the number of assistant messages currently displayed */
async function getAssistantMessageCount(page: Page): Promise<number> {
  return page.locator('[data-testid="assistant-panel"] .justify-start > div').count()
}

/** Get all assistant message text contents */
async function getAssistantMessages(page: Page): Promise<string[]> {
  const msgs = page.locator('[data-testid="assistant-panel"] .justify-start > div')
  const count = await msgs.count()
  const texts: string[] = []
  for (let i = 0; i < count; i++) {
    texts.push(await msgs.nth(i).innerText())
  }
  return texts
}

/** Get all user message text contents */
async function getUserMessages(page: Page): Promise<string[]> {
  const msgs = page.locator('[data-testid="assistant-panel"] .justify-end > div')
  const count = await msgs.count()
  const texts: string[] = []
  for (let i = 0; i < count; i++) {
    texts.push(await msgs.nth(i).innerText())
  }
  return texts
}

/** Type a message and click the send button, then wait for an assistant response to appear */
async function sendMessage(page: Page, text: string) {
  const input = page.locator('[data-testid="assistant-input"]')
  await input.fill(text)

  const countBefore = await getAssistantMessageCount(page)
  await page.locator('[data-testid="assistant-send"]').click()

  // Wait for a new assistant message to appear (typing simulation finishes)
  await page.waitForFunction(
    ({ expectedCount }) => {
      const msgs = document.querySelectorAll('[data-testid="assistant-panel"] .justify-start > div')
      return msgs.length > expectedCount
    },
    { expectedCount: countBefore },
    { timeout: 5000 }
  )
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe('PersonalAssistant - AI Chat', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for the toggle button to be interactive (React hydration complete)
    await page.locator('[data-testid="assistant-toggle"]').waitFor({ state: 'visible', timeout: 15000 })
  })

  test('should render the toggle button on the page', async ({ page }) => {
    await expect(page.locator('[data-testid="assistant-toggle"]')).toBeVisible()
  })

  test('should open the chat panel when button is clicked', async ({ page }) => {
    await openAssistant(page)
    // Panel should already be visible from openAssistant
    await expect(page.locator('[data-testid="assistant-panel"]')).toBeVisible()
  })

  test('should close the chat panel when button is clicked again', async ({ page }) => {
    await openAssistant(page)

    await page.locator('[data-testid="assistant-toggle"]').click()
    await expect(page.locator('[data-testid="assistant-panel"]')).not.toBeVisible()
  })

  test('should send a welcome greeting on first open', async ({ page }) => {
    await openAssistant(page)

    // Greeting should already be rendered from openAssistant
    await expect(
      page.locator('[data-testid="assistant-panel"] .justify-start > div')
    ).toHaveCount(1)
  })

  test('the input field should be focused when chat opens', async ({ page }) => {
    await openAssistant(page)
    await expect(page.locator('[data-testid="assistant-input"]')).toBeFocused()
  })

  test('should respond to a greeting', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'hello')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('Hello')
  })

  test('should respond to "about" with Hemanth info', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'tell me about Hemanth')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('Hemanth Kumar S')
  })

  test('should respond to "skills" with skills info', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'what skills does he have')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('JavaScript')
  })

  test('should respond to "projects" with project list', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'what projects has he built')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('GramaYatri')
  })

  test('should respond to "education" with education info', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'where does he study')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('JSS Academy')
  })

  test('should respond to "contact" with contact info', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'how can I contact him')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('hemanthkumar.s3125@gmail.com')
  })

  test('should respond to "resume" with resume info', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'tell me about his resume')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('Student Developer')
  })

  test('should respond to "help" with capabilities list', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'help')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('About Hemanth')
  })

  test('should respond to "github" with GitHub info', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'what is his GitHub')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('Hemanthkumar25s')
  })

  test('should respond to "services" with services info', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'what services does he offer')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('Web Development')
  })

  test('should respond to "testimonials" with testimonial info', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'what do people say about him')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('thoughtful engineering')
  })

  test('should provide fallback for unknown queries', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'what is the meaning of life')

    const msgs = await getAssistantMessages(page)
    const lastMsg = msgs[msgs.length - 1]
    expect(lastMsg).toContain('not sure')
  })

  test('should clear input after sending a message', async ({ page }) => {
    await openAssistant(page)
    await sendMessage(page, 'hello')

    await expect(page.locator('[data-testid="assistant-input"]')).toHaveValue('')
  })

  test.describe('Contact Form Flow', () => {
    test('should start contact flow when user says "send message"', async ({ page }) => {
      await openAssistant(page)
      await sendMessage(page, 'send a message')

      const msgs = await getAssistantMessages(page)
      const lastMsg = msgs[msgs.length - 1]
      expect(lastMsg).toContain('your name')

      // Input placeholder should indicate name is expected
      await expect(page.locator('[data-testid="assistant-input"]')).toHaveAttribute('placeholder', /name/i)
    })

    test('should ask for email after name is provided', async ({ page }) => {
      await openAssistant(page)
      await sendMessage(page, 'send a message')

      // Enter name
      await sendMessage(page, 'John Doe')

      const msgs = await getAssistantMessages(page)
      const lastMsg = msgs[msgs.length - 1]
      expect(lastMsg).toContain('email')
    })

    test('should validate email format', async ({ page }) => {
      await openAssistant(page)
      await sendMessage(page, 'send a message')

      // Enter name
      await sendMessage(page, 'John Doe')

      // Enter invalid email
      await sendMessage(page, 'not-an-email')

      const msgs = await getAssistantMessages(page)
      const lastMsg = msgs[msgs.length - 1]
      expect(lastMsg).toContain('valid email')
    })

    test('should ask for message after valid email', async ({ page }) => {
      await openAssistant(page)
      await sendMessage(page, 'send a message')

      // Enter name
      await sendMessage(page, 'John Doe')

      // Enter valid email
      await sendMessage(page, 'john@example.com')

      const msgs = await getAssistantMessages(page)
      const lastMsg = msgs[msgs.length - 1]
      expect(lastMsg).toContain('message')
    })
  })

  test.describe('Project Detail', () => {
    test('should provide details about a specific project', async ({ page }) => {
      await openAssistant(page)
      await sendMessage(page, 'tell me about GramaYatri')

      const msgs = await getAssistantMessages(page)
      const lastMsg = msgs[msgs.length - 1]
      expect(lastMsg).toContain('GramaYatri')
      expect(lastMsg).toContain('Completed')
    })
  })

  test.describe('Multi-turn Conversation', () => {
    test('should handle multiple messages in sequence', async ({ page }) => {
      await openAssistant(page)

      // First question — wait for its response to appear
      await sendMessage(page, 'hello')
      let msgs = await getAssistantMessages(page)
      expect(msgs[msgs.length - 1]).toContain('Hello')

      // Second question
      await sendMessage(page, 'what skills does he have')
      msgs = await getAssistantMessages(page)
      expect(msgs[msgs.length - 1]).toContain('JavaScript')

      // Third question
      await sendMessage(page, 'what projects')
      msgs = await getAssistantMessages(page)
      expect(msgs[msgs.length - 1]).toContain('GramaYatri')

      // Verify user messages were recorded
      const userMsgs = await getUserMessages(page)
      expect(userMsgs.length).toBe(3)
    })
  })
})
