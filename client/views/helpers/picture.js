Handlebars.registerHelper("picture", function(picture, clazz, size){
    var url = MAG.Pictures.getPicturePath(picture, size);
    url = Handlebars._escape(url);

    var name = Handlebars._escape(picture.name);
    clazz =  Handlebars._escape(clazz);

    return new Handlebars.SafeString(
        "<img src='"+url+"' class='"+clazz+"' alt='"+name+"' title='"+name+"'></img>");
});