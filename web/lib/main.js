function fetchURL() {
    // grab URL from input.
    var url = $("#url-input").val();

    // get HTML response from URL
    $.ajax({ url: url, success: function(data) { alert(data); } });
    $("#html-results").html("Place URL Results here...");
    return false;
}
