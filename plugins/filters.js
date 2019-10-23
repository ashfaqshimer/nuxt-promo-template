import Vue from "vue";

Vue.filter("shortenText", function(text, maxLength = 3000) {
    if (text && typeof text === "string") {
        const finalChar = text.length > maxLength ? "..." : "";
        return text.substr(0, maxLength) + finalChar;
    }
    return "";
});
