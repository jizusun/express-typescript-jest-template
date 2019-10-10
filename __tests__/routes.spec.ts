import app from "../src/app";
import moxios from 'moxios'
import request from 'supertest'

describe('GET /HugoDF', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('It should fetch HugoDF from GitHub', async () => {
    moxios.stubRequest(/api.github.com\/users/, {
      status: 200,
      response: {
        blog: 'https://codewithhugo.com',
        location: 'London',
        bio: 'Developer, JavaScript',
        public_repos: 39,
      }
    });
    await request(app).get('/HugoDF');
    // debugger;
    expect(moxios.requests.mostRecent().url).toBe('https://api.github.com/users/HugoDF');
  });


  test('It should 200 and return a transformed version of GitHub response', async () => {
    moxios.stubRequest(/api.github.com\/users/, {
      status: 200,
      response: {
        blog: 'https://codewithhugo.com',
        location: 'London',
        bio: 'Developer, JavaScript',
        public_repos: 39,
      }
    });
    const res = await request(app).get('/HugoDF');
    expect(res.body).toEqual({
      blog: 'https://codewithhugo.com',
        location: 'London',
        bio: 'Developer, JavaScript',
        publicRepos: 39,
    });
  });


});
