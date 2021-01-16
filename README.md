open_all_LinkedInRecruiter_search_results.js

# TL;DR

In LinkedIn Recruiter, in the search results, loop through each profile and
check if an eyeball element (cf. XPath) exists.
If it's missing (i.e. profile not previously viewed), then open profile in a
new tab.

## Code explanation

Steps:

1.  When page is loaded, initiate script
2.  Load HTML collection into a buffer array 
3.  Scroll to each elm to trigger the loading of all subtrees
4.  Get URLs of profiles that were not previously viewed
5.  Open non viewed profiles, each in a new tab

Note:

It was solved using three different approaches:
*   Nested callbacks
*   Promise/then/catch
*   Async/await

What the `document.getElementsByXXX` method returns is an HTMLCollection. HTMLCollection
is live: it's automatically updated when the underlying document is changed
(https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection). The number of
items in the collection would vary at runtime as the page (un)loads.
According to the DRY principle (https://wiki.c2.com/?DontRepeatYourself), solving
the problem on the upstream would be preferable.
It can be achieved by pushing the HTML collection items into a buffer array.

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

## See also

*   Initial code source that was revamped on 9/01/2021: https://www.youtube.com/watch?v=d8gToBvPn3w<br/>
    Author: Andre Bradshaw

*   Queueing: https://www.twilio.com/blog/asynchronous-javascript-introduction-promises
