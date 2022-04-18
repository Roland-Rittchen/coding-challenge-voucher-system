const baseUrl = 'http://localhost:3000';

test('assert the page is loading, basic test functionality is there', async () => {
  await page.goto(`${baseUrl}/`);
  // Expect that the page URL will be correct
  expect(page.url()).toBe(`${baseUrl}/`);
  // Match any page content
  await expect(page).toMatch('Home page');
});

test('register, buy vouchers, logout, redeem voucher', async () => {
  await page.goto(`${baseUrl}/`);
  // Expect that the page URL will be correct
  expect(page.url()).toBe(`${baseUrl}/`);
  console.log('1');

  // go to the register page
  await expect(page).toClick('[data-test-id="register-link"]');
  await page.waitForNavigation();
  // Expect that the page URL will be correct
  expect(page.url()).toBe(`${baseUrl}/register`);
  await expect(page).toMatch('Register');
  console.log('2');

  // Fill out registration
  await expect(page).toFill('[data-test-id="username-input"]', 'JohnDoe');
  await expect(page).toFill('[data-test-id="password-input"]', 'JohnnyD123');
  await expect(page).toClick('[data-test-id="register-button"]');
  await page.waitForNetworkIdle();
  expect(page.url()).toBe(`${baseUrl}/`);
  console.log('3');

  // get voucher codes
  await expect(page).toClick('[data-test-id="vouchers-link"]');
  await page.waitForNetworkIdle();
  // Expect that the page URL will be correct
  expect(page.url()).toBe(`${baseUrl}/vouchers`);
  await expect(page).toMatch('Vouchers');
  console.log('4');

  // buy vouchers
  await expect(page).toFill('[data-test-id="product-quantity"]', '5');
  await expect(page).toClick('[data-test-id="buy"]');
  await page.waitForNetworkIdle();
  // identify element
  const f = await page.$('[data-test-id="code-1"]');
  // obtain text
  const voucherCode = await (await f.getProperty('textContent')).jsonValue();
  console.log('5');

  // logout
  await expect(page).toClick('[data-test-id="logout-link"]');
  await page.waitForNetworkIdle();
  // fill voucher code
  await expect(page).toFill('[data-test-id="voucher-code"]', voucherCode);
  await expect(page).toClick('[data-test-id="buy"]');
  page.on('dialog', async (dialog) => {
    // get alert message
    console.log(dialog.message());
    // accept alert
    await dialog.accept();
  });
});
