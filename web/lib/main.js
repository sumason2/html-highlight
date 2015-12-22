function fetchURL() {
    // grab URL from input.
    var url = $("#url-input").val();

    // get HTML response from URL
    $.get("/fetchURL.php?url=" + url, function(data,status) {
        // Replace tags with div tags.
        var string = data.replace(
            /<([^>\/ ]+)/,
            "<div class=\"find.$1\"> &lt;$1"
        ).replace(
            /<\/([^> ]+)>/,
            "&lt;/$1&gt;</div>"
        );

        // Iterate over tags
        var tags = {};
        $(string).find("div").each(function(index, element) {
            var tagName = element.nodeName.toLowerCase();
            if (!(tagName in tags)) {
                tags[tagName] = 0;
            }
            tags[tagName]++;
        });

        // This should probably be replaced with something like Handlebars.
        var summary = '<table><tr><th>Tag</th><th>Appearances</th></tr>';
        for (var key in tags) {
            summary = summary + '<tr><td>' +
                key       + ':</td><td>' +
                tags[key] + '</td></tr>';
        }
        summary = summary + '</table>'; 
        $("#summary").html(summary);
        $("#html-results").html(string);
    });

    $("#html-results").html("Fetching and processing HTML data...");
    return false;
}
