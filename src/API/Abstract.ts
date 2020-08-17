import pathUtils from 'path';
import { GitAuth } from '@publica.re/react-git-provider';

export type APIProfile = {
  username: string;
  email: string;
  name: string;
  avatarUrl: string;
  publicUrl: string;
  websiteUrl: string;
  location: string;
  bio: string;
  compagny: string;
  createdAt: string;
};

export default abstract class API {
  static apiPath = '/api';
  static tokenParam = 'access_token';
  constructor(protected _token: string, protected _path: string) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetch(path: string): Promise<any> {
    const url = new URL(
      pathUtils.join(this.constructor['apiPath'], path),
      this._path,
    );
    url.searchParams.set(this.constructor['tokenParam'], this._token);
    return await (await fetch(url.toString())).json();
  }

  abstract signOut(): Promise<undefined>;

  abstract userInfos(): Promise<{ name: string; email: string } | undefined>;

  abstract userProfile(): Promise<APIProfile | undefined>;

  abstract website(): Promise<string>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async auth(_path: string): Promise<GitAuth | false> {
    return false;
  }
}
