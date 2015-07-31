(function($, window, document) {
    'use strict';

    var varz;
    var connz;

    function refresh() {
        $.getJSON('http://localhost:3000/api/varz', function(resp) {
            varz = resp;
            updateVarz();
        });
        $.getJSON('http://localhost:3000/api/connz', function(resp) {
            connz = resp;
            updateConnz();
        });
    }

    function updateVarz() {
        $('#start').html(moment(varz.start).format('MMMM Do YYYY, h:mm:ss a'));
        $('#uptime').html(varz.uptime);
        $('#inbytes').html(numeral(varz.in_bytes).format('0.00 b'));
        $('#outbytes').html(numeral(varz.out_bytes).format('0.00 b'));
        $('#inmsgs').html(numeral(varz.in_msgs).format('0,0'));
        $('#outmsgs').html(numeral(varz.out_msgs).format('0,0'));
    }

    function updateConnz() {
        $('#numconnz').html(connz.num_connections);
        $('#listconnz > tbody').html("");
        connz.connections.forEach(function(element, index, array) {
            var html = '<tr class="' + index + '">';
            html += '<td class="cid">' + element.cid + '</td>';
            html += '<td class="ip">' + element.ip + '</td>';
            html += '<td class="port">' + element.port + '</td>';
            html += '<td class="in_msgs">' + numeral(element.in_msgs).format('0,0') + '</td>';
            html += '<td class="out_msgs">' + numeral(element.out_msgs).format('0,0') + '</td>';
            html += '<td class="in_bytes">' + numeral(element.in_bytes).format('0.00 b') + '</td>';
            html += '<td class="out_bytes">' + numeral(element.out_bytes).format('0.00 b') + '</td>';
            html += '</tr>';
            $('#listconnz tbody').append(html);
        });
    }

    $(function() {
        setInterval(refresh, 2000);
    });
}(window.jQuery, window, document));
