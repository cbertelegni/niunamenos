  var locs = {  
      "Buenos Aires": ,
      "Mendoza": ,
      "Santa Fe": ,
      "Chubut": ,
      "CABA": ,
      "Córdoba": ,
      "Rio Negro": ,
      "Tucumán": ,
      "Entre Rios": ,
      "La Pampa": ,
      "Jujuy": ,
      "Neuquén": ,
      "Santiago del Estero": ,
      "Chaco": "-26.0193177,-63.1459822",
      "Catamarca": "-27.5018226,-69.2055836",
      "Corrientes": "-27.4860817,-58.8591269",
      "Formosa": "-24.642852,-62.2030241",
      "San Luis": "-33.9034943,-68.3840197",
      "Exterior": ,
      "Misiones": "-26.8061156,-57.099474",
      "Tierra del Fuego": "-53.8337145,-69.112786",
      "Salta": "-24.7957076,-65.5710617",
      "Ciudad Autónoma de Buenos Aires": "-34.6153711,-58.5737519",
      "Entre Ríos": "-32.0731636,-61.5380363",
      "La Rioja": "-29.8276818,-69.8076012",
      "Río Negro": "-39.6951255,-71.8493843",
      "San Juan": "-31.5316975,-68.5677823",
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
            var prov = {
                name: k,
                data: data[k],
                total: data[k].length,
                lat: locs[k].split(",")[0],
                lon: locs[k].split(",")[1]
            }
            if(k != "Exterior"){
                provs.push(prov);
            }
            //     $.get('http://nominatim.openstreetmap.org/search?format=json&q='+encodeURIComponent(location), function(_data){
            //        var loc = _data.filter(function(d){
            //         return d.type == "administrative";
            //        })[0];
            //        //  console.log(k)
            //        //  console.log(_data)
            //        // console.log(loc)
            //        loc = loc ? loc : _data[0];
            //     // debugger
            //     });
            //         // map.pushData(provs);

            //         // map.update_bounding_map();

        }
            console.log(provs)
    })
});