import config from "./config";

const { BigQuery } = require("@google-cloud/bigquery");


export const projectId = config.dataLakeProjectId;


/// Big query connector
const bigquery = new BigQuery({ credentials: config.gcloudCredentials });


/// Generic function to fetch data from Bigquery
export const queryData = async (query: string) => {
    const options = {
        query: query
    }
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    return rows;
}


