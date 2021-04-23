import registerNotifications from "../notifications/Notification.js";
// fetches a tip from the API
const fetchPackageList = async () => {
    let packageList = new Array;
    game.modules.forEach((_value, key, _map) => {
        packageList.push(key);
    });
    packageList.push(game.system.id);
    return packageList;
};
// ${tip.message.replace(/\\n/g, "<br/>")}
/* <div class="didyouknow author"><span class="name">${tip.id}</span></div> */
const formatTip = (packageList) => {
    let packageID;
    while (!packageID) {
        const i = Math.floor(Math.random() * packageList.length);
        const candidate = packageList.splice(i, 1)[0];
        if (game.i18n.translations["TIPS"][candidate])
            packageID = candidate;
    }
    return `<h2>${game.i18n.localize("TIPS.?")}</h2>
${game.i18n.localize(`TIPS.${packageID}.${Math.floor(Math.random() * Object.keys(game.i18n.translations["TIPS"][packageID]).length)}`)}
`;
};
// displays a fetched tip once
const onceReady = () => {
    registerNotifications();
    // fetch a new tip
    fetchPackageList()
        .then((packageList) => {
        window.vtta.notification.show(formatTip(packageList), null);
    })
        .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn("Unable to display tip, fetch failed.");
        console.error(err);
    });
};
export default onceReady;

//# sourceMappingURL=ready.js.map
