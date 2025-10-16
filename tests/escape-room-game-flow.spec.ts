import { test, expect } from '@playwright/test';

test.describe('Escape Room Game Flow', () => {
  test('should allow user to complete stages and show timer', async ({ page }) => {
    await page.goto('/escaperoom');
    
    // Check initial state
    await expect(page.locator('h1')).toContainText('Escape Room - Code Your Way Out!');
    
    // Set timer and player name
    await page.fill('input[placeholder="enter your name (optional)"]', 'TestPlayer');
    await page.click('button:has-text("START")');
    
    // Check timer is visible and running
    await expect(page.locator('text=Time Remaining')).toBeVisible();
    
    // Stage 1: Math question (2 + 4 = 6)
    await expect(page.locator('text=Stage 1 - Basic Math')).toBeVisible();
    await page.fill('input[placeholder="type answer here"]', '6');
    await page.click('button:has-text("submit")');
    
    // Stage 2: Missing syntax (semicolon)
    await expect(page.locator('text=Stage 2 - Find Missing Syntax')).toBeVisible();
    await page.fill('input', 'semicolon');
    await page.click('button:has-text("submit")');
    
    // Stage 3: Generate numbers
    await expect(page.locator('text=Stage 3 - Generate Numbers')).toBeVisible();
    await page.fill('textarea', 'function() { return [0,1,2,3,4,5,6,7,8,9,10]; }');
    await page.click('button:has-text("submit")');
    
    // Use skip button for remaining stages to test skip functionality
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');  
    await page.click('button:has-text("skip this")');
    await page.click('button:has-text("skip this")');
    
    // Should reach win screen
    await expect(page.locator('text=YOU ESCAPED!')).toBeVisible();
    await expect(page.locator('text=nice job you solved everything')).toBeVisible();
  });

  test('should handle timer controls and give up functionality', async ({ page }) => {
    await page.goto('/escaperoom');
    
    // Set timer to different values
    await page.click('button:has-text("-")');
    await page.click('button:has-text("-")'); 
    // Should show timer decreased (check for specific timer display)
    await expect(page.locator('.text-2xl:has-text("min")')).toBeVisible();
    
    await page.click('button:has-text("START")');
    
    // Check game started and give up to test that functionality
    await expect(page.locator('text=Stage 1/7')).toBeVisible();
    await page.click('button:has-text("give up")');
    
    // Should return to start screen or show game over
    await expect(page.locator('h1')).toBeVisible();
  });
});
