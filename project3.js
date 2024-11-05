describe('Performance Glitch User Flow', () => {
    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/');
        await $('#user-name').setValue('performance_glitch_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
    });

    it('should complete purchase with filtering and verify items', async () => {
        // Reset App State
        await $('#react-burger-menu-btn').click();
        await browser.pause(1000);
        await $('#reset_sidebar_link').click();

        // Sort items Z to A
        await $('.product_sort_container').selectByVisibleText('Name (Z to A)');

        // Add the first product to the cart
        const firstProduct = await $$('.inventory_item')[0];
        await firstProduct.$('.btn_inventory').click();

        // Navigate to checkout
        await $('.shopping_cart_link').click();
        await $('#checkout').click();

        // Fill out the checkout form
        await $('#first-name').setValue('John');
        await $('#last-name').setValue('Doe');
        await $('#postal-code').setValue('12345');
        await $('#continue').click();

        // Verify product name and total price
        const cartItems = await $$('.inventory_item_name');
        expect(cartItems).toHaveLength(1);

        const totalPrice = await $('.summary_total_label').getText();
        expect(totalPrice).toContain('Total');

        // Finish purchase and check success
        await $('#finish').click();
        const successMessage = await $('.complete-header').getText();
        expect(successMessage).toBe('THANK YOU FOR YOUR ORDER');

        // Reset state and logout
        await $('#react-burger-menu-btn').click();
        await browser.pause(1000);
        await $('#reset_sidebar_link').click();
        await $('#logout_sidebar_link').click();
    });
});