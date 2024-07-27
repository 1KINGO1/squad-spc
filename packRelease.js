import childProcess from 'child_process';
import chalk from 'chalk';
import { promises as fsPromises } from 'fs';
import { copy } from 'fs-extra/esm';
import AdmZip from 'adm-zip';

const envData = `
NODE_ENV=production

PORT=3000
HOST=localhost
STEAM_API_KEY=ENTER_YOUR_STEAM_API_KEY_HERE
JWT_SECRET=ENTER_YOUR_JWT_SECRET_HERE
API_PERFIX=/api

DB_HOST=db
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin
DB_NAME=spc

`

const createBuilds = async () => {
  console.log(chalk.cyan("Building client and server apps..."));
  childProcess.execSync('npm run build:all');
  console.log(chalk.green("Done!"));
}

const gatherFiles = async () => {
  console.log(chalk.cyan("Start gathering files..."));
  console.log(chalk.cyan("Deleting release folder..."));
  try {
    await fsPromises.rm("release", { recursive: true, force: true });
  }catch (e) {}
  console.log(chalk.green("Done!"));

  console.log(chalk.cyan("Creating release folder..."));
  await fsPromises.mkdir("release");
  console.log(chalk.green("Done!"));

  console.log(chalk.cyan("Coping server build..."));
  await copy("./dist", "./release/dist").catch(console.log);
  console.log(chalk.cyan("Coping client build..."));
  await copy("./client/build", "./release/client/build");
  console.log(chalk.cyan("Coping other files..."));
  await copy("./package.json", "./release/package.json");
  await copy("./docker-compose.yml", "./release/docker-compose.yml");
  await copy("./Dockerfile", "./release/Dockerfile");
  console.log(chalk.green("Done!"));

  console.log(chalk.cyan("Creating .env file..."));
  await fsPromises.writeFile("./release/.env.production", envData);
  console.log(chalk.green("Done!"));
}

const zipFolder = async (sourceDir, outputFilePath) => {
  const zip = new AdmZip();
  zip.addLocalFolder(sourceDir);
  await zip.writeZipPromise(outputFilePath);
  console.log(chalk.blue(`Zip file created: ${outputFilePath}`));
};

const zipFiles = async () => {
  console.log(chalk.cyan("Deleting previous release..."));
  try{
    await fsPromises.rm("release.zip", { force: true });
  }catch (e) {}
  console.log(chalk.green("Done!"));
  console.log(chalk.cyan("Creating release zip..."));
  await zipFolder("./release", "./release.zip");
  console.log(chalk.green("Done!"));
}

const main = async () => {
  await createBuilds();
  await gatherFiles();
  await zipFiles();
}

main().catch((err) => {
  chalk.red("Building failed with error: ", err);
});