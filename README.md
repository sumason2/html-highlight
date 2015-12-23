# html-highlight
Fetch HTML from a URL, display a summary, and highlight HTML tags upon request.

# Language Selection
I decided to start with a PHP deployment using the heroku app framework because
I've used the framework before and it allows me to host PHP code online.  I
chose PHP as a starting point to brush up on my PHP, but it turns out there was
very little PHP that I wrote.  Most of the logic was in JavaScript and jQuery.
I've used JavaScript before and had only used jQuery once before this project.

# Development Environment
The web app is deployed at: http://html-highlight.herokuapp.com/

I didn't not spend time setting up a separate development environment from
production and the heroku app is setup to automatically publish from the
release branch.  This means that usually when I wanted to test a fix or make a
change I needed to commit the code.  Usually this is not the case since I've
been able to copy the files onto a development machine and reboot the service
to test changes.  This allows me to only commit code I know works.  This is why
there are over 87 commits to the repository.

In the interest of being transparent and honest I've decided not to make a
separate, cleaner repository with less commits.

# Problems Encountered
During the development of this app I encountered a few problems.

The first problem I encountered was fetching HTML from a web page.  I was
trying to use ajax to fetch the HTML, but I soon ran into cross origin errors.
After learning a little more about CORS and trying a few solutions I abandoned
attempts to get the HTML through JavaScript.  I worked around this issue by
using PHP, which doesn't have any of the CORS problems that JavaScript has.  I
made a simple PHP page which takes the URL from the GET parameters, fetches the
URL and prints the results.  Then I used JavaScript on the main page to pull
from this new PHP page and because the page lives in the same domain there were
no CORS issues.

The other issue I encountered was with jQuery.  My original design was to do
try to do something clever, use jQuery to iterate through the tags to replace
and count tags.  The requirements didn't specify which HTML tags were to be
highlighted so I figured that it meant all HTML tags including the 'html' and
'body' tags.  jQuery strips these out when you supply a string to parse.  I
spent a few hours trying to work around this issue and I eventually decided to
just brute force the problem and go with JavaScript string replaces.  Which led
me to my final problem.

The final problem I encountered was script code that was being parsed as tags.
The downside to writing your own interpreter is that you usually don't have
time to properly write your own parser. There are already parsers that exist
who were written by people who know more about parsers than you and do have
time to properly write them.  Doing string replacing on a language is a lot
like writing your own parser, it will cover about 90% of the cases.  The
problem is if someone decides to put HTML like elements in their web page, or
more importantly the script section of their web page, your string replaces
will suddenly get confused and think that some logical statements are HTML tags
when in fact, they are not.  To work around this problem I ended up using
jQuery to find all the script elements of the HTML and do a string replace on
the contents before sending the HTML through the other replace logic I had.
The downside to this solution is that the 'html' and 'body' tags were stripped
from the HTML.

In the end I decided to make a note of this behavior as these tags are usually
not interesting, I do regret not moving forward with the more clever
implementation because the issue I was trying to work around is back, but this
app is work that I am proud to share.
