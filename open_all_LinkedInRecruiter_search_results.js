// Solution 1: solved using async/await

function scrollToElm(elm) {
    return new Promise(function (resolve) {
        setTimeout(function () {    // the function executes on the window scope
            resolve(elm.scrollIntoView(true));
        }, 10);
    })
}

async function loadDOMsubTree(arr) {
    for (let i = 0; i < arr.length; i++) {
        await scrollToElm(arr[i]);
    }
}

function getUrls() {
    var profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByTagName("ol")[0].getElementsByClassName("profile-list__border-bottom");
    var profile_urls_arr = [];
    var XPath = './/*[@type="eyeball-icon"]';   //with '.', the querying starts from the context node. '//' is the Recursive Descent Operator that matches elements anywhere in the document tree (https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate)

    for (let i = 0; i < profile_container.length; i++) {
        var contextNode = profile_container.item(i);    //HTMLCollection.item(). Alternatively, HTMLCollection[i]
        var eyeball_nodes_coll = document.evaluate(XPath, contextNode, null, XPathResult.ANY_TYPE, null); //XPathResult is meant to be a set of nodes. However, contextNode was limited to the one webElement[i]. Subsequently, the collection only stores one web element
        var this_node = eyeball_nodes_coll.iterateNext();
        if (this_node === null) {
            const profile_url = profile_container[i].getElementsByClassName("artdeco-entity-lockup__title")[0].getElementsByTagName("a")[0].href;
            profile_urls_arr.push(profile_url);
        }
    }
    return profile_urls_arr;
}

function exeAlgo() {
    let HTML_coll_loaded = new Promise(function (resolve, reject) {  //https://javascript.info/promise-basics , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises , https://www.javascripttutorial.net/es6/promise-chaining/
        const unloaded_profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByTagName("ol")[0].getElementsByClassName("profile-list__occlusion-area");
        var profile_urls_arr = [];
        for (const node of unloaded_profile_container) {
            profile_urls_arr.push(node)  //HTMLCollection is live: it's automatically updated when the underlying document is changed. 
                                        //Nodes are stored to ensure we don't miss out from the HTMLCollection
        }
        resolve(profile_urls_arr)
        reject(() => {
            throw new Error("Error loading HTML collection")
        })
    });

window.onload = HTML_coll_loaded.then(loadDOMsubTree)
    .then(getUrls)
    .then(function (urls_arr) {
        urls_arr.forEach(elm => window.open(elm))
    })
    .catch((error) => {
        console.log(error)
    })
}





// Solution 2: solved using chained promises

const subTreeLoaded = new Promise(function (resolve) {
    let count = 0;  //count is part of the lexical environment of the closure of this outher parent function
    new Promise(function (resolve, reject) {  //https://javascript.info/promise-basics , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises , https://www.javascripttutorial.net/es6/promise-chaining/
        const unloaded_profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByTagName("ol")[0].getElementsByClassName("profile-list__occlusion-area");
        var profile_urls_arr = [];
        for (const node of unloaded_profile_container) {
            profile_urls_arr.push(node)  //HTMLCollection is live: it's automatically updated when the underlying document is changed.
                                         //Nodes are stored to ensure we don't miss out from the HTMLCollection
        }
        resolve(profile_urls_arr)
        reject(() => {
            throw new Error("Error loading HTML collection")
        })
    })
    .then(function scrollToElm(arr) {
        let promise = new Promise(function (resolve) {
            setTimeout(function () {
                resolve(arr[count].scrollIntoView(true));
            }, 10)
        })
        return promise.then(function processResult() {
            count++;
            if (count == arr.length - 1) return resolve();
            return promise.then(scrollToElm(arr));   //https://developers.google.com/web/fundamentals/primers/async-functions
            })
        })
    })

    subTreeLoaded.then(function getUrls() {
        var profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByTagName("ol")[0].getElementsByClassName("profile-list__border-bottom");
        var profile_urls_arr = [];
        var XPath = './/*[@type="eyeball-icon"]';   //with '.', the querying starts from the context node. '//' is the Recursive Descent Operator that matches elements anywhere in the document tree (https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate)
    
        for (let i = 0; i < profile_container.length; i++) {
            var contextNode = profile_container.item(i);    //HTMLCollection.item(). Alternatively, HTMLCollection[i]
            var eyeball_nodes_coll = document.evaluate(XPath, contextNode, null, XPathResult.ANY_TYPE, null); //XPathResult is meant to be a set of nodes. However, contextNode was limited to the one webElement[i]. Subsequently, the collection only stores one web element
            var this_node = eyeball_nodes_coll.iterateNext();
            if (this_node === null) {
                const profile_url = profile_container[i].getElementsByClassName("artdeco-entity-lockup__title")[0].getElementsByTagName("a")[0].href;
                profile_urls_arr.push(profile_url);
            }
        }
        return profile_urls_arr;
    })
    .then(function (urls_arr) {
        urls_arr.forEach(elm => console.log(elm))   //window.open(elm)
    })
    .catch((error) => {
        console.log(error)
    })

window.onload = subTreeLoaded);





// Solution 3: solved using nested (successive / climb up) callbacks

function getUrls(callback) {
    var profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByTagName("ol")[0].getElementsByClassName("profile-list__border-bottom");
    var profile_urls_arr = [];
    var XPath = './/*[@type="eyeball-icon"]';   //with '.', the querying starts from the context node. '//' is the Recursive Descent Operator that matches elements anywhere in the document tree (https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate)
  
    for (let i = 0; i < profile_container.length; i++) {
        var contextNode = profile_container.item(i);    //HTMLCollection.item(). Alternatively, HTMLCollection[i]
        var eyeball_nodes_coll = document.evaluate(XPath, contextNode, null, XPathResult.ANY_TYPE, null); //XPathResult is meant to be a set of nodes. However, contextNode was limited to the one webElement[i]. Subsequently, the collection only stores one web element
        var this_node = eyeball_nodes_coll.iterateNext();
        if (this_node === null) {
            const profile_url = profile_container[i].getElementsByClassName("artdeco-entity-lockup__title")[0].getElementsByTagName("a")[0].href;
            profile_urls_arr.push(profile_url);
        }
    }
    if (profile_urls_arr.length < 1) {
      callback(new Error("Error loading URLs in array", null))
    } else {
      callback(null, profile_urls_arr) 
    }
  }
  
function scrollToElm(arr, callback) {
    setTimeout(() => {
        arr[recurs_subtree_count].scrollIntoView(true);
        recurs_subtree_count++
        callback(arr)
    }, 50);
}

function recurseSubTree(array) {
    if (recurs_subtree_count < array.length) {
        scrollToElm(array, recurseSubTree)
    } else if (recurs_subtree_count === array.length) {
        getUrls(function (error, arr) {
            if (error) {
            console.log(error)
            return
            }
            arr.forEach(elm => window.open(elm))
        })
    } else {
        throw new Error("Error loading subtrees")
    }
}

function loadHTMLColl(callback) {
    const unloaded_profile_container = document.getElementsByClassName("hp-core-temp profile-list ember-view")[0].getElementsByTagName("ol")[0].getElementsByClassName("profile-list__occlusion-area");
    var profile_urls_arr = [];
    for (const node of unloaded_profile_container) {
        profile_urls_arr.push(node)
    }
    if (profile_urls_arr.length < 1) {
        callback(new Error("Error loading URLs in array", null))
    } else {
        callback(null, profile_urls_arr) 
    }
}

var recurs_subtree_count = 0;
window.onload = loadHTMLColl((error, arr) => {
    if (error) {
        console.log(error)
        return
    }
    recurseSubTree(arr) 
})  
