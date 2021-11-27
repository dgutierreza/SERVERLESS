const axios = require('axios').default;
const peopleParse = require('models/translate');
const Dynamo = require('models/Dynamo');

module.exports.getStarwarsApi = async function (event, context, callback) {

  if (event.pathParameters == null) {
    if (event.queryStringParameters == null) {
      var response = await axios.get('https://swapi.py4e.com/api/people/?page=1&format=json');
      var translate = peopleParse.peopleParse(response.data.results[0]);
    
      var data = {
        statusCode: 200,
        body: JSON.stringify(response.data)
      };
      return callback(null, data);
    }
    else {
      try {
        var response = await axios.get('https://swapi.py4e.com/api/people/?page=' + event.queryStringParameters.page + '&format=json');
        var data = {
          statusCode: 200,
          body: JSON.stringify(response.data)
        };
        return callback(null, data);
      } catch (error) {
        var data = {
          statusCode: error.response.status,
          body: JSON.stringify('LA URL NO PUDO SER PROCESADA')
        };
        return callback(null, data);
      }

    }

  }
  else {
    try {
      var response = await axios.get('https://swapi.py4e.com/api/people/' + event.pathParameters.id + '/?format=json');
      var translate = peopleParse.peopleParse(response.data);
      var data = {
        statusCode: 200,
        body: JSON.stringify(translate)
      };

      return callback(null, data);
    } catch (error) {
      console.log('EL ERROR ES', error.response.status);
      var data = {
        statusCode: error.response.status,
        body: JSON.stringify('LA URL NO PUDO SER PROCESADA')
      };

      return callback(null, data);
    }
  }

};

module.exports.getDynamoApi = async function (event, context, callback) {
  
  if (event.pathParameters == null) {
    const all_peoples = await Dynamo.getAll('peoples').catch(err => {
      console.log('error in Dynamo Get', err);
      return "LA URL NO PUDO SER PROCESADA";
    });

    const data = {
      statusCode: 200,
      body: JSON.stringify(all_peoples)
    };
    return callback(null,data)
  }else{
    let Id = event.pathParameters.Id;
    const user = await Dynamo.get(Id, 'peoples').catch(err => {
      console.log('error in Dynamo Get', err);
      return "LA URL NO PUDO SER PROCESADA";
      });

      const data = {
        statusCode: 200,
        body: JSON.stringify(user)
      };

      return callback(null,data)
  }
};