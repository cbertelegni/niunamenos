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
  "Chaco": "-26.0193177,-63.1459822",
  "Catamarca": "-27.5018226,-69.2055836",
  "Corrientes": "-27.4860817,-58.8591269",
  "Formosa": "-24.642852,-62.2030241",
  "San Luis": "-33.9034943,-68.3840197",
  "Misiones": "-26.8061156,-57.099474",
  "Tierra del Fuego": "-53.8337145,-69.112786",
  "Salta": "-24.7957076,-65.5710617",
  "Ciudad Autónoma de Buenos Aires": "-34.6153711,-58.5737519",
  "Entre Ríos": "-32.0731636,-61.5380363",
  "La Rioja": "-29.8276818,-69.8076012",
  "Río Negro": "-39.6951255,-71.8493843",
  "San Juan": "-31.5316975,-68.5677823",
  "Santa Cruz": "-49.0988388,-74.1563847"
};


$(function(){
    var opts_map = {
        content: 'viz'
    };
    var map = new MapChart(opts_map);
    // d3.csv("https://docs.google.com/spreadsheets/d/163UrZhmaj2xTS5_Eu-BflP-QzL6OPu4l7y_iZuKrTto/edit#gid=0", function(e, d){
    d3.csv("data/data.csv", function(e, _data){
        data = _.groupBy(_data, 'Provincia');
        data_by_year = _.groupBy(_data, 'año');
        

        var provs = [];
        for(var k in data){
            // var location = k + ", Argentina"
            // get geo location
            if(k != "Exterior" && locs[k]){
                // console.log(locs[k])
                var prov = {
                    name: k,
                    data: data[k],
                    total: data[k].length,
                    lat: locs[k].split(",")[0],
                    lon: locs[k].split(",")[1]
                };
                provs.push(prov);
            }
        
        }
        map.pushData(provs);
        map.update_bounding_map();
        // console.log(provs)
        var bars = [];
        for (var j in data_by_year){
          var year = {
            name: j, 
            total: data_by_year[j].length, 
            data: data_by_year[j]
          };
          bars.push(year);
        }
        var opts_barchart = {
          content: "#by_year_bars",
          axis: "value",
          division: 1000000
        };
        var bar_chart = new BarChart(bars, opts_barchart);
    });
});

