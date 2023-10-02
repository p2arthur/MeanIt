const handler = async () => {
  return { statusCode: 200, body: JSON.stringify("Hello lambda") };
};
export { handler };
