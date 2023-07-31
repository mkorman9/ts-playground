import axios from 'axios';

interface HttpBinGetResponse {
  origin: string;
  url: string;
  args: {
    [name: string]: string;
  };
  headers: {
    [name: string]: string;
  };
}

export async function findPublicIp() {
  const response = await axios.get<HttpBinGetResponse>('https://httpbin.org/get', {
    headers: {
      'User-Agent': 'ts-playground/1.0'
    }
  });

  return response.data.origin;
}
