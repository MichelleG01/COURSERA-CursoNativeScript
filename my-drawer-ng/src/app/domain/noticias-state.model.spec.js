var noticias_state_model = require("~/app/domain/noticias-state.model"); //sintaxis common module js

describe("reducerNoticias", function () {
    it("should reduce init data", function () {
        // setup
        //creamos una nueva noticia
        var prevState = noticias_state_model.intializeNoticiasState();
        //la agregamos
        var action = new noticias_state_model.InitMyDataAction(["noticia 1", "noticia 2"]);
        // action
        var newState = noticias_state_model.reducersNoticias(prevState, action);
        //assertions
        //verificamos que haya creado dos noticias
        expect(newState.items.lenght).toEqual(2);
        expect(newState.items[0].titulo).toEqual("noticias 1");
    });
    it("should reduce new item added", function () {
        var prevState = noticias_state_model.intializeNoticiasState();
        var action = new noticias_state_model.NuevaNoticiaAction(new noticias_state_model.Noticia("noticia 3"));
        var newState = noticias_state_model.reducersNoticias(prevState, action);
        //verificamos que haya creado una noticia
        expect(newState.items.lenght).toEqual(1);
        expect(newState.items[0].titulo).toEqual("noticia 3");
    });
    it("should reduce new item added v2", function () {
        var prevState = noticias_state_model.intializeNoticiasState();
        var action = new noticias_state_model.NuevaNoticiaAction(new noticias_state_model.Noticia("noticia 3"));
        var newState = noticias_state_model.reducersNoticias(prevState, action);
        expect(newState.items.lenght).toEqual(1);
        expect(newState.items[0].titulo).toEqual("noticia 3");
    });
});