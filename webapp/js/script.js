$(function(){
    var opts_map = {
        content: 'viz'
    };
    var map = new MapChart(opts_map);
    // d3.csv("https://docs.google.com/spreadsheets/d/163UrZhmaj2xTS5_Eu-BflP-QzL6OPu4l7y_iZuKrTto/edit#gid=0", function(e, d){
    d3.csv("data/data.csv", function(e, data){
        var data = _.groupBy(data, 'Provincia');
        var provs = [];
        for(var k in data){
            var location = k + ", Argentina"
            // get geo location
            if(k != "Exterior"){
                $.get('http://nominatim.openstreetmap.org/search?format=json&q='+encodeURIComponent(location), function(_data){
                   var loc = _data.filter(function(d){
                    return d.type == "administrative";
                   })[0];
                   //  console.log(k)
                   //  console.log(_data)
                   // console.log(loc)
                   loc = loc ? loc : _data[0];
                    var prov = {
                        name: k,
                        data: data[k],
                        total: data[k].length,
                        lat: loc.lat,
                        lon: loc.lon
                    }
                // debugger
                    provs.push(prov);
                    map.pushData(provs);
                    map.update_bounding_map();
                });
            }

        }
    })
});