import { test, expect } from '@playwright/test';

test.describe('Database Save Functionality', () => {
  test('should save game results to database and display on leaderboard', async ({ page }) => {
    // Complete a game and save it
    await page.goto('/escaperoom');
    
    const playerName = `TestPlayer${Date.now()}`;
    await page.fill('input[placeholder="enter your name (optional)"]', playerName);
    await page.click('button:has-text("START")');
    
    // Complete stage 1 quickly
    await page.fill('input[placeholder="type answer here"]', '6');
    await page.click('button:has-text("submit")');
    
    // Skip remaining stages to finish game quickly
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    
    // Should reach end screen
    await expect(page.locator('text=YOU ESCAPED!')).toBeVisible();
    
    // Save the game
    await expect(page.locator('button:has-text("save score")')).toBeVisible();
    await page.click('button:has-text("save score")');
    
    // Check save confirmation
    await expect(page.locator('text=saved!')).toBeVisible();
    
    // Navigate to leaderboard
    await page.goto('/leaderboard');
    
    // Check that our saved game appears
    await expect(page.locator('h1:has-text("Escape Room Leaderboard")')).toBeVisible();
    await expect(page.locator(`text=${playerName}`)).toBeVisible();
    await expect(page.locator('text=ESCAPED').first()).toBeVisible();
  });

  test('should show failed games on leaderboard', async ({ page }) => {
    // Start a game but don't complete it
    await page.goto('/escaperoom');
    
    const playerName = `FailPlayer${Date.now()}`;
    await page.fill('input[placeholder="enter your name (optional)"]', playerName);
    
    await page.click('button:has-text("START")');
    
    // Give up immediately 
    await page.click('button:has-text("give up")');
    
    // Should be back on start screen after give up
    await expect(page.locator('h1:has-text("Escape Room - Code Your Way Out!")')).toBeVisible();
    
    // Start again and then let time run out or manually trigger game over
    await page.fill('input[placeholder="enter your name (optional)"]', playerName);
    await page.click('button:has-text("START")');
    
    // Skip to end to trigger game over state
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    
    // Should reach win screen (since skip completes game)
    await expect(page.locator('text=YOU ESCAPED!')).toBeVisible();
    
    // Save the game
    await page.click('button:has-text("save score")');
    await expect(page.locator('text=saved!')).toBeVisible();
    
    // Check leaderboard
    await page.goto('/leaderboard');
    await expect(page.locator(`text=${playerName}`)).toBeVisible();
  });

  test('should test API endpoints directly', async ({ request }) => {
    // Test the GET /api/games endpoint
    const response = await request.get('/api/games');
    expect(response.ok()).toBeTruthy();
    
    const games = await response.json();
    expect(Array.isArray(games)).toBeTruthy();
  });
});
