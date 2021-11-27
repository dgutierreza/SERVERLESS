const  peopleFieldsParse  = {
    
    "name" : "nombre",
    "birth_year" : "anio_nacimiento",
    "eye_color" : "color_ojo",
    "gender" : "genero",
    "hair_color" : "color_pelo",
    "height" : "altura",
    "mass" : "masa",
    "skin_color" : "color_piel",
    "homeworld" : "mundo_natal",
    "films" : "peliculas",
    "species" : "especies",
    "starships" : "naves_estelares",
    "vehicles" : "vehiculos",
    "url" : "url",
    "created" : "creado",
    "edited" : "editado"
};

const peopleParse = (people) => {
    
    return Object.keys(people).reduce((obj, field) => {
    
        const parse_field = peopleFieldsParse[field];
        obj[parse_field] = people[field];
        return obj;
    }, {});
};

exports.peopleParse = peopleParse;