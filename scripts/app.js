module.exports = async function (context, commands) {

    const redirectUrl = 'https://kiosk-sit3.qa.spdigital.sg/open-account/residential';

    await commands.navigate(redirectUrl);
    console.log("This is main app ", redirectUrl)

};
