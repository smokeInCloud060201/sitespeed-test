module.exports = async function (context, commands) {

    const redirectUrl = 'https://kiosk-sit3.qa.spdigital.sg/payment';

    console.log("The context is ", context)

    await commands.navigate(redirectUrl);
    const currentUrl = await commands.js.run('return document.location.href');

    if (currentUrl.includes('auth0')) {
        context.log.info('Redirected to Auth0 login...');

        await commands.addText.byId('quanpham@spgroup.com.sg', '1-email',)
        await commands.addText.byId('Password@123', '1-password')

        await commands.click.byId('1-submit');

        context.log.info('Submitted login form.');
        await commands.wait.byPageToComplete();
    } else {
        context.log.info('Already logged in, skipping login step.');
    }
};
