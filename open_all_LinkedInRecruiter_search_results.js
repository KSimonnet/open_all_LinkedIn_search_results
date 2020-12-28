/* 
in LinkedIn Recruiter, when the results of a search are displayed,
it only open in new windows the profiles that were not previously viewed.
*/
function loadAll(){
    var profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByClassName("profile-list")[0].getElementsByTagName("li");
    var profile_urls_arr = [];

    for (let i = 0; i < profile_container.length; i++) {
        var XPath = '//*[@type="eyeball-icon"]';
        var coll_eyeball = document.evaluate(XPath, document, null, XPathResult.ANY_TYPE, null); //XPathResult is a set of nodes
        try {/*  */
            var this_node = coll_eyeball.iterateNext();
            while (this_node) {
                if (profile_container[i].contains(this_node) === true) {
                //ignore. This profile was viewed already
                } else {
                const profile_url = profile_container[i].getElementsByClassName("artdeco-entity-lockup__title")[0].getElementsByTagName("a")[0].href;
                profile_urls_arr.push(profile_url);
                }
                this_node = coll_eyeball.iterateNext();
            }
        }
        catch (e) {
            alert( 'Error: Document tree modified during iteration ' + e );
        }
    }
    return profile_urls_arr;
}

var loadUrls = new Promise(function (resolve) {
    resolve(loadAll());
});
loadUrls.then(function (urls_arr) {
    urls_arr.forEach(elm => window.open(elm)) //console.log(elm);
});

openAllProfiles.catch(function (e) {
    alert( 'Error: Document tree modified during iteration ' + e );
});
