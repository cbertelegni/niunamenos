
function MapChart(opts) {

    var _self = this;

    _self.opts = opts;

    var _opts_map =  {
                // minZoom:2,
                maxZoom:5,
                // dragging:false,
                scrollWheelZoom: false,
                touchZoom:false,
                boxZoom:false,
                continuousWorld:true
            };
    
    _self.tooltip = tooltipd3();
    
    _self.map = L.map(opts.content, _opts_map)
        .setView([32, -15], 1);
    
    /** Make leaflet map */
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    var attribution= 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
    L.tileLayer(
        // 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
        // 'http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png', 
        'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}', 
        {
            id: 'cbertelegni.i7iigf65',
            token:'pk.eyJ1IjoiY2JlcnRlbGVnbmkiLCJhIjoiY2lyd2R1eHI5MGoxdmZsbTg2dXNzbDV6YyJ9.Tywz28Zzyym3KGPrsFaalw',
            maxZoom: 8,
            attribution: attribution
        }).addTo(_self.map);

    /* Initialize the SVG layer */
    _self.map._initPathRoot();

    function projectPoint(x, y) {
        var point = _self.map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }
    var transform = d3.geo.transform({point: projectPoint});
    _self.path = d3.geo.path().projection(transform);



    /* We simply pick up the SVG from the map object */
    var svg = d3.select("#"+opts.content).select("svg");
    _self.g = svg.append("g");

    
    _self.map.on("viewreset", function(){ _self.update(); });
    // _self.map.on("zoomend", function(){ _self.update(); });
    _self.map.on("zoomlevelschange", function(){ _self.update(); });
    
    // _self.update_bounding_map();
    
}

/** update dataset */
MapChart.prototype.pushData = function(_data) {
    var _self = this;
    // _self.data = _data;
        /** parse data */
    // console.log(_data)
    _self.data = _data.map(function(d) {
    // console.log(d)
        // d.client_supplier_region_loc = _self.get_country_loc(d._id.client_supplier_region);
         // Add a LatLng object to each item in the dataset 
        d.loc = new L.LatLng(d.lat, d.lon);
        // debugger
        return d;
    });

    /** Udate scale for this dataset */
    _self.scale_radio = d3.scale.linear()
        .domain([0, d3.max(_data, function(d){ return d.total; })])
        .range([3, 20]);

    /** select all circles on the map */
    _self.feature = _self.g.selectAll(".circle")
        .data(_self.data);
    
    /** enter new circles */
    _self.feature.enter()
        .append("circle")
        .attr("class", function(d){ 
            return ["circle", d.name].join(" "); 
        })
        .style("stroke", "black")
        .call(fn_events_tootip)  
        ; 

    _self.feature.exit().remove();
    _self.update();
    
    function fn_events_tootip(){
        this.on("mouseover", function(d){
            var html = "<b>"+d.name+"</b><br>";
                html += "<b>Femicidios:</b> "+d.total+"<br>";
            _self.tooltip.mouseover(html); // pass html content
            // console.log(d)
        })
        .on('mousemove', _self.tooltip.mousemove)
        .on('mouseout', _self.tooltip.mouseout);
    }
};

MapChart.prototype.update = function() {
        var _self = this;
        // var color = d3.scale.category20b();
        _self.g.selectAll(".circle")
            .style("fill", "#1e6bb8")
            // .style("fill", function(d){ return color(d.name); })
            .attr("transform", function(d) {
            // debugger 
                return "translate("+ 
                    _self.map.latLngToLayerPoint(d.loc).x +","+ 
                    _self.map.latLngToLayerPoint(d.loc).y +")";
                })
        .transition()
        .attr("r", function(d){ 
            return _self.scale_radio(d.total); 
        })
        // .attr("cx", function(d){
        //     // return _self.scale_radio(d.total)/2; 
        // })
        // .attr("cy", function(d){
        //     // return -(_self.scale_radio(d.total)/2); 
        // })
        ;

        // _self.update_bounding_map();
};

MapChart.prototype.update_bounding_map = function() {
    
    var _self = this;
    var arr_points = _self.data.map(function(d){ return d.loc; });
    var bounds = new L.LatLngBounds(arr_points);
    
    _self.map.fitBounds(bounds);
    _self.map.invalidateSize();
    return _self;
};