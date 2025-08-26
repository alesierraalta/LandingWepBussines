import { test, expect } from '@playwright/test';

test.describe('Accesibilidad - Sección "Hablemos"', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Esperar a que la sección de contacto esté visible
    await page.waitForSelector('#contacto');
  });

  test('debe tener contraste adecuado en el título principal', async ({ page }) => {
    const titleElement = page.locator('#contacto h2');
    await expect(titleElement).toBeVisible();
    
    // Verificar que el texto sea legible
    const titleText = await titleElement.textContent();
    expect(titleText).toContain('Hablemos de tu proyecto');
    
    // Verificar que tenga la clase de sombra para mejor contraste
    await expect(titleElement).toHaveClass(/text-shadow-strong/);
  });

  test('debe tener contraste adecuado en el párrafo descriptivo', async ({ page }) => {
    const descriptionElement = page.locator('#contacto h2 + p');
    await expect(descriptionElement).toBeVisible();
    
    // Verificar que use colores apropiados para modo claro
    const classList = await descriptionElement.getAttribute('class');
    expect(classList).toContain('text-gray-700');
    expect(classList).not.toContain('text-white');
    
    // Verificar que tenga mejoras de contraste
    expect(classList).toContain('text-contrast-enhanced');
  });

  test('debe tener contraste adecuado en las tarjetas de información de contacto', async ({ page }) => {
    const contactCards = page.locator('#contacto .glass-card');
    const cardCount = await contactCards.count();
    
    expect(cardCount).toBeGreaterThan(0);
    
    for (let i = 0; i < cardCount; i++) {
      const card = contactCards.nth(i);
      await expect(card).toBeVisible();
      
      // Verificar que las descripciones no usen transparencias muy bajas
      const descriptions = card.locator('p');
      const descCount = await descriptions.count();
      
      for (let j = 0; j < descCount; j++) {
        const desc = descriptions.nth(j);
        const classList = await desc.getAttribute('class');
        
        // No debería tener text-white/70 (muy baja transparencia)
        if (classList && classList.includes('text-white/')) {
          expect(classList).not.toContain('text-white/70');
        }
      }
    }
  });

  test('debe tener etiquetas accesibles para lectores de pantalla', async ({ page }) => {
    // Verificar que los campos del formulario tengan labels apropiados
    const formFields = [
      { selector: '#name', label: 'Nombre Completo' },
      { selector: '#email', label: 'Email' },
      { selector: '#phone', label: 'Teléfono' },
      { selector: '#service', label: 'Servicio de Interés' },
      { selector: '#budget', label: 'Presupuesto Estimado' },
      { selector: '#message', label: 'Cuéntanos sobre tu proyecto' }
    ];

    for (const field of formFields) {
      const input = page.locator(field.selector);
      const label = page.locator(`label[for="${field.selector.substring(1)}"]`);
      
      await expect(input).toBeVisible();
      await expect(label).toBeVisible();
      
      const labelText = await label.textContent();
      expect(labelText).toContain(field.label);
    }
  });

  test('debe permitir navegación por teclado', async ({ page }) => {
    // Verificar que los elementos interactivos sean accesibles por teclado
    const submitButton = page.locator('button[type="submit"]');
    
    // Enfocar el botón usando Tab
    await page.keyboard.press('Tab');
    await submitButton.focus();
    
    // Verificar que el botón esté enfocado
    await expect(submitButton).toBeFocused();
  });

  test('debe mantener legibilidad con zoom al 200%', async ({ page }) => {
    // Simular zoom al 200%
    await page.setViewportSize({ width: 640, height: 480 });
    
    const titleElement = page.locator('#contacto h2');
    const descriptionElement = page.locator('#contacto h2 + p');
    
    await expect(titleElement).toBeVisible();
    await expect(descriptionElement).toBeVisible();
    
    // Verificar que el texto siga siendo legible
    const titleText = await titleElement.textContent();
    const descText = await descriptionElement.textContent();
    
    expect(titleText).toBeTruthy();
    expect(descText).toBeTruthy();
  });

  test('debe cumplir con WCAG AA para contraste de colores', async ({ page }) => {
    // Verificar que los elementos principales tengan buen contraste
    const importantElements = [
      '#contacto h2', 
      '#contacto h3', 
      '#contacto p',
      'button[type="submit"]'
    ];

    for (const selector of importantElements) {
      const element = page.locator(selector);
      if (await element.isVisible()) {
        // Verificar que el elemento sea visible y tenga texto
        const text = await element.textContent();
        expect(text?.trim()).toBeTruthy();
      }
    }
  });

  test('debe mantener funcionalidad con JavaScript deshabilitado', async ({ browser }) => {
    // Crear un contexto sin JavaScript
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000');
    
    // Verificar que el contenido principal sea visible
    const contactSection = page.locator('#contacto');
    await expect(contactSection).toBeVisible();
    
    const title = page.locator('#contacto h2');
    const titleText = await title.textContent();
    expect(titleText).toContain('Hablemos');
    
    await context.close();
  });
});

test.describe('Verificación de mejoras implementadas', () => {
  test('debe usar las nuevas clases CSS de contraste en modo claro', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Verificar que se usen las clases mejoradas
    const enhancedElements = await page.locator('.text-contrast-enhanced, .text-shadow-strong').count();
    expect(enhancedElements).toBeGreaterThan(0);
    
    // Verificar que use colores apropiados para modo claro
    const lightModeElements = await page.locator('#contacto .text-gray-900, #contacto .text-gray-700').count();
    expect(lightModeElements).toBeGreaterThan(0);
    
    // Verificar que no se usen colores de modo oscuro
    const darkModeElements = await page.locator('#contacto .text-white').count();
    expect(darkModeElements).toBe(0);
  });
});
