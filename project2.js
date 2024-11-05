describe('Standard User Flow', () => {
    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
    });

    it('should complete a purchase journey', async () => {
        // Reset App State
        await $('#react-burger-menu-btn').click();
        await browser.pause(1000);
        await $('#reset_sidebar_link').click();

        // Add three items to the cart
        const items = await $$('.inventory_item');
        for (let i = 0; i < 3; i++) {
            await items[i].$('.btn_inventory').click();
        }

        // Navigate to cart and proceed to checkout
        await $('.shopping_cart_link').click();
        await $('#checkout').click();

        // Fill out the form and proceed
        await $('#first-name').setValue('John');
        await $('#last-name').setValue('Doe');
        await $('#postal-code').setValue('12345');
        await $('#continue').click();

        // Verify the items and total price
        const cartItems = await $$('.inventory_item_name');
        expect(cartItems).toHaveLength(3);

        const totalPrice = await $('.summary_total_label').getText();
        expect(totalPrice).toContain('Total');

        // Finish and check the success message
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