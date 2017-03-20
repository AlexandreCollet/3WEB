module.exports = {

    allInit: function(request,response,next){
        console.log('All init');
        next();
    },

    allAuth: function(request,response,next){
        console.log('All auth');
        next();
    },

    getIndex: function(request,response){

        response.render('index',function(err,html){

            if(err)
                return response.status(500).send('Error readFile index.html');
            
            response.send(html);

        });

    },

    getForm: function(request,response){

        response.render('form');

    },

    postForm: function(request,response){

        request.session.persons = request.session.persons || [];

        request.session.persons.push(request.body);

        response.render('formReturn', { persons : request.session.persons });

    },

    getDelete: function(request,response){

        var id = request.params.id;

        response.json({
            id      : id,
            removed : request.session.persons.splice(id,1)
        });

    },

}