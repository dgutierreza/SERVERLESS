const axios = require('axios').default;
const peopleParse = require('models/translate');
const Dynamo = require('models/Dynamo');
module.exports.setDataDynamoApi = async function (event, context, callback) {
    
    let Id = event.pathParameters.Id;
    var people_translate = await axios.get('https://swapi.py4e.com/api/people/' + Id + '/?format=json');
    var user = peopleParse.peopleParse(people_translate.data);
    user.Id = Id;
    
    const newUser = await Dynamo.write(user,'peoples').catch(error =>{
      console.log('Error:', error);
      return "HUBO UN PROBLEMA AL INSERTAR";
    })
    const data = {
        statusCode: 200,
        body: JSON.stringify(newUser)
      };
    return callback(null,data)
  };  

  