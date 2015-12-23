function generateSummaryTable(tags) {
    // This should probably be replaced with something like Handlebars.
    var summary = '<table><tr><th>Tag</th><th>Count</th></tr>';
    for (var key in tags) {
        summary = summary + '<tr><td class="active" onclick="clickTag(\''
                      + key + '\')">' +
            key       + '</td><td>' +
            tags[key] + '</td></tr>';
    }
    summary = summary + '</table>'; 
    return summary;
}

function parseTagsFromHTML(string) {
    // Iterate over tags
    var tags = {};
    $(string).find("div").each(function(index, element) {
        var tagName = element.className.toLowerCase();

        // Ignore Comments.
        if (! tagName.match(/^!/)) {
            // Initialize value at 0 if it doesn't exist.
            if (!(tagName in tags)) {
                tags[tagName] = 0;
            }
            // Tally tagName.
            tags[tagName]++;
        }
    });

    return tags;
}

function fetchURL() {
    // grab URL from input.
    var url = $("#url-input").val();

    // get HTML response from URL
    $.get("/fetchURL.php?url=" + url, function(data,status) {
        // Replace tags with div tags.
        var string = data.replace(/<[^>]*>/g, function(matched) {
            var newString = matched;
            if (matched.match(/<!.*>/)) {
                // We have a comment.
                newString = matched.replace(
                    /<!(.*)>/,
                    "<div class=\"!comment\"><span class=\"highlight.$1\">&lt;!$1&gt;</span></div>"
                );
            }
            else if (matched.match(/<\//)) {
                // We have a closing tag.
                newString = matched.replace(
                    /<\/([^>]*)>/,
                    "<span class=\"highlight.$1\">&lt;/$1&gt;</span></div>"
                );
            }
            else if (matched.match(/<[^>\/ ]+[^>]*\/>/)) {
                // We have an empty-element tag.
                newString = matched.replace(
                    /<([^>\/ ]+)([^>]*)>/,
                    "<div class=\"$1\"><span class=\"highlight.$1\">&lt;$1$2&gt;</span></div>"
                );
            }
            else {
                // We have a opening tag.
                newString = matched.replace(
                    /<([^>\/ ]+)([^>]*)>/,
                    "<div class=\"$1\"><span class=\"highlight.$1\">&lt;$1$2&gt;</span>"
                );
            }

            return newString;
        }); 

        var tags    = parseTagsFromHTML(string);
        var summary = generateSummaryTable(tags);

        // Rewrite the summary section and make the section visible.
        $("#summary-table").html(summary);
        $("#summary").css("visibility", "unset");
        $("#summary-table").css("visibility", "unset");

        // Rewrite the code section and make the section visible.
        $("#html-results").html(string);
        $("#html-results").css("visibility", "unset");
    });

    $("#html-results").html("Fetching and processing HTML data...");

    // Return false so the page is not refreshed. This function is called
    // from a submit button.
    return false;
}

function clickTag(tagName) {
    // Unset all highlights before highlighting another tag.
    $('*[class^="highlight."]').css(
        "background-color", ""
    );

    // Highlight all tags matching the selection.
    $('*[class="highlight.' + tagName + '"]').css(
        "background-color", "yellow"
    );
}
