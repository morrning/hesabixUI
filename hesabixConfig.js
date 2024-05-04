export const name = "hesabixConfig";

export function getApiUrl() {
    /*
    When you want to setup new hesabix on server before compile and run { npm run build | dev } fill this function.
    This set for access user interface to API.
    If this be wrong user interface not functioning probably.
     */
    return 'https://hesabix.ir';
    //return 'http://localhost';
    //return 'https://hesabax.ir';
}

export function getSiteName() {
    /*
    When you want to setup new hesabix on server before compile and run { npm run build | dev } fill this function.
    This set for set site name thats apear on interface
    If this be wrong user interface not functioning probably.
     */
    return 'حسابیکس';
    //return 'sitename';
}

export function getVersionCheckerUrl() {
    /*
    When you use hesabix in local cloudes with this URL you can check for last version of hesabix
    If you do not know about this do not change it!
     */
    return 'https://hesabix.ir/clude/last-version';
}