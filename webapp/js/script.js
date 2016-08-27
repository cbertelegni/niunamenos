  var locs = {  
      "Buenos Aires":"-37.0660347,-64.5307909",
      "Mendoza":"-34.7502062,-70.7873479",
      "Santa Fe": "-31.1828675,-63.141691",
      "Chubut": "-43.9748748,-70.1387829",
      "CABA": "-34.615714, -58.5035323",
      "Córdoba":"-32.226009,-66.0268798",
      "Rio Negro": "-39.7690275,-69.5938478",
      "Tucumán": "-27.0233033,-66.4440517",
      "Entre Rios":"-32.0778416,-61.5371102",
      "La Pampa":"-37.1397223,-68.0880544",
      "Jujuy": "-23.1894535,-66.8202083",
      "Neuquén": "-38.5598594,-72.2298438",
      "Santiago del Estero": "-28.0419276,-65.6993844",
      "Chaco": ,
      "Catamarca": ,
      "Corrientes": ,
      "Formosa": ,
      "San Luis": ,
      "Exterior": ,
      "Misiones": ,
      "Tierra del Fuego": ,
      "Salta": ,
      "Ch": ,
      "Ciudad Autónoma de Buenos Aires": ,
      "Entre Ríos": ,
      "La Rioja": ,
      "Río Negro": ,
      "Sala": ,
      "San Juan": ,
      "Santa Cruz": "-49.0988388,-74.1563847" ,
  };
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
            console.log(k)
            // var prov = {
            //     name: k,
            //     data: data[k],
            //     total: data[k].length,
            //     lat: loc.lat,
            //     lon: loc.lon
            // }
            // if(k != "Exterior"){
            //     $.get('http://nominatim.openstreetmap.org/search?format=json&q='+encodeURIComponent(location), function(_data){
            //        var loc = _data.filter(function(d){
            //         return d.type == "administrative";
            //        })[0];
            //        //  console.log(k)
            //        //  console.log(_data)
            //        // console.log(loc)
            //        loc = loc ? loc : _data[0];
            //     // debugger
            //         provs.push(prov);
            //     });
            //         // map.pushData(provs);

            //         // map.update_bounding_map();
            // }

        }
    })
});