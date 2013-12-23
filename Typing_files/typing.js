(function(){
var Typing = function(){};  

Typing.prototype={
    conf:{"width": 600, "height": 300, "n":5,"point":20, "score":0, "focus":0, "removedid":0, "levelupscore":100, "Goal":1000},
    typingGame: function(){
      var elmnum=$("div").length;
      if(elmnum < tg.conf.n + 2){
          var top = Math.floor(Math.random() * tg.conf.height );
          var left = Math.floor(Math.random() * tg.conf.width )+30;
          var color = tg.randomColor();
          var question= tg.genQuestion();
          var len   = question.length;
          var divsize = len*20;
          var questionid=elmnum;
          if(tg.conf.removedid>0){
             questionid=tg.conf.removedid;    
          }
          $("<div/>").addClass("bubb")
                     .attr({"id":questionid})
                     .css({"top": top + 'px', "left" : left + 'px',"background-color": color, "z-index":1 }) 
                     .append($("<span/>").text(question))
                     .append($("<form/>")
                         .append($("<input/>").attr("type","TEXT").attr("size",len)
                           .bind('textchange',function(event) {
                                              var sublen=$(this).val().length;
                                              var subv=$(this).val().substr(0,sublen);
                                              var subq=question.substr(0,sublen);
                                              if(subq!=subv){
                                                $(this).css({"color":"red"}); 
                                              }else{
                                                $(this).css({"color":"green"}); 
                                              }
                                              if($(this).val().indexOf(question) !==-1){
                                                 tg.conf.score += tg.conf.point;
                                                 $("#score").html(tg.conf.score);
                                                 $(this).parent().parent().fadeOut('fast'); 
                                                 $(this).parent().parent().remove(); 
                                                 tg.conf.removedid=$(this).parent().parent().attr("id"); 
                                                 tg.conf.focus=0;
                                              }
                                             })
                           .focus(function(){
                                $(this).parent().parent().circulate('Stop');
                                $(this).parent().parent().animate( 
                                                            { width : divsize+"px", height : "80px", fontSize : "20px" } , "slow", function () {}
                                                          );
                                tg.conf.focus=1;
                                $(this).parent().parent().css({"z-index":'100'});
                             })
                           )
                           .submit(function(){return false;})

                      )
                     .appendTo("#field");
                    if(tg.conf.score>tg.conf.levelupscore){
                        $('#'+questionid).circulate({ 
                              speed: Math.floor(Math.random()*300) + 1000,
                              height: Math.floor(Math.random()*1000) - 470,
                              width: Math.floor(Math.random()*1000) - 470
                            });
                    }
      }
      setTimeout(function(){ tg.typingGame(); }, 1000);
    },
    randomColor: function(){
        var color = '';
        var r=Math.floor(Math.random() * 255);
        var g=Math.floor(Math.random() * 255);
        var b=Math.floor(Math.random() * 255);
        color='rgba('+ r +','+ g +','+ b +',.75)';
        return color;
    },
    focusCheck: function(){
        if(tg.conf.focus==0){
          $("input:first").focus();
        }
        setTimeout(function(){ tg.focusCheck(); }, 100);
    },
    genQuestion: function(){
        var num = qes.data.funclist.length;
        var no= Math.floor(Math.random() * num);
        return qes.data.funclist[no];         
    }
}
window.tg=new Typing();
})();

$(function(){
    $('#start').css({"top" : (tg.conf.height/2)+'px', "left" : (tg.conf.width)/2+'px'})
               .fadeIn('slow')
               .click(function(){
                      $('#start').fadeOut('slow');
                      $('#score').show();
                      $('#field').show();
                      tg.typingGame();
                      tg.focusCheck();
                   });
});
