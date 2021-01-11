open_all_LinkedInRecruiter_search_results.js

# tl;dr

In LinkedIn Recruiter, in the search results, loop through each profile and check if an eyeball element (cf. XPath) exists.
If it's missing (i.e. profile not previously viewed), then open profile in a new tab

## Code explanation

Steps:

1.  Text on DOMContentLoaded, initiate script
2.  load HTML collection into a buffer array 
3.  scroll to each elm to trigger the loading of all subtrees
4.  get URLs of profiles that were not previously viewed
5.  open non viewed profiles, each in a new tab

Note:

It was solved using two different approaches:
*   nested callbacks
*   promise/then/catch combined with async/await

## See also

*   Initial code source that was revamped on 9/01/2021: https://www.youtube.com/watch?v=d8gToBvPn3w<br/>
    Author: Andre Bradshaw
