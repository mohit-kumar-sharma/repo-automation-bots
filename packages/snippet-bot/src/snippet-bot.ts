// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Application} from 'probot';
import {logger} from 'gcf-utils';

const CONFIGURATION_FILE_PATH = 'snippet-bot.yml';

interface Configuration {
  randomBoolean: boolean;
}

export = (app: Application) => {
  app.on(['issues.opened', 'pull_request.opened'], async context => {
    const config = (await context.config(
      CONFIGURATION_FILE_PATH,
      {}
    )) as Configuration;

    if (
      (context.payload.pull_request || context.payload.issue) &&
      config.randomBoolean
    ) {
      logger.info('The bot is alive!');
      return;
    }
  });
};
