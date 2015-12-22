function generateSummaryTable(tags) {
    // This should probably be replaced with something like Handlebars.
    var summary = '<table><tr><th>Tag</th><th>Appearances</th></tr>';
    for (var key in tags) {
        summary = summary + '<tr><td>' +
            key       + ':</td><td>' +
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
        if (tagName.slice(0,1) != "!") {
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
        var string = data.replace(
            /<([^>\/ ]+)([^>]*)>/g,
            "<div class=\"$1\"><span class=\"highlight.$1\">&lt;$1$2&gt;</span>"
        ).replace(
            /<\/([^> ]+)>/g,
            "<span class=\"highlight.$1\">&lt;/$1&gt;</span></div>"
        );

        var tags    = parseTagsFromHTML(string);
        var summary = generateSummaryTable(tags);
        $("#summary").html(summary);
        $("#html-results").html(string);
    });

    $("#html-results").html("Fetching and processing HTML data...");
    return false;
}
