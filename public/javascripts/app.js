(function($, window, document) {
    'use strict';

    /**
     * Current timestamp in miliseconds
     */
    var now;

    /**
     * Chart series
     *
     * @type {{bytesps: Array, msgsps: Array}}
     */
    var series =   {
        bytesps: [],
        msgsps: []
    };

    /**
     * Varz form server
     *
     * @type {{in_bytes: number, mem: number}}
     */
    var varz = {
        in_bytes: 0,
        mem: 0
    };

    /**
     * Connz from server
     */
    var connz;

    /**
     * Refresh datasource
     */
    function refresh() {
        now = ((new Date()).getTime() / 1000) | 0;

        // Fetch varz
        $.getJSON('http://localhost:3000/api/varz', function(resp) {
            varz = resp;
            // Fetch conz
            $.getJSON('http://localhost:3000/api/connz', function(resp) {
                connz = resp;
                updateVarz();
                updateConnz();
            });
        });

    }

    /**
     * Update variables widgets
     */
    function updateVarz() {
        var start = moment(varz.start).format('MMMM Do YYYY, h:mm:ss a');
        var uptime = moment(varz.start).fromNow();
        var in_bytes = numeral(varz.in_bytes).format('0.00 b');
        var out_bytes = numeral(varz.out_bytes).format('0.00 b');
        var in_msgs = numeral(varz.in_msgs).format('0,0');
        var out_msgs = numeral(varz.out_msgs).format('0,0');

        $('#start').html(start);
        $('#uptime').html(uptime);
        $('#inbytes').html(in_bytes);
        $('#outbytes').html(out_bytes);
        $('#inmsgs').html(in_msgs);
        $('#outmsgs').html(out_msgs);
    }

    /**
     * Update connection widgets
     */
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

    /**
     * Start chart input bytes
     */
    function chartInBytes()  {

        var prevInBytes = 0;
        var prevInMsgs = 0;
        var prevOutBytes = 0;
        var prevOutMsgs = 0;

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
            updateInByptes(prevInBytes, prevInMsgs, prevOutBytes, prevOutMsgs);
            prevInBytes = varz.in_bytes ||  0;
            prevInMsgs = varz.in_msgs ||  0;
            prevOutBytes = varz.out_bytes || 0;
            prevOutMsgs = varz.out_msgs || 0;
            graph.update();
        }, 1000);
    }

    /**
     * Update chart input bytes
     *
     * @param prevBytes
     * @param prevMsgs
     */
    function updateInByptes(prevInBytes, prevInMsgs, prevOutBytes, prevOutMsgs) {
        var in_bytes = (varz.in_bytes - prevInBytes) / 1024;
        var in_msgs = varz.in_msgs - prevInMsgs;
        var out_bytes = (varz.out_bytes - prevOutBytes) / 1024;
        var out_msgs = varz.out_msgs - prevOutMsgs;
        var total_bytes = in_bytes + out_bytes;
        var total_msgs = in_msgs + out_msgs;

        $('#bytesps').html(numeral(total_bytes).format('0.00') +" Kb");
        $('#msgsps').html(total_msgs);

        if (prevInBytes != 0) {
            if (series.bytesps.length > 100) {
                series.bytesps.shift();
            }
            series.bytesps.push({
                x: now,
                y: total_bytes
            });
        }
        if (prevInMsgs != 0) {
            if (series.msgsps.length > 100) {
                series.msgsps.shift();
            }
            series.msgsps.push({
                x: now,
                y: total_msgs
            });
        }
    }

    // Initialize dashboard
    $(function() {
        // start charts
        chartInBytes();

        // render dashboard
        setInterval(refresh, 1000);
    });
}(window.jQuery, window, document));
