var locs = {  
  "Buenos Aires":"-36.272988,-60.346513",
  "CABA": "-34.615714, -58.5035323",
  "Ciudad Autónoma de Buenos Aires": "-34.6153711,-58.5737519",
  "Mendoza":"-33.837789,-68.557024",
  "Santa Fe": "-29.773540, -60.690089",
  "Chubut": "-43.89275,-68.579102",
  "Córdoba":"-31.597581, -63.903979",
  "Rio Negro": "-40.493018, -68.615712",
  "Río Negro": "-40.493018, -68.615712",
  "Tucumán": "-26.938320, -65.381922",
  "Entre Rios":"-32.075015, -59.299457",
  "Entre Ríos": "-32.075015, -59.299457",
  "La Pampa":"-37.220522, -65.871430",
  "La Rioja": "-29.631108, -67.135729",
  "Jujuy": "-22.832761, -66.145428",
  "Neuquén": "-38.600003, -70.058093",
  "Santiago del Estero": "-27.703326, -63.466296",
  "Chaco": "-26.618343, -60.664782",
  "Catamarca": "-27.088818, -67.190661",
  "Corrientes": "-28.729470, -57.775378",
  "Formosa": "-24.777111, -60.159411",
  "San Luis": "-33.861615, -66.081042",
  "Misiones": "-26.936507, -54.580919",
  "Tierra del Fuego": "-54.237850, -67.744698",
  "Salta": "-25.204840, -64.805456",
  "San Juan": "-31.099886, -68.881384",
  "Santa Cruz": "-48.877868, -70.332708"
};


$(function(){
    var opts_map = {
        content: 'viz'
    };
    var map = new MapChart(opts_map);
    // d3.csv("https://docs.google.com/spreadsheets/d/163UrZhmaj2xTS5_Eu-BflP-QzL6OPu4l7y_iZuKrTto/edit#gid=0", function(e, d){
    d3.csv("data/data.csv", function(e, _data){
        var data = _.groupBy(_data, 'Provincia');
        var data_by_year = _.groupBy(_data, 'año');
        var porquienRegular = _.groupBy(_data, 'porquienRegular');
        var comoRegular = _.groupBy(_data, 'comoRegular');
        var embarazada = _.groupBy(_data, 'embarazada');
        var mes = _.groupBy(_data, 'Mes');
        

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
        
        /** barras x ano */
        var bars = [];
        for (var j in data_by_year){
          var obj = {
            name: j, 
            total: data_by_year[j].length, 
            data: data_by_year[j]
          };
          bars.push(obj);
        }

        var opts_barchart = {
          content: "#by_year_bars"
        };

        var bar_anio = new BarChart(bars, opts_barchart);
        


        /** barras x por quien?? */
        var bars_quien = [];
        for (var j in porquienRegular){
          var obj = {
            name: j, 
            total: porquienRegular[j].length, 
            data: porquienRegular[j]
          };
          bars_quien.push(obj);
        }
        var opts_bar_porquien = {
          content: "#by_porquien"
        };
        var bar_porquienRegular = new BarChart(bars_quien, opts_bar_porquien);


        /** barras x como?? */
        var bars_como = [];
        for (var j in comoRegular){
          var obj = {
            name: j, 
            total: comoRegular[j].length, 
            data: comoRegular[j]
          };
          bars_como.push(obj);
        }
        var opts_bar_como = {
          content: "#comoRegular",
          axis: "value",
        };
        var bar_x_como = new BarChart(bars_como, opts_bar_como);
    


        /** barras x embarazada?? */
        var bars_embarazada = [];
        for (var j in embarazada){
          var obj = {
            name: j, 
            total: embarazada[j].length, 
            data: embarazada[j]
          };
          bars_embarazada.push(obj);
        }
        var opts_bar_embarazada = {
          content: "#embarazada"
        };
        var bar_x_embarazada = new BarChart(bars_embarazada, opts_bar_embarazada);
    


        /** barras x Mes?? */
        var bars_mes = [];
        for (var j in mes){
          var obj = {
            name: j, 
            total: mes[j].length, 
            data: mes[j]
          };
          bars_mes.push(obj);
        }
        var opts_bar_mes = {
          content: "#mes"
        };
        var bar_x_mes = new BarChart(bars_mes, opts_bar_mes);
    
        var doit;
        window.onresize = function(d) {
          clearTimeout( doit );
          doit = setTimeout( resizeWindow, 200 );
        };
        function resizeWindow(){
          bar_porquienRegular.update();
          bar_anio.update();
          bar_x_como.update();
          bar_x_embarazada.update();
          bar_x_mes.update();
        }


    });
});

