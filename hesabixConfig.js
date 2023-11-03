export const name = "hesabixConfig";

export function getApiUrl() {
    /*
    When you want to setup new hesabix on server before compile and run { npm run build | dev } fill this function.
    This set for access user interface to API.
    If this be wrong user interface not functioning probably.
     */
    return 'http://localhost';
    //return 'https://app.hesabix.ir';
}