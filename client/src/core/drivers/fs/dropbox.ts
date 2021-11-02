import { Dropbox } from 'dropbox';

export class DropboxDriver {
  dropbox: Dropbox;

  constructor(token: string) {
    this.dropbox = new Dropbox({ accessToken: token });
    // this.dropbox.filesListFolder({ path: '' })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  }

  async readdir(path: string) {
    if(!path || path === '/') {
      path = '';
    }

    const response = await this.dropbox.filesListFolder({ path });
    const { entries } = response.result;

    // Todo: Map this to standard response.
    // Todo: Save this on local file system.
    return entries;
  }
}
