exports.handler = async (event) => {
  try {
    const { expression } = JSON.parse(event.body);
    if (!expression) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        body: JSON.stringify({ error: 'Expression is required' }),
      };
    }

    // Replace x with * and ÷ with /
    let expr = expression.replace(/x/g, '*').replace(/÷/g, '/');
    // Use Function constructor for safer eval
    const result = new Function('return ' + expr)();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      body: JSON.stringify({ result: result.toString() }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      body: JSON.stringify({ result: 'Error' }),
    };
  }
};