// ==UserScript==
// @name         employeurD proper dates
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  add proper time to employeur D
// @author       You
// @match        https://employeurd.com/WebTimeAttendance/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=employeurd.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
     var sectionHeader = document.getElementsByClassName("sectionHeader")[0]
     var div = sectionHeader.childNodes[1]
     var text = div.innerHTML

     var dateRegex = /\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])/g
     var dates = text.match(dateRegex);

     dates.forEach(date =>{
         text = text.replace(date, convertDate(date));
     });
    var from = new Date(dates[0])
    var to = new Date(dates[1]);
    var today = new Date();
    var extraText = ""
    moment.locale('en', { week: { dow: 1 } });
    const twoWeeksAgo = resetHours(new Date(moment().subtract(2, 'weeks').startOf('week').format('YYYY-MM-DD')));
    const oneWeekAgo = resetHours(new Date(moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD')));
    const thisWeek = resetHours(new Date(moment().startOf('week').format('YYYY-MM-DD')));
    const nextWeek = resetHours(new Date(moment().add(1, 'weeks').startOf('week').format('YYYY-MM-DD')));
    const nextWeekTwo = resetHours(new Date(moment().add(2, 'weeks').startOf('week').format('YYYY-MM-DD')));

    if(from.getTime() == twoWeeksAgo.getTime())
        extraText = "(2 weeks ago)";
    else if(from.getTime() == oneWeekAgo.getTime())
        extraText = "(1 week ago)";
    else if(from.getTime() == thisWeek.getTime())
        extraText = "(This week)"
    else if(from.getTime() == nextWeek.getTime())
        extraText = "(Next week)"
    else if(from.getTime() == nextWeekTwo.getTime())
        extraText = "(In 2 weeks)"
    else if(from < today)
        extraText = "(Many weeks ago)";
    else if(from > today)
        extraText = "(In many weeks)";

    div.innerHTML = text + extraText;
    div.style = "font-weight: 900; font-size: 21px;float:left;";
})();

// Convert dates to DD-MM-YYYY format
function convertDate(dateString){
    var p = dateString.split(/\D/g)
    return [p[2],p[1],p[0] ].join("/")
}

// Reset the hours to 0, on a date
function resetHours(date) {
   return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}
