/*
 * February 2015
 * deserialize 1.0.0
 * @author Mario Vidov
 * @url http://vidov.it
 * @twitter MarioVidov
 * MIT license
 */

$.fn.deserialize = function (data) {
    var selector = this,
        dataObj = {};

    if (typeof data == "string") {
        $.each(data.split("&"), function () {
            var el = this.split("="),
                elName = decodeURIComponent(el[0]),
                elVal = el.length > 1 ? decodeURIComponent(el[1]) : null;
            if (!(elName in dataObj)) {
                dataObj[elName] = [];
            }
            dataObj[elName].push(elVal);
        });
    }
    else if (typeof data == "object") {
        for (i in data) {
            if (!(data[i].name in dataObj)) {
                dataObj[data[i].name] = [];
            }
            dataObj[data[i].name].push(data[i].value);
        }
    }

    $(":input", selector).each(function () {
        if (!($(this).attr("name") in dataObj)) {
            this.checked = false;
        }
    });

    $.each(dataObj, function (i, val) {
        $("[name='" + i + "']", selector).val(val);
    });
}