import xmlrpc from 'xmlrpc';

export interface OdooAuthResult {
  uid: number;
  username: string;
  database: string;
}

export async function authenticateOdoo(
  url: string,
  database: string,
  username: string,
  password: string
): Promise<OdooAuthResult> {
  return new Promise((resolve, reject) => {
    const commonUrl = new URL('/xmlrpc/2/common', url);
    const client = xmlrpc.createSecureClient({
      host: commonUrl.hostname,
      port: commonUrl.port ? parseInt(commonUrl.port) : 443,
      path: commonUrl.pathname,
    });

    client.methodCall('authenticate', [database, username, password, {}], (error, uid) => {
      if (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        reject(new Error(`Odoo authentication failed: ${errorMessage}`));
        return;
      }

      if (!uid || uid === false) {
        reject(new Error('Invalid credentials'));
        return;
      }

      resolve({
        uid: uid as number,
        username,
        database,
      });
    });
  });
}
