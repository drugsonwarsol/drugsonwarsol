import { XataClient } from "./xata.codegen";

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;
  
  const customFetch = typeof fetch === 'function' 
    ? fetch 
    : (url: string, init?: RequestInit) => {
        const https = require('https');
        return new Promise((resolve, reject) => {
          const req = https.request(url, {
            method: init?.method || 'GET',
            headers: init?.headers,
          }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({
              ok: res.statusCode >= 200 && res.statusCode < 300,
              status: res.statusCode,
              json: () => Promise.resolve(JSON.parse(data)),
              text: () => Promise.resolve(data),
            }));
          });
          
          req.on('error', reject);
          
          if (init?.body) {
            req.write(init.body);
          }
          req.end();
        });
      };

  instance = new XataClient({ 
    fetch: customFetch as any
  });
  
  return instance;
};