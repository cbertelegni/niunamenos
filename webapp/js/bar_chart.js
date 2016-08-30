
function BarChart(data, opts){
    // console.log(data)
    var _self = this;
    
    _self.opts = opts;
    
    _self.color_bars = "#1e6bb8";
    
    _self.canvas = d3.select(opts.content)
        .append("div").attr("class", "canvas_bar");
    
    _self.scaleY = d3.scale.linear().range([5, 100]);

    _self.tooltip = tooltipd3();
    
    _self.pushData = pushData;

    pushData(data);
    
    function pushData(data){
        // data.map(function(d){
        //     console.log(d);
        // });
    
        
        _self.data=data;

        _self.scaleY.domain([0, d3.max(_self.data, function(d){ return d.total; })]);

        _self.bar = _self.canvas.selectAll(".bar")
            .data(_self.data);
        
        var bar_enter = _self.bar.enter().append("div")
            .attr("class", "bar")
            .call(fn_events_tootip);
        
        bar_enter.append("div")
            .attr("class", "bar_txt");

        _self.bar_label = _self.canvas.selectAll(".bar_label")
            .data(_self.data);
            // .enter()
        _self.bar_label.enter().append("div")
            .attr("class", "bar_label")
            ;



        _self.bar.exit().remove();
        _self.bar_label.exit().remove();
        update();
    }
    
    function fn_events_tootip(){
        this.on("mouseover", function(d){
            var html = "<b>"+d.name+"</b><br>";
                html += "<b>Cantidad: </b> "+d.total+"<br>";
            _self.tooltip.mouseover(html); // pass html content
        })
        .on('mousemove', _self.tooltip.mousemove)
        .on('mouseout', _self.tooltip.mouseout);
    }


    function update(){
        // var w = 100,
        var w = $(_self.opts.content).width(),
            padding = 3;
        
        
        w = w / _self.bar.data().length - padding;
        _self.bar
            .style("width", function(d, i){
                return w+"px";
            })
            .style("left", function(d, i){
                return (w+padding) * i + (padding /2) +"px";
            })
            .style("height", function(d, i){
                return _self.scaleY(d.total) +"%";
            })
            .style("bottom", function(d, i){
                return 0 +"px";
            })
            .style("background", function(d, i){
                return _self.color_bars;
            })
            ;
        
        _self.bar.select(".bar_txt").html(function(d){
                // return d.name;
                return "";
            });

        _self.bar_label
            .html(function(d){
                // console.log(d)
                return d.name;
            })
            .style("width", function(d, i){
                return w+"px";
            })
            .style("left", function(d, i){
                return (w+padding) * i + (padding /2) +"px";
            });
    }
    
}
