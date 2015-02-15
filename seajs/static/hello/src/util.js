define(function(require,exports,module){
     var util = {};
    
     var colorRange = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    
     util.randomColor = function(){
          return '#' +
               colorRange[Math.floor(Math.random() * 16)] +
               colorRange[Math.floor(Math.random() * 16)] +
               colorRange[Math.floor(Math.random() * 16)] +
               colorRange[Math.floor(Math.random() * 16)] +
               colorRange[Math.floor(Math.random() * 16)] +
               colorRange[Math.floor(Math.random() * 16)];
     };
    
     module.exports = util;
});