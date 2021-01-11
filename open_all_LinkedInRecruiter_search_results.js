/* 
in LinkedIn Recruiter, in the search results,
looping through each profile, loop through each eyeball element (cf. XPath) found on the page.
If it doesn't contain an eyeball element (i.e. profile not previously viewed), then open profile in a new tab
*/

function checkIfViewed(node_to_be_tested, filter_coll){
    var this_node = filter_coll.iterateNext();
    while (this_node) {
        if (node_to_be_tested.contains(this_node)) {
            return false;
        }
        this_node = filter_coll.iterateNext();
    }
    return true;
};

function getUrls(){
    var profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByClassName("profile-list")[0].getElementsByTagName("li");
    var profile_urls_arr = [];

    for (let i = 0; i < profile_container.length; i++) {
        var XPath = './/*[@type="eyeball-icon"]';   //with '.', the querying starts from the context node. '//' is the Recursive Descent Operator that matches elements anywhere in the document tree (https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate)
        var eyeball_coll = document.evaluate(XPath, document, null, XPathResult.ANY_TYPE, null); //XPathResult is a set of nodes

        if (checkIfViewed(profile_container[i], eyeball_coll)) {
            const profile_url = profile_container[i].getElementsByClassName("artdeco-entity-lockup__title")[0].getElementsByTagName("a")[0].href;
            profile_urls_arr.push(profile_url);
            }
    }
    return profile_urls_arr;
}

var urls_profiles_not_viewed = new Promise(function (resolve) {
    resolve(getUrls());
});
urls_profiles_not_viewed.then(function (urls_arr) {
    urls_arr.forEach(elm => window.open(elm))
});
