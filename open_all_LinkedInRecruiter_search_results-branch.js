/* in LinkedIn Recruiter, in the search results, loop through each profile and check if an eyeball element (cf. XPath) exists.
If it's missing (i.e. profile not previously viewed), then open profile in a new tab
*/

function storeUrls(){
    var profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByClassName("profile-list")[0].getElementsByTagName("li");
    var profile_urls_arr = [];

    for (let i = 0; i < profile_container.length; i++) {
        var XPath = './/*[@type="eyeball-icon"]';
        var contextNode = profile_container.item(i);
        var eyeball_nodes_coll = document.evaluate(XPath, contextNode, null, XPathResult.ANY_TYPE, null); //XPathResult is meant to be a set of nodes. However, contextNode was limited to the one webElement[i]. Subsequently, the collection only stores one web element

            var this_node = eyeball_nodes_coll.iterateNext();
            if (this_node === null) {
                const profile_url = profile_container[i].getElementsByClassName("artdeco-entity-lockup__title")[0].getElementsByTagName("a")[0].href;
                profile_urls_arr.push(profile_url);
            }
    }
    return profile_urls_arr;
}

var urls_profiles_not_viewed = new Promise(function (resolve) {
    resolve(storeUrls());
});
urls_profiles_not_viewed.then(function (urls_arr) {
    urls_arr.forEach(elm => window.open(elm)) //console.log(elm)
});