function fetchURL() {
    // grab URL from input.
    var url = $("#url-input").val();

    // get HTML response from URL
    $.get("/fetchURL.php?url=" + url, function(data,status) {
        // Iterate over tags
        var tags = {};
        $(data).find("*").each(function(index, element) {
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
        $("#html-results").html(summary);
        alert("Status: " + status);
    });

    $("#html-results").html("Fetching and processing HTML data...");
    return false;
}
