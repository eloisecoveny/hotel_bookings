const RequestHelper = function(url){
  this.url = url
}

RequestHelper.prototype.get = function(){
  return fetch(this.url).then(res => res.json)
};

// const req = new RequestHelper("http://...")

// in test
// req.get = function(){
//   return {  }
// }

module.exports = RequestHelper;
