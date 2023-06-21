// TODO: Clean up the fetched data
const fs = require("fs");
const https = require("https");
const { OUTPUT_PATH } = require("./fetch");

const MEDIA_PATH = OUTPUT_PATH + "/media";

async function downloadFile(url, dest) {
  return await new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const code = res.statusCode ?? 0;
        if (code >= 400) {
          console.log(code);
          //return reject(new Error(res.statusMessage));
        }

        if (code > 300 && code < 400 && !res.headers.location) {
          return resolve(downloadFile(res.headers.location, dest));
        }
        const file = fs.createWriteStream(dest).on("finish", () => {
          resolve({});
        });

        res.pipe(file);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

const parseJson = () => {
  const jsonFile = fs.readFileSync(`${OUTPUT_PATH}/exercises.json`);
  const exercises = JSON.parse(jsonFile);

  exercises.forEach(async (element) => {
    if (element.gifUrl) {
      // fetch the gif for the image
      try {
        await downloadFile(element.gifUrl, `${MEDIA_PATH}/${element.id}.gif`);
      } catch (err) {
        console.log(err);
      }
    }
  });
};

const assignLocalFile = () => {
  const jsonFile = fs.readFileSync(`${OUTPUT_PATH}/exercises.json`);
  const exercises = JSON.parse(jsonFile);

  exercises.forEach((element) => {
    if (element.gifUrl) {
      element.localGif = `${element.id}.gif`;
    }
  });

  fs.writeFileSync(
    `${OUTPUT_PATH}/exercises.json`,
    JSON.stringify(exercises, null, 2),
    function (err) {
      console.error(err);
    }
  );
};

// parseJson();
assignLocalFile();
