function fetchURL() {
    // grab URL from input.
    var url = $("#url-input").val();

    // get HTML response from URL
    $.get(url, function(data,status) {
        alert("Data: " + data + "Status: " + status);
    });

    $("#html-results").html("Place URL Results here...");
    return false;
}
