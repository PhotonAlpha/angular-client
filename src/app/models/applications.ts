export class Applications {
    appid: number;
    appQuotaId: number;
    resourceName: string;
    depolyVersion: string;
    binaryUrl: string;

    dbDetails: string;
    dbDetailArray: Array<DBDetail>;

    queueFactory: string;
    queueChannel: string;
    queueName: string;
    queueManage: string;
    mqDetails: string;
    customPropertites: string;
    keyStorePwd: string;
    trustStorePwd: string;

    createBy: string;
    updateBy: string;
    createDate: Date;
    updateDate: Date;
}

export class NasDetail {
    nasCapacity: string;
    pvcName: string;
    nasMountPoint: string;
}

export class DBDetail {
    jndiName: string;
    dbPoolName: string;
    dbJdbcUrl: string;
    dbInstanceName: string;
    dbUser: string;
    dbPassword: string;
    minPoolSize: string;
    maxPoolSize: string;
    txQueryTimeout: string;
    queryTimeout: string;
}
export class Pagination {
    currPage: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
    isPage: boolean;
    condition: any;
    results: Array<any>;
}
