/* tslint:disable:no-console */
import 'dotenv/config';
import { IgApiClient } from '../src';
import axios from 'axios';

(async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  console.log(JSON.stringify(auth));

  // getting random square image from internet as a Buffer
  const { data: imageBuffer } = await axios({
    url: 'https://picsum.photos/800/800', // random picture with 800x800 size
    // TODO: test encoding with axios
    // encoding: null, // this is required, only this way a Buffer is returned
  });

  const publishResult = await ig.publish.photo({
    file: imageBuffer, // image buffer, you also can specify image from your disk using fs
    caption: 'Really nice photo from the internet! 💖', // nice caption (optional)
  });

  console.log(publishResult); // publishResult.status should be "ok"
})();
