export interface AreaInterface {
    ID?: number;
    AreaName?: string;   
	Floor?: number;
}

export interface CleaningRecordInterface {
    ID?: number;
    ActualStartTime?: string;
    ActualEndTime?: string;
    Notes?: string;
    ScheduleID?: number;
    UserID?: number;
    UserName?: string;//ยังไม่เสร็จ
    AreaID?: number;
}

export interface SchedulesInterface {
    ID?: number;
    StartTime?: string;
    EndTime?: string;
    AreaID?: number;
}