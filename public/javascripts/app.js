(function($, window, document) {
    'use strict';

    var now;
    var series =   {
        bytesps: [],
        msgsps: []
    };
    var varz = {
        in_bytes: 0,
        mem: 0
    };
    var connz;

    function refresh() {
        now = ((new Date()).getTime() / 1000) | 0;
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

    function chartInBytes()  {
        var prevBytes = 0;
        var prevMsgs = 0;
        var graph = new Rickshaw.Graph({
            element: document.querySelector("#chart"),
            height: 200,
            series: [{
                color: "#2980b9",
                data: series.bytesps,
                name: 'Mem'
            }, {
                color: "#3498db",
                data: series.msgsps,
                name: 'Messages'
            }]
        });
        var axes = new Rickshaw.Graph.Axis.Time({
            graph: graph
        });
        var y_axis = new Rickshaw.Graph.Axis.Y({
            graph: graph,
            orientation: 'left',
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            element: document.getElementById('y_axis'),
        });
        graph.render();
        setInterval(function() {
            updateInByptes(prevBytes, prevMsgs);
            prevBytes = varz.in_bytes ||  0;
            prevMsgs = varz.in_msgs ||  0;
            graph.update();
        }, 1000);
    }

    function updateInByptes(prevBytes, prevMsgs) {
        var in_bytes = (varz.in_bytes - prevBytes) / 1024;
        var in_msgs = varz.in_msgs - prevMsgs;
        var now = ((new Date()).getTime() / 1000) | 0;
        if (prevBytes != 0) {
            if (series.bytesps.length > 100) {
                series.bytesps.shift();
            }
            series.bytesps.push({
                x: now,
                y: in_bytes
            });
        }
        if (prevMsgs != 0) {
            if (series.msgsps.length > 100) {
                series.msgsps.shift();
            }
            series.msgsps.push({
                x: now,
                y: in_msgs
            });
        }
    }

    $(function() {
        chartInBytes();
        setInterval(refresh, 1000);
    });
}(window.jQuery, window, document));
