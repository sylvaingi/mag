Handlebars.registerHelper("picture", function(picture, size){
    var url = MAG.Pictures.getPicturePath(picture, size);
    url = Handlebars._escape(url);
    
    var name = Handlebars._escape(picture.name);

    return new Handlebars.SafeString(
        "<img src='"+url+"' alt='"+name+"' title='"+name+"'></img>");
});