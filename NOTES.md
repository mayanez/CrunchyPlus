#Developer Notes#

##Dependencies##
* fermata (https://github.com/natevw/fermata)
* jsdom (https://github.com/tmpvar/jsdom) For testing

##TODOs##
*Write Mock of a CrunchyRoll page to test adding the ratings table.

##API's##

###MyAnimeList###
* http://myanimelist.net/modules.php?go=api

###AniDB###
* http://wiki.anidb.net/w/UDP_API_Definition

##XPaths##

* Where to get the Anime Title From
    
        //*[@id="container"]/h1/span

* Where to put the ratings.
    
        //*[@id="sidebar_elements"]/li[3]

##CSS##

    class="large-margin-bottom"