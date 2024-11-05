describe('Sauce Demo Login', () => {
    it('should show an error message for locked_out_user', async () => {
        await browser.url('https://www.saucedemo.com/');
        await $('#user-name').setValue('locked_out_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        const errorMsg = await $('.error-message-container').getText();
        expect(errorMsg).toContain('locked out');
    });
});