function openLIprofiles(){

        function loadAll(){
            setTimeout(() => {   
                var profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByClassName("profile-list")[0].getElementsByTagName("li");
                var profile_urls_arr = [];

                for (let i = 0; i < profile_container.length; i++) {
                    var XPath = '//*[@type="eyeball-icon"]';
                    var coll_eyeball = document.evaluate(XPath, document, null, XPathResult.ANY_TYPE, null); //XPathResult is a set of nodes
                    try {
                        var this_node = coll_eyeball.iterateNext();
                        while(this_node){
                            if (profile_container[i].contains(this_node) == true) {
                            alert("yo");
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
            }, 1000);
            return profile_urls_arr;
        };
        var loadUrls = new Promise(function(resolve) {
            resolve(loadAll());
        });
        loadUrls.then(window.scrollTo(0, document.body.scrollHeight));


    var openAllProfiles = new Promise(function(resolve){
        resolve(loadAll());
    });


    openAllProfiles.then(profile_urls_arr.forEach(elm => console.log(elm)));   //window.open(elm);

};
openLIprofiles();




function loadAll(){
    var profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByClassName("profile-list")[0].getElementsByTagName("li");
    var profile_urls_arr = [];

    for (let i = 0; i < profile_container.length; i++) {
        var XPath = '//*[@type="eyeball-icon"]';
        var coll_eyeball = document.evaluate(XPath, document, null, XPathResult.ANY_TYPE, null); //XPathResult is a set of nodes
        try {
            var this_node = coll_eyeball.iterateNext();
            while (this_node) {
                if (profile_container[i].contains(this_node) == true) {
                alert("yo");
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
    urls_arr.forEach(elm => console.log(elm))
});

openAllProfiles.catch( function (e) {
    alert( 'Error: Document tree modified during iteration ' + e );
});
