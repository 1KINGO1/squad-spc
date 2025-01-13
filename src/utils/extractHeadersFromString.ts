interface ResponseHeaders {
  title?: string,
  body: string
}

const titleRegex = /{{\s*title="(.*?)"\s*}}/;

function extractHeadersFromString(body: string): ResponseHeaders {
  const response: ResponseHeaders = {} as ResponseHeaders;

  const titleMatches = body.match(titleRegex);
  if (titleMatches[1]) response.title = titleMatches[1];

  response.body = body.replace(titleRegex, "");
  return response;
}

export default extractHeadersFromString;
