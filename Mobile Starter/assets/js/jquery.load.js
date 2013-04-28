$(function(){

	var r = Raphael("draw", 240, 240),
    r2 = Raphael("draw2", 240, 240),
    slices = [55, 20, 13, 32, 5, 1, 2, 10],
    slices2 = [55, 20, 13, 32, 5, 1, 2, 10],
    descriptions = ['biggest pie', 'third largest', 'fourth place', 'second biggest', 'third from smallest', 'smallest', 'almost smallest', 'close to fourth but fifth'],
    pie = r.piechart(120, 120, 100, slices),
    pie2 = r2.piechart(120, 120, 100, slices2);

    function mousemove() {
        $("#my_tooltip").css({
            display: 'none',
            top: event.clientY - 50+'px',
            left: event.clientX - 50+'px'
        }).appendTo("#draw").show();
    };
    
    for(var index_i=0;index_i < pie.covers.items.length;index_i++){
        pie.covers.items[index_i].mousemove(mousemove);
    }

    pie.hover(function () {
        //console.log(event);
        // use value order to retrieve associated text
        var text = descriptions[this.value.order];
        if($("#my_tooltip").length > 0){
            $("#my_tooltip").css({
                display: 'none',
                top: event.clientY - 50+'px',
                left: event.clientX - 50+'px'
            }).text(text).show();
        } else {
            $('<div id="my_tooltip">'+text+'</div>').css({
                position: 'absolute',
                display: 'none',
                top: event.clientY - 50+'px',
                left: event.clientX - 50+'px',
                border: '1px solid grey',
                padding: '4px 6px',
                'background-color': '#fff',
                opacity: 0.80
            }).appendTo("#draw").hide();
        }

        this.sector.stop();
        this.sector.scale(1.1, 1.1, this.cx, this.cy);

    }, function () {

        $("#my_tooltip").hide();

        this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

    });


});