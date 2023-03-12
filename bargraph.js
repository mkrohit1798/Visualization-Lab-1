function feature_count(dataset, feature){
    var ft_count = d3.nest()
    .key(function(d){ return eval("d."+ feature);})
    .rollup(function(values){ return values.length; })
    .entries(dataset)

    return ft_count;
}

function bar_plot(feature_str){
    d3.selectAll(".svg_barhist").remove();
    d3.selectAll(".abc").remove();

    var margin = {top:100, right:40, left:80, bottom:100 },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body")
        .append("svg")
        .attr("class","svg_barhist")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("+margin.left+", "+margin.top+")")

        d3.csv("Games_final_dataset.csv", function(data){
            var cnt = feature_count(data, feature_str)

            var x = d3.scaleBand()
            .domain(cnt.map(function(d){ return d.key; }))
            .range([0, width])
            .padding(0.5);

            var y = d3.scaleLinear()
                    .domain([0, d3.max(cnt, function(d){
                        return d.value;
                    })])
                    .range([height,0]);
            
                if(feature_str === "Min_HDD_Space" || feature_str === "Recom_HDD_Space" 
                    || feature_str === "Min_OS" || feature_str === "Recom_OS" 
                    || feature_str === "Min_Direct_X"){
                svg.append("text")         //x Axis labels    
                .attr("transform", "translate(" + (width/2) + " ," + (height + (margin.bottom)) +")") 
                .style("text-anchor", "middle")
                .text(feature_str);
                }

                if(feature_str === "Min_OS" || feature_str === "Recom_OS" 
                    || feature_str === "Min_Direct_X" 
                    || feature_str === "Min_HDD_Space" || feature_str === "Recom_HDD_Space"){  
                    svg.append("text")      //y Axis labels
                        .attr("transform", "rotate(-90)")
                        .attr("x",0 - (height / 2))
                        .attr("y", (0 - margin.left)/2 )
                        .attr("dx", "1em")
                        .attr("dy", "-0.4em") //shift along yaxis
                        .style("text-anchor", "middle")
                        .text("Frequency");
                }

            
            var tip = d3.tip()
            .attr('class', 'd3-tip').offset([-7, 0]).html(function(d) {
            return "<strong>Total:</strong> <span style='color:black'>" + d.value + "</span>";
        })
        svg.call(tip);

            svg.selectAll("rect")
            .data(cnt)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", "#A813F7")

            .on('mouseover', function(d){
                x = +d3.select(this).attr('x') - 10;
                width = +d3.select(this).attr('width')+10;
                y = +d3.select(this).attr('y') - 10;
                height = +d3.select(this).attr('height') +10;

                d3.select(this)
                    .attr("x",x )
                    .attr("width", width)
                    .attr("y",y )
                    .attr("height", height)
                    .style("fill", "#EB7C0D")

                tip.show(d);
            })
            .on('mouseout', function(d){
                x = +d3.select(this).attr('x') + 10;
                width = +d3.select(this).attr('width')-10;
                y = +d3.select(this).attr('y') + 10;
                height = +d3.select(this).attr('height') -10;

                d3.select(this)
                    .attr('x', x)
                .attr('width', width)
                .attr('y',  y)
                .attr('height', height)
                .style("fill", "#A813F7");
                tip.hide()
            })
            .transition()
            .duration(800)
            .delay(function(d, i) { return i * 100; })
            .attr("x", function(d){ return x(d.key); })
            .attr("width", x.bandwidth())
            .attr("y", function(d){ return y(d.value); })
            .attr("height", function(d){ return height - y(d.value); })
            .style("fill", "#A813F7");

            svg.append("g")
            .attr("transform", "translate(0, "+height+")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-33, 29)rotate(-45)");

            svg.append("g")
                .call(d3.axisLeft(y));
            
            
        });
}

function re_plot(feature_str){
    d3.selectAll(".svg_barhist").remove();

    var margin = {top: 0, right: 40, bottom: 100, left: 90},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    console.log("ab")

    var svg = d3.select("body")
    .append("svg")
        .attr("class", "svg_barhist")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + 100)
    .append("g")
        .attr("transform","translate(" + (margin.left + 130)+ ", 30)");

    d3.csv("Games_final_dataset.csv", function(data){
        var cnt = feature_count(data, feature_str)

        
    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, d3.max(cnt.map(function(d){ return d.value; }))])
        .range([width,0]);   

        if(feature_str === "Min_HDD_Space" || feature_str === "Recom_HDD_Space" 
                    || feature_str === "Min_OS" || feature_str === "Recom_OS" 
                    || feature_str === "Min_Direct_X"){
                svg.append("text")         //x Axis labels    
                .attr("transform", "translate(155 ,450)") 
                .style("text-anchor", "middle")
                .text("Frequency");
                }

    svg.append("g")
        .attr("transform", "translate(-200," + height + ")") // okay done
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)")
        .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
        .range([ height,0 ])
        .domain(cnt.map(function(d) { return d.key; }))
        .padding(.5);

    svg.append("g")
        .attr("transform", "translate(" + (width - margin.right-160.01)+", 0)") // done too
        .call(d3.axisRight(y));
        // .selectAll("text")
        //     .attr("transform", "translate(50,0)")
        //     .attr("x",0 )
        //     .attr("y", 0 )
        //     .style("text-anchor", "end");

        if(feature_str === "Min_OS" || feature_str === "Recom_OS" || feature_str === "Min_Direct_X" ||
        feature_str === "Min_HDD_Space" || feature_str === "Recom_HDD_Space"){
        svg.append("g")
            .attr("transform", "translate(" + (width - margin.right-160.01)+", 0)")
            .call(d3.axisRight(y))
            .text(feature_str)
            .attr("transform", "rotate(45)")
            .attr("x",0 )
            .attr("y", 0 )
            .style("text-anchor", "end");
            svg.append("text")         //y Axis labels    
            .attr("transform", "translate(" + (width-margin.right)+ " ," + (-30) +")rotate(-90)")
            .attr("x",0 - (height / 2))
            .attr("y", (0 - margin.left)/2 )
            .attr("dx", "1em")
            .attr("dy", "-0.4em") 
            .style("text-anchor", "middle")
            .text(feature_str);
        }
        else{
            svg.append("g")
        .attr("transform", "translate(" + (width - margin.right-160.01)+", 0)") // done too
        .call(d3.axisRight(y))
        .text(feature_str)
            .attr("transform", "translate(50,0)")
            .attr("x",0 )
            .attr("y", 0 )
            .style("text-anchor", "end");
        }
    
    svg.selectAll("myRect")  
        
        .data(cnt)
        .enter()
        
        .append("rect")
        .transition()
        .duration(800)
        // .ease(d3.easeSin)
        
        .attr("x",  function(d) { return x(d.value); })
        .attr("y", function(d) { return y(d.key); })
        .attr("width", function(d) { return width - x(d.value);} )
        .attr("transform", "translate(-200,0)") //done
        .attr("height", y.bandwidth() )
        .delay(function(d, i) { return i * 100; })
        .attr("fill", "#A813F7");
});
}
