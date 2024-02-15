import { projectId, queryData } from "@/lib/bigquery-client";
import { AppStore, PlayStore } from "@/lib/types/app-stores.types";



export const getTotalPlayStoreDownloads = async ({
    startDate,
    endDate
}: {
    startDate: Date;
    endDate: Date

}) => {
    const _startDate = formatDate(startDate);
    const _endDate = formatDate(endDate)

    const query = `SELECT SUM(install_events) as total_installs FROM ${projectId}.${PlayStore.datasetId}.${PlayStore.tables.stats_installs_overview} WHERE date >= "${_startDate}" and date <= "${_endDate}";`;

    const result = await queryData(query);
    const playStoreDownloads = result.length ? result[0].total_installs : 0;


    return playStoreDownloads;
}

export const getTotalAppStoreDownloads = async ({
    startDate,
    endDate
}: {
    startDate: Date;
    endDate: Date

}) => {
    const _startDate = formatDate(startDate);
    const _endDate = formatDate(endDate)

    const query = `SELECT SUM(total_downloads) as total_downloads FROM ${projectId}.${AppStore.datasetId}.${AppStore.tables.downloads_source_type_device_report} WHERE date >= "${_startDate}" and date <= "${_endDate}";`;

    const result = await queryData(query);
    const appStoreDownloads = result.length ? result[0].total_downloads : 0;

    return appStoreDownloads;
}



const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

